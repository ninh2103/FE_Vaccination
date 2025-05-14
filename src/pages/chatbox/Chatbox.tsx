import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, X, CircleStop } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trainingData } from './training'
import { useListVaccinationQuery } from '@/queries/useVaccination'
import { toast } from 'sonner'

const apiKey = 'AIzaSyAJF8hoEIF2n-iVsaqGrv1M0WS1KvOPmAY'
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash'
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain'
}

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
  data?: Array<{ id: string; title: string; name: string; amout: string; redirectlink: string }>
}

export default function Chatbox() {
  const { data: vaccinationList } = useListVaccinationQuery({
    items_per_page: 100
  })
  const [vaccination, setVaccination] = useState<any[]>([])

  useEffect(() => {
    if (vaccinationList) {
      setVaccination(vaccinationList.data)
    }
  }, [vaccinationList])

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'Chào bạn! Bạn có gì muốn hỏi về các loại vắc-xin của chúng tôi không?',
      data: []
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)

  const findMatchingAnswer = (question: string): { answer: string | null; data: any[] } => {
    const normalizedQuestion = question.toLowerCase().trim()

    // First check training data
    const trainingMatch = trainingData.find((item) => item.question.toLowerCase().trim() === normalizedQuestion)

    if (trainingMatch) {
      return { answer: trainingMatch.answer, data: [] }
    }

    // Check for vaccine-related keywords
    const vaccineKeywords = ['vắc-xin', 'vaccine', 'tiêm', 'chủng ngừa', 'vaccination']
    const isVaccineQuestion = vaccineKeywords.some((keyword) => normalizedQuestion.includes(keyword.toLowerCase()))

    if (isVaccineQuestion && vaccination.length > 0) {
      // Search for matching vaccines in the API data
      const matchingVaccines = vaccination.filter(
        (vaccine) =>
          vaccine.name.toLowerCase().includes(normalizedQuestion) ||
          vaccine.title.toLowerCase().includes(normalizedQuestion)
      )

      if (matchingVaccines.length > 0) {
        const vaccineInfo = matchingVaccines.map((vaccine) => ({
          id: vaccine.id,
          title: vaccine.title,
          name: vaccine.name,
          amout: vaccine.price?.toString() || 'Liên hệ',
          redirectlink: `/vaccination/${vaccine.id}`
        }))

        return {
          answer: `Tôi tìm thấy ${matchingVaccines.length} vắc-xin phù hợp với yêu cầu của bạn:`,
          data: vaccineInfo
        }
      }
    }

    return { answer: null, data: [] }
  }

  const typeMessage = async (text: string) => {
    let currentText = ''
    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setDisplayText(currentText)
      await new Promise((resolve) => setTimeout(resolve, 30))
    }
    return currentText
  }

  const fetchAIResponse = async (userMessage: string) => {
    try {
      setIsLoading(true)
      setIsRendering(true)
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', text: userMessage },
        { id: Date.now() + 1, sender: 'bot', text: 'Đợi tôi chút...', data: [] }
      ])

      // Check for matching answer in training data or vaccination list
      const { answer, data } = findMatchingAnswer(userMessage)

      if (answer) {
        // If we have a matching answer, use it directly
        await typeMessage(answer)
        setMessages((prev) => [...prev.slice(0, -1), { id: Date.now() + 1, sender: 'bot', text: answer, data }])
      } else {
        // If no matching answer, use the AI model
        const chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: 'user',
              parts: [
                {
                  text: `Bạn là một người tư vấn giỏi. Với dữ liệu được lấy từ database của tôi: ${JSON.stringify({ vaccination })}. Người dùng sẽ hỏi những câu như ví dụ: "Tôi đang tìm hiểu về vắc xin cho trẻ 2 tuổi, nên tiêm loại nào?" hoặc "Người lớn có cần tiêm nhắc lại không?" Bạn sẽ tư vấn họ theo kiểu dễ thương nhưng nghiêm túc, nội dung rõ ràng, dễ hiểu và có thể kèm theo đường link thông tin vắc xin phù hợp. Đường link sẽ là: http://localhost:4000/vaccination/{id} (với id được lấy từ trong database). Nếu câu hỏi không liên quan đến y tế hoặc vắc xin, bạn sẽ lịch sự từ chối vì không nằm trong phạm vi chuyên môn của bạn. Các câu nhỏ như cảm ơn, chào hỏi thì bạn vẫn có thể trả lời nhẹ nhàng, thân thiện. Bạn hãy trả lời bằng đoạn văn bình thường, KHÔNG sử dụng định dạng JSON hoặc bất kỳ ký tự đặc biệt nào như \`\`\`json hoặc { "message": ". Chỉ trả lời bằng văn bản thuần túy.`
                }
              ]
            },
            {
              role: 'model',
              parts: [
                {
                  text: `Tôi hiểu rõ yêu cầu của bạn. Tôi sẽ đóng vai một tư vấn viên vắc xin "dễ thương nhưng nghiêm túc", sử dụng dữ liệu từ database của bạn để đưa ra lời khuyên và cung cấp đường link vắc xin phù hợp. Tôi sẽ trả lời bằng văn bản thuần túy, không sử dụng bất kỳ định dạng JSON hay ký tự đặc biệt nào. Khi người dùng hỏi các câu hỏi không liên quan đến y tế hoặc vắc xin, tôi sẽ lịch sự từ chối.`
                }
              ]
            }
          ]
        })

        const result = await chatSession.sendMessage(userMessage)
        const responseText = result.response.text()

        // Clean up any potential JSON formatting that might still appear
        const cleanResponse = responseText
          .replace(/```json\s*{/g, '')
          .replace(/}\s*```/g, '')
          .replace(/\{\s*"message"\s*:\s*"/g, '')
          .replace(/"\s*\}\s*$/g, '')
          .trim()

        // Extract any URLs from the response
        const urlRegex = /http:\/\/localhost:4000\/vaccination\/\d+/g
        const urls = cleanResponse.match(urlRegex) || []

        // Extract vaccine IDs from URLs
        const vaccineData = urls
          .map((url) => {
            const id = url.split('/').pop()
            const vaccine = vaccination.find((v) => v.id === id)
            if (!vaccine) return null
            return {
              id: String(vaccine.id),
              title: String(vaccine.title),
              name: String(vaccine.name),
              amout: String(vaccine.price || 'Liên hệ'),
              redirectlink: `/vaccination/${vaccine.id}`
            }
          })
          .filter(
            (item): item is { id: string; title: string; name: string; amout: string; redirectlink: string } =>
              item !== null
          )

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { id: Date.now() + 1, sender: 'bot', text: cleanResponse, data: vaccineData }
        ])

        await typeMessage(cleanResponse)

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { id: Date.now() + 1, sender: 'bot', text: cleanResponse, data: vaccineData }
        ])
      }
    } catch (error) {
      toast.error('Lỗi khi tư vấn')
    } finally {
      setIsLoading(false)
      setDisplayText('')
      setIsRendering(false)
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return
    if (isRendering) {
      setIsRendering(false)
      return
    }
    fetchAIResponse(input)
    setInput('')
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, displayText])

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <AnimatePresence mode='wait'>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className='flex h-[500px] w-[380px] flex-col overflow-hidden rounded-md border bg-white shadow-lg dark:bg-gray-900'
          >
            {/* Chatbox Header */}
            <div className='relative border-b bg-primary/10 p-3 backdrop-blur-md dark:bg-gray-800'>
              <h2 className='text-center text-sm font-medium text-gray-900 dark:text-white'>Trợ lý ảo - VaxBot ✨</h2>
              <motion.button
                className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                onClick={() => setIsOpen(false)}
              >
                <X className='h-4 w-4' />
              </motion.button>
            </div>

            {/* Display Messages */}
            <ScrollArea className='h-[350px] flex-grow px-4 pt-4'>
              <div ref={scrollRef} className='flex flex-col space-y-4'>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className='flex items-end gap-2 max-w-[75%]'>
                      {/* Avatar */}
                      <Avatar className='h-8 w-8'>
                        {message.sender === 'user' ? (
                          <AvatarImage src='https://images.unsplash.com/photo-1673255745677-e36f618550d1' alt='User' />
                        ) : (
                          <AvatarImage
                            src='https://images.unsplash.com/photo-1684369176170-463e84248b70'
                            alt='ELearn'
                          />
                        )}
                        <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                      </Avatar>

                      {/* Message Content */}
                      <motion.div
                        className={`rounded-lg px-3 py-2 text-sm max-w-full break-words ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                        }`}
                      >
                        {message.text === 'Đợi tôi chút...' ? (
                          <div className='flex items-center'>
                            Đợi tôi chút
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
                            >
                              .
                            </motion.span>
                          </div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            {index === messages.length - 1 && message.sender === 'bot' && displayText
                              ? displayText
                              : message.text}
                          </motion.div>
                        )}

                        {/* Display Course Suggestions */}
                        {message.sender === 'bot' && message.data && message.data.length > 0 && (
                          <div className='mt-3 space-y-2'>
                            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>Gợi ý vắc-xin:</h3>
                            {message.data.map((course) => (
                              <a
                                key={course.id}
                                href={course.redirectlink}
                                target='_blank'
                                className='block rounded-md border p-2 text-sm transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
                              >
                                <strong>{course.title}</strong> - {course.name} ({course.amout} VND)
                              </a>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Message */}
            <motion.div className='border-t bg-gray-100 p-3 dark:bg-gray-800'>
              <div className='flex w-full max-w-sm items-center space-x-2 '>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Nhập tin nhắn...'
                  className='flex-grow w-full min-w-0 bg-white text-sm dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 p-2'
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />

                <Button
                  onClick={handleSendMessage}
                  size='icon'
                  variant={isRendering ? 'destructive' : 'ghost'}
                  disabled={isLoading}
                >
                  {isRendering ? <CircleStop className='h-4 w-4' /> : isLoading ? '⏳' : <Send className='h-4 w-4' />}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <Button
              size='icon'
              className='rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600'
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className='h-5 w-5' />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

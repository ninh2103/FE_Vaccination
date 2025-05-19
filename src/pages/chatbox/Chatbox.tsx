import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, X, CircleStop } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trainingData } from './training'
import { useListVaccinationQuery } from '@/queries/useVaccination'

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
  data?: {
    url: string
    image?: string
  }[]
}

// Simple UUID generator function
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const findTrainingResponse = (question: string) => {
  const normalizedQuestion = question.toLowerCase().trim()
  return trainingData.find(
    (item) =>
      item.question.toLowerCase().includes(normalizedQuestion) ||
      normalizedQuestion.includes(item.question.toLowerCase())
  )
}

export default function Chatbox() {
  const listVaccinationQuery = useListVaccinationQuery({ items_per_page: 100 })

  const [vaccination, setVaccination] = useState<any[]>([])

  useEffect(() => {
    if (listVaccinationQuery.data) {
      setVaccination(listVaccinationQuery.data.data)
    }
  }, [listVaccinationQuery.data])

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)

  // Typing animation effect
  const typeMessage = async (text: string) => {
    let currentText = ''
    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setDisplayText(currentText)
      await new Promise((resolve) => setTimeout(resolve, 30))
    }
    return currentText
  }

  // Function to call the Gemini API and get a response
  const fetchAIResponse = async (userMessage: string) => {
    if (isLoading) return

    try {
      setIsLoading(true)
      setIsRendering(true)

      setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userMessage }])
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Đợi tôi chút...', data: [] }])

      // Check training data first
      const trainingResponse = findTrainingResponse(userMessage)
      if (trainingResponse) {
        await typeMessage(trainingResponse.answer)
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { id: Date.now() + 1, sender: 'bot', text: trainingResponse.answer, data: [] }
        ])
        return
      }

      // If no training response found, use API
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: 'user',
            parts: [
              {
                text: `Bạn là một chuyên gia tư vấn về vắc xin. Với dữ liệu vắc xin từ database của tôi: ${JSON.stringify({ vaccination })}. Người dùng sẽ hỏi về các vấn đề liên quan đến vắc xin như: "Tôi muốn tiêm vắc xin tả thì cần lưu ý gì?", "Vắc xin tả có tác dụng phụ không?", "Giá vắc xin tả là bao nhiêu?". Bạn sẽ tư vấn họ một cách chuyên nghiệp và thân thiện, đồng thời cung cấp đường link chi tiết về vắc xin đó và hình ảnh của vắc xin nếu có. Đường link sẽ là: http://localhost:4000/vaccination/{id} (với id là id của vắc xin). Nếu câu hỏi không liên quan đến vắc xin, bạn sẽ lịch sự từ chối trả lời. Bạn hiểu chứ?`
              }
            ]
          },
          {
            role: 'model',
            parts: [
              {
                text: 'Tôi hiểu rõ yêu cầu của bạn. Tôi sẽ đóng vai một chuyên gia tư vấn vắc xin, sử dụng dữ liệu từ database để đưa ra lời khuyên và cung cấp đường link chi tiết về vắc xin phù hợp. Khi người dùng hỏi các câu hỏi không liên quan đến vắc xin, tôi sẽ lịch sự từ chối. Và quan trọng nhất, tất cả các phản hồi của tôi sẽ ở định dạng JSON.\n\nCấu trúc JSON tôi sẽ sử dụng:\n\n```json\n{\n  "message": "Nội dung tư vấn/phản hồi",\n  "data": [\n    {\n      "url": "http://localhost:4000/vaccination/{id1}",\n      "image": "URL hình ảnh vắc xin"\n    },\n    {\n      "url": "http://localhost:4000/vaccination/{id2}",\n      "image": "URL hình ảnh vắc xin"\n    }\n  ]\n}\n```'
              }
            ]
          }
        ]
      })

      const result = await chatSession.sendMessage(userMessage)
      const responseText = result.response.text()

      // Clean the response to remove unwanted characters and the closing ```
      const cleanedResponseText = responseText
        .replace(/.*?```json/, '') // Remove everything before the JSON
        .replace(/```.*$/, '') // Remove the closing ```
        .replace(/```/g, '') // Remove any remaining ```
        .trim() // Trim whitespace

      // Check if the response is JSON
      let botReply
      try {
        botReply = JSON.parse(cleanedResponseText)
      } catch (e) {
        botReply = { message: cleanedResponseText, data: [] }
      }

      // Update message with data from response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: '', data: botReply.data }
      ])

      await typeMessage(botReply.message)

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: botReply.message, data: botReply.data }
      ])
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: 'Đã xảy ra lỗi. Vui lòng thử lại sau.', data: [] }
      ])
    } finally {
      setIsLoading(false)
      setDisplayText('')
      setIsRendering(false)
    }
  }

  // Send message and get response from Gemini
  const handleSendMessage = () => {
    if (!input.trim()) return
    if (isRendering) {
      setIsRendering(false)
      return
    }
    fetchAIResponse(input)
    setInput('')
  }

  // Add the provided JSON response to the messages
  const addProvidedResponse = () => {
    const providedResponse = {
      message: 'Bạn cần giúp gì?',
      data: []
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 2, sender: 'bot', text: providedResponse.message, data: providedResponse.data }
    ])
  }

  // Call this function to add the provided response
  useEffect(() => {
    if (isOpen) {
      addProvidedResponse()
    }
  }, [isOpen]) // Chỉ gọi khi isOpen thay đổi

  // Scroll to bottom when new message is added
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
              <h2 className='text-center text-sm font-medium text-gray-900 dark:text-white'>Trợ lý ảo - Vaxbot ✨</h2>
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

                        {/* Display Vaccination Image */}
                        {message.sender === 'bot' && message.data && message.data.length > 0 && (
                          <div className='mt-3 space-y-2'>
                            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                              Thông tin vắc xin:
                            </h3>
                            {message.data.map((item) => (
                              <a
                                key={item.url + generateUUID()}
                                href={item.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='block rounded-md border p-2 text-sm transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
                              >
                                <div className='flex items-center gap-2'>
                                  {item.image && (
                                    <img src={item.image} alt='Vaccination' className='w-8 h-8 object-cover rounded' />
                                  )}
                                  <strong>Xem chi tiết vắc xin</strong>
                                </div>
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

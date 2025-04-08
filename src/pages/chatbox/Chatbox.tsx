import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, X, CircleStop, Sun, Moon } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { history } from '@/pages/chatbox/training'
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
  timestamp: string
}

interface UserPreferences {
  theme: 'light' | 'dark'
}

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'Chào bạn! Tôi là trợ lý ảo của trung tâm tiêm chủng VAXBOT. Nếu có câu hỏi liên quan tới tiêm chùng thì đừng ngại mà đặt câu hỏi cho tôi!  ',
      data: [],
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: 'light'
  })

  const toggleTheme = () => {
    setUserPreferences((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }))
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
        { id: Date.now(), sender: 'user', text: userMessage, timestamp: new Date().toLocaleTimeString() },
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Đợi tôi chút...',
          data: [],
          timestamp: new Date().toLocaleTimeString()
        }
      ])

      const vaccineKeywords = ['vắc-xin', 'vaccine', 'tiêm chủng', 'phòng bệnh', 'miễn dịch']
      const isVaccineRelated = vaccineKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))

      const prompt = isVaccineRelated
        ? `${userMessage} (Trả lời ngắn gọn, đúng trọng tâm, phân cấp bằng danh sách dấu đầu dòng nếu có nhiều ý, dùng **in đậm** cho tiêu đề)`
        : 'Tôi chỉ trả lời các câu hỏi liên quan đến vắc-xin và tiêm chủng. Vui lòng đặt câu hỏi phù hợp!'

      const chatSession = model.startChat({
        generationConfig,
        history: [
          ...history, // Sử dụng history từ file training.ts
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })

      const result = await chatSession.sendMessage(userMessage)
      const responseText = result.response.text()

      let botReply
      try {
        botReply = JSON.parse(responseText)
      } catch (e) {
        botReply = { messages: responseText, data: [] }
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: '', data: botReply.data, timestamp: new Date().toLocaleTimeString() }
      ])

      await typeMessage(botReply.messages)

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply.messages,
          data: botReply.data,
          timestamp: new Date().toLocaleTimeString()
        }
      ])
    } catch (error) {
      // Xóa console.error để tránh lỗi ESLint
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Có lỗi xảy ra. Vui lòng thử lại!',
          data: [],
          timestamp: new Date().toLocaleTimeString()
        }
      ])
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

  const renderMessageText = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, index) => {
      if (line.startsWith('-')) {
        return (
          <div key={index} className='flex items-start'>
            <span className='mr-2 text-blue-500'>•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        )
      } else if (line.startsWith('**')) {
        return (
          <div key={index} className='font-semibold text-gray-800 dark:text-gray-200 mt-2'>
            {line.replace(/\*\*/g, '').trim()}
          </div>
        )
      }
      return <div key={index}>{line}</div>
    })
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${userPreferences.theme}`}>
      <AnimatePresence mode='wait'>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`flex h-[550px] w-[450px] flex-col overflow-hidden rounded-2xl border shadow-2xl ${
              userPreferences.theme === 'light'
                ? 'bg-gradient-to-br from-white to-gray-100'
                : 'bg-gradient-to-br from-gray-800 to-gray-900'
            }`}
          >
            {/* Header */}
            <div className='relative border-b bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 p-4'>
              <h2 className='text-center text-xl font-bold text-white'>VaxBot - Trợ lý AI ✨</h2>
              <div className='absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='rounded-full p-1 hover:bg-white/20'
                  onClick={toggleTheme}
                >
                  {userPreferences.theme === 'light' ? (
                    <Moon className='h-5 w-5 text-white' />
                  ) : (
                    <Sun className='h-5 w-5 text-white' />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='rounded-full p-1 hover:bg-white/20'
                  onClick={() => setIsOpen(false)}
                >
                  <X className='h-5 w-5 text-white' />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className='flex-grow px-4 pt-4'>
              <div ref={scrollRef} className='flex flex-col space-y-4'>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className='flex items-end gap-2 max-w-[80%]'>
                      <Avatar className='h-8 w-8'>
                        {message.sender === 'user' ? (
                          <AvatarImage src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt='User' />
                        ) : (
                          <AvatarImage src='https://cdn-icons-png.flaticon.com/512/3048/3048122.png' alt='VaxBot' />
                        )}
                        <AvatarFallback>{message.sender === 'user' ? 'Bạn' : 'Bot'}</AvatarFallback>
                      </Avatar>

                      <div>
                        <motion.div
                          className={`rounded-lg px-4 py-2 text-sm shadow-sm ${
                            message.sender === 'user'
                              ? 'bg-blue-500 text-white'
                              : userPreferences.theme === 'light'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-gray-700 text-white'
                          }`}
                        >
                          {message.text === 'Đợi tôi chút...' ? (
                            <div className='flex items-center'>
                              Đang xử lý.....
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
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {index === messages.length - 1 && message.sender === 'bot' && displayText
                                ? renderMessageText(displayText)
                                : renderMessageText(message.text)}
                            </motion.div>
                          )}

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
                        <div
                          className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'} text-gray-500 dark:text-gray-400`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <motion.div className='border-t p-2 shadow-inner bg-white dark:bg-gray-800'>
              <div className='flex items-center space-x-2'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Nhập câu hỏi về vắc-xin...'
                  className={`flex-1 rounded-lg border border-gray-200 dark:border-gray-600 p-4 focus:ring-2 focus:ring-blue-500 ${
                    userPreferences.theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-700 text-white'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size='icon'
                  variant={isRendering ? 'destructive' : 'default'}
                  disabled={isLoading}
                  className='rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:bg-blue-600 w-12 h-12'
                >
                  {isRendering ? <CircleStop className='h-6 w-6' /> : isLoading ? '⏳' : <Send className='h-6 w-6' />}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <Button
              size='icon'
              className='rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white shadow-xl hover:bg-blue-600 w-14 h-14'
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className='h-6 w-6' />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

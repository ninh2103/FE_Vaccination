'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Send, X, CircleStop, Copy, Download, CheckCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trainingData } from './training'
import { useListVaccinationQuery } from '@/queries/useVaccination'

// Google Generative AI configuration
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

// Simple UUID generator function
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Check if question is too complex
const isComplexQuestion = (question: string) => {
  const complexKeywords = [
    'chi tiết kỹ thuật',
    'thông số chuyên sâu',
    'đặc tính phân tử',
    'cấu trúc hóa học',
    'phân tích chuyên sâu',
    'nghiên cứu khoa học',
    'báo cáo y tế',
    'chứng nhận quốc tế',
    'tiêu chuẩn ISO',
    'quy trình sản xuất',
    'phân tích thành phần',
    'cơ chế tác động',
    'đặc tính sinh học',
    'tương tác phân tử',
    'hệ số an toàn'
  ]

  return complexKeywords.some((keyword) => question.toLowerCase().includes(keyword))
}

// Basic information about the center
const centerInfo = {
  location: 'Số 120 Hoàng Minh Thảo, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
  phone: '1900.1900 ',
  email: 'vaxbot@gmail.com ',
  workingHours: 'Thứ 2 - Thứ 66: 8:00 - 17:00, Chủ nhật: 8:00 - 12:00',
  website: 'https://vaxbot.vn'
}

// Find matching training data with improved matching
const findTrainingResponse = (question: string) => {
  const normalizedQuestion = question.toLowerCase().trim()

  // Check for basic information questions first
  if (
    normalizedQuestion.includes('ở đâu') ||
    normalizedQuestion.includes('địa chỉ') ||
    normalizedQuestion.includes('địa điểm') ||
    normalizedQuestion.includes('vị trí')
  ) {
    return {
      question: 'địa chỉ',
      answer: `Trung tâm tiêm chủng VAXBOT tọa lạc tại ${centerInfo.location}. Bạn có thể dễ dàng tìm thấy chúng tôi gần ngã tư đường Lê Lợi. Rất mong được đón tiếp bạn!`
    }
  }

  if (
    normalizedQuestion.includes('số điện thoại') ||
    normalizedQuestion.includes('liên hệ') ||
    normalizedQuestion.includes('hotline') ||
    normalizedQuestion.includes('gọi')
  ) {
    return {
      question: 'liên hệ',
      answer: `Bạn có thể liên hệ với trung tâm VAXBOT qua số điện thoại ${centerInfo.phone} hoặc email ${centerInfo.email}. Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn!`
    }
  }

  if (
    normalizedQuestion.includes('giờ làm việc') ||
    normalizedQuestion.includes('thời gian làm việc') ||
    normalizedQuestion.includes('mở cửa') ||
    normalizedQuestion.includes('đóng cửa')
  ) {
    return {
      question: 'giờ làm việc',
      answer: `Trung tâm VAXBOT mở cửa ${centerInfo.workingHours}. Bạn nên đặt lịch trước để được phục vụ tốt nhất nhé!`
    }
  }

  // Then check the training data
  return trainingData.find(
    (item) =>
      item.question.toLowerCase().includes(normalizedQuestion) ||
      normalizedQuestion.includes(item.question.toLowerCase())
  )
}

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
  vaccines?: Array<{
    id?: string
    name: string
    description?: string
    image?: string
    url?: string
  }>
  timestamp: string
}

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function EnhancedChatbot() {
  // Get vaccination data from database
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
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [typingSpeed] = useState(20) // ms per character

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const newToast = {
      id: Date.now(),
      message,
      type
    }
    setToasts((prev) => [...prev, newToast])

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id))
    }, 3000)
  }

  // Typing animation effect
  const typeMessage = async (text: string) => {
    let currentText = ''
    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setDisplayText(currentText)
      await new Promise((resolve) => setTimeout(resolve, typingSpeed))

      // Ensure the last message is always visible
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    return currentText
  }

  // Copy message to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Đã sao chép nội dung vào bộ nhớ tạm.')
    } catch (err) {
      showToast('Rất tiếc, không thể sao chép nội dung. Xin vui lòng thử lại sau.', 'error')
    }
  }

  // Download message as text file
  const downloadText = (text: string, filename = 'vaxbot-response.txt') => {
    try {
      const element = document.createElement('a')
      const file = new Blob([text], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = filename
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      showToast('Đã tải xuống nội dung thành công.')
    } catch (err) {
      showToast('Rất tiếc, không thể tải xuống nội dung. Xin vui lòng thử lại sau.', 'error')
    }
  }

  // Use more friendly tone instead of formal addressing
  const convertToFriendlyTone = (text: string): string => {
    if (!text) return text

    // Replace formal phrases with more friendly alternatives
    let friendlyText = text
      .replace(/\bKính chào quý khách\b/gi, 'Chào bạn')
      .replace(/\bQuý khách\b/gi, 'Bạn')
      .replace(/\bquý khách\b/gi, 'bạn')
      .replace(/\bChân thành cảm ơn quý khách\b/gi, 'Cảm ơn bạn nhiều')
      .replace(/\bChân thành cảm ơn\b/gi, 'Cảm ơn bạn')
      .replace(/\bRất tiếc\b/gi, 'Xin lỗi bạn')
      .replace(/\bTrân trọng\b/gi, 'Thân mến')
      .replace(/\bVui lòng\b/gi, 'Bạn vui lòng')
      .replace(/\bXin vui lòng\b/gi, 'Bạn vui lòng')

    // Check for various greeting patterns before adding a new greeting
    const hasGreeting = /^(Chào|Xin chào|Kính chào|Xin kính chào|Chào mừng|Hi|Hello|Xin chào bạn|Chào bạn)/i.test(
      friendlyText
    )

    if (!hasGreeting) {
      // Add greeting while preserving capitalization
      if (/^[A-Z]/.test(friendlyText)) {
        friendlyText = 'Chào bạn, ' + friendlyText
      } else {
        friendlyText = 'Chào bạn, ' + friendlyText
      }
    }

    return friendlyText
  }

  // Function to call the Gemini API and get a response
  const fetchAIResponse = async (userMessage: string) => {
    if (isLoading) return

    try {
      setIsLoading(true)
      setIsRendering(true)

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', text: userMessage, timestamp: new Date().toLocaleTimeString() }
      ])

      // Check if question is too complex
      if (isComplexQuestion(userMessage)) {
        const complexResponse =
          'Để đảm bảo thông tin được chính xác nhất, vui lòng liên hệ với đội ngũ y tế chuyên nghiệp của chúng tôi qua biểu tượng Messenger ở trên. Trung tâm VAXBOT luôn sẵn sàng phục vụ bạn. Cảm ơn bạn!'

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: 'Đang phản hồi...',
            timestamp: new Date().toLocaleTimeString()
          }
        ])

        await typeMessage(complexResponse)

        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: complexResponse,
            timestamp: new Date().toLocaleTimeString()
          }
        ])

        setIsLoading(false)
        setDisplayText('')
        setIsRendering(false)
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Đang phản hồi...',
          timestamp: new Date().toLocaleTimeString()
        }
      ])

      // Check training data first
      const trainingResponse = findTrainingResponse(userMessage)
      if (trainingResponse) {
        // Extract vaccine information if available in the response
        const vaccineInfo = extractVaccineInfo(trainingResponse.answer)

        // Use friendly tone
        const friendlyResponse = convertToFriendlyTone(trainingResponse.answer)

        await typeMessage(friendlyResponse)

        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: friendlyResponse,
            vaccines: vaccineInfo.length > 0 ? vaccineInfo : undefined,
            timestamp: new Date().toLocaleTimeString()
          }
        ])
        setIsLoading(false)
        setDisplayText('')
        setIsRendering(false)
        return
      }

      // If no training response found, use API
      let chatSession
      try {
        chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: 'user',
              parts: [
                {
                  text: `Bạn là trợ lý AI của trung tâm tiêm chủng VAXBOT. Hãy luôn giữ phong cách thân thiện và gần gũi. KHÔNG BAO GIỜ đề cập đến việc bạn là "một mô hình AI" hay "một trợ lý ảo" hay bất kỳ tuyên bố nào tương tự. Hãy luôn trả lời như một đại diện chính thức của trung tâm VAXBOT. Với dữ liệu vắc xin từ database của tôi: ${JSON.stringify(
                    { vaccination }
                  )}. 
                
                Thông tin về trung tâm:
                - Địa chỉ: ${centerInfo.location}
                - Số điện thoại: ${centerInfo.phone}
                - Email: ${centerInfo.email}
                - Giờ làm việc: ${centerInfo.workingHours}
                - Website: ${centerInfo.website}
                
                Người dùng sẽ hỏi về các vấn đề liên quan đến vắc xin như: "Tôi muốn tiêm vắc xin tả thì cần lưu ý gì?", "Vắc xin tả có tác dụng phụ không?", "Giá vắc xin tả là bao nhiêu?". 
                
                Bạn sẽ tư vấn họ một cách thân thiện, ngắn gọn và đa dạng, đồng thời cung cấp đường link chi tiết về vắc xin đó và hình ảnh của vắc xin nếu có. Đường link sẽ là: http://localhost:4000/vaccination/{id} (với id là id của vắc xin). 
                
                Hãy xưng hô thân thiện, sử dụng "bạn" thay vì "quý khách". Nếu câu hỏi không liên quan đến vắc xin, bạn sẽ lịch sự từ chối trả lời.`
                }
              ]
            },
            {
              role: 'model',
              parts: [
                {
                  text: 'Tôi hiểu rõ yêu cầu của bạn. Tôi sẽ đóng vai trợ lý AI thân thiện của trung tâm tiêm chủng VAXBOT, sử dụng dữ liệu từ database để đưa ra lời khuyên và cung cấp đường link chi tiết về vắc xin phù hợp. Khi người dùng hỏi các câu hỏi không liên quan đến vắc xin, tôi sẽ lịch sự từ chối. Và quan trọng nhất, tất cả các phản hồi của tôi sẽ ở định dạng JSON.\n\nCấu trúc JSON tôi sẽ sử dụng:\n\n```json\n{\n  "message": "Nội dung tư vấn/phản hồi",\n  "data": [\n    {\n      "url": "http://localhost:4000/vaccination/{id1}",\n      "image": "URL hình ảnh vắc xin",\n      "name": "Tên vắc xin",\n      "description": "Mô tả ngắn về vắc xin"\n    },\n    {\n      "url": "http://localhost:4000/vaccination/{id2}",\n      "image": "URL hình ảnh vắc xin",\n      "name": "Tên vắc xin",\n      "description": "Mô tả ngắn về vắc xin"\n    }\n  ]\n}\n```'
                }
              ]
            }
          ]
        })

        const result = await chatSession.sendMessage(userMessage)
        const responseText = result.response.text()

        // Clean the response to remove unwanted characters and the closing \`\`\`
        const cleanedResponseText = responseText
          .replace(/.*?```json/, '') // Remove everything before the JSON
          .replace(/```.*$/, '') // Remove the closing \`\`\`
          .replace(/```/g, '') // Remove any remaining \`\`\`
          .trim() // Trim whitespace

        // Check if the response is JSON
        let botReply
        try {
          botReply = JSON.parse(cleanedResponseText)
        } catch (e) {
          botReply = { message: cleanedResponseText, data: [] }
        }

        // Use friendly tone
        const friendlyResponse = convertToFriendlyTone(botReply.message)

        // Update message with data from response
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: '',
            vaccines: botReply.data?.map((item: any) => ({
              id: item.id || extractIdFromUrl(item.url),
              name: item.name || 'Vắc xin',
              description: item.description || '',
              image: item.image || '/placeholder.svg?height=100&width=100',
              url: item.url || '#'
            })),
            timestamp: new Date().toLocaleTimeString()
          }
        ])

        await typeMessage(friendlyResponse)

        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: friendlyResponse,
            vaccines: botReply.data?.map((item: any) => ({
              id: item.id || extractIdFromUrl(item.url),
              name: item.name || 'Vắc xin',
              description: item.description || '',
              image: item.image || '/placeholder.svg?height=100&width=100',
              url: item.url || '#'
            })),
            timestamp: new Date().toLocaleTimeString()
          }
        ])
      } catch (error) {
        showToast(
          'Xin lỗi bạn, đã xảy ra lỗi trong quá trình xử lý. Đội ngũ kỹ thuật của trung tâm VAXBOT đang khắc phục. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua số điện thoại ' +
            centerInfo.phone +
            '.',
          'error'
        )
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            id: Date.now() + 1,
            sender: 'bot',
            text:
              'Xin lỗi bạn, đã xảy ra lỗi trong quá trình xử lý. Đội ngũ kỹ thuật của trung tâm VAXBOT đang khắc phục. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua số điện thoại ' +
              centerInfo.phone +
              '.',
            timestamp: new Date().toLocaleTimeString()
          }
        ])
      } finally {
        setIsLoading(false)
        setDisplayText('')
        setIsRendering(false)
      }
    } catch (error) {
      showToast(
        'Xin lỗi bạn, đã xảy ra lỗi trong quá trình xử lý. Đội ngũ kỹ thuật của trung tâm VAXBOT đang khắc phục. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua số điện thoại ' +
          centerInfo.phone +
          '.',
        'error'
      )
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: Date.now() + 1,
          sender: 'bot',
          text:
            'Xin lỗi bạn, đã xảy ra lỗi trong quá trình xử lý. Đội ngũ kỹ thuật của trung tâm VAXBOT đang khắc phục. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua số điện thoại ' +
            centerInfo.phone +
            '.',
          timestamp: new Date().toLocaleTimeString()
        }
      ])
      setIsLoading(false)
      setDisplayText('')
      setIsRendering(false)
    }
  }

  // Extract ID from URL
  const extractIdFromUrl = (url: string): string => {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }

  // Extract vaccine information from text
  const extractVaccineInfo = (text: string): any[] => {
    const vaccines = []

    // Look for vaccine names in the text (simple pattern matching)
    const vaccinePatterns = [
      { pattern: /vắc[\s-]*xin[\s]+viêm[\s]+gan[\s]+B/i, name: 'Vắc xin viêm gan B', id: 'vgb001' },
      { pattern: /vắc[\s-]*xin[\s]+BCG/i, name: 'Vắc xin BCG', id: 'bcg001' },
      { pattern: /vắc[\s-]*xin[\s]+5[\s]+trong[\s]+1/i, name: 'Vắc xin 5 trong 1', id: 'penta001' },
      { pattern: /vắc[\s-]*xin[\s]+6[\s]+trong[\s]+1/i, name: 'Vắc xin 6 trong 1', id: 'hexa001' },
      { pattern: /vắc[\s-]*xin[\s]+sởi/i, name: 'Vắc xin sởi', id: 'measles001' },
      { pattern: /vắc[\s-]*xin[\s]+thủy[\s]+đậu/i, name: 'Vắc xin thủy đậu', id: 'varicella001' },
      { pattern: /vắc[\s-]*xin[\s]+cúm/i, name: 'Vắc xin cúm', id: 'flu001' },
      { pattern: /vắc[\s-]*xin[\s]+HPV/i, name: 'Vắc xin HPV', id: 'hpv001' },
      { pattern: /vắc[\s-]*xin[\s]+phế[\s]+cầu/i, name: 'Vắc xin phế cầu', id: 'pneumo001' },
      { pattern: /vắc[\s-]*xin[\s]+viêm[\s]+não[\s]+Nhật[\s]+Bản/i, name: 'Vắc xin viêm não Nhật Bản', id: 'je001' }
    ]

    for (const { pattern, name, id } of vaccinePatterns) {
      if (pattern.test(text)) {
        vaccines.push({
          id,
          name,
          description: `Thông tin chi tiết về ${name}`,
          image: `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(name)}`,
          url: `http://localhost:4000/vaccination/${id}`
        })
      }
    }

    return vaccines
  }

  // Handle sending message
  const handleSendMessage = () => {
    if (!input.trim()) return
    if (isRendering) {
      setIsRendering(false)
      return
    }
    fetchAIResponse(input)
    setInput('')
  }

  // Add the initial welcome message
  const addWelcomeMessage = () => {
    const welcomeMessage = {
      id: Date.now(),
      sender: 'bot' as const,
      text: 'Chào bạn! Mình là trợ lý của trung tâm tiêm chủng VAXBOT. Rất vui được hỗ trợ bạn. Bạn cần tư vấn về vắc xin nào?',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([welcomeMessage])
  }

  // Call this function to add the welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage()
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when new message is added
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, displayText])

  // Render message text with formatting
  const renderMessageText = (text: string) => {
    if (text === 'Đang phản hồi...') {
      return (
        <div className='flex items-center'>
          Đang phản hồi
          <motion.span
            className='ml-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', delay: 0.5 }}
          >
            .
          </motion.span>
          <motion.span
            className='ml-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', delay: 1 }}
          >
            .
          </motion.span>
          <motion.span
            className='ml-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', delay: 1.5 }}
          >
            .
          </motion.span>
        </div>
      )
    }

    const lines = text.split('\n')
    return lines.map((line, index) => {
      // Handle main headings (##)
      if (line.startsWith('##') && !line.startsWith('###')) {
        return (
          <h2 key={index} className='text-lg font-bold mt-3 mb-2 text-green-600'>
            {line.replace(/^##\s*/, '')}
          </h2>
        )
      }
      // Handle sub headings (###)
      else if (line.startsWith('###')) {
        return (
          <h3 key={index} className='text-md font-bold mt-2 mb-1 text-green-600'>
            {line.replace(/^###\s*/, '')}
          </h3>
        )
      }
      // Handle bullet points
      else if (line.startsWith('-')) {
        return (
          <div key={index} className='flex items-start ml-2 my-1'>
            <span className='mr-2 text-green-500'>•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        )
      }
      // Handle numbered lists
      else if (/^\d+\.\s/.test(line)) {
        const number = line.match(/^\d+/)?.[0]
        const content = line.replace(/^\d+\.\s/, '')
        return (
          <div key={index} className='flex items-start ml-2 my-1'>
            <span className='mr-2 font-medium text-green-500 min-w-[20px]'>{number}.</span>
            <span>{content}</span>
          </div>
        )
      }
      // Handle bold text
      else if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <div key={index} className='my-1'>
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <span key={i} className='font-bold text-gray-800'>
                    {part.replace(/\*\*/g, '')}
                  </span>
                )
              }
              return <span key={i}>{part}</span>
            })}
          </div>
        )
      }
      // Handle empty lines as paragraph breaks
      else if (line.trim() === '') {
        return <div key={index} className='h-2'></div>
      }
      // Default paragraph
      return (
        <div key={index} className='my-1'>
          {line}
        </div>
      )
    })
  }

  return (
    <>
      {/* Toast notifications */}
      <div className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`flex items-center p-3 rounded-lg shadow-lg ${
                toast.type === 'success' ? 'bg-white border border-green-500' : 'bg-white border border-red-500'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
              ) : (
                <X className='h-5 w-5 text-red-500 mr-2' />
              )}
              <p className='text-sm font-medium'>{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className='fixed bottom-6 right-6 z-40'>
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className='flex h-[550px] w-[450px] flex-col overflow-hidden rounded-2xl border shadow-2xl bg-gradient-to-br from-white to-gray-100'
            >
              <div className='relative border-b bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 p-4'>
                <h2 className='text-center text-xl font-bold text-white'>Trung tâm tiêm chủng VAXBOT</h2>
                <div className='absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className='rounded-full p-1 hover:bg-white/20'
                    onClick={() => setIsOpen(false)}
                  >
                    <X className='h-5 w-5 text-white' />
                  </motion.button>
                </div>
              </div>

              <ScrollArea className='flex-grow px-4 pt-4'>
                <div className='flex flex-col space-y-4'>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className={cn('flex gap-2 max-w-[80%]', message.sender === 'user' && 'ml-auto')}
                    >
                      {message.sender === 'bot' && (
                        <div className='h-8 w-8 rounded-full bg-primary flex-shrink-0'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src='https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740'
                              alt='VaxBot'
                            />
                            <AvatarFallback>Bot</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium'>
                            {message.sender === 'bot' ? 'Trợ lý VAXBOT' : 'Bạn'}
                          </span>
                          <span className='text-sm text-muted-foreground'>{message.timestamp}</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100'
                          }`}
                        >
                          <div className='text-sm whitespace-pre-wrap'>
                            {index === messages.length - 1 && message.sender === 'bot' && displayText
                              ? renderMessageText(displayText)
                              : renderMessageText(message.text)}
                          </div>

                          {message.sender === 'bot' && message.vaccines && message.vaccines.length > 0 && (
                            <div className='mt-3 space-y-3'>
                              <h3 className='text-sm font-semibold text-gray-700'>Thông tin vắc xin:</h3>
                              {message.vaccines.map((vaccine) => (
                                <a
                                  key={vaccine.id || generateUUID()}
                                  href={vaccine.url}
                                  target='_blank'
                                  className='block rounded-md border p-3 text-sm transition hover:bg-gray-100'
                                  rel='noreferrer'
                                >
                                  <div className='flex flex-col gap-2'>
                                    <div className='flex items-center gap-3'>
                                      {vaccine.image && (
                                        <img
                                          src={vaccine.image || '/placeholder.svg'}
                                          alt={vaccine.name}
                                          className='w-16 h-16 object-cover rounded'
                                        />
                                      )}
                                      <div className='flex-1'>
                                        <div className='font-bold text-base'>{vaccine.name}</div>
                                        {vaccine.description && (
                                          <div className='text-xs text-gray-600 mt-1'>{vaccine.description}</div>
                                        )}
                                      </div>
                                      <ExternalLink className='h-4 w-4 ml-auto flex-shrink-0' />
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.sender === 'bot' && message.text !== 'Đang phản hồi...' && (
                          <div className='flex items-center gap-2'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() => copyToClipboard(message.text)}
                              title='Sao chép'
                            >
                              <Copy className='h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8'
                              onClick={() => downloadText(message.text)}
                              title='Tải xuống'
                            >
                              <Download className='h-4 w-4' />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <motion.div className='border-t p-2 shadow-inner bg-white'>
                <div className='flex items-center space-x-2'>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Nhập câu hỏi của bạn về vắc xin...'
                    className='flex-1 min-h-[44px] max-h-32 bg-gray-50 text-gray-800'
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size='icon'
                    variant={isRendering ? 'destructive' : 'default'}
                    disabled={!input.trim() || isLoading}
                    className='rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 hover:bg-green-600 w-12 h-12'
                  >
                    {isRendering ? <CircleStop className='h-6 w-6' /> : isLoading ? '⏳' : <Send className='h-6 w-6' />}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className='relative group'
            >
              <Button
                size='icon'
                className='rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 text-white shadow-xl hover:bg-green-600 w-14 h-14'
                onClick={() => setIsOpen(true)}
              >
                <MessageSquare className='h-8 w-8' />
              </Button>
              <div className='absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200'>
                <div className='relative bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-md border border-white/20 w-48 text-center'>
                  Chat nhanh với AI
                  <div className='absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-emerald-500'></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
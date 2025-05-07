import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PhoneIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/solid'
import { useState, useRef, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    time: '',
    message: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLISH_KEY
      )
      .then(() => {
        toast.success(`Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ liên lạc với bạn sớm nhất có thể.`)
        setFormData({
          name: '',
          email: '',
          time: '',
          message: ''
        })
      })
      .catch((error) => {
        toast.error('Gửi yêu cầu không thành công. Vui lòng thử lại.')
        throw error
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className='px-8 py-16'>
      <div className='container mx-auto mb-20 text-center'>
        <h1 className='text-3xl font-bold dark:text-white'>Liên hệ với chúng tôi</h1>
        <p className='mx-auto mt-4 w-full dark:text-white lg:w-5/12'>
          Đặt lịch khám và tiêm chủng hôm nay. Điền vào biểu mẫu bên dưới, và đội ngũ của chúng tôi sẽ liên lạc với bạn
          với chi tiết.
        </p>
      </div>
      <div>
        <Card className='container mx-auto border border-gray-200'>
          <CardContent className='grid grid-cols-1 md:gap-10 p-6 lg:grid-cols-7'>
            <div className='col-span-3 rounded-lg bg-gray-900 py-8 px-5 text-white md:px-16'>
              <h2 className='text-xl font-semibold'>Thông tin liên hệ</h2>
              <p className='mt-2 text-gray-400'>
                Đội ngũ y tế của chúng tôi sẵn sàng giúp đỡ bạn. Đặt lịch khám và tiêm chủng ngay hôm nay.
              </p>
              <div className='mt-4 flex items-center gap-4'>
                <PhoneIcon className='h-6 w-6' />
                <span>+84 909 090 909</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <EnvelopeIcon className='h-6 w-6' />
                <span>vaxbox@gmail.com</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <CalendarIcon className='h-6 w-6' />
                <span>Lịch khám và tiêm chủng</span>
              </div>
            </div>
            <div className='col-span-4 mt-8 md:mt-0 md:px-10'>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className='grid gap-4'>
                  <div>
                    <Label>Họ và tên</Label>
                    <Input
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Ví dụ: John Doe'
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Ví dụ: john.doe@mail.com'
                      type='email'
                      required
                    />
                  </div>
                  <div>
                    <Label>Ngày</Label>
                    <Input name='time' value={formData.time} onChange={handleChange} type='date' required />
                  </div>
                  <div>
                    <Label>Lời nhắn</Label>
                    <Textarea
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      placeholder='Ví dụ: Tôi muốn tiêm Pfizer. Vui lòng liên hệ tôi vào buổi chiều.'
                      required
                    />
                  </div>
                </div>
                <div className='mt-6 flex justify-end'>
                  <Button type='submit' className='w-full md:w-auto'>
                    Gửi
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PhoneIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { ContactBody, ContactBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<ContactBodyType>({
    resolver: zodResolver(ContactBody),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const handleSubmit = () => {
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
        form.reset()
      })
      .catch((error) => {
        toast.error('Gửi yêu cầu không thành công. Vui lòng thử lại.')
        throw error
      })
  }

  return (
    <section className='px-8 py-8'>
      <div className='container mx-auto mb-10 text-center'>
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
                <span>1900.1900</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <EnvelopeIcon className='h-6 w-6' />
                <span>vaxbot@gmail.com</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <CalendarIcon className='h-6 w-6' />
                <span>Lịch khám và tiêm chủng</span>
              </div>
            </div>
            <div className='col-span-4 mt-8 md:mt-0 md:px-10'>
              <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='grid gap-4'>
                  <div>
                    <Label>
                      Họ và tên <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      {...form.register('name')}
                      placeholder='Ví dụ: Vaxbot'
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-600 ${
                        form.formState.errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {form.formState.errors.name && (
                      <p className='text-red-500 text-sm'>{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email (tùy chọn)</Label>
                    <Input
                      {...form.register('email')}
                      placeholder='Ví dụ: vaxbot@gmail.com'
                      type='email'
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-600 ${
                        form.formState.errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {form.formState.errors.email && (
                      <p className='text-red-500 text-sm'>{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>
                      Số điện thoại <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      {...form.register('phone')}
                      placeholder='Ví dụ: 0909090909'
                      type='number'
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '')
                      }}
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-600 ${
                        form.formState.errors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {form.formState.errors.phone && (
                      <p className='text-red-500 text-sm'>{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>
                      Lời nhắn <span className='text-red-500'>*</span>
                    </Label>
                    <Textarea
                      {...form.register('message')}
                      placeholder='Ví dụ: Tôi muốn tiêm Pfizer. Vui lòng liên hệ tôi vào buổi chiều.'
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-600 ${
                        form.formState.errors.message ? 'border-red-500' : ''
                      }`}
                    />
                    {form.formState.errors.message && (
                      <p className='text-red-500 text-sm'>{form.formState.errors.message.message}</p>
                    )}
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
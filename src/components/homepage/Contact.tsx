import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PhoneIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/solid'

export default function ContactSection() {
  return (
    <section className='px-8 py-16'>
      <div className='container mx-auto mb-20 text-center'>
        <h1 className='text-3xl font-bold dark:text-white'>Đặt Lịch Tiêm Chủng</h1>
        <p className='mx-auto mt-4 w-full dark:text-white lg:w-5/12'>
          Đặt lịch tiêm chủng ngay hôm nay. Điền vào biểu mẫu bên dưới, và đội ngũ của chúng tôi sẽ liên hệ với bạn để
          cung cấp thông tin chi tiết.
        </p>
      </div>
      <div>
        <Card className='container mx-auto border border-gray-200'>
          <CardContent className='grid grid-cols-1 md:gap-10 p-6 lg:grid-cols-7'>
            <div className='col-span-3 rounded-lg bg-gray-900 py-8 px-5 text-white md:px-16'>
              <h2 className='text-xl font-semibold'>Thông Tin Liên Hệ</h2>
              <p className='mt-2 text-gray-400'>
                Đội ngũ chăm sóc sức khỏe của chúng tôi sẵn sàng hỗ trợ bạn. Đặt lịch tiêm chủng ngay bây giờ.
              </p>
              <div className='mt-4 flex items-center gap-4'>
                <PhoneIcon className='h-6 w-6' />
                <span>+1(424) 535 3523</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <EnvelopeIcon className='h-6 w-6' />
                <span>support@vaccinecenter.com</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <CalendarIcon className='h-6 w-6' />
                <span>Lên lịch cuộc hẹn</span>
              </div>
            </div>
            <div className='col-span-4 mt-8 md:mt-0 md:px-10'>
              <form>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <div>
                    <Label>Họ</Label>
                    <Input placeholder='Ví dụ: John' />
                  </div>
                  <div>
                    <Label>Tên</Label>
                    <Input placeholder='Ví dụ: Doe' />
                  </div>
                </div>
                <div className='mt-4'>
                  <Label>Email</Label>
                  <Input placeholder='Ví dụ: john.doe@mail.com' />
                </div>
                <div className='mt-4'>
                  <Label>Số điện thoại</Label>
                  <Input placeholder='Ví dụ: 0901234567' />
                </div>
                <div className='mt-4'>
                  <Label>Loại Vắc-xin</Label>
                  <Input placeholder='Ví dụ: COVID-19, Cúm, Viêm gan B' />
                </div>
                <div className='mt-6'>
                  <Label>Ghi Chú Thêm</Label>
                  <Textarea placeholder='Mối lo ngại về sức khỏe hoặc yêu cầu đặc biệt...' />
                </div>
                <div className='mt-6 flex justify-end'>
                  <Button className='w-full md:w-auto'>Đặt Lịch</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

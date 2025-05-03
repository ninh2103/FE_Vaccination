import { ShieldCheckIcon, SyringeIcon, HeartPulseIcon } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/core/lib/utils'
import { FingerprintIcon } from 'lucide-react'

const featuresData = [
  {
    color: 'bg-blue-500',
    title: 'An toàn & Hiệu quả',
    icon: ShieldCheckIcon,
    description:
      '  Tất cả vắc-xin đều phải trải qua quá trình thử nghiệm nghiêm ngặt để đảm bảo chúng an toàn và hiệu quả khi sử dụng cho công chúng.'
  },
  {
    color: 'bg-green-500',
    title: 'Miễn phí cho mọi người',
    icon: SyringeIcon,
    description: 'Vắc-xin được cung cấp miễn phí ở nhiều quốc gia để đảm bảo mọi người đều được bảo vệ.'
  },
  {
    color: 'bg-red-500',
    title: 'Bảo vệ cộng đồng ',
    icon: HeartPulseIcon,
    description: 'Tiêm vắc-xin giúp xây dựng khả năng miễn dịch cộng đồng, bảo vệ những người không thể tiêm vắc-xin.'
  }
]

export default function Feature() {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {featuresData.map(({ color, title, icon: Icon, description }) => (
          <Card key={title} className='p-6'>
            <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', color)}>
              <Icon className='w-6 h-6 text-white' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
            <p className='mt-2 text-sm text-gray-500'>{description}</p>
          </Card>
        ))}
      </div>
      <div className='mt-32 flex flex-wrap items-center'>
        <div className='mx-auto -mt-8 w-full px-4 md:w-5/12'>
          <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 p-2 text-center shadow-lg'>
            <FingerprintIcon className='h-8 w-8 text-white' />
          </div>
          <h3 className='mb-3 text-2xl font-bold text-gray-900'>Bảo vệ một người, là bảo vệ cả thế giới</h3>
          <p className='mb-8 text-gray-500'>
            Vắc-xin bảo vệ bạn và những người thân yêu của bạn khỏi các bệnh nghiêm trọng. Hãy luôn an toàn và góp phần
            vào một tương lai khỏe mạnh hơn. Hãy tiêm vắc-xin ngay hôm nay!
          </p>
        </div>
        <div className='mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0'>
          <Card className='shadow-lg border rounded-lg'>
            <CardHeader className='relative h-56 overflow-hidden'>
              <img
                alt='Vaccination'
                src='https://images.unsplash.com/photo-1612277795421-9bc7706a4a34'
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardContent>
              <p className='text-sm dark:text-white'>Vì sức khỏe cộng đồng</p>
              <h5 className='mb-3 mt-2 text-lg font-bold dark:text-white'>
                Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi
              </h5>
              <p className='text-gray-500'>
                Tiêm chủng là biện pháp hiệu quả nhất để phòng ngừa các bệnh truyền nhiễm. Hãy chủ động tiêm vắc-xin để
                bảo vệ bản thân, gia đình và cùng nhau xây dựng một cộng đồng khỏe mạnh hơn.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

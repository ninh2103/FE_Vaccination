import { ShieldCheckIcon, SyringeIcon, HeartPulseIcon } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/core/lib/utils'
import { FingerprintIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'

export const featuresData = [
  {
    color: 'bg-blue-500',
    title: 'An Toàn & Hiệu Quả',
    icon: ShieldCheckIcon,
    description:
      'Tất cả vắc-xin đều trải qua quá trình kiểm tra nghiêm ngặt để đảm bảo an toàn và hiệu quả khi sử dụng cho cộng đồng.'
  },
  {
    color: 'bg-green-500',
    title: 'Miễn Phí Cho Mọi Người',
    icon: SyringeIcon,
    description:
      'Vắc-xin được cung cấp miễn phí tại nhiều quốc gia để đảm bảo mọi người đều có thể tiếp cận với biện pháp bảo vệ này.'
  },
  {
    color: 'bg-red-500',
    title: 'Bảo Vệ Cộng Đồng',
    icon: HeartPulseIcon,
    description: 'Tiêm vắc-xin giúp xây dựng miễn dịch cộng đồng, bảo vệ những người không thể tiêm vắc-xin.'
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
          <h3 className='mb-3 text-2xl font-bold text-gray-900'>Giới Thiệu</h3>
          <p className='mb-8 text-gray-500'>
            Trung tâm Tiêm chủng VAX-BOX áp dụng quy trình tiêm chủng chuẩn hóa, tuân thủ nghiêm ngặt các quy định y tế,
            và là lựa chọn phù hợp cho mọi đối tượng. Người dân sẽ được thực hiện đầy đủ các bước quan trọng trong quy
            trình tiêm chủng.
          </p>
          <Link to={path.introduce}>
            <Button>Tìm Hiểu Thêm</Button>
          </Link>
        </div>
        <div className='mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0'>
          <Card className='shadow-lg border rounded-lg'>
            <CardHeader className='relative h-56 overflow-hidden'>
              <img
                alt='Tiêm Chủng'
                src='https://images.unsplash.com/photo-1612277795421-9bc7706a4a34'
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardContent>
              <p className='text-sm dark:text-white'>Y Tế Công Cộng</p>
              <h5 className='mb-3 mt-2 text-lg font-bold dark:text-white'>Sức Khỏe Của Bạn, Ưu Tiên Của Chúng Tôi</h5>
              <p className='text-gray-500'>
                Tiêm chủng là cách tốt nhất để phòng ngừa các bệnh có thể phòng tránh được. Hãy có trách nhiệm, tiêm
                vắc-xin và góp phần xây dựng một thế giới khỏe mạnh hơn.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

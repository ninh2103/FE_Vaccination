import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'

const VACCINATION_INFO = [
  {
    img: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    title: 'Vắc-Xin COVID-19',
    desc: 'Cung cấp sự bảo vệ chống lại COVID-19 và các biến thể của nó, giúp giảm sự lây lan của virus.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
    title: 'Vắc-Xin Cúm',
    desc: 'Tiêm vắc-xin hàng năm để bảo vệ chống lại virus cúm và giảm các biến chứng liên quan đến cúm.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152157-2b0e2ca79efa',
    title: 'Vắc-Xin Viêm gan B',
    desc: 'Được khuyến nghị cho trẻ em và người lớn có nguy cơ, giúp ngăn ngừa các nhiễm trùng gan nghiêm trọng do virus viêm gan B.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152275-fa582de8188e',
    title: 'Vắc-Xin MMR',
    desc: 'Bảo vệ chống lại bệnh sởi, quai bị và rubella, rất quan trọng trong các lịch tiêm chủng cho trẻ em.'
  },
  {
    img: 'https://images.unsplash.com/photo-1611694416641-519e808b2cbb',
    title: 'Vắc-Xin Bại liệt',
    desc: 'Ngăn ngừa bệnh bại liệt, một bệnh có thể gây nguy hiểm đến tính mạng và dẫn đến liệt tứ chi.'
  },
  {
    img: 'https://images.unsplash.com/photo-1633158829551-54d618c269bd',
    title: 'Vắc-Xin HPV',
    desc: 'Bảo vệ chống lại virus papillomavirus ở người, giảm nguy cơ ung thư cổ tử cung và các loại ung thư khác.'
  }
]

export function Vaccines() {
  return (
    <section className='py-28 px-8'>
      <div className='container mx-auto mb-10 text-center'>
        <h2 className='text-3xl font-bold dark:text-white'>Thông tin về tiêm chủng</h2>
        <p className='mx-auto w-full px-4 dark:text-white lg:w-6/12'>
          Luôn được bảo vệ bằng các loại vắc-xin mới nhất hiện có. Sau đây là một số loại vắc-xin thiết yếu để đảm bảo
          sức khỏe và hạnh phúc của bạn.
        </p>
      </div>
      <div className='container mx-auto'>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className='w-full'
        >
          {VACCINATION_INFO.map((vaccine, index) => (
            <SwiperSlide key={index} className='p-4'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
                <Card className='shadow-none w-full'>
                  <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
                    <img src={vaccine.img} alt={vaccine.title} className='h-full w-full object-cover' />
                  </CardHeader>
                  <CardContent className='p-0'>
                    <a href='#' className='text-gray-900 transition-colors hover:text-gray-800'>
                      <h5 className='mb-2 text-lg font-semibold dark:text-white'>{vaccine.title}</h5>
                    </a>
                    <p className='mb-6 text-sm text-gray-500 dark:text-white'>{vaccine.desc}</p>
                    <Link to={path.list}>
                      <Button variant='outline' className='dark:bg-white dark:text-black' size='sm'>
                        Xem Thêm
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Vaccines

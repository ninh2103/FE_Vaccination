import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useListVaccinationQuery } from '@/queries/useVaccination'
import { Skeleton } from '@/components/ui/skeleton'

export function Vaccines() {
  const { data: vaccinationList, isLoading } = useListVaccinationQuery({
    page: 1,
    items_per_page: 6
  })

  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <SwiperSlide key={`skeleton-${index}`} className='p-4'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center h-[400px]'>
            <Card className='shadow-none w-full h-full'>
              <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
                <Skeleton className='h-full w-full' />
              </CardHeader>
              <CardContent className='p-0'>
                <Skeleton className='h-6 w-3/4 mx-auto mb-2' />
                <Skeleton className='h-4 w-full mb-6' />
                <Skeleton className='h-9 w-24 mx-auto' />
              </CardContent>
            </Card>
          </div>
        </SwiperSlide>
      ))
  }

  return (
    <section className='py-28 px-8'>
      <div className='container mx-auto mb-10 text-center'>
        <h2 className='text-3xl font-bold dark:text-white'>Thông tin về tiêm chủng</h2>
        <p className='mx-auto w-full px-4 dark:text-white lg:w-6/12'>
          Bảo vệ sức khỏe của bạn với các vắc-xin mới nhất. Dưới đây là một số vắc-xin cần thiết để đảm bảo sức khỏe và
          tốt nhất.
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
          {isLoading
            ? renderSkeletons()
            : vaccinationList?.data.map((vaccine, index) => (
                <SwiperSlide key={index} className='p-4'>
                  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center h-[400px]'>
                    <Card className='shadow-none w-full h-full'>
                      <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
                        <img
                          src={
                            isLoading
                              ? 'https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
                              : vaccine.image ||
                                'https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
                          }
                          alt={vaccine.vaccineName}
                          className='h-full w-full object-cover'
                        />
                      </CardHeader>
                      <CardContent className='p-0'>
                        <a href='#' className='text-gray-900 transition-colors hover:text-gray-800'>
                          <h5 className='mb-2 text-lg font-semibold dark:text-white line-clamp-1'>
                            {vaccine.vaccineName}
                          </h5>
                        </a>
                        <p className='mb-6 text-sm text-gray-500 dark:text-white line-clamp-3'>{vaccine.description}</p>
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

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const VACCINATION_INFO = [
  {
    img: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    title: 'COVID-19 Vaccine',
    desc: 'Provides protection against COVID-19 and its variants, helping to reduce the spread of the virus.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
    title: 'Flu Vaccine',
    desc: 'Annual vaccination to protect against influenza viruses and reduce flu-related complications.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152157-2b0e2ca79efa',
    title: 'Hepatitis B Vaccine',
    desc: 'Recommended for infants and adults at risk, preventing serious liver infections caused by hepatitis B virus.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152275-fa582de8188e',
    title: 'MMR Vaccine',
    desc: 'Protects against measles, mumps, and rubella, essential for childhood immunization schedules.'
  },
  {
    img: 'https://images.unsplash.com/photo-1611694416641-519e808b2cbb',
    title: 'Polio Vaccine',
    desc: 'Prevents poliomyelitis, a potentially life-threatening disease that can cause paralysis.'
  },
  {
    img: 'https://images.unsplash.com/photo-1633158829551-54d618c269bd',
    title: 'HPV Vaccine',
    desc: 'Protects against human papillomavirus, reducing the risk of cervical and other cancers.'
  }
]

export function Vaccines() {
  return (
    <section className='py-28 px-8'>
      <div className='container mx-auto mb-10 text-center'>
        <h2 className='text-3xl font-bold dark:text-white'>Vaccination Information</h2>
        <p className='mx-auto w-full px-4 dark:text-white lg:w-6/12'>
          Stay protected with the latest vaccines available. Here are some essential vaccinations to ensure your health
          and well-being.
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
                    <Button variant='outline' className='dark:bg-white dark:text-black' size='sm'>
                      Learn more
                    </Button>
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

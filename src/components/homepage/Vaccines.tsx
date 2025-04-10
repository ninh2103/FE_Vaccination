import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'
import 'swiper/swiper-bundle.css'

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
    <section className='py-28 px-8 w-full relative'>
      <div className='container mx-auto'>
      <h2 className='   relative mb-10 text-center text-3xl font-bold dark:text-white'>Vaccination Information</h2>
          <p className='mx-auto w-full px-4 dark:text-white lg:w-6/12'>
            Stay protected with the latest vaccines available. Here are some essential vaccinations to ensure your health
            and well-being.
          </p>
        <div className='relative mb-10 text-center'>
          
          <div className='absolute top-0 right-0'>
            <Link to={path.list}>
              <Button variant='outline' size='sm'>
                Show All
              </Button>
            </Link>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          className='w-full'
        >
          {VACCINATION_INFO.map((vaccine, index) => (
            <SwiperSlide key={index} className='p-4'>
              <Link to={path.list} className='block'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center relative'>
                  <Card className='shadow-none w-full'>
                    <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
                      <img
                        src={vaccine.img}
                        alt={vaccine.title}
                        className='h-full w-full object-cover rounded-lg'
                      />
                    </CardHeader>
                    <CardContent className='p-0'>
                      <h5 className='mb-2 text-lg font-semibold dark:text-white'>{vaccine.title}</h5>
                      <p className='mb-6 text-sm text-gray-500 dark:text-white'>{vaccine.desc}</p>
                      <div className='absolute bottom-4 right-4'>
                        <span className='text-sm font-normal border border-orange-600 text-orange-600 px-2 py-1 rounded'>
                          See more
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Vaccines
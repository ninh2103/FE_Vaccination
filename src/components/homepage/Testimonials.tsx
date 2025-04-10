import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import 'swiper/swiper-bundle.css'

export const testimonials = [
  {
    id: 't01',
    name: 'Sarah J.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    comment:
      "Absolutely seamless experience! Booking was quick, and the car was in perfect condition. I'll definitely use this service again.",
    rating: 5
  },
  {
    id: 't02',
    name: 'Mark T.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    comment:
      'Great selection of vehicles and very affordable rates. The customer service team was incredibly helpful when .',
    rating: 5
  },
  {
    id: 't03',
    name: 'James L.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    comment:
      'The navigation tools were a lifesaver! They made it so easy to explore the city without getting lost. Highly recommended!',
    rating: 5
  },
  {
    id: 't04',
    name: 'Alex P.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    comment:
      'Fantastic service! The car was clean, well-maintained, and the pickup process was a breeze. I’ll be using this service for all my future trips.',
    rating: 5
  },
  {
    id: 't05',
    name: 'David S.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    comment:
      'Great value for money! The booking process was quick, and the customer support was responsive. Overall, a very positive experience.',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className='py-12 px-8 w-full relative'>
      <div className='container mx-auto'>
      <h2 className='text-3xl font-bold text-center'>What Our Customers Are Saying</h2>

        <div className='relative mb-8'>
          <div className='absolute top-0 right-0'>
            <Link to='/all-testimonials'>
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
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={true}
          modules={[Autoplay]}
          className='w-full'
        >
          {testimonials.map(({ id, name, comment, imageUrl, rating }) => (
            <SwiperSlide key={id} className='p-4'>
              <div className='bg-neutral-50 rounded-2xl p-8 min-h-[250px] flex flex-col justify-between h-full'>
                <div>
                  <div className='flex items-center' aria-label={`Rating: ${rating} out of 5`}>
                    {[...Array(rating)].map((_, index) => (
                      <Star key={index} className='size-[15px] text-yellow-500' />
                    ))}
                  </div>
                  <div className='pt-4 flex-grow'>
                    <blockquote className='text-[15px] leading-[26px] text-neutral-600'>"{comment}"</blockquote>
                  </div>
                </div>
                <div className='pt-8'>
                  <div className='flex items-center gap-2.5'>
                    <img src={imageUrl} alt={name} className='size-6 rounded-full object-cover' />
                    <p className='text-[14px] font-medium text-neutral-700'>{name}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

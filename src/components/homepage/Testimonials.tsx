import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Star } from 'lucide-react'

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
    <div className='mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl'>
      <h2 className='text-balance text-3xl font-bold xl:text-center'>What Our Customers Are Saying</h2>
      <div className='pt-6 lg:pt-8'>
        <div className='relative'>
          <Carousel>
            <CarouselContent className='m-0 space-x-4 lg:space-x-6'>
              {testimonials.map(({ id, name, comment, imageUrl, rating }) => {
                return (
                  <CarouselItem key={id} className='p-0 sm:basis-1/2 md:basis-1/3 xl:basis-1/4'>
                    <figure className='rounded-2xl bg-neutral-50 p-8'>
                      <div className='flex items-center' aria-label={`Rating: ${rating} out of 5`}>
                        {[...Array(rating)].map((_, index) => (
                          <Star key={index} className='size-[15px] text-yellow-500' />
                        ))}
                      </div>
                      <div className='pt-4'>
                        <blockquote className='text-balance text-[14px] leading-[23px] text-neutral-600 sm:text-[15px] sm:leading-normal md:leading-[26px] lg:text-[16px]'>
                          “{comment}”
                        </blockquote>
                      </div>
                      <div className='pt-8'>
                        <figcaption className='flex items-center gap-2.5'>
                          <img src={imageUrl} alt={name} className='size-6 shrink-0 rounded-full object-cover' />
                          <p className='text-[13px] font-medium text-neutral-700 xl:text-[14px]'>{name}</p>
                        </figcaption>
                      </div>
                    </figure>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

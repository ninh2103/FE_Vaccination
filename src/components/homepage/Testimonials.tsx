import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/ui/icon'

const testimonials = [
  {
    name: 'Anna Thompson',
    role: 'Mother of Two',
    image:
      'https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fFBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
    quote:
      'Thanks to the vaccination program, my kids are protected from serious diseases. The process was smooth and well-organized!'
  },
  {
    name: 'Dr. Robert Mitchell',
    role: 'Immunologist',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGVvcGxlfGVufDB8fDB8fHww',
    quote:
      'Vaccines save lives. I strongly recommend getting vaccinated to protect yourself and your community from preventable diseases.'
  },
  {
    name: 'James Carter',
    role: 'COVID-19 Survivor',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    quote:
      'After experiencing COVID-19, I got my vaccine shots as soon as possible. It’s reassuring to know I’m better protected now.'
  }
]

export default function Testimonials() {
  return (
    <div className='py-24 bg-gray-50 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-in-up'>
          What People Say About Vaccination
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='dark:bg-gray-700 rounded-lg p-6 shadow-lg animate-fade-in-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className='flex flex-col items-center text-center'>
                <img
                  src={testimonial.image || '/placeholder.svg'}
                  alt={testimonial.name}
                  className='rounded-full mb-4'
                />
                <Icons.Quote className='h-8 w-8 text-green-500 mb-4' />
                <p className='dark:text-gray-300 italic mb-6'>"{testimonial.quote}"</p>
                <div>
                  <h3 className='text-lg font-semibold'>{testimonial.name}</h3>
                  <p className='dark:text-green-300'>{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

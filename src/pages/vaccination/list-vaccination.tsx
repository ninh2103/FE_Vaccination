import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { motion } from 'framer-motion'
const vaccines = [
  {
    id: 1,
    name: 'Tuberculosis Vaccine',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine to prevent tuberculosis, protecting against Mycobacterium tuberculosis.'
  },
  {
    id: 2,
    name: 'Tetanus Vaccine',
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents tetanus caused by Clostridium tetani bacteria.'
  },
  {
    id: 3,
    name: 'Hepatitis B Vaccine',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents hepatitis B and protects the liver from the HBV virus.'
  },
  {
    id: 4,
    name: 'Typhoid Vaccine',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents typhoid fever caused by Salmonella Typhi bacteria.'
  },
  {
    id: 5,
    name: 'Cholera Vaccine',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents cholera caused by Vibrio cholerae bacteria.'
  },
  {
    id: 6,
    name: 'Cholera Vaccine',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents cholera caused by Vibrio cholerae bacteria.'
  }
]

export default function ListVaccination() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div
        className='py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl bg-cover bg-center '
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1649207856276-289665c31eb0)'
        }}
      >
        <div className='absolute inset-0 pointer-events-none'>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-2 w-2 rounded-full bg-blue-500 opacity-50'
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        <h1 className='pb-4'>Vaccine Product Information</h1>
        <div className=' w-11/12 md:w-3/4 lg:max-w-3xl m-auto'>
          <div className='flex justify-around gap-4'>
            <Button
              variant='secondary'
              className='flex-1 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 
      hover:from-blue-500 hover:via-green-600 hover:to-teal-600 
      transition-all duration-300 ease-in-out 
      font-semibold text-white rounded-full text-center'
            >
              Vaccines by disease group
            </Button>
            <Button
              variant='secondary'
              className='flex-1 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 
      hover:from-blue-500 hover:via-green-600 hover:to-teal-600 
      transition-all duration-300 ease-in-out 
      font-semibold text-white rounded-full text-center'
            >
              Vaccines by age
            </Button>
          </div>

          <div className='relative z-30 text-base text-black'>
            <Input
              type='text'
              placeholder='Search...'
              className='mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full'
            />
            <div className='text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto'></div>
          </div>
        </div>
      </div>
      <div className='dark:bg-gray-900 py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-white mb-8'>Introduction of our latest veccine product</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {vaccines.map((veccine) => (
              <div key={veccine.id} className='bg-white rounded-lg shadow-lg p-8'>
                <div className='relative overflow-hidden group'>
                  <img className='object-cover w-full h-full' src={veccine.image} alt={veccine.name} />
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Button className=' text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out font-semibold'>
                      View Product
                    </Button>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mt-4'>{veccine.name}</h3>
                <p className='text-gray-500 text-sm mt-2'>{veccine.description}</p>
                <div className='flex items-center justify-between mt-4'>
                  <span className='text-gray-900 font-bold text-lg'>{veccine.price}</span>
                  <Button className=' bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-500 hover:via-green-600 hover:to-teal-600 text-white py-2 px-4 rounded-full font-bold '>
                    Booking
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='py-2'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

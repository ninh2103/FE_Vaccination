import { Button } from '@/components/ui/button'
import { cn } from '@/core/lib/utils'
import { Product } from '@/core/types/product.types'
import PhotoSection from '@/pages/vaccineDetail/PhotoSection'
import { Box, Handshake, MapPin } from 'lucide-react'

const integralCF = { className: 'font-bold' }

const Header = ({ data }: { data: Product }) => {
  const maxStock = 0
  return (
    <div className='flex flex-col md:flex-row items-start justify-center gap-12 '>
      {/* Phần ảnh */}
      <div className='flex justify-center w-full md:w-[45%] max-w-2xl'>
        <PhotoSection data={data} />
      </div>

      {/* Phần thông tin */}
      <div className='flex flex-col justify-center text-center md:text-left w-full md:w-[50%] max-w-md'>
        <h1 className={cn([integralCF.className, 'text-2xl md:text-[32px] leading-[36px] mb-2 capitalize'])}>
          {data.title}
        </h1>
        <div className='flex justify-center md:justify-start items-center space-x-2 sm:space-x-3 mb-3'>
          <span className='font-bold dark:text-white text-2xl sm:text-[28px]'>${data.price}</span>
        </div>
        <p className='text-sm sm:text-base dark:text-white mb-5'>
          This vaccine is designed to provide effective protection against targeted diseases. Developed with advanced
          medical research, it ensures safety, efficacy, and long-lasting immunity.
        </p>
        <hr className='h-[1px] dark!:border-t-black/10' />
        <div className='py-5 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <MapPin />
            <p className='text-sm dark:text-white'>New York, USA</p>
          </div>
          <div className='flex items-center gap-2'>
            <Handshake />
            <p className='text-sm dark:text-white'>City Health Center</p>
          </div>
          <div className='flex items-center gap-2'>
            <Box />
            <p className='text-sm dark:text-white'>Pfizer Inc.</p>
          </div>
        </div>
        <hr className='h-[1px] dark!:border-t-black/10' />
        <div className='flex flex-col gap-2 py-3'>
          <div className='flex items-center gap-3'>
            <p className='text-xl font-medium'>Remaining Quantity:</p>
            {maxStock > 0 ? (
              <span className='text-xl font-semibold dark:text-white'>{maxStock}</span>
            ) : (
              <span className='text-xl dark:text-white font-medium'>Contact</span>
            )}
          </div>
        </div>
        <hr className='h-[1px] dark!:border-t-black/10 py-2' />
        <div className='flex justify-center'>
          <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 w-2/3 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all'>
            Booking
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header

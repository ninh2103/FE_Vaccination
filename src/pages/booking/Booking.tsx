import { Card, CardContent } from '@/components/ui/card'

const CheckOutPagePageMain = () => {
  return (
    <div className='container mt-11 mb-24 lg:mb-32 flex flex-col lg:flex-row lg:justify-end lg:gap-10'>
      {/* Phần chính */}
      <div className='w-full lg:w-3/5 xl:w-2/3 lg:ml-96 lg:max-w-[600px]'>
        <Card>
          <CardContent className='space-y-8 p-6 xl:p-8'>
            <h2 className='text-3xl lg:text-4xl font-semibold'>Confirm Infomation</h2>
            <h3 className='text-2xl font-semibold'>Your Booking</h3>
            <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden'></div>
          </CardContent>
        </Card>
      </div>

      {/* Phần Sidebar */}
      <div className='w-full lg:w-2/5 xl:w-1/3 lg:mr-auto'>
        <Card>
          <CardContent className='space-y-6 sm:space-y-8 p-6 xl:p-8'>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <div className='flex-shrink-0 w-full sm:w-40'>
                <div className='rounded-2xl overflow-hidden h-24 sm:h-32'>
                  <img
                    alt=''
                    className='w-full h-full object-cover'
                    src='https://images.unsplash.com/photo-1618015359417-89be02e0089f'
                  />
                </div>
              </div>
              <div className='py-5 sm:px-5 space-y-3'>
                <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                  Hotel room in Tokyo, Japan
                </span>
                <span className='text-base font-medium mt-1 block'>The Lounge & Bar</span>
                <span className='block text-sm text-neutral-500 dark:text-neutral-400'>2 beds · 2 baths</span>
              </div>
            </div>
            <div className='flex flex-col space-y-4'>
              <h3 className='text-2xl font-semibold'>Price detail</h3>
              <div className='flex justify-between font-semibold'>
                <span>Total</span>
                <span>$57</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CheckOutPagePageMain

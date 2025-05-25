import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useListVaccinationQuery } from '@/queries/useVaccination'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
export function Vaccines() {
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  })

  const { data: vaccinationList, isLoading } = useListVaccinationQuery({
    page: 1,
    items_per_page: 6
  })

  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(1)

  const handleResize = useCallback(() => {
    const width = window.innerWidth
    if (width >= 1024) setSlidesPerView(3)
    else if (width >= 640) setSlidesPerView(2)
    else setSlidesPerView(1)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    if (embla) {
      autoplayRef.current = setInterval(() => {
        embla.scrollNext()
      }, 2000)
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [embla])

  const renderSkeletons = () =>
    Array(slidesPerView)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className='embla__slide px-4 min-w-0'>
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
        </div>
      ))

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
        <div className='overflow-hidden' ref={viewportRef}>
          <div className='flex embla__container -mx-4' style={{ gap: '1rem' }}>
            {isLoading
              ? renderSkeletons()
              : vaccinationList?.data.map((vaccine, index) => (
                  <div key={index} className='embla__slide px-4' style={{ flex: `0 0 ${100 / slidesPerView}%` }}>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center h-[400px]'>
                      <Card className='shadow-none w-full h-full'>
                        <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
                          <img
                            src={
                              vaccine.image ||
                              'https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
                            }
                            alt={vaccine.vaccineName}
                            className='h-full w-full object-cover'
                          />
                        </CardHeader>
                        <CardContent className='p-0 flex flex-col h-[calc(100%-192px)]'>
                          <a href='#' className='text-gray-900 transition-colors hover:text-gray-800'>
                            <h5 className='mb-2 text-lg font-semibold dark:text-white line-clamp-1'>
                              {vaccine.vaccineName}
                            </h5>
                          </a>
                          <p className='text-sm text-gray-500 dark:text-white line-clamp-3 mb-4'>
                            {vaccine.description}
                          </p>
                          <div className='mt-auto'>
                            <Link to={path.list}>
                              <Button variant='outline' className='dark:bg-white dark:text-black' size='sm'>
                                Xem Thêm
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <Link to={path.list} className='text-green-600 hover:text-green-700 flex items-center gap-2'>
            Xem Tất Cả <ArrowRightIcon className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Vaccines
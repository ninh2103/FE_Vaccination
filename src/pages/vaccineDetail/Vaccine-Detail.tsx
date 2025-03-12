import Tabs from '@/components/vaccine-page'
import { Product } from '@/core/types/product.types'
import PageNotFound from '@/pages/404/PageNotFound'
import Header from '@/pages/vaccineDetail'
import { vaccines } from '@/pages/vaccineDetail/page'
import { useParams } from 'react-router-dom'

export default function VaccineDetail() {
  const { id } = useParams()
  const productData = vaccines.find((product) => product.id === Number(id))

  if (!productData?.title) {
    return <PageNotFound />
  }

  return (
    <main className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-2'>
      <div className='max-w-frame mx-auto px-4 xl:px-0'>
        <hr className='h-[1px] border-t-black/10 mb-5 sm:mb-6' />
        <section className='mb-11'>
          <Header data={productData as Product} />
        </section>
        <Tabs />
      </div>
    </main>
  )
}

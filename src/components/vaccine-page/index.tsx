'use client'

import { Button } from '@/components/ui/button'
import FaqContent from '@/components/vaccine-page/FaqContent'
import ProductDetailsContent from '@/components/vaccine-page/ProductDetailsContent'
import ReviewsContent from '@/components/vaccine-page/ReviewsContent'
import { cn } from '@/core/lib/utils'
import { useState } from 'react'

type TabBtn = {
  id: number
  label: string
}

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: 'Product Details'
  },
  {
    id: 2,
    label: 'Rating & Reviews'
  },
  {
    id: 3,
    label: 'FAQs'
  }
]

const Tabs = () => {
  const [active, setActive] = useState<number>(1)

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto'>
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant='ghost'
            type='button'
            className={cn([
              active === tab.id
                ? 'dark!:border-black border-b-2 font-medium'
                : 'border-b border-black/10 dark!:text-black/60 font-normal',
              'p-5 sm:p-6 rounded-none flex-1 text-center'
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className='mb-12 sm:mb-16'>
        {active === 1 && <ProductDetailsContent />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
    </div>
  )
}

export default Tabs

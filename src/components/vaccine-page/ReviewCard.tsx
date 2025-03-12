import React from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { Review } from '@/core/types/product.types'
import { cn } from '@/core/lib/utils'

type ReviewCardProps = {
  blurChild?: React.ReactNode
  isDate?: boolean
  data: Review
  className?: string
}

const ReviewCard = ({ blurChild, isDate = false, data, className }: ReviewCardProps) => {
  return (
    <div
      className={cn([
        'relative bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden',
        className
      ])}
    >
      {blurChild && blurChild}
      <div className='flex items-center mb-2 sm:mb-3'>
        <strong className='text-black sm:text-xl mr-1'>{data.user}</strong>
        <IoIosCheckmarkCircle className='text-[#01AB31] text-xl sm:text-2xl' />
      </div>
      <p className='text-sm sm:text-base text-black/60'>{data.content}</p>
      {isDate && <p className='text-black/60 text-sm font-medium mt-4 sm:mt-6'>Posted on {data.date}</p>}
    </div>
  )
}

export default ReviewCard

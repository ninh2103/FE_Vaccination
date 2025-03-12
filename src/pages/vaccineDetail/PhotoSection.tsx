'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/core/types/product.types'
import { useState } from 'react'

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl)

  return (
    <div className='flex flex-col-reverse lg:flex-row lg:space-x-3'>
      {data?.gallery && data.gallery.length > 0 && (
        <div className='flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 w-full lg:w-fit items-center lg:justify-start justify-center'>
          {data.gallery.map((photo, index) => (
            <Button
              key={index}
              type='button'
              className='!bg-[#F0EEED] rounded-[10px] xl:rounded-[15px] w-20 h-20 xl:w-24 xl:h-24 overflow-hidden'
              onClick={() => setSelected(photo)}
            >
              <img
                src={photo}
                className='rounded-md w-full h-full object-cover hover:scale-105 transition-all duration-300'
                alt={data.title}
              />
            </Button>
          ))}
        </div>
      )}

      <div className='flex items-center justify-center bg-[#F0EEED] rounded-[10px] sm:rounded-[15px] w-full sm:w-72 md:w-full mx-auto h-full max-h-[300px] min-h-[200px] lg:min-h-[250px] xl:min-h-[300px] overflow-hidden mb-2 lg:mb-0'>
        <img
          src={selected}
          className='rounded-md w-full h-full object-cover hover:scale-105 transition-all duration-300'
          alt={data.title}
        />
      </div>
    </div>
  )
}

export default PhotoSection

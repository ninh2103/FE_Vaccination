export type SpecItem = {
  label: string
  value: string
}

const specsData: SpecItem[] = [
  {
    label: 'Manufacturer',
    value: 'Pfizer Inc.' // Thay giá trị thực từ API hoặc dữ liệu
  },
  {
    label: 'Expiration Date',
    value: '2025-12-31' // Định dạng ngày có thể điều chỉnh
  },
  {
    label: 'Batch Number',
    value: 'B12345XYZ'
  },
  {
    label: 'Location',
    value: 'New York, USA'
  },
  {
    label: 'Provider',
    value: 'City Health Center'
  },
  {
    label: 'Certificate',
    value: 'Certified by WHO'
  }
]

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className='grid grid-cols-3' key={i}>
          <div>
            <p className='text-sm py-3 w-full leading-7 lg:py-4 pr-2 dark!:text-neutral-500'>{item.label}</p>
          </div>
          <div className='col-span-2 py-3 lg:py-4 border-b'>
            <p className='text-sm w-full leading-7 dark!:text-neutral-800 font-medium'>{item.value}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductDetails

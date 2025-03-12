import { reviewsData } from '@/pages/vaccineDetail/page'
import ReviewCard from '@/components/vaccine-page/ReviewCard'

const ReviewsContent = () => {
  return (
    <section>
      <div className='flex items-center justify-between flex-col sm:flex-row mb-5 sm:mb-6'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <h3 className='text-xl sm:text-2xl font-bold dark:text-white mr-2'>All Reviews</h3>
          <span className='text-sm sm:text-base dark:text-white'>(451)</span>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-9'>
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} data={review} isDate />
        ))}
      </div>
    </section>
  )
}

export default ReviewsContent

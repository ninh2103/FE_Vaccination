import React from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const VaccinationSchedule: React.FC = () => {
  return (
    <div>
      <div className='dark:bg-gray-900/80  min-h-screen bg-gray-100 flex items-center justify-center py-10'>
        <Header />
        <div className='container mx-auto px-4 flex flex-col lg:flex-row gap-6'>
          {/* Main Content */}
          <div className='flex-1'>
            {/* Banner */}
            <div
              className='w-full h-48 bg-cover bg-center rounded-lg mb-6'
              style={{
                backgroundImage: "url('https://vnvc.vn/wp-content/uploads/2016/07/dc-tracuu.jpg')" // Placeholder for banner image
              }}
            ></div>

            {/* Content */}
            <div className='dark:bg-gray-900/80 bg-white p-6 rounded-lg shadow-lg'>
              <h1 className='dark:text-white text-3xl font-bold text-blue-800 mb-4'>TRA CỨU LỊCH SỬ TIÊM CHỦNG</h1>
              <h2 className='text-2xl dark:text-white'>Cảm ơn Quý khách đã quan tâm đến dịch vụ tiêm chủng của <b>VAXBOT</b> </h2>
              <p className='dark:text-white text-gray-700 mb-4 text-2xl mt-2'>
                Quý khách vui lòng liên hệ đến Hotline <b > 1900 1900 </b>để được hỗ trợ tra cứu lịch sử tiêm chủng và tư vấn lựa
                chọn các gói vắc xin phù hợp.
              </p>
              <p className='dark:text-white text-gray-700 mb-4 text-2xl mt-2'>
                Trong thời gian tới, chúng tôi sẽ tiếp tục nâng cao chất lượng dịch vụ để đáp ứng yêu cầu ngay càng cao
                của Quý khách.
              </p>
              <p className='dark:text-white text-gray-700 text-2xl mt-2'>Xin cảm ơn sự thấu hiểu từ quý khác hàng và Kính chúc Quý khách sức khỏe, thành công.</p>
            </div>
          </div>

          {/* Sidebar (Copied from Contact.tsx) */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VaccinationSchedule

import React from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const VaxKidneyServicesCustom = () => {
  return (
    <div className='min-h-screen bg-gray-50 font-sans'>
      <div>
        <Header />
        <header className='max-w-[70rem] mt-[5rem] relative bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white py-20 flex flex-col justify-center items-center mx-auto rounded-3xl'>
          <div className='absolute inset-0 bg-blue-900 opacity-10'></div>
          <div className='max-w-[70rem] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10'>
            <div className='md:w-1/2 text-center md:text-left'>
              <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white bg-clip-text'>
                Trung Tâm Tiêm Chủng Vắc Xin Thận VaxBot
              </h1>
              <p className='text-lg md:text-xl mb-6'>
                Chuyên cung cấp các dịch vụ tiêm chủng và chăm sóc sức khỏe thận với công nghệ hiện đại, đội ngũ chuyên
                gia hàng đầu.
              </p>
              <a
                href='/vaccination/list'
                className='inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300'
              >
                Đặt Lịch Ngay
              </a>
            </div>
            <div className='md:w-1/2 mt-8 md:mt-0'>
              <img
                src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
                alt='Hero Image - Vaccination Center'
                className='w-full h-auto rounded-lg shadow-lg'
              />
              {/* Placeholder for hero image: a professional image of a vaccination center */}
            </div>
          </div>
        </header>

        {/* Introduction Section */}
        <section className='py-24 bg-white shadow-lg'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Giới Thiệu Về VaxBot
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Trung Tâm Tiêm Chủng Vắc Xin Thận VaxBot được thành lập với sứ mệnh bảo vệ sức khỏe thận cho cộng đồng.
                Chúng tôi tự hào là đơn vị tiên phong trong việc cung cấp các giải pháp tiêm chủng chuyên biệt, kết hợp
                với công nghệ hiện đại và đội ngũ chuyên gia giàu kinh nghiệm.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div>
                <img
                  src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg'
                  alt='About Us - Medical Team'
                  className='w-full h-auto rounded-lg shadow-lg'
                />
                {/* Placeholder for image: a photo of the medical team */}
              </div>
              <div>
                <h3 className='text-3xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                  Sứ Mệnh Của VaxBot
                </h3>
                <p className='text-gray-600 mb-4'>
                  Chúng tôi cam kết mang đến các dịch vụ tiêm chủng an toàn, hiệu quả, giúp bệnh nhân bảo vệ sức khỏe
                  thận và phòng ngừa các bệnh liên quan. Mỗi khách hàng đến với VaxBot đều được chăm sóc tận tình, với
                  lộ trình tiêm chủng được cá nhân hóa.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-center text-gray-600'>
                    <svg
                      className='w-6 h-6 text-teal-500 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                    Đội ngũ chuyên gia hàng đầu về thận học.
                  </li>
                  <li className='flex items-center text-gray-600'>
                    <svg
                      className='w-6 h-6 text-teal-500 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                    Công nghệ tiêm chủng tiên tiến.
                  </li>
                  <li className='flex items-center text-gray-600'>
                    <svg
                      className='w-6 h-6 text-teal-500 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                    Dịch vụ chăm sóc khách hàng tận tâm.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className='bg-gray-50 py-24'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Dịch Vụ Tiêm Chủng Chuyên Sâu
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Chúng tôi cung cấp các gói tiêm chủng chuyên biệt, giúp bảo vệ sức khỏe thận và phòng ngừa các bệnh liên
                quan với quy trình an toàn, chuyên nghiệp.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Service 1 - Tiêm chủng cho trẻ em */}
              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center'>
                <div className='text-teal-500 mb-4'></div>
                <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-3 text-center'>
                  Tiêm Chủng Cho Trẻ Em
                </h3>
                <p className='text-gray-600 mb-6 text-center'>
                  Vắc xin chuyên biệt giúp bảo vệ thận khỏi các bệnh nhiễm trùng nguy hiểm, hỗ trợ bệnh nhân suy thận.
                </p>
                <a
                  href='/vaccination/list'
                  className='inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition duration-300 mt-auto'
                >
                  Đặt Lịch
                </a>
              </div>

              {/* Service 2 - Tiêm chủng cho người lớn */}
              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center'>
                <div className='text-teal-500 mb-4'></div>
                <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-3 text-center'>
                  Tiêm Chủng Cho Người Lớn
                </h3>
                <p className='text-gray-600 mb-6 text-center'>
                  Đội ngũ chuyên gia tư vấn chế độ dinh dưỡng và tiêm chủng phù hợp cho bệnh nhân thận.
                </p>
                <a
                  href='/vaccination/list'
                  className='inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition duration-300 mt-auto'
                >
                  Đặt Lịch
                </a>
              </div>

              {/* Service 3 - Tiêm chủng theo yêu cầu */}
              <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center'>
                <div className='text-teal-500 mb-4'></div>
                <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-3 text-center'>
                  Tiêm Chủng Theo Yêu Cầu
                </h3>
                <p className='text-gray-600 mb-6 text-center'>
                  Chương trình tiêm chủng kết hợp theo dõi sức khỏe định kỳ, tối ưu cho bệnh nhân thận.
                </p>
                <a
                  href='/vaccination/list'
                  className='inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition duration-300 mt-auto'
                >
                  Đặt Lịch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className='py-24'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Tại Sao Chọn VaxBot?
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Chúng tôi tự hào mang đến dịch vụ chất lượng cao với sự tận tâm và chuyên nghiệp.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div className='p-6 text-center'>
                <div className='text-teal-500 mb-4'>
                  <svg
                    className='w-12 h-12 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17 20h5v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4v2h5z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 12a4 4 0 100-8 4 4 0 000 8z'
                    />
                  </svg>
                </div>
                <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Chuyên Gia Hàng Đầu
                </h4>
                <p className='text-gray-600'>Đội ngũ bác sĩ chuyên khoa thận với hơn 20 năm kinh nghiệm.</p>
              </div>
              <div className='p-6 text-center'>
                <div className='text-teal-500 mb-4'>
                  <svg
                    className='w-12 h-12 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Vắc Xin Đạt Chuẩn
                </h4>
                <p className='text-gray-600'>Sử dụng vắc xin từ các thương hiệu uy tín toàn cầu.</p>
              </div>
              <div className='p-6 text-center'>
                <div className='text-teal-500 mb-4'>
                  <svg
                    className='w-12 h-12 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M8 7V3m8 4V3m-6 8h12M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Đặt Lịch Linh Hoạt
                </h4>
                <p className='text-gray-600'>Hỗ trợ đặt lịch trực tuyến 24/7, nhanh chóng và tiện lợi.</p>
              </div>
              <div className='p-6 text-center'>
                <div className='text-teal-500 mb-4'>
                  <svg
                    className='w-12 h-12 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Theo Dõi Dài Hạn
                </h4>
                <p className='text-gray-600'>Chương trình chăm sóc sức khỏe thận định kỳ, tận tâm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='bg-teal-50 py-24'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Khách Hàng Nói Gì Về VaxBot
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Sự hài lòng của khách hàng là động lực để chúng tôi không ngừng cải thiện và phát triển.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='flex items-center mb-4'>
                  <img
                    src='https://chothuestudio.com/wp-content/uploads/2024/07/TCA_3837.jpg'
                    alt='User 1'
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div>
                    <h4 className='text-lg font-semibold text-gray-800'>Nguyễn Văn An</h4>
                    <p className='text-gray-500'>Bệnh nhân</p>
                  </div>
                </div>
                <p className='text-gray-600'>
                  "Tôi rất hài lòng với dịch vụ tại VaxBot. Đội ngũ bác sĩ tận tình, quy trình tiêm chủng nhanh chóng và
                  an toàn."
                </p>
              </div>
              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='flex items-center mb-4'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPuR7dCLass9HDnvg3kDRB4ia3iab4Cy5JA&s'
                    alt='User 2'
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div>
                    <h4 className='text-lg font-semibold text-gray-800'>Trần Thị Bích</h4>
                    <p className='text-gray-500'>Bệnh nhân</p>
                  </div>
                </div>
                <p className='text-gray-600'>
                  "Lịch hẹn linh hoạt, dễ dàng đặt qua website. Tôi cảm thấy yên tâm hơn về sức khỏe thận của mình sau
                  khi tham gia chương trình tiêm chủng."
                </p>
              </div>
              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='flex items-center mb-4'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P9u9rorGjwptFOwgGye1i8xdcyUKbC1cwUCTSUl0mVsC0SwdrqxtE_uIvVIOxhP6Dl4&usqp=CAU'
                    alt='User 3'
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div>
                    <h4 className='text-lg font-semibold text-gray-800'>Lê Minh Châu</h4>
                    <p className='text-gray-500'>Bệnh nhân</p>
                  </div>
                </div>
                <p className='text-gray-600'>
                  "Vắc xin chất lượng cao, bác sĩ tư vấn rất nhiệt tình. Tôi sẽ tiếp tục sử dụng dịch vụ tại đây."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-24 bg-white shadow-lg'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Câu Hỏi Thường Gặp
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Dưới đây là những câu hỏi phổ biến mà khách hàng thường hỏi chúng tôi.
              </p>
            </div>
            <div className='space-y-6'>
              <div className='bg-white p-6 rounded-xl shadow-md'>
                <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Tôi cần chuẩn bị gì trước khi tiêm chủng?
                </h4>
                <p className='text-gray-600'>
                  Bạn nên mang theo giấy tờ tùy thân, hồ sơ y tế (nếu có), và thông báo với bác sĩ về tình trạng sức
                  khỏe hiện tại.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md'>
                <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Tiêm chủng tại VaxBot có an toàn không?
                </h4>
                <p className='text-gray-600'>
                  Hoàn toàn an toàn! Chúng tôi sử dụng vắc xin đạt chuẩn quốc tế và thực hiện quy trình tiêm chủng
                  nghiêm ngặt.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md'>
                <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Tôi có thể đặt lịch cho cả gia đình không?
                </h4>
                <p className='text-gray-600'>
                  Có, chúng tôi cung cấp các gói tiêm chủng gia đình với chi phí ưu đãi và lịch hẹn linh hoạt.
                </p>
              </div>
              <div className='bg-white p-6 rounded-xl shadow-md'>
                <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                  Sau khi tiêm chủng, tôi cần làm gì?
                </h4>
                <p className='text-gray-600'>
                  Bạn nên nghỉ ngơi, uống đủ nước, và theo dõi phản ứng sau tiêm. Nếu có dấu hiệu bất thường, hãy liên
                  hệ ngay với chúng tôi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          id='booking'
          className='max-w-[70rem] bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-20 text-white flex flex-col justify-center items-center mx-auto px-4 text-center'
        >
          <div className='max-w-[70rem] mx-auto px-4 text-center'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              Bảo Vệ Sức Khỏe Thận Của Bạn Ngay Hôm Nay!
            </h2>
            <p className='text-lg mb-8 max-w-2xl mx-auto'>
              Đặt lịch tiêm chủng ngay để nhận ưu đãi đặc biệt và đảm bảo sức khỏe thận lâu dài.
            </p>
            <a
              href='/vaccination/list'
              className='inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300'
            >
              Đặt Lịch Ngay
            </a>
          </div>
        </section>

        {/* Contact and Map Section */}
        <section className='py-24 bg-gray-50'>
          <div className='max-w-[70rem] mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Liên Hệ Với VaxBot
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Ghé thăm trung tâm của chúng tôi hoặc liên hệ để được hỗ trợ nhanh chóng.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {/* Contact Info */}
              <div className='flex flex-col justify-center'>
                <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                  Thông Tin Trung Tâm
                </h3>
                <p className='text-gray-600 mb-2'>
                  <strong>Địa chỉ:</strong> 120 Hoàng Minh Thảo, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng
                </p>
                <p className='text-gray-600 mb-2'>
                  <strong>Số điện thoại:</strong> 1900.1900
                </p>
                <p className='text-gray-600 mb-2'>
                  <strong>Email:</strong> contact@vaxbot.vn
                </p>
                <p className='text-gray-600'>
                  <strong>Giờ làm việc:</strong> Thứ Hai - Thứ Bảy, 8:00 - 17:00
                </p>
              </div>
              {/* Google Maps */}
              <div>
                <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                  Bản Đồ
                </h3>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.311996577007!2d108.15752167582252!3d16.049291584627337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421938d61a3ce5%3A0x29d80f3ebbdcb44a!2zxJDhuqFpIEjhu41jIER1eSBUw6JuIEjDsmEgS2jDoW5oIE5hbQ!5e0!3m2!1svi!2s!4v1745053887238!5m2!1svi!2s'
                  width='100%'
                  height='400'
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default VaxKidneyServicesCustom

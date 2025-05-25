import React, { useState, useEffect } from 'react'
import Header from '@/pages/Header2/Header2'
import Footer from '@/components/homepage/Footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ServiceIntro: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  // Giả lập độ trễ loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Độ trễ 0.5 giây để mô phỏng loading

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='flex items-center justify-center text-muted-foreground'>
            <LoadingSpinner className='mr-2 h-10 w-10' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header />
      <header className='max-w-7xl mt-[7rem] relative bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white py-16 flex flex-col justify-center items-center mx-auto rounded-3xl'>
        <div className='absolute inset-0 bg-blue-900 opacity-10'></div>
        <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-10'>
          <div className='md:w-1/2 text-center md:text-left'>
            <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white bg-clip-text'>
              Trung tâm tiêm chủng VAXBOT
            </h1>
            <p className='text-lg md:text-xl mb-6 leading-relaxed'>
              Cung cấp dịch vụ tiêm chủng hàng đầu với công nghệ tiên tiến và đội ngũ chuyên gia tận tâm{' '}
            </p>
            <a
              href='/vaccination/list'
              className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
            >
              Đặt lịch ngay
            </a>
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0'>
            <img
              src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
              alt='Hero Image - Vaccination Center'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className='py-16 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Giới thiệu về VAXBOT
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed'>
              Trung tâm tiêm chủng VaxBot được thành lập với sứ mệnh bảo vệ sức khỏe cộng đồng thông qua các dịch vụ
              tiêm chủng toàn diện. Chúng tôi tự hào là đơn vị tiên phong trong việc cung cấp các giải pháp tiêm chủng
              chuyên biệt, kết hợp công nghệ tiên tiến với đội ngũ giàu kinh nghiệm.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <img
                src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg'
                alt='About Us - Medical Team'
                className='w-full h-auto rounded-lg shadow-lg'
              />
            </div>
            <div>
              <h3 className='text-3xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Sứ mệnh của chúng tôi
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                Chúng tôi cam kết cung cấp dịch vụ tiêm chủng an toàn và hiệu quả để phòng ngừa bệnh tật và thúc đẩy sức
                khỏe cộng đồng. Mỗi khách hàng tại VaxBot đều nhận được dịch vụ chăm sóc cá nhân với lịch tiêm chủng
                được thiết kế riêng.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-center text-gray-600 leading-relaxed'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Đội ngũ chuyên gia hàng đầu về tiêm chủng.
                </li>
                <li className='flex items-center text-gray-600 leading-relaxed'>
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
                <li className='flex items-center text-gray-600 leading-relaxed'>
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

      {/* Why Vaccinate Section */}
      <section className='py-16 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Tại sao nên tiêm chủng?
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed'>
              Tiêm chủng là một trong những biện pháp hiệu quả nhất để bảo vệ bạn và cộng đồng khỏi các bệnh truyền nhiễm nguy hiểm. Dưới đây là những lý do chính bạn nên tiêm chủng.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <img
                src='https://tamanhhospital.vn/wp-content/uploads/2024/02/tiem-chung.jpg'
                alt='Why Vaccinate - Vaccination Protection'
                className='w-full h-auto rounded-lg shadow-lg'
              />
            </div>
            <div>
              <h3 className='text-3xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Lợi ích của tiêm chủng
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                Tiêm chủng không chỉ bảo vệ cá nhân mà còn góp phần xây dựng miễn dịch cộng đồng, giảm nguy cơ bùng phát dịch bệnh.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-center text-gray-600 leading-relaxed'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Ngăn ngừa các bệnh nguy hiểm như sởi, bại liệt, và viêm gan.
                </li>
                <li className='flex items-center text-gray-600 leading-relaxed'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Giảm nguy cơ biến chứng và tử vong do bệnh truyền nhiễm.
                </li>
                <li className='flex items-center text-gray-600 leading-relaxed'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Bảo vệ trẻ em, người lớn tuổi và những người có hệ miễn dịch yếu.
                </li>
                <li className='flex items-center text-gray-600 leading-relaxed'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Góp phần loại bỏ các bệnh truyền nhiễm trên toàn cầu.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Tại sao nên chọn VaxBot?
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Chúng tôi tự hào cung cấp dịch vụ chất lượng cao với sự tận tâm và chuyên nghiệp.{' '}
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
                Các chuyên gia hàng đầu
              </h4>
              <p className='text-gray-600 leading-relaxed'>
                Đội ngũ của chúng tôi bao gồm các chuyên gia tiêm chủng có hơn 20 năm kinh nghiệm.{' '}
              </p>
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
                Vắc-xin được chứng nhận{' '}
              </h4>
              <p className='text-gray-600 leading-relaxed'>Chúng tôi sử dụng vắc-xin từ các thương hiệu uy tín trên toàn cầu.</p>
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
                Đặt lịch linh hoạt
              </h4>
              <p className='text-gray-600 leading-relaxed'>Hỗ trợ đặt lịch trực tuyến 24/7, nhanh chóng và tiện lợi. </p>
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
                Giám sát dài hạn
              </h4>
              <p className='text-gray-600 leading-relaxed'>Chương trình theo dõi sức khỏe thường xuyên với sự chăm sóc tận tình.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Câu hỏi thường gặp
            </h2>
            <p className='mt-5 text-gray-600 leading-relaxed'>Dưới đây là những câu hỏi thường gặp mà khách hàng hỏi chúng tôi.</p>
          </div>
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Tôi nên chuẩn bị gì trước khi tiêm vắc-xin?
              </h4>
              <p className='text-gray-600 leading-relaxed'>
                Mang theo giấy tờ tùy thân, hồ sơ bệnh án (nếu có) và thông báo cho bác sĩ về tình trạng sức khỏe hiện
                tại của bạn.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Tiêm vắc-xin tại VAXBOT có an toàn không?
              </h4>
              <p className='text-gray-600 leading-relaxed'>
                Hoàn toàn an toàn! Chúng tôi sử dụng vắc-xin được chứng nhận quốc tế và tuân thủ nghiêm ngặt các quy
                trình tiêm chủng.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Tôi có thể đặt chỗ cho cả gia đình tôi không?
              </h4>
              <p className='text-gray-600 leading-relaxed'>
                Có, chúng tôi cung cấp các gói tiêm chủng cho gia đình với mức giá ưu đãi và lịch trình linh hoạt.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Tôi nên làm gì sau khi tiêm vắc-xin?
              </h4>
              <p className='text-gray-600 leading-relaxed'>
                Nghỉ ngơi, giữ đủ nước và theo dõi bất kỳ phản ứng nào sau khi tiêm vắc-xin. Liên hệ với chúng tôi ngay
                lập tức nếu bạn nhận thấy bất kỳ điều gì bất thường.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id='booking'
        className='mt-[3rem] max-w-7xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white flex flex-col justify-center items-center mx-auto px-4 text-center rounded-3xl'
      >
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Bảo vệ sức khỏe của bạn ngay hôm nay!</h2>
          <p className='text-lg mb-6 max-w-2xl mx-auto leading-relaxed'>
            Hãy đặt lịch tiêm chủng ngay bây giờ để nhận được ưu đãi đặc biệt và đảm bảo sức khỏe lâu dài.
          </p>
          <a
            href='/vaccination/list'
            className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
          >
            Đặt lịch ngay
          </a>
        </div>
      </section>

      {/* Contact and Map Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Liên hệ với chúng tôi
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Hãy đến trung tâm của chúng tôi hoặc liên hệ với chúng tôi để được hỗ trợ nhanh chóng.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div className='flex flex-col justify-center'>
              <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Thông tin về trung tâm tiêm chủng
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                <strong>Địa chỉ :</strong> số 120 Hoàng Minh Thảo, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng
              </p>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                <strong>Email:</strong> vaxbot@gmail.com
              </p>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                <strong>Giờ làm việc:</strong> Từ thứ Hai tới thứ Sáu, 8:00 AM - 5:00 PM
              </p>
            </div>
            {/* Google Maps */}
            <div>
              <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Bản đồ
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

      <Footer />
    </div>
  )
}

export default ServiceIntro
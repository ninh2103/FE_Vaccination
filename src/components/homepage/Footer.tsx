import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='dark:bg-gray-900 bg-gray-100'>
      {/* Nội dung chính */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'> Tiêm Chủng</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Tại Sao Cần Tiêm Chủng?
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Quy Trình Hoạt Động
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Cam Kết & Sứ Mệnh Cộng Đồng
                </Link>
              </li>
            </ul>
          </div>

          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Trung Tâm Thông Tin</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Các Loại Vaccine
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Tác Dụng Phụ & An Toàn
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
            </ul>
          </div>

          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Pháp Lý</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Điều Khoản Sử Dụng Dịch Vụ
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Chính Sách Quyền Riêng Tư
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Bảo Mật Và Xử Lý Dữ Liệu
                </Link>
              </li>
            </ul>
          </div>

          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Liên Hệ</h4>
            <p className='dark:text-gray-400 mb-2'>Trụ sở chính:Tp Đà Nẵng</p>
            <p className='dark:text-gray-400 mb-2'>Giờ làm việc: 8:00 - 17:00 (T2 - T7)</p>
            <p className='dark:text-gray-400'>support@vaccinecare.com</p>
          </div>
        </div>
      </div>

      {/* Đường line full màn hình */}
      <div className='border-t border-gray-800 w-full'></div>

      {/* Dòng © và icon mạng xã hội nằm giữa, gọn gàng */}
      <div className='w-full flex justify-center items-center px-8 py-4'>
        <p className='dark:text-gray-400 text-sm'>Bản Quyền © {new Date().getFullYear()} Thuộc Về VAX-BOX.</p>
      </div>
    </footer>
  )
}

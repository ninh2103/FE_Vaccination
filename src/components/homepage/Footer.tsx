import { Icons } from '@/components/ui/icon'
import { Link } from 'react-router-dom'

const socialLinks = [
  { icon: Icons.Facebook, href: '#' },
  { icon: Icons.Twitter, href: '#' },
  { icon: Icons.Instagram, href: '#' },
  { icon: Icons.Linkedin, href: '#' }
]

export default function Footer() {
  return (
    <footer className='dark:bg-gray-900 py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Về Vắc xin</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Tại sao nên tiêm chủng?
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Cách tiêm chủng
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Các loại vắc xin
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Tài nguyên</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Các loại vắc xin
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Tác dụng phụ và an toàn
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Pháp luật</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Bảo mật dữ liệu
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Liên hệ chúng tôi</h4>
            <p className='dark:text-gray-400 mb-2'>Trung tâm Y tế</p>
            <p className='dark:text-gray-400 mb-2'>Đà Nẵng</p>
            <p className='dark:text-gray-400'>vaxbox@gmail.com</p>
          </div>
        </div>
        <div className='border-t border-gray-800 pt-8 mt-8 text-center'>
          <div className='flex justify-center space-x-6 mb-6'>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className='dark:text-gray-400 dark:hover:text-green-400 transition-colors'
              >
                <link.icon className='h-6 w-6' />
              </a>
            ))}
          </div>
          <p className='dark:text-gray-400'>&copy; {new Date().getFullYear()} Vaxbox. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

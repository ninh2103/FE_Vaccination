import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

// Extend the Window interface to include fbAsyncInit
declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB: any // You can refine this type further if needed (e.g., with Facebook SDK types)
  }
}

export default function Footer() {
  // Initialize Facebook SDK
  useEffect(() => {
    // Check if the SDK script is already loaded to avoid duplicate loading
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0'
      script.async = true
      document.body.appendChild(script)

      // Initialize the SDK once loaded
      window.fbAsyncInit = function () {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v20.0'
          })
        }
      }
    }
  }, [])

  return (
    <footer className='dark:bg-gray-900 py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Combined Vaccine Information Section */}
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white text-gray-800'>Về Vắc xin</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/introduce'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Tại sao nên tiêm chủng?
                </Link>
              </li>
              <li>
                <Link
                  to='/introduce'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Cách tiêm chủng
                </Link>
              </li>
              <li>
                <Link
                  to='/vaccination/list'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Các loại vắc xin
                </Link>
              </li>
              <li>
                <Link
                  to='/introduce'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Tác dụng phụ và an toàn
                </Link>
              </li>
              <li>
                <Link
                  to='/introduce'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white text-gray-800'>Pháp luật</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/policy'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to='/policy'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to='/policy'
                  className='text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
                >
                  Bảo mật dữ liệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section - Improved */}
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white text-gray-800'>Liên hệ chúng tôi</h4>
            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                <MapPin className='h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0' />
                <p className='text-gray-600 dark:text-gray-400'>
                  120 Hoàng Minh Thảo, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
                <p className='text-gray-600 dark:text-gray-400'>1900.1900</p>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
                <p className='text-gray-600 dark:text-gray-400'>vaxbot@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Links Section - Embedded Facebook Page */}
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white text-gray-800'>Theo dõi chúng tôi</h4>
            <div className='fb-page-container'>
              <div
                className='fb-page'
                data-href='https://www.facebook.com/profile.php?id=61575699530090'
                data-tabs='timeline'
                data-width='300'
                data-height='130'
                data-small-header='false'
                data-adapt-container-width='true'
                data-hide-cover='false'
                data-show-facepile='true'
              >
                <blockquote
                  cite='https://www.facebook.com/profile.php?id=61575699530090'
                  className='fb-xfbml-parse-ignore'
                >
                  <a href='https://www.facebook.com/profile.php?id=61575699530090'>VAXBOT</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-gray-300 dark:border-gray-700 pt-6 mt-8 text-center'>
          <p className='text-gray-600 dark:text-gray-400'>© {new Date().getFullYear()} VAXBOT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

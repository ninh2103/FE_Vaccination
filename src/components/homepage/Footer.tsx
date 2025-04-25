import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='dark:bg-gray-900 py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>
              <strong>Links</strong>
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link to='/policy' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Data Protection
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>
              <strong>Contact Us</strong>
            </h4>
            <p className='dark:text-gray-400 mb-2'>
              <strong>Phone:</strong> 1900 1900
            </p>
            <p className='dark:text-gray-400 mb-2'>
              {' '}
              <strong>Email:</strong> contact@vaxbot.com
            </p>
            <p className='dark:text-gray-400 '>
              <strong>Address:</strong> 120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu Da Nang
            </p>
          </div>
        </div>
        <div className='border-t border-gray-800 pt-8 mt-8 text-center'>
          <p className='dark:text-gray-400'>
            &copy; {new Date().getFullYear()} <strong>VaxBot. </strong> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

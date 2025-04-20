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
            <h4 className='font-semibold mb-4 dark:text-white'>About Vaccination</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Why Vaccinate?
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Resources</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Vaccine Types
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Side Effects & Safety
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className='mx-auto'>
            <h4 className='font-semibold mb-4 dark:text-white'>Legal</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to='#' className='dark:text-gray-400 dark:hover:text-green-400'>
                  Privacy Policy
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
              <strong>Phone:</strong> 1900.1900
            </p>
            <p className='dark:text-gray-400 mb-2'>
              <strong>Address:</strong> 120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu, Da Nang
            </p>
            <p className='dark:text-gray-400'>
              {' '}
              <strong>Email:</strong> contact@vaxbot.com
            </p>
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
          <p className='dark:text-gray-400'>&copy; {new Date().getFullYear()} <strong>VaxBot. </strong> All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { path } from '@/core/constants/path'
const PageNotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none z-0'>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-green-500 opacity-50'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Nội dung trang 404 */}
      <div className='text-center z-10'>
        <AlertTriangle className='h-24 w-24 text-yellow-500 mx-auto animate-bounce' />
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mt-4'>404 - Page Not Found</h1>
        <p className='text-gray-600 dark:text-gray-300 mt-2'>Oops! The page you are looking for doesn’t exist.</p>
        <div className='mt-6'>
          <Link to={path.home}>
            <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:text-blue-400 text-white '>
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound

import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-12 flex items-center justify-center px-4 shadow-sm'>
      <p className='text-sm text-white-900 dark:text-gray-300'>
        Công ty cổ phần Vắc xin VAXBOT &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer

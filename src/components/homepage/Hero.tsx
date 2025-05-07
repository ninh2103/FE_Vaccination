import { Button } from '@/components/ui/button'
import { path } from '@/core/constants/path'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className='relative container mx-auto px-4 py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden'>
      {/* Hiệu ứng đóm bay bay */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-blue-500 opacity-50'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10'>
        <motion.div
          className='lg:w-1/2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
              Bảo Vệ Sức Khỏe Của Bạn
            </span>
            <br />
            <span className='text-gray-900 dark:text-white'>Tiêm Chủng Ngay Hôm Nay</span>
          </h1>
          <p className='text-gray-700 dark:text-gray-300 mb-8 text-lg md:text-xl leading-relaxed max-w-2xl'>
            Tiêm chủng là chìa khóa cho một tương lai khỏe mạnh hơn. Bảo vệ bản thân và cộng đồng của bạn khỏi các bệnh
            có thể phòng ngừa bằng các loại vắc-xin an toàn và hiệu quả được các chuyên gia khuyến nghị.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link to={path.list}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
              >
                Đặt Lịch Hẹn Ngay
              </Button>
            </Link>
            <Link to={path.list}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
              >
                Xem Thông tin Văc-xin
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className='lg:w-1/2 relative'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='relative w-full max-w-lg mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-950 to-blue-500 rounded-2xl filter blur-3xl opacity-30 animate-pulse'></div>
            <img
              src='https://images.unsplash.com/photo-1647853042468-a152e59ab9b2'
              alt='Tiêm Chủng'
              width={500}
              height={350}
              className='rounded-2xl shadow-2xl relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

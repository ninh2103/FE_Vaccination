// File: Hero.tsx

import { Button } from '@/components/ui/button'
import { path } from '@/core/constants/path'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const count = 20
      const newParticles: Particle[] = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }))
      setParticles(newParticles)
    }

    generateParticles()
    window.addEventListener('resize', generateParticles)

    return () => {
      window.removeEventListener('resize', generateParticles)
    }
  }, [])

  return (
    <div className='relative container mx-auto px-4 py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-blue-500 opacity-50'
            initial={{ x: particle.x, y: particle.y, scale: 0 }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.2] tracking-[-0.02em] text-balance'>
            <span className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text '>
              Tiêm Hôm Nay An Tâm Ngày Mai
            </span>
            <br />
            <span className='text-gray-900 dark:text-white font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-wide'>
              Bảo Vệ Bạn Bảo Vệ Cộng Đồng
            </span>
          </h1>
          <p className='italic text-gray-700 dark:text-gray-300 mb-8 text-lg md:text-xl leading-8 tracking-tight text-balance max-w-2xl'>
            Tiêm chủng là sự đầu tư cho sức khỏe. Với những vắc-xin an toàn, hiệu quả và được các chuyên gia khuyên
            dùng. Chúng ta có thể phòng ngừa được những bệnh nguy hiểm, mang đến một tương lai khỏe mạnh hơn cho tất cả
            mọi người
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link to={path.home}>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white tracking-wide'
              >
                Đặt Lịch Hẹn
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
              alt='Ảnh minh họa vắc-xin'
              width={500}
              height={350}
              className='rounded-2xl shadow-2xl relative z-10 w-full h-auto transform hover:scale-105 transition-transform duration-300'
              loading='lazy'
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Book, Lightbulb, Award, Rocket, Brain, Syringe } from 'lucide-react'

export default function LazyLoading() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handlePageLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handlePageLoad()
    } else {
      window.addEventListener('load', handlePageLoad)
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) return prevProgress
        return prevProgress + Math.random() * 8
      })
    }, 100)

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handlePageLoad)
    }
  }, [])

  if (!isClient || !loading) return null

  const icons = [Book, Lightbulb, Syringe, Award, Rocket, Brain]

  const iconColors = [
    'text-blue-400',
    'text-yellow-400',
    'text-green-400',
    'text-purple-400',
    'text-red-400',
    'text-indigo-400'
  ]

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50 p-4'>
      {/* Loader Container */}
      <div className='relative w-64 h-64 md:w-80 md:h-80'>
        {/* Outer decorative ring */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-green-500 opacity-20 animate-pulse'></div>

        {/* Main circle */}
        <div className='absolute inset-2 rounded-full bg-gray-800 flex items-center justify-center shadow-2xl'>
          <div className='w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative'>
            {/* Circular Progress Bar */}
            <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
              <circle
                className='text-gray-700 stroke-current'
                strokeWidth='4'
                cx='50'
                cy='50'
                r='45'
                fill='transparent'
              ></circle>
              <circle
                className='text-blue-500 stroke-current transition-all duration-300 ease-in-out'
                strokeWidth='4'
                strokeLinecap='round'
                cx='50'
                cy='50'
                r='45'
                fill='transparent'
                strokeDasharray='282.74'
                strokeDashoffset={282.74 - (282.74 * progress) / 100}
              ></circle>
            </svg>
            {/* Progress Number */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        {icons.map((Icon, index) => (
          <div
            key={index}
            className={`absolute w-10 h-10 md:w-12 md:h-12 ${iconColors[index]} transition-all duration-300 ease-in-out`}
            style={{
              top: `${50 - Math.round(46 * Math.cos((index * Math.PI) / 3))}%`,
              left: `${50 + Math.round(46 * Math.sin((index * Math.PI) / 3))}%`,
              transform: 'translate(-50%, -50%)',
              animation: `iconFloat 3s ease-in-out ${index * 0.5}s infinite alternate`
            }}
          >
            <Icon strokeWidth={1.5} className='w-full h-full' />
          </div>
        ))}

        {/* Decorative elements */}
        <div className='absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full opacity-50 animate-ping'></div>
        <div
          className='absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full opacity-50 animate-ping'
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className='absolute top-1/4 right-1/4 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-ping'
          style={{ animationDelay: '0.7s' }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className='mt-8 text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-green-500 text-center'>
        loading...
      </div>
    </div>
  )
}

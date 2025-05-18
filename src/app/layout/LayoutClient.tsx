import LazyLoading from '@/components/common/lazy-loading'
import Footer from '@/components/homepage/Footer'
import Header from '@/pages/Header2/Header2'
import React from 'react'

interface IClientLayoutProps {
  children: React.ReactNode
}

const LayoutClient: React.FC<IClientLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col '>
      <LazyLoading />
      <div className='h-16 flex-shrink-0'>
        <Header />
      </div>
      <main className=''>{children}</main>
      <div className='h-12 flex-shrink-0'>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutClient

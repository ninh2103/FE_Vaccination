import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import React from 'react'

interface IClientLayoutProps {
  children: React.ReactNode
}

const LayoutClient: React.FC<IClientLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
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

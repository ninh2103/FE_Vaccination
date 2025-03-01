'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Footer from '@/components/homepage/Footer'
import Feature from '@/components/homepage/Feature'
import ContactSection from '@/components/homepage/Contact'
import Doctor from '@/components/homepage/Doctor'
import Vaccines from '@/components/homepage/Vaccines'
import Testimonials from '@/components/homepage/Testimonials'
import Blog from '@/components/homepage/Blog'
export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div className="fixed inset-0 bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>
      <div className='relative z-10'>
        <Header />
        <main>
          <section id='home'>
            <Hero />
          </section>
          <section id='features' className='-mt-32 bg-white px-4 pt-4'>
            <Feature />
          </section>
          <section id='vaccines'>
            <Vaccines />
          </section>
          <section id='doctor' className='px-4'>
            <Doctor />
          </section>
          <section id='testimonials'>
            <Testimonials />
          </section>
          <section id='blog'>
            <Blog />
          </section>
          {/* 
          <Newsletter />
          <Contributors /> */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

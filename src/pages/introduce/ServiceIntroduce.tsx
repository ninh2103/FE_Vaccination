import React, { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const AboutUS: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  // Giả lập độ trễ loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    },500) // Độ trễ 2 giây để mô phỏng loading

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='flex items-center justify-center text-muted-foreground'>
            <LoadingSpinner className='mr-2 h-10 w-10' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header />
      <header className='max-w-7xl mt-[7rem] relative bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white py-16 flex flex-col justify-center items-center mx-auto rounded-3xl'>
        <div className='absolute inset-0 bg-blue-900 opacity-10'></div>
        <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-10'>
          <div className='md:w-1/2 text-center md:text-left'>
            <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white bg-clip-text'>
              VaxBot Vaccination Center
            </h1>
            <p className='text-lg md:text-xl mb-6'>
              Providing top-tier vaccination services with advanced technology and a dedicated team of experts.
            </p>
            <a
              href='/vaccination/list'
              className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
            >
              Book Now
            </a>
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0'>
            <img
              src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
              alt='Hero Image - Vaccination Center'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className='py-16 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              About VaxBot
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto mt-4'>
              VaxBot Vaccination Center was established with a mission to protect community health through comprehensive
              vaccination services. We pride ourselves on being pioneers in delivering specialized vaccination
              solutions, combining cutting-edge technology with an experienced team.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <img
                src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg'
                alt='About Us - Medical Team'
                className='w-full h-auto rounded-lg shadow-lg'
              />
            </div>
            <div>
              <h3 className='text-3xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Our Mission
              </h3>
              <p className='text-gray-600 mb-4'>
                We are committed to providing safe and effective vaccination services to prevent diseases and promote
                community health. Every client at VaxBot receives personalized care with tailored vaccination schedules.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-center text-gray-600'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Leading team of vaccination experts.
                </li>
                <li className='flex items-center text-gray-600'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Advanced vaccination technology.
                </li>
                <li className='flex items-center text-gray-600'>
                  <svg
                    className='w-6 h-6 text-teal-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                  Dedicated customer care services.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-2 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Why Choose VaxBot?
            </h2>
            <p className='text-gray-600'>
              We take pride in delivering high-quality services with dedication and professionalism.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='p-6 text-center'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 20h5v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4v2h5z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 12a4 4 0 100-8 4 4 0 000 8z'
                  />
                </svg>
              </div>
              <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Top Experts
              </h4>
              <p className='text-gray-600'>
                Our team consists of vaccination specialists with over 20 years of experience.
              </p>
            </div>
            <div className='p-6 text-center'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Certified Vaccines
              </h4>
              <p className='text-gray-600'>We use vaccines from globally trusted brands.</p>
            </div>
            <div className='p-6 text-center'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 7V3m8 4V3m-6 8h12M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Flexible Booking
              </h4>
              <p className='text-gray-600'>Online booking support 24/7, fast and convenient.</p>
            </div>
            <div className='p-6 text-center'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-12 h-12 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h4 className='text-xl font-medium bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Long-Term Monitoring
              </h4>
              <p className='text-gray-600'>Regular health monitoring programs with dedicated care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-2 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-2'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-gray-600'>Below are common questions our clients ask us.</p>
          </div>
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                What should I prepare before vaccination?
              </h4>
              <p className='text-gray-600'>
                Bring identification documents, medical records (if any), and inform the doctor about your current
                health condition.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Is vaccination at VaxBot safe?
              </h4>
              <p className='text-gray-600'>
                Absolutely safe! We use internationally certified vaccines and follow strict vaccination protocols.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Can I book for my entire family?
              </h4>
              <p className='text-gray-600'>
                Yes, we offer family vaccination packages with discounted rates and flexible scheduling.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                What should I do after vaccination?
              </h4>
              <p className='text-gray-600'>
                Rest, stay hydrated, and monitor for any post-vaccination reactions. Contact us immediately if you
                notice anything unusual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id='booking'
        className='mt-[3rem] max-w-7xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white flex flex-col justify-center items-center mx-auto px-4 text-center rounded-3xl'
      >
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Protect Your Health Today!</h2>
          <p className='text-lg mb-6 max-w-2xl mx-auto'>
            Book your vaccination appointment now to receive special offers and ensure long-term health.
          </p>
          <a
            href='/vaccination/list'
            className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Contact and Map Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Contact VaxBot
            </h2>
            <p className='text-gray-600'>Visit our center or contact us for prompt support.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div className='flex flex-col justify-center'>
              <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Center Information
              </h3>
              <p className='text-gray-600 mb-4'>
                <strong>Address:</strong> 120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu, Da Nang
              </p>
              <p className='text-gray-600 mb-4'>
                <strong>Phone:</strong> 1900.1900
              </p>
              <p className='text-gray-600 mb-4'>
                <strong>Email:</strong> contact@vaxbot.com
              </p>
              <p className='text-gray-600 mb-4'>
                <strong>Working Hours:</strong> Monday - Saturday, 8:00 AM - 5:00 PM
              </p>
            </div>
            {/* Google Maps */}
            <div>
              <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Map
              </h3>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.311996577007!2d108.15752167582252!3d16.049291584627337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421938d61a3ce5%3A0x29d80f3ebbdcb44a!2zxJDhuqFpIEjhu41jIER1eSBUw6JuIEjDsmEgS2jDoW5oIE5hbQ!5e0!3m2!1svi!2s!4v1745053887238!5m2!1svi!2s'
                width='100%'
                height='400'
                style={{ border: 0 }}
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUS

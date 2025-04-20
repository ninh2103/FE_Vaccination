import React from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const AboutUS = () => {
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
              className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300'
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
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                We are committed to providing safe and effective vaccination services to prevent diseases and promote
                community health. Every client at VaxBot receives personalized care with tailored vaccination schedules.
              </p>
              <ul className='space-y-3'>
                <li className='flex via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
                <li className='flex via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
                <li className='flex via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Why Choose VaxBot?
            </h2>
            <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
              <p className='text_blue-300 via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                We use vaccines from globally trusted brands.
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
              <p className='text_blue-300 via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                Online booking support 24/7, fast and convenient.
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
              <p className='text_blue-300 via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                Regular health monitoring programs with dedicated care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              What Our Clients Say
            </h2>
            <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
              Client satisfaction drives us to continuously improve and innovate.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-xl shadow-lg'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://chothuestudio.com/wp-content/uploads/2024/07/TCA_3837.jpg'
                  alt='User 1'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='text-lg font-semibold text-gray-800'>Nguyen Van An</h4>
                  <p className='text-gray-500'>Client</p>
                </div>
              </div>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                "I'm very satisfied with VaxBot's services. The doctors are attentive, and the vaccination process is
                quick and safe."
              </p>
            </div>
            <div className='bg-white p-8 rounded-xl shadow-lg'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPuR7dCLass9HDnvg3kDRB4ia3iab4Cy5JA&s'
                  alt='User 2'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='text-lg font-semibold text-gray-800'>Tran Thi Bich</h4>
                  <p className='text-gray-500'>Client</p>
                </div>
              </div>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                "Flexible scheduling and easy online booking. I feel more confident about my health after joining the
                vaccination program."
              </p>
            </div>
            <div className='bg-white p-8 rounded-xl shadow-lg'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P9u9rorGjwptFOwgGye1i8xdcyUKbC1cwUCTSUl0mVsC0SwdrqxtE_uIvVIOxhP6Dl4&usqp=CAU'
                  alt='User 3'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='text-lg font-semibold text-gray-800'>Le Minh Chau</h4>
                  <p className='text-gray-500'>Client</p>
                </div>
              </div>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                "High-quality vaccines and enthusiastic consultations. I'll continue using VaxBot's services."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
              Below are common questions our clients ask us.
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                What should I prepare before vaccination?
              </h4>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                Bring identification documents, medical records (if any), and inform the doctor about your current
                health condition.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Is vaccination at VaxBot safe?
              </h4>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                Absolutely safe! We use internationally certified vaccines and follow strict vaccination protocols.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Can I book for my entire family?
              </h4>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                Yes, we offer family vaccination packages with discounted rates and flexible scheduling.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <h4 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                What should I do after vaccination?
              </h4>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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
        className='max-w-7xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white flex flex-col justify-center items-center mx-auto px-4 text-center rounded-3xl'
      >
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Protect Your Health Today!</h2>
          <p className='text-lg mb-8 max-w-2xl mx-auto'>
            Book your vaccination appointment now to receive special offers and ensure long-term health.
          </p>
          <a
            href='/vaccination/list'
            className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300'
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
            <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
              Visit our center or contact us for prompt support.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div className='flex flex-col justify-center'>
              <h3 className='text-2xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
                Center Information
              </h3>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                <strong>Address:</strong> 120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu, Da Nang
              </p>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                <strong>Phone:</strong> 1900.1900
              </p>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
                <strong>Email:</strong> contact@vaxbot.com
              </p>
              <p className='via-teal-400 to-green-400text-gray-600 bg-clip-text mb-2'>
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

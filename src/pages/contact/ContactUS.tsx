import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const Contact = () => {
  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header />

      {/* Hero Section */}
      <header className='mt-[7rem] max-w-7xl mt-20 relative bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white py-16 flex flex-col justify-center items-center mx-auto rounded-3xl'>
        <div className='absolute inset-0 bg-blue-900 opacity-10 rounded-3xl'></div>
        <div className='max-w-7xl mx-auto px-4 text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white bg-clip-text mb-4 animate-fade-in'>
            Contact VaxBot
          </h1>
          <p className='text-lg md:text-xl text-white mb-6 max-w-3xl mx-auto animate-slide-up'>
            We’re here to assist you with all your vaccination needs. Reach out via our hotline, email, or visit one of
            our 100+ centers nationwide for expert care.
          </p>
          <a
            href='#contact-form'
            className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105'
          >
            Send Us a Message
          </a>
        </div>
      </header>

      {/* Contact Information Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Get in Touch
            </h2>
            <p className='text-lg text-gray-900 max-w-3xl mx-auto'>
              Connect with VaxBot for vaccination inquiries, appointments, or feedback. Our team is available 24/7 to
              support you.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-lg transition duration-300'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-10 h-10 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Hotline</h3>
              <p className='text-gray-900'>
                Call us 24/7 at{' '}
                <a href='tel:1900123456' className='text-teal-600 '>
                  1900 1900
                </a>{' '}
                for immediate assistance or to book an appointment.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg transition duration-300'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-10 h-10 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Email</h3>
              <p className='text-gray-900'>
                Send your inquiries to{' '}
                <a href='mailto:support@vaxbot.vn' className='text-teal-600 '>
                  support@vaxbot.com
                </a>
                . We respond within 24 hours.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg transition duration-300'>
              <div className='text-teal-500 mb-4'>
                <svg
                  className='w-10 h-10 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Social Media</h3>
              <p className='text-gray-900'>
                Follow us on{' '}
                <a
                  href='https://facebook.com/vaxbot'
                  className='text-teal-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Facebook
                </a>{' '}
                and{' '}
                <a
                  href='https://zalo.me/vaxbot'
                  className='text-teal-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Zalo
                </a>{' '}
                for updates and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className='py-16 bg-gray-50' id='contact-form'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Send Us Your Feedback
            </h2>
            <p className='text-lg text-gray-900 max-w-3xl mx-auto'>
              Your feedback is invaluable to us. Fill out the form below, and our team will get back to you promptly.
            </p>
          </div>
          <div className='max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg'>
            <form>
              <div className='mb-6'>
                <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Enter your full name'
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='phone' className='block text-gray-700 font-semibold mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Enter your phone number'
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                  placeholder='Enter your email address'
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='message' className='block text-gray-700 font-semibold mb-2'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                  rows={5}
                  placeholder='Tell us how we can assist you'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className="bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition duration-300 transform hover:scale-105 w-full sm:w-auto"              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Center Locator Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Find a VaxBot Center Near You
            </h2>
            <p className='text-lg text-gray-900 max-w-3xl mx-auto'>
              As a large-scale vaccination center, located in a prime location, close to the city center. 
            </p>
            <p className='text-lg text-gray-900 max-w-3xl mx-auto'>VaxBot ensures
            easy access to high-quality vaccines.</p>
            <p className='text-lg text-gray-900 max-w-3xl mx-auto'>Find your nearest center today.</p>
          </div>
          <div className='bg-gray-100 p-8 rounded-xl shadow-lg text-center'>
            <div className='mb-6'>
              <svg
                className='w-16 h-16 mx-auto text-teal-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </div>
            <p className='text-gray-900 mb-6'>
              Use our center locator to find a VaxBot vaccination center in your area. All centers are equipped with
              GSP-standard facilities and staffed by certified professionals.
            </p>
            <a
              href='https://maps.app.goo.gl/u1y4o9JyLtHjkaw37'
              target='_blank'
              className='inline-block bg-white text-teal-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105'
            >
              View Centers on map
            </a>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
            Your Feedback Matters
          </h2>
          <p className='text-lg text-gray-900 max-w-3xl mx-auto mb-8'>
            At VaxBot, your opinions are our most valuable asset. Share your thoughts to help us improve our services
            and better serve you.
          </p>
          <a
            href='#contact-form'
            className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white inline-block bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105'
          >
            Share Your Feedback
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact

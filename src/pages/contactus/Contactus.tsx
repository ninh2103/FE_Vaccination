import React, { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
const Contact: React.FC = () => {
  const [role, setRole] = useState<'grfather' | 'grmother' | 'brother' | 'sister'>('grfather')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [securityCode, setSecurityCode] = useState('')

  useEffect(() => {
    generateSecurityCode()
  }, [])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { role, email, additionalInfo })
  }
  const generateSecurityCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    setSecurityCode(randomCode)
  }
  return (
    <div>
      <div className=' mt-[5rem] dark:bg-gray-900/80 min-h-screen bg-gray-100 flex items-center justify-center py-10'>
        <Header />
        <div className='container mx-auto px-4 flex flex-col lg:flex-row gap-6'>
          {/* Main Content (Form) */}
          <div className='bg-blue/80 dark:bg-gray-900/80 dark:text-white flex-1 bg-white p-6 rounded-lg shadow-lg'>
            <h1 className='dark:text-white  text-2xl font-bold text-blue-800 mb-4'>CONTACT</h1>
            <div className='bg-blue-800  dark:bg-gray-900/80 dark:text-white text-white p-4 rounded-lg mb-6'>
              <p className='text-sm'>YOUR FEEDBACK IS A MEANINGFUL GIFT TO US</p>
              <p className='text-lg font-semibold mt-2'>VAXBOT VACCIN JOINT STOCK COMPANY</p>
              <p className='text-sm mt-2'>1900.1900 | contactvaxbot@gmail.com </p>
            </div>
            <p className='text-xll mt-1 italic'>Or use the form below to send us a message.</p>
            {/* Form */}
            <br />
            <form onSubmit={handleSubmit}>
              <div className='mb-10  '>
                <label className='dark:text-white block text-sm font-medium text-gray-700 mb-2'>
                  TITLE
                  <span className='text-red-500'>*</span>
                </label>
                <div className='flex gap-[4rem]'>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='grfather'
                      checked={role === 'grfather'}
                      onChange={() => setRole('grfather')}
                      className='mr-2 scale-150'
                    />
                    Grandfather
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='grmother'
                      checked={role === 'grmother'}
                      onChange={() => setRole('grmother')}
                      className='mr-2 scale-150'
                    />
                    Grandma
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='brother'
                      checked={role === 'brother'}
                      onChange={() => setRole('brother')}
                      className='mr-2 scale-150'
                    />
                    Older brother
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='sister'
                      checked={role === 'sister'}
                      onChange={() => setRole('sister')}
                      className='mr-2 scale-150'
                    />
                    Older sister
                  </label>
                </div>
              </div>

              <div className='mb-4'>
                <label className='dark:text-white block text-sm font-medium text-gray-700 mb-2'>
                  EMAIL ADDRESS
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='dark:text-white block text-sm font-medium text-gray-700 mb-2'>
                  PHONE NUMBERS
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='dark:text-white block text-sm font-medium text-gray-700 mb-2'>
                  MORE INFORMATION
                  <span className='text-red-500'>*</span>
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  rows={4}
                  required
                />
              </div>

              <div className='mb-4 flex items-center gap-4'>
                <input type='text' placeholder='Enter CAPTCHA' className='p-2 border rounded' />
                <span className='text-black bg-gray-300 p-2 rounded font-bold'>{securityCode}</span>
                <button type='button' onClick={generateSecurityCode} className='text-blue-500 underline'>
                  Refresh 
                </button>
              </div>

              <button
                type='submit'
                className='bg-blue/80 dark:bg-gray-900/80 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-bold'
              >
                SEND 
              </button>
            </form>
          </div>

          {/* Sidebar */}

          {/* Sidebar Links */}
          {/* Sidebar */}
          <div className='dark:bg-gray-900/80 w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg'>
            <div className='mt-6 space-y-2'>
              <a
                href='/vaccinregister'
                className='bg-blue/80 dark:bg-gray-900/80 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Vaccination registration
              </a>
              {/* Add more link buttons if needed */}
            </div>

            <div className='mt-2 space-y-2'>
              <a
                href='/vaccinationhistory'
                className='bg-blue/80 dark:bg-gray-900/80 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Vaccination history
              </a>
              {/* Add more link buttons if needed */}
            </div>
            <div className=' mt-2 space-y-2 '>
              <a
                href='/buyvaccines'
                className=' bg-blue/80 dark:bg-gray-900/80 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Frequently Asked Questions
              </a>
              {/* Add more link buttons if needed */}
            </div>
            {/* <h2 className='text-lg font-semibold text-blue-800 mb-4'>ĐẶNG KÝ THÔNG TIN TIÊM CHỦNG</h2> */}

            {/* Additional Content */}
            <div className=' mt-2 space-y-4'>
              <div className='space-y-4'>
                <h3 className='dark:text-white text-lg font-semibold text-blue-800'>CUSTOMER CARE</h3>
                <div className='mt-2 space-y-2'>
                  <a
                    href='/contactus'
                    className='bg-blue/80 dark:bg-gray-900/80 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition'
                  >
                    💌 Request a callback
                  </a>
                  {/* Add more link buttons if needed */}
                </div>
                <p className='text-xll dark:text-white'>☎ 1900.1900</p>
                <p className='text-xll dark:text-white'>📧 info@vaxbot.com</p>
              </div>
            </div>

            {/* Link Buttons */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact

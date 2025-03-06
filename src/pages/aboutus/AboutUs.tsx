import React from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const AboutUs: React.FC = () => {
  return (
    <div className='dark:bg-gray-900'>
      <Header />
      <div className='w-[70rem] mt-[8rem] mx-auto bg-white p-8 shadow-md dark:bg-gray-800 dark:shadow-gray-700'>
        {/* Tiêu đề */}
        <div className='border-b pb-4 dark:border-gray-700'>
          <h2 className='text-2xl font-bold text-black dark:text-white'>ABOUT US</h2>
        </div>
        <h1 className='text-3xl font-bold text-blue-800 mb-6 text-center dark:text-blue-300'>
          VAXBOT VACCINE JOINT STOCK COMPANY
        </h1>

        {/* Hình ảnh tòa nhà VNVC */}
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/vnvc.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>

        {/* Nội dung văn bản */}
        <div className='text-gray-700 text-lg leading-relaxed dark:text-gray-300'>
          <p>
            Vaccine is one of the greatest medical achievements in human history. Each year, vaccination programs have
            saved approximately 3 million lives from deadly diseases while protecting nearly half of our children
            worldwide against diseases. Specifically, over the past 25 years, 6.7 million Vietnamese children,
            preventing hundreds of thousands of deaths of infectious diseases.
          </p>
          <p className='mt-4'>
            The process of mass vaccination, however, is facing immense difficulties as complex changes are emerging
            amid today’s pandemic situation. Hoping to give equal access to the wider public in order to minimize risks
            and losses, Vietnam Vaccine Joint Stock Company was established in June 2017, becoming the first system of
            high-class vaccination centers in Vietnam, contributing to our nation’s health care industry to provide a
            full range of high-quality cold-storage vaccines with stable prices.
          </p>
          <p className='mt-4'>
            With multiple centers spanning across Vietnam, VAXBOT is proud to be the first vaccination center system in
            Vietnam to adopt a GSP standard and modern cold storage system, ensuring the storage temperature from 2-8°C.
            This system is fully equipped with cutting-edge automatic monitoring technology with safety measures to
            trigger and transmit timely warnings should the temperature exceed the allowable threshold, ensuring that
            all vaccines are kept under strict and highly qualified conditions.
          </p>
          <p className='mt-4'>
            Proudly importing the latest generation of vaccines from the world’s leading manufacturers, VAXBOT provides
            many flexible vaccination services at customers’ request; on-demand, vaccine reservation, online purchasing,
            on-site vaccination service for organizations, VIP vaccination… VAXBOT also provides diverse vaccination
            packages for different age groups (children, preschool, teens, planning pregnancy women, adults) giving
            clients more options. Additionally, VAXBOT is the first vaccination system in Vietnam to implement a 6/12
            month interest-free installment payment policy, to aid those who seek financial support.
          </p>
          <p className='mt-4'>
            Committed to price stability even in times of vaccine shortage, VAXBOT candidly publishes an official price
            list on the website to help save costs, time, and effort, making the vaccination experience more pleasant
            and promising. VAXBOT as a trusted vaccination destination for millions of Vietnamese families.
          </p>
          <p className='mt-4'>
            At each center, VAXBOT has emergency rooms with standardized modern equipment approved by authorities for
            post-vaccination side effects. Those who come to VAXBOT for vaccination receive a free consultation with
            doctors. Doctors and nurses at VAXBOT have earned their certificates of safe vaccination. The nursing team
            is especially well-trained in vaccination, painless injection skills along with childcare regulations.
          </p>
          <p className='mt-4'>
            All VAXBOT facilities including injection rooms are equipped with modern and high-standard assets. The
            waiting areas exude a sense of comfort, relaxation and intimacy with a child-friendly environment thanks to
            colorful decorations. Private baby care, pantry rooms, and nursing spaces are also available for families
            with young children, charging booths and free Wi-Fi are easily accessed to ensure a pleasant waiting time.
          </p>
          <p className='mt-4'>
            Each VAXBOT client is provided with an identification code, which can be accessed at every VAXBOT center
            available in the system. This ensures a fast process during clients’ future visits while keeping their
            personal information confidential. Clients can also check their vaccination records or make appointments
            through the official website. After successful registrations for vaccinations, clients will be reminded by
            our customer care service as well as an automatic system prior to the date of appointment.
          </p>
          <p className='mt-4'>
            In order to ensure a smooth and welcome vaccination experience, VAXBOT has intensified daily working hours
            from 7:30am to 5:00pm, including weekends and public holidays.
          </p>
          <p className='mt-4'>
            In the future, VNVC plans to expand greatly, bringing high-standard vaccination services with stable prices
            closer to Vietnamese citizens nationwide.
          </p>
        </div>

        {/* Các hình ảnh khác */}
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/refrigerated-vehicles-transport-vaccines.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/gsp-cold-storage.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/cold-storage-for-vaccine-preservation.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/vnvc-customers.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/children-play-area.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/refrigerator-to-store-vaccines.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
        <div className='flex justify-center mb-6'>
          <img
            src='https://vnvc.vn/wp-content/uploads/2024/05/vnvc-1.jpg'
            alt='VNVC Building'
            className='w-full max-w-3xl h-auto object-cover rounded-lg'
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs

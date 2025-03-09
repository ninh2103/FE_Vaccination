import React from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const AboutUs = () => {
  // Additional images array
  const additionalImages = [
    {
      src: 'https://xaydungnhauytin.com/uploads/mau-nha-dep/08-2023/thiet-ke-trung-tam-tiem-chung-le-tan-05112022.jpg',
      alt: 'Reception Area'
    },
    { src: 'https://media.thuonghieucongluan.vn/uploads/2019_07_08/vnvc-1562549246.png', alt: 'Modern Facilities' },
    {
      src: 'https://kholanhhanoi.vn/wp-content/uploads/2021/08/kho-lanh-bao-quan-vac-xin-ha-noi.jpg',
      alt: 'Vaccine Cold Storage'
    },
    {
      src: 'https://benhvienphuongdong.vn/public/uploads/chuyen-khoa/trung-tam-tiem-chung-bvdk-phuong-dong.jpeg',
      alt: 'Customer Service'
    },
    {
      src: 'https://www.vinmec.com/static/uploads/small_20191203_040114_082646_Chinh_sach_hoan_tra_max_1800x1800_jpg_b65b0bf992.jpg',
      alt: 'Children Play Area'
    },
    {
      src: 'https://vnvc.vn/wp-content/uploads/2024/05/refrigerator-to-store-vaccines.jpg',
      alt: 'Vaccine Refrigerator'
    }
  ]

  // Contact information object
  const contactInfo = {
    hotline: '1900.1900',
    email: 'info@vaxbot.vn',
    workingTime: '08:00 - 19:00 (including weekends and holidays)',
    address: '120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu, Da Nang'
  }

  return (
    <div className='dark:bg-gray-900 min-h-screen'>
      <Header />
      <main className='max-w-7xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-gray-700'>
        {/* Header Section */}
        <section className='border-b pb-4 dark:border-gray-600'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>About Us</h2>
        </section>
        <h1 className='text-4xl font-bold text-gray-700 mt-6 mb-8 text-center dark:text-blue-300'>
          VAXBOT - Smart & Modern Vaccination Center
        </h1>

        {/* Main Image */}
        <div className='flex justify-center mb-8'>
          <img
            src='https://truyenhinhthanhhoa.qltns.mediacdn.vn/dataimages/201907/original/resize_images5531140_Screenshot_10.jpg'
            alt='VAXBOT Building'
            className='w-full max-w-4xl h-auto object-cover rounded-lg shadow-md'
          />
        </div>

        {/* Introduction Content */}
        <section className='text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-6'>
          <p>
            In the age of Industry 4.0, health is more than a priority—it’s the cornerstone of a vibrant life.
            Established in February 2017, VAXBOT - Smart Vaccination Center leads the way in Vietnam with a cutting-edge
            vaccination system. We combine high-quality vaccines with innovative technology to bring world-class
            healthcare to every Vietnamese family.
          </p>
          <p>
            As Vietnam’s pioneer in GSP-standard cold storage, VAXBOT ensures vaccines are stored at a consistent 2-8°C
            using advanced automated monitoring systems. With real-time alerts for any temperature deviations, we
            guarantee vaccine quality and safety, giving you confidence in every dose.
          </p>
          <p>
            Partnering with the world’s top vaccine manufacturers, VAXBOT delivers tailored vaccination experiences:
            from online bookings and on-site corporate services to exclusive VIP packages. Our offerings span all
            ages—infants, teens, adults, and expectant mothers—while our 6-12 month interest-free payment plans make
            health accessible to all.
          </p>
          <p>
            At VAXBOT, smart technology enhances every step. Clients receive a unique ID for seamless access to
            vaccination records across our nationwide network, with privacy assured. Our user-friendly website lets you
            book appointments, track histories, and get reminders effortlessly. Transparent pricing, even during
            shortages, ensures trust and convenience.
          </p>
          <p>
            Our centers blend comfort and modernity: enjoy child-friendly play areas, private nursing rooms, free Wi-Fi,
            and charging stations. Certified doctors and nurses, skilled in painless injections, provide care you can
            rely on, backed by fully equipped emergency rooms for added safety.
          </p>
          <p>
            Open from 08:00 to 19:00, including weekends and holidays, VAXBOT is here when you need us. Our goal? To
            expand nationwide, delivering smart, modern vaccination services that empower healthier communities and a
            brighter future for Vietnam.
          </p>

          {/* Contact Information */}
          <div className='mt-10'>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>Contact Information</h2>
            <ul className='space-y-2 text-gray-600 dark:text-gray-300'>
              <li>
                <span className='font-medium'>Hotline:</span> {contactInfo.hotline}
              </li>
              <li>
                <span className='font-medium'>Email:</span> {contactInfo.email}
              </li>
              <li>
                <span className='font-medium'>Working Hours:</span> {contactInfo.workingTime}
              </li>
              <li>
                <span className='font-medium'>Address:</span> {contactInfo.address}
              </li>
            </ul>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className='mt-12'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>Find Us on the Map</h3>
          <div className='flex justify-center'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.313016915049!2d108.15750744026255!3d16.049238584691363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421938d0d481bb%3A0x7d23676f51c1bf4b!2zMTIwIEhvw6BuZyBNaW5oIFRo4bqjbywgSG_DoCBLaMOhbmggTmFtLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1741485580304!5m2!1svi!2s'
              width='100%'
              height='400'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              className='rounded-lg shadow-md w-full max-w-5xl'
            />
          </div>
        </section>

        {/* Additional Images */}
        <section className='mt-12'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>Explore Our Vaccination Center</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {additionalImages.map((image, index) => (
              <div key={index} className='flex justify-center'>
                <img
                  src={image.src}
                  alt={image.alt}
                  className='w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300'
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs

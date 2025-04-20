
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const Services = () => {
  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header />

      {/* Hero Section */}
      <header className='max-w-7xl mt-[7rem]  mt-20 relative bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white py-16 flex flex-col justify-center items-center mx-auto rounded-3xl'>
        <div className='absolute inset-0 bg-blue-900 opacity-10 rounded-3xl'></div>
        <div className='max-w-7xl mx-auto px-4 text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-white bg-clip-text mb-4 animate-fade-in'>
            VaxBot Vaccination Services
          </h1>
          <p className='text-lg md:text-xl text-white mb-6 max-w-3xl mx-auto animate-slide-up'>
            Explore VaxBot’s comprehensive vaccination services, offering over 50 high-quality vaccines for all ages,
            delivered with cutting-edge technology, safety, and care at 100+ centers nationwide.
          </p>
          <a
            href='/vaccination/list'
            className='inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105'
          >
            Book Your Appointment
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Comprehensive Vaccination Services
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              VaxBot offers a full spectrum of vaccination services for newborns, children, adults, and special groups,
              with over 50 vaccines protecting against 40+ diseases. Our 100+ centers ensure accessibility, safety, and
              affordability across Vietnam.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Service 1: Pediatric Vaccinations */}
            <div className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2'>
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
                    d='M12 4.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5zm0 12c3.5 0 6.5 1.5 6.5 3.5v1h-13v-1c0-2 3-3.5 6.5-3.5z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Pediatric Vaccinations
              </h3>
              <p className='text-gray-600'>
                Tailored vaccine packages for children from 0-24 months, including 6-in-1 (diphtheria, pertussis,
                tetanus, hepatitis B, Hib, polio) and vaccines for measles, rotavirus, and pneumococcal disease. Our
                packages (9-30 doses) protect against 22+ diseases, with free check-ups and app-based reminders.
              </p>
            </div>
            {/* Service 2: Preschool & Adolescent Vaccinations */}
            <div className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2'>
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
                </svg>
              </div>
              <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Preschool & Adolescent Vaccinations
              </h3>
              <p className='text-gray-600'>
                Packages for preschoolers (10 vaccines, 14 doses) and adolescents (15 doses), protecting against 19+
                diseases like HPV, meningococcal, and varicella. Ensures school readiness and long-term immunity with
                personalized schedules via the VaxBot app.
              </p>
            </div>
            {/* Service 3: Adult & Pregnant Women Vaccinations */}
            <div className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2'>
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
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7c-3 0-6 1.5-6 3.5v1h12v-1c0-2-3-3.5-6-3.5z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Adult & Pregnant Women Vaccinations
              </h3>
              <p className='text-gray-600'>
                Vaccines for adults (influenza, shingles, HPV) and pregnant women (11 doses for 17 diseases, e.g., flu,
                Tdap). Includes rare vaccines like dengue and zoster, with pre-vaccination screenings and flexible
                payment plans for affordability.
              </p>
            </div>
            {/* Service 4: VIP & On-Demand Vaccinations */}
            <div className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2'>
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
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 9.143 15.714 12l2.286 6.857L12 15.714 6.286 18.571l2.286-6.857L3 9.143 8.714 6.286 11 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                VIP & On-Demand Vaccinations
              </h3>
              <p className='text-gray-600'>
                Premium VIP services with private rooms, no wait times, and Montessori play areas. On-demand
                vaccinations for travelers, students, and corporates, including typhoid and rabies, with international
                certificates and priority booking.
              </p>
            </div>
            {/* Service 5: Corporate & Mobile Vaccinations */}
            <div className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2'>
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
              <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-2'>
                Corporate & Mobile Vaccinations
              </h3>
              <p className='text-gray-600'>
                On-site vaccination programs for businesses and schools, offering group discounts and tailored
                schedules. Mobile units bring vaccines to remote areas, ensuring accessibility with GSP-standard
                transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              State-of-the-Art Facilities & Safety
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              VaxBot’s advanced infrastructure and rigorous safety protocols ensure the highest standards of vaccine
              quality and customer comfort at every step.
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
                    d='M3 7h18M3 11h18M3 15h18M3 19h18'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>GSP-Standard Cold Chain</h3>
              <p className='text-gray-600'>
                Our cold storage system, with 3 power sources, maintains 2-8°C for 200 million doses, monitored 24/7 to
                ensure vaccine potency, with GSP-compliant transport nationwide.
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
                    d='M12 18h.01M8 21h8m-8-4h8m-8-4h8m-8-4h8'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Modern Centers</h3>
              <p className='text-gray-600'>
                100+ centers with private screening rooms, injection suites, and post-vaccination monitoring areas.
                Features play zones, nursing rooms, free Wi-Fi, and purified water.
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
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>8-Step Safety Protocol</h3>
              <p className='text-gray-600'>
                Rigorous 8-step process includes pre-screening, expert consultation, painless injections, and 30-minute
                post-vaccination monitoring, ensuring safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VaxBot Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 text-transparent bg-clip-text mb-4'>
              Why Choose VaxBot?
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              VaxBot delivers unmatched vaccination services with a focus on safety, accessibility, and customer
              satisfaction, trusted by millions across Vietnam.
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
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>High-Quality Vaccines</h3>
              <p className='text-gray-600'>
                Partnerships with GSK, Sanofi, Pfizer, and Merck ensure access to 50+ certified vaccines, including rare
                ones like zoster and dengue, at stable prices.
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
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Expert Care</h3>
              <p className='text-gray-600'>
                Over 5,000 trained doctors and nurses provide painless injections and personalized consultations, with
                free pre- and post-vaccination support.
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
                    d='M3 10h18M3 14h18M3 6h18M3 18h18'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Convenience & Affordability</h3>
              <p className='text-gray-600'>
                Free services (check-ups, Wi-Fi, play areas), 0% interest payment plans, and 24/7 app booking at 100+
                centers ensure accessibility for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='max-w-7xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white flex flex-col justify-center items-center mx-auto px-4 text-center rounded-3xl my-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Protect Your Family with VaxBot</h2>
        <p className='text-lg mb-8 max-w-2xl mx-auto'>
          Join millions of satisfied customers and book your vaccination today. Experience our premium services and
          safeguard your health with ease.
        </p>
        <a
          href='/vaccination/list'
          className='inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105'
        >
          Book Now
        </a>
      </section>

      <Footer />
    </div>
  )
}

export default Services

import React, { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const Services: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  // Giả lập độ trễ loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Độ trễ 2 giây để mô phỏng loading

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

      {/* Hero Section */}
      <header className='relative mx-auto mt-[7rem] max-w-7xl rounded-3xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white'>
        <div className='absolute inset-0 rounded-3xl bg-blue-900 opacity-20' />
        <div className='relative z-10 mx-auto max-w-7xl px-4 text-center'>
          <h1 className='mb-4 animate-fade-in text-4xl font-extrabold text-white md:text-5xl'>
            VaxBot Vaccination Services
          </h1>
          <p className='mx-auto mb-6 max-w-3xl animate-slide-up text-lg text-white md:text-xl'>
            Discover VaxBot’s premium vaccination services, offering over 50 high-quality vaccines for all ages,
            delivered with cutting-edge technology, safety, and personalized care at our flagship center.
          </p>
          <a
            href='/vaccination/list'
            className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
          >
            Book Now
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section className='bg-white py-16'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-4xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent md:text-5xl'>
              Comprehensive Vaccination Services
            </h2>
            logram
            <p className='mx-auto max-w-3xl text-lg text-gray-900'>
              VaxBot provides a full spectrum of vaccination services for newborns, children, adults, and special
              groups, with over 50 vaccines protecting against 40+ diseases. Our flagship center ensures the highest
              standards of safety, comfort, and care.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {/* Service 1: Pediatric Vaccinations */}
            <div className='group rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border hover:border-teal-400'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50 transition duration-300 group-hover:bg-teal-100'>
                  <svg
                    className='h-12 w-12 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Pediatric Vaccinations
              </h3>
              <p className='text-gray-900'>
                Tailored vaccine packages for children from 0-24 months, including 6-in-1 (diphtheria, pertussis,
                tetanus, hepatitis B, Hib, polio) and vaccines for measles, rotavirus, and pneumococcal disease. Our
                packages (9-30 doses) protect against 22+ diseases, with free check-ups and app-based reminders.
              </p>
            </div>
            {/* Service 2: Preschool & Adolescent Vaccinations */}
            <div className='group rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border hover:border-teal-400'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50 transition duration-300 group-hover:bg-teal-100'>
                  <svg
                    className='h-12 w-12 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Preschool & Adolescent Vaccinations
              </h3>
              <p className='text-gray-900'>
                Packages for preschoolers (10 vaccines, 14 doses) and adolescents (15 doses), protecting against 19+
                diseases like HPV, meningococcal, and varicella. Ensures school readiness and long-term immunity with
                personalized schedules via the VaxBot app.
              </p>
            </div>
            {/* Service 3: Adult & Pregnant Women Vaccinations */}
            <div className='group rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border hover:border-teal-400'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50 transition duration-300 group-hover:bg-teal-100'>
                  <svg
                    className='h-12 w-12 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Adult & Pregnant Women Vaccinations
              </h3>
              <p className='text-gray-900'>
                Vaccines for adults (influenza, shingles, HPV) and pregnant women (11 doses for 17 diseases, e.g., flu,
                Tdap). Includes rare vaccines like dengue and zoster, with pre-vaccination screenings and flexible
                payment plans for affordability.
              </p>
            </div>
            {/* Service 4: VIP & On-Demand Vaccinations */}
            <div className='group rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border hover:border-teal-400'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50 transition duration-300 group-hover:bg-teal-100'>
                  <svg
                    className='h-12 w-12 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                VIP & On-Demand Vaccinations
              </h3>
              <p className='text-gray-900'>
                Premium VIP services with private rooms, no wait times, and Montessori play areas. On-demand
                vaccinations for travelers, students, and corporates, including typhoid and rabies, with international
                certificates and priority booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className='bg-gray-50 py-16'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-4xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent md:text-5xl'>
              State-of-the-Art Facilities & Safety
            </h2>
            <p className='mx-auto max-w-3xl text-lg text-gray-900'>
              VaxBot’s flagship center features advanced infrastructure and rigorous safety protocols, ensuring the
              highest standards of vaccine quality and customer comfort.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                GSP-Standard Cold Chain
              </h3>
              <p className='text-gray-900'>
                Our cold storage system, with 3 power sources, maintains 2-8°C for 200 million doses, monitored 24/7 to
                ensure vaccine potency, with GSP-compliant transport.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Modern Center
              </h3>
              <p className='text-gray-900'>
                Our flagship center features private screening rooms, injection suites, and post-vaccination monitoring
                areas, with play zones, nursing rooms, free Wi-Fi, and purified water.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                8-Step Safety Protocol
              </h3>
              <p className='text-gray-900'>
                Rigorous 8-step process includes pre-screening, expert consultation, painless injections, and 30-minute
                post-vaccination monitoring, ensuring safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VaxBot Section */}
      <section className='bg-white py-16'>
        <div className='mx-auto max-w-7xl px-4'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-4xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent md:text-5xl'>
              Why Choose VaxBot?
            </h2>
            <p className='mx-auto max-w-3xl text-lg text-gray-900'>
              VaxBot delivers unmatched vaccination services with a focus on safety, exclusivity, and customer
              satisfaction at our flagship center, with plans to expand nationwide.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                High-Quality Vaccines
              </h3>
              <p className='text-gray-900'>
                Partnerships with GSK, Sanofi, Pfizer, and Merck ensure access to 50+ certified vaccines, including rare
                ones like zoster and dengue, at stable prices.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Expert Care
              </h3>
              <p className='text-gray-900'>
                Our team of 50+ trained doctors and nurses provides painless injections and personalized consultations,
                with free pre- and post-vaccination support.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105'>
              <div className='mb-4 flex justify-center'>
                <div className='rounded-full p-4 bg-teal-50'>
                  <svg
                    className='h-10 w-10 text-teal-500'
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
              </div>
              <h3 className='mb-2 text-xl font-semibold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
                Convenience & Affordability
              </h3>
              <p className='text-gray-900'>
                Free services (check-ups, Wi-Fi, play areas), 0% interest payment plans, and 24/7 app booking at our
                flagship center ensure accessibility for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='mx-auto my-16 max-w-7xl rounded-3xl border border-teal-200 bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-center text-white shadow-lg'>
        <h2 className='mb-6 text-4xl font-bold text-white md:text-5xl'>Protect Your Family with VaxBot</h2>
        <p className='mx-auto mb-8 max-w-2xl text-lg'>
          Join thousands of satisfied customers and book your vaccination today. Experience our premium services at our
          flagship center and safeguard your health with ease.
        </p>
        <a
          href='/vaccination/list'
          className='bg-black w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold text-lg inline-block'
        >
          Book Now
        </a>
      </section>

      <Footer />
    </div>
  )
}

export default Services

import React from 'react';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

const VaccinationSchedule = () => {
  return (
    <div className=" mt-[5rem] min-h-screen bg-gray-100 dark:bg-gray-900/80 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Banner */}
          <section className="mb-8">
            <div
              className="w-full h-48 sm:h-56 md:h-64 bg-cover bg-center rounded-xl shadow-md"
              style={{
                backgroundImage: "url('https://vnvc.vn/wp-content/uploads/2016/07/dc-tracuu.jpg')",
              }}
            />
          </section>

          {/* Main Content */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
              💉 Check Your Vaccination History
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-6 text-center">
              Thank you for choosing <span className="font-semibold">VAXBOT</span> Vaccination Services
            </h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                At VAXBOT, we’re committed to making your healthcare experience seamless and convenient. To review your
                vaccination history, you can:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Contact our dedicated support team via{' '}
                  <span className="font-semibold">Hotline: 1900 1900</span> for personalized assistance and advice on
                  vaccine packages.
                </li>
                <li>
                  Log in to your <span className="font-semibold">Personal Information Page</span> using the phone number
                  registered with your vaccination account to view your records online.
                </li>
              </ul>
              <p>
                Our friendly staff is here to provide tailored recommendations, ensuring you stay protected and informed
                every step of the way.
              </p>
              <p>
                We’re continuously enhancing our services to meet your growing expectations. Stay tuned for exciting
                updates as we work to bring you an even better experience in the near future!
              </p>
              <p className="italic text-center">
                Thank you for your trust and understanding. Wishing you good health and success!
              </p>
            </div>
            {/* Call-to-Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:19001900"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                ☎️ Call Now: 1900 1900
              </a>
              <a
                href="/personal-info" // Placeholder link, replace with actual URL
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
              >
                📅 View Online
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VaccinationSchedule;
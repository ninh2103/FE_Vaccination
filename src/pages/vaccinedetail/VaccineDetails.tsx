// src/components/VaccinePage.tsx

import React from 'react'
import { useNavigate } from 'react-router-dom' // Sử dụng react-router-dom để chuyển hướng
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

const VaccinePage: React.FC = () => {
  const navigate = useNavigate()

  // Hàm xử lý khi nhấn nút "ĐẶT CHỖ"
  const handleBookNow = () => {
    // Chuyển hướng đến link đặt lịch (thay bằng link thực tế)
    window.location.href = '/vaccinregister' // Hoặc sử dụng navigate('/booking') nếu dùng react-router
  }

  return (
    <div>
      <div className='max-w-[80rem] mx-auto p-6 bg-gray-100 font-sans'>
        <Header />
        {/* Header Section */}
        <div className='flex flex-col md:flex-row gap-6 mt-[7rem]'>
          {/* Vaccine Info */}
          <div className='bg-blue-900 text-white p-6 rounded-lg w-full md:w-1/3'>
            <h1 className='text-2xl font-bold mb-2'>VAXIGRIP TETRA SEASONAL FLU VACCINE</h1>
            <p className='text-sm mb-4'>Disease Prevention: Influenza (Seasonal Flu)</p>
            <p className='text-3xl font-bold mb-2'>356.000 VNĐ</p>
            <button onClick={handleBookNow} className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600'>
              BUY NOW
            </button>
          </div>

          {/* Vaccine Image and Manufacturer */}
          <div className='flex-1 bg-white p-6 rounded-lg shadow-md'>
            <p className='text-gray-600 text-sm mb-2 italic '>
              Customers who want to reserve will be offered a preferential retail price/discounted retail price (if
              any). On condition that the Customer completes the injection within 6 weeks from the date of payment
              confirmation. The program will be extended until further notice.
            </p>
            <div className='flex items-center gap-14'>
              <img
                src='https://cdn.e-plus.vn/1e6467af904e4bd1be836a66c671f1ba.jpg' // Thay bằng đường dẫn đến logo vaccine
                alt='Vắc xin Vaxigrip Tetra'
                className='w-66 h-auto'
              />
              <br></br>
            </div>
            <div>
              <p className='text-gray-600 text-sm italic '>
                Vaxigrip Tetra influenza vaccine - effective and safe flu prevention, produced by Sanofi (France).
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='bg-white p-6 mt-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold mb-4'>INFORMATION ON VAXIGRIP TETRA FLU VACCINE</h2>
          <p className='text-gray-700 mb-4'>
            According to the World Health Organization (WHO), every year, about 5-20% of adults and 20-30% of children
            are attacked by influenza worldwide, of which about 250,000 - 500,000 people die. Influenza can take the
            life of a healthy person, causing secondary infections, severe pneumonia, respiratory failure, multiple
            organ failure, ... even leading to death.
          </p>
          <p className='text-gray-700 mb-4'>
            Annual flu vaccination is the most effective, simple and cost-effective way to proactively prevent flu.
          </p>

          {/* Vaccine Details */}
          <h3 className='text-lg font-semibold mb-2'>
            Detailed information about Vaxigrip Tetra seasonal flu vaccine (France)
          </h3>
          <p className='text-gray-700 mb-4'>
            Vaxigrip Tetra vaccine is manufactured by Sanofi Pasteur (France), indicated for the prevention of seasonal
            influenza caused by influenza viruses of two strains of influenza A (H1N1, H3N2) and two strains of
            influenza B (Yamagata, Victoria) for children 6 months of age and older and adults, especially those at high
            risk of complications.
          </p>
          <p className='text-gray-700 mb-4'>
            The advantage of the Vaxigrip Tetra quadrivalent influenza vaccine is that it can prevent 4 strains of virus
            with only 1 injection dose of 0.5ml. The appearance of the Vaxigrip Tetra influenza vaccine has helped
            prevent many strains of influenza more effectively, contributing to protecting and improving the health of
            communities of all ages and regions.
          </p>
          <p className='text-gray-700 mb-4'>
            Inactivated influenza vaccine can be administered at any stage of pregnancy. There are more safety data on
            vaccination in the second and third trimesters than on vaccination in the first trimester; however, global
            data indicate no adverse events in the foetus or pregnancy outcome due to vaccination with inactivated
            influenza vaccine. There are no data on the use of Vaxigrip Tetra in pregnant women.{' '}
          </p>
          <h4 className='text-lg font-semibold mb-2'>Source </h4>
          <ul className='list-disc list-inside text-gray-700 mb-4'>
            <li className='ml-7'>Manufactured by: Sanofi Pasteur (France)..</li>
            <h4 className='text-lg font-semibold mb-2'>Vaccination schedule </h4>
            <p className='ml-4 italic'>Children from 6 months to under 9 years old: </p>
            <ul className='list-disc list-inside ml-7'>
              <li>Dose 1: First injection</li>
              <li>Dose 2: At least 4 weeks after dose 1</li>
              <li>Then get a booster shot every year.</li>
            </ul>
            <p className='ml-4 italic'>Children 9 years and older and adults: </p>
            <ul className='list-disc list-inside ml-7'>
              <li>One injection and booster injection every year.</li>
            </ul>
          </ul>
          <p className='ml-4 '>
            Booster vaccination should be given annually or at the beginning of seasons when there is a risk of
            outbreaks.
          </p>
          <h4 className='text-lg font-semibold mb-2'>Use of vaccines in pregnant and lactating women</h4>
          <p className='ml-4 italic'>Pregnant women: </p>
          <ul className='list-disc list-inside ml-7'>
            <li>
              Inactivated influenza vaccine can be administered at any stage of pregnancy. Safety data for use in the
              second and third trimesters are greater than for use in the first trimester; however, global data indicate
              no adverse fetal or pregnancy outcomes associated with inactivated influenza vaccine. Currently,
            </li>
            <li>
              Animal studies with Vaxigrip Tetra vaccine have shown no direct or indirect harmful effects with respect
              to pregnancy, embryonal development or early postnatal development.
            </li>
          </ul>
          <p className='ml-4 italic'>Breastfeeding women: </p>
          <ul className='list-disc list-inside ml-7'>
            <li>Vaxigrip Tetra vaccine can be used while breastfeeding.</li>
          </ul>
          <p className='ml-4 italic'>Fertility: </p>
          <ul className='list-disc list-inside ml-7'>
            <li>
              There are no data on the effects on human fertility. Animal studies have shown no harmful effects on
              fertility.
            </li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Dosage</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>Dose 0.5 ml for children 6 months and older and adults</li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Injection route</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>Intramuscular or subcutaneous injection</li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Contraindications</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>
              Hypersensitivity to the active substances, to any of the excipients listed in the “ingredients” section or
              to any of the substances that may be present even in trace amounts such as egg (ovalbumin, chicken
              protein), neomycin, formaldehyde and octoxynol-9.
            </li>
            <li> Postpone vaccination in people with moderate or high fever or acute illness.</li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Undesirable effects</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>Local reactions: erythema (red halo), swelling, pain, ecchymosis, induration.</li>
            <li>Systemic reactions: fever, malaise, chills, fatigue, headache, sweating, arthralgia and myalgia.</li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Use with caution</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>Vaxigrip Tetra should not be injected into a vein.</li>
            <li>Use with caution in people with immunodeficiency, thrombocytopenia or bleeding disorders.</li>
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Preserve</h4>
          <ul className='list-disc list-inside ml-7'>
            <li>Vaxigrip Tetra vaccine is stored at 2-8 degrees Celsius. Do not freeze and protect from light.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VaccinePage

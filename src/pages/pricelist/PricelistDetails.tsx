import React, { useState, useMemo, useCallback } from 'react'
import {
  FaStethoscope,
  FaBell,
  FaChild,
  FaUserAlt,
  FaFemale,
  FaPlusCircle,
  FaSyringe,
  FaUser,
  FaShieldAlt,
  FaClock,
  FaBox,
  FaRecycle,
  FaCheckCircle,
  FaUserCheck
} from 'react-icons/fa'
import { MdChildCare } from 'react-icons/md'
import { IoMdWarning, IoIosStats } from 'react-icons/io'
import Banner from '@/pages/pricelist/Banner'
type Vaccine = {
  id: number
  name: string
  usage: string
  country: string
  price: string
  status: string
}
const parsePrice = (price: string) => {
  const parsed = parseInt(price.replace(/[^0-9]/g, ''), 10)
  return isNaN(parsed) ? 0 : parsed
}
const Filter: React.FC<{
  filterOption: string
  onFilterChange: (value: string) => void
}> = ({ filterOption, onFilterChange }) => (
  <div className='mb-6'>
    <div className='flex justify-end gap-6'>
      <div className='flex items-center'>
        <select
          value={filterOption}
          onChange={(e) => onFilterChange(e.target.value)}
          className='p-2 border rounded-lg shadow-sm bg-white'
          aria-label='Select filter and sort'
        >
          <option value=''>Sort By</option>
          <option value='filter-c-on'>In Stock</option>
          <option value='filter-h-on'>Out of stock</option>
          <option value='sort-asc'>Rising price</option>
          <option value='sort-desc'>Declining prices</option>
        </select>
      </div>
    </div>
  </div>
)

const VaccinePrices: React.FC = () => {
  const prices: Vaccine[] = [
    {
      id: 1,
      name: 'COVID-19 Vaccine',
      usage: 'COVID-19 Prevention',
      country: 'Vietnam',
      price: '800,000 VND',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Influenza Vaccine',
      usage: 'Prevention of seasonal flu',
      country: 'Japan',
      price: '250,000 VND',
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Rabies Vaccine',
      usage: 'Prevention of rabies',
      country: 'USA',
      price: '1,500,000 VND',
      status: 'Out of stock'
    },
    {
      id: 4,
      name: 'Hepatitis B Vaccine',
      usage: 'Hepatitis B Prevention',
      country: 'India',
      price: '700,000 VND',
      status: 'In Stock'
    },
    {
      id: 5,
      name: 'HPV vaccine',
      usage: 'Prevention of cervical cancer',
      country: 'English',
      price: '2,000,000 VND',
      status: 'In Stock'
    },
    {
      id: 6,
      name: 'Measles Vaccine',
      usage: 'Prevention of measles',
      country: 'USA',
      price: '500,000 VND',
      status: 'In Stock'
    },
    {
      id: 7,
      name: 'Polio Vaccine',
      usage: 'Polio Prevention',
      country: 'France',
      price: '900,000 VND',
      status: 'In Stock'
    },
    {
      id: 8,
      name: 'Chickenpox Vaccine',
      usage: 'Chickenpox Prevention',
      country: 'Australia',
      price: '600,000 VND',
      status: 'Out of stock'
    },
    {
      id: 9,
      name: 'Meningitis Vaccine',
      usage: 'Prevention of meningitis',
      country: 'South Korea',
      price: '1,200,000 VND',
      status: 'In Stock'
    },
    {
      id: 10,
      name: 'Tetanus Vaccine',
      usage: 'Tetanus Prevention',
      country: 'Germany',
      price: '400,000 VND',
      status: 'In Stock'
    },
    {
      id: 11,
      name: 'Hepatitis A Vaccine',
      usage: 'Hepatitis A Prevention',
      country: 'Japan',
      price: '850,000 VND',
      status: 'In Stock'
    },
    {
      id: 12,
      name: 'Meningitis Vaccine',
      usage: 'Prevention of meningitis',
      country: 'Brazil',
      price: '1,300,000 VND',
      status: 'In Stock'
    },
    {
      id: 13,
      name: 'Rubella Vaccine',
      usage: 'Rubella Prevention',
      country: 'Canada',
      price: '550,000 VND',
      status: 'Out of stock'
    },
    {
      id: 14,
      name: 'Smallpox Vaccine',
      usage: 'Smallpox Prevention',
      country: 'China',
      price: '1,000,000 VND',
      status: 'In Stock'
    },
    {
      id: 15,
      name: 'Pneumonia Vaccine',
      usage: 'Prevention of pneumonia',
      country: 'Thailand',
      price: '1,100,000 VND',
      status: 'In stock'
    },
    {
      id: 16,
      name: 'Seasonal Flu Vaccine',
      usage: 'Prevention of seasonal flu',
      country: 'Russia',
      price: '350,000 VND',
      status: 'In stock'
    },
    {
      id: 17,
      name: 'Rubella Measles Vaccine',
      usage: 'Prevention of rubella measles',
      country: 'USA',
      price: '900,000 VND',
      status: 'In stock'
    },
    {
      id: 18,
      name: 'Hepatitis C Vaccine',
      usage: 'Prevention of hepatitis C',
      country: 'France',
      price: '2,500,000 VND',
      status: 'Out of stock'
    },
    {
      id: 19,
      name: 'Meningitis B Vaccine',
      usage: 'Prevention of meningitis B',
      country: 'UK',
      price: '1,700,000 VND',
      status: 'In stock'
    },
    {
      id: 20,
      name: 'Rabies Vaccine',
      usage: 'Prevention of rabies',
      country: 'USA',
      price: '1,500,000 VND',
      status: 'In stock'
    },
    {
      id: 21,
      name: 'Pertussis Vaccine',
      usage: 'Prevention of pertussis',
      country: 'Korea',
      price: '1,200,000 VND',
      status: 'In stock'
    },
    {
      id: 22,
      name: 'Meningitis C Vaccine',
      usage: 'Prevention of meningitis C',
      country: 'Germany',
      price: '1,300,000 VND',
      status: 'Out of stock'
    },
    {
      id: 23,
      name: 'Diphtheria Vaccine',
      usage: 'Prevention of diphtheria',
      country: 'France',
      price: '750,000 VND',
      status: 'In stock'
    },
    {
      id: 24,
      name: 'Diarrhea Vaccine',
      usage: 'Prevention of diarrhea',
      country: 'Vietnam',
      price: '450,000 VND',
      status: 'In stock'
    },
    {
      id: 25,
      name: 'Meningitis A Vaccine',
      usage: 'Prevention of meningitis A',
      country: 'Brazil',
      price: '1,100,000 VND',
      status: 'Out of stock'
    },
    {
      id: 26,
      name: 'Eyelid Vaccine',
      usage: 'Eyelid Prevention',
      country: 'Japan',
      price: '500,000 VND',
      status: 'In stock'
    },
    {
      id: 27,
      name: 'Eyelid Vaccine',
      usage: 'Eyelid Prevention',
      country: 'Japan',
      price: '1,400,000 VND',
      status: 'In stock'
    },
    {
      id: 28,
      name: 'Respiratory Infection Vaccine',
      usage: 'Prevention of respiratory infections',
      country: 'USA',
      price: '1,800,000 VND',
      status: 'Out of stock'
    },
    {
      id: 29,
      name: 'Pancreatitis Vaccine',
      usage: 'Prevention of pancreatitis',
      country: 'Canada',
      price: '950,000 VND',
      status: 'In stock'
    },
    {
      id: 30,
      name: 'COVID-19 Booster Vaccine',
      usage: 'Enhanced COVID-19 Prevention',
      country: 'Korea',
      price: '1,000,000 VND',
      status: 'In stock'
    },
    {
      id: 31,
      name: 'COVID-19 Vaccine',
      usage: 'Prevention COVID-19',
      country: 'Vietnam',
      price: '800,000 VND',
      status: 'In stock'
    },
    {
      id: 32,
      name: 'Seasonal flu vaccine',
      usage: 'Seasonal flu prevention',
      country: 'USA',
      price: '500,000 VND',
      status: 'In stock'
    },
    {
      id: 33,
      name: 'Measles vaccine',
      usage: 'Measles prevention',
      country: 'UK',
      price: '450,000 VND',
      status: 'In stock'
    },
    {
      id: 34,
      name: 'Rubella vaccine',
      usage: 'Rubella prevention',
      country: 'Japan',
      price: '600,000 VND',
      status: 'In stock'
    },
    {
      id: 35,
      name: 'Hepatitis B vaccine',
      usage: 'Hepatitis B prevention',
      country: 'USA',
      price: '550,000 VND',
      status: 'In stock'
    },
    {
      id: 36,
      name: 'Pneumococcal pneumonia vaccine',
      usage: 'Prevention of pneumococcal pneumonia',
      country: 'Korea',
      price: '700,000 VND',
      status: 'In stock'
    },
    {
      id: 37,
      name: 'Japanese encephalitis vaccine',
      usage: 'Prevention of Japanese encephalitis',
      country: 'Japan',
      price: '850,000 VND',
      status: 'In stock'
    },
    {
      id: 38,
      name: 'Tetus vaccine',
      usage: 'Tetus prevention',
      country: 'Vietnam',
      price: '400,000 VND',
      status: 'In stock'
    },
    {
      id: 39,
      name: 'Rabies vaccine',
      usage: 'Rabies prevention',
      country: 'Vietnam',
      price: '1,000,000 VND',
      status: 'In stock'
    },
    {
      id: 40,
      name: 'HPV vaccine',
      usage: 'Prevention of cervical cancer',
      country: 'USA',
      price: '1,200,000 VND',
      status: 'In stock'
    },
    {
      id: 41,
      name: 'Diphtheria vaccine',
      usage: 'Prevention of diphtheria',
      country: 'India',
      price: '350,000 VND',
      status: 'In stock'
    },
    {
      id: 42,
      name: 'Pertussis vaccine',
      usage: 'Prevention of pertussis',
      country: 'Canada',
      price: '480,000 VND',
      status: 'In stock'
    },
    {
      id: 43,
      name: 'Hepatitis A Vaccine',
      usage: 'Hepatitis A Prevention',
      country: 'France',
      price: '620,000 VND',
      status: 'In stock'
    },
    {
      id: 44,
      name: 'Meningitis Vaccine',
      usage: 'Meningitis Prevention',
      country: 'USA',
      price: '750,000 VND',
      status: 'In stock'
    },
    {
      id: 45,
      name: 'Arthritis Vaccine',
      usage: 'Arthritis Prevention',
      country: 'Korea',
      price: '900,000 VND',
      status: 'In stock'
    },
    {
      id: 46,
      name: 'COVID-19 Vaccine',
      usage: 'COVID-19 Prevention',
      country: 'Vietnam',
      price: '800,000 VND',
      status: 'In Stock'
    }
  ]

  const [filterOption, setFilterOption] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showCategories, setShowCategories] = useState<boolean>(false)
  const itemsPerPage = 10

  const handleFilterChange = useCallback((value: string) => setFilterOption(value), [])

  const filteredPrices = useMemo(() => {
    let result = prices

    if (filterOption) {
      if (filterOption.startsWith('filter')) {
        const status = filterOption === 'filter-c-on' ? 'In Stock' : 'Out of stock'
        result = result.filter((vaccine) => vaccine.status === status)
      } else if (filterOption.startsWith('sort')) {
        result = result.sort((a, b) => {
          return filterOption === 'sort-asc'
            ? parsePrice(a.price) - parsePrice(b.price)
            : parsePrice(b.price) - parsePrice(a.price)
        })
      }
    }

    return result
  }, [prices, filterOption])

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentVaccines = filteredPrices.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(filteredPrices.length / itemsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const categories = [
    { name: 'Vaccine Price List', target: '#price-list' },
    { name: 'Vaccination Services at VAX-BOX', target: '#vaccine-services' },
    { name: 'Vaccine Packages', target: '#vaccine-packages' },
    { name: 'Mobile Vaccination Services on Demand', target: '#vaccine-mobile-services' }
  ]

  return (
    <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-7xl mx-auto px-4 mt-12'>
      <div className='flex justify-center items-center'>
        <h2 className='text-5xl font-bold  text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 mb-6 pb-2 bg-clip-text border-b-4 border-teal-600 inline-block shadow-lg'>
          VAX-BOX Vaccination Price List
        </h2>
      </div>

      <p className='text-lg italic text-gray-800 text-center mb-8'>
        VAX-BOX vaccination price list is publicly posted, committed to price stability across the system, free
        examination and many utilities.
      </p>

      <div className='mb-6 relative overflow-hidden rounded-xl shadow-xl flex justify-center items-center'>
        <img
          src='https://vnvc.vn/wp-content/uploads/2022/09/bang-gia-vnvc.jpg'
          alt='Vắc-xin'
          className='w-full h-auto max-h-[300px] object-cover rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:opacity-90'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-xl'></div>
      </div>

      <div className='relative inline-block mb-6'>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className='px-4 py-2 bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:via-green-600 hover:to-teal-600'
        >
          <span className='text-1xl font-bold text-white'>Directory</span>
        </button>

        {showCategories && (
          <div className='absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10'>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className='px-4 py-2 hover:bg-teal-100 cursor-pointer'
                  onClick={() => {
                    setShowCategories(false)
                    document.querySelector(category.target)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h2
        className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-left pl-20'
        id='price-list'
      >
        Vaccine Price List
      </h2>

      <Filter filterOption={filterOption} onFilterChange={handleFilterChange} />

      {filteredPrices.length === 0 ? (
        <p className='text-center mt-4 text-red-500'>There are no results matching your filters.</p>
      ) : (
        <div className='overflow-hidden bg-white rounded-xl shadow-xl mx-auto'>
          <table className='min-w-full border-collapse'>
            <thead className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'>
              <tr>
                <th className='border px-6 py-4'>STT</th>
                <th className='border px-6 py-4'>Vaccine Name</th>
                <th className='border px-6 py-4'>Uses</th>
                <th className='border px-6 py-4'>Country</th>
                <th className='border px-6 py-4'>Price</th>
                <th className='border px-6 py-4'>Condition</th>
              </tr>
            </thead>
            <tbody>
              {currentVaccines.map((vaccine, index) => (
                <tr key={vaccine.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className='border-b px-6 py-4'>{startIndex + index + 1}</td>
                  <td className='border-b px-6 py-4'>{vaccine.name}</td>
                  <td className='border-b px-6 py-4'>{vaccine.usage}</td>
                  <td className='border-b px-6 py-4'>{vaccine.country}</td>
                  <td className='border-b px-6 py-4'>{vaccine.price}</td>
                  <td className='border-b px-6 py-4'>
                    <span
                      className={`${vaccine.status === 'In Stock' ? 'text-green-600' : 'text-red-600'} font-semibold`}
                    >
                      {vaccine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='flex justify-between mt-8 items-center'>
        <div className='text-gray-600'>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
        <div>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 mr-2'
          >
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300'
          >
            Next Page
          </button>
        </div>
      </div>

      {/* Terms and Services */}
      <div className='mt-12 text-lg text-gray-800'>
        <ul className='list-decimal pl-6 mt-4 space-y-4 max-w-4xl mx-auto text-left'>
          <li className='text-lg text-gray-700 '>
            <span className='italic'>Price list applied on VAX-BOX vaccination system from March 3, 2025.</span>
          </li>
          <li className='text-lg text-gray-700 t'>
            <span className='italic '>Vaccine prices at VAX-BOX include:</span> Free examination with a team of highly
            specialized doctors, free premium Customer care services; fees for documents and publications serving
            Customers; costs of calls and SMS messages to remind vaccination appointments; fees for Customer care on
            multiple platforms; fees for storing vaccination history information.
          </li>
          <li className='text-lg text-gray-700 '>
            <span className='italic'>
              VAX-BOX offers free on-demand reservations for all vaccines, and vaccinations at retail prices if you
              complete your vaccination schedule within 5 weeks. The vaccine reservation fee is 20% of the retail price
              or discounted retail price.
            </span>
          </li>
          <li className='text-lg text-gray-700 '>
            <span className='italic'>
              VAX-BOX provides free vaccine storage in the GSP cold storage system according to international standards,
              the Cold Chain system, ensuring safe, high-quality vaccines at all centers nationwide.
            </span>
          </li>
        </ul>
      </div>
      {/* Quy trình tiêm chủng */}
      <div className='mx-auto text-center py-20'>
        <h2 className='text-3xl text-gray-900 mb-12 font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
          Vaccination process at VAX-BOX
        </h2>

        <div className='relative flex justify-center items-center mb-12'>
          <div className='absolute w-3/4 border-dashed border-t-2 border-gray-400'></div>
          <div className='flex justify-between w-4/5'>
            <div className='absolute top-[-30px] left-[12%] w-16 h-16 flex items-center justify-center rounded-full font-bold text-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'>
              <FaCheckCircle className='text-3xl' />
            </div>
            <div className='absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center rounded-full font-bold text-xl bg-gradient-to-r from-orange-400 to-red-600 text-white shadow-lg'>
              <FaUserCheck className='text-3xl' />
            </div>
            <div className='absolute top-[-30px] right-[12%]  w-16 h-16 flex items-center justify-center rounded-full font-bold text-xl bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'>
              <FaShieldAlt className='text-3xl' />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center space-x-20'>
          {/* Bước 1 */}
          <div className='text-left w-1/3'>
            <div className='bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-t-lg shadow-xl transform '>
              <h3 className='text-2xl font-semibold text-center'>Before injection</h3>
            </div>
            <div className='border p-8 rounded-b-lg shadow-xl  bg-white'>
              <p className='flex items-center text-lg'>
                <FaStethoscope className='mr-3 text-blue-600' />
                <strong className='font-semibold'>Screening</strong>
              </p>
              <p>Screening and counseling for vaccination subjects</p>
              <p className='flex items-center mt-4 text-lg'>
                <FaBell className='mr-3 text-blue-600' />
                <strong className='font-semibold'>Notifications, FAQs</strong>
              </p>
              <p>Notification of the type of vaccine to be administered</p>
            </div>
          </div>

          {/* Bước 2 */}
          <div className='text-left w-1/3'>
            <div className='bg-gradient-to-r from-orange-400 to-red-600 text-white p-8 rounded-t-lg shadow-xl transform '>
              <h3 className='text-2xl font-semibold text-center'>Injection process</h3>
            </div>
            <div className='border p-8 rounded-b-lg shadow-xl bg-white'>
              <p className='flex items-center text-lg'>
                <FaSyringe className='mr-3 text-orange-600' />
                <strong className='font-semibold'>Healthcare staff</strong>
              </p>
              <p>Check vaccines, syringes and equipment before use</p>
              <p className='flex items-center mt-4 text-lg'>
                <FaUser className='mr-3 text-orange-600' />
                <strong className='font-semibold'>Vaccination subjects</strong>
              </p>
              <p>Show the vaccine vial to the person being vaccinated or a guardian.</p>
              <p className='flex items-center mt-4 text-lg'>
                <FaShieldAlt className='mr-3 text-orange-600' />
                <strong className='font-semibold'>Perform injection</strong>
              </p>
              <p>Inject correctly as prescribed, in the correct dose, and by the correct route.</p>
            </div>
          </div>

          {/* Bước 3 */}
          <div className='text-left w-1/3'>
            <div className='bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-t-lg shadow-xl transform'>
              <h3 className='text-2xl font-semibold text-center'>After injection</h3>
            </div>
            <div className='border p-8 rounded-b-lg shadow-xl  bg-white'>
              <p className='flex items-center text-lg'>
                <FaClock className='mr-3 text-green-600' />
                <strong className='font-semibold'>Post-injection follow-up</strong>
              </p>
              <p>Stay and monitor post-injection reactions</p>
              <p className='flex items-center mt-4 text-lg'>
                <FaBox className='mr-3 text-green-600' />
                <strong className='font-semibold'>Preserve</strong>
              </p>
              <p>Store unused vaccines and vaccination supplies according to regulations</p>
              <p className='flex items-center mt-4 text-lg'>
                <FaRecycle className='mr-3 text-green-600' />
                <strong className='font-semibold'>Waste treatment</strong>
              </p>
              <p>Dispose of medical waste after vaccination according to regulations</p>
            </div>
          </div>
        </div>
      </div>

      <div id='vaccine-services' className='mt-12 text-lg text-gray-800'>
        {/* Tiêu đề của phần dịch vụ tiêm chủng */}
        <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-left pl-20 mb-4 '>
          Vaccination Services at VAX-BOX
        </h3>

        <p className='max-w-4xl mx-auto text-left'>
          VAX-BOX offers customers a variety of flexible vaccination services, meeting the health protection needs of
          each subject:
        </p>

        <ul className='list-disc pl-5 mt-4 space-y-2 max-w-4xl mx-auto text-left'>
          <li>
            <strong>Vaccination of all types of vaccines:</strong> You can get each vaccine separately as needed..
          </li>
          <li>
            <strong>Vaccine packages by age:</strong> Vaccine packages for children under 24 months, preschool children,
            adolescents and young adults, women preparing for pregnancy, adults
          </li>
          <li>
            <strong>Personalized Packages:</strong> Customers can flexibly choose vaccines designed into separate
            packages depending on their needs, age and ability to pay.
          </li>
          <li>
            <strong>Reserve vaccines on demand:</strong> You can reserve vaccines on demand with many attractive offers.
          </li>
          <li>
            <strong>Mobile vaccination:</strong> We provide mobile, on-demand vaccination services to client groups,
            agencies, and businesses.
          </li>
        </ul>
      </div>

      {/* Các Gói Tiêm Vắc-Xin */}
      <div id='vaccine-packages' className='mt-12 text-lg text-gray-800'>
        {/* Tiêu đề của các gói tiêm vắc-xin */}
        <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-left pl-20 mb-4'>
          Vaccination Packages
        </h3>

        <p className='max-w-4xl mx-auto text-left italic'>
          We offer a variety of vaccination packages to help you protect yourself and your family. Here are some
          vaccination packages you can consider:
        </p>

        {/* Tiêu đề của gói vắc-xin cho trẻ em */}
        <div id='vaccine-packages' className='mt-12 mb-6 text-lg text-gray-800'>
          {/* Tiêu đề của các gói tiêm vắc-xin cho trẻ em */}
          <h4 className='font-semibold mt-6 text-left pl-20 mb-4 text-black text-lg font-bold ml-4'>
            <FaChild className='inline mr-2 text-blue-600' />
            Vaccine Package for Children
          </h4>

          {/* Các gói tiêm vắc-xin cho trẻ em (1 hàng ngang với 4 khung) */}
          <div className='flex justify-between space-x-8'>
            {/* Khung 1 */}
            <div className='w-1/4 bg-white shadow-xl rounded-lg p-6 border border-gray-300'>
              <div className='flex items-center mb-4'>
                <MdChildCare className='text-blue-600 text-3xl mr-3' />
                <h5 className='font-semibold text-xl bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                  Children from 0 – 6 months
                </h5>
              </div>
              <p className='text-lg text-gray-600 mb-2'>
                <FaSyringe className='inline text-gray-600 mr-2' /> 11 – 12 injections
              </p>
              <p className='text-lg text-gray-600'>
                <IoMdWarning className='inline text-gray-600 mr-2' /> More than 15 dangerous infectious diseases
              </p>
            </div>

            {/* Khung 2 */}
            <div className='w-1/4 bg-white shadow-xl rounded-lg p-6 border border-gray-300'>
              <div className='flex items-center mb-4'>
                <MdChildCare className='text-blue-600 text-3xl mr-3' />
                <h5 className='font-semibold text-xl bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                  Children from 0 – 9 months
                </h5>
              </div>
              <p className='text-lg text-gray-600 mb-2'>
                <FaSyringe className='inline text-gray-600 mr-2' /> 15 – 17 injections
              </p>
              <p className='text-lg text-gray-600'>
                <IoMdWarning className='inline text-gray-600 mr-2' /> More than 17 dangerous infectious diseases
              </p>
            </div>

            {/* Khung 3 */}
            <div className='w-1/4 bg-white shadow-xl rounded-lg p-6 border border-gray-300'>
              <div className='flex items-center mb-4'>
                <MdChildCare className='text-blue-600 text-3xl mr-3' />
                <h5 className='font-semibold text-xl bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                  Children from 0 – 12 months
                </h5>
              </div>
              <p className='text-lg text-gray-600 mb-2'>
                <FaSyringe className='inline text-gray-600 mr-2' /> 21 – 23 injections
              </p>
              <p className='text-lg text-gray-600'>
                <IoMdWarning className='inline text-gray-600 mr-2' /> More than 22 dangerous infectious diseases
              </p>
            </div>

            {/* Khung 4 */}
            <div className='w-1/4 bg-white shadow-xl rounded-lg p-6 border border-gray-300'>
              <div className='flex items-center mb-4'>
                <MdChildCare className='text-blue-600 text-3xl mr-3' />
                <h5 className='font-semibold text-xl bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                  Children from 0 – 24 months
                </h5>
              </div>
              <p className='text-lg text-gray-600 mb-2'>
                <FaSyringe className='inline text-gray-600 mr-2' /> 29 – 30 injections
              </p>
              <p className='text-lg text-gray-600'>
                <IoMdWarning className='inline text-gray-600 mr-2' /> More than 24 dangerous infectious diseases
              </p>
            </div>
          </div>
        </div>

        <div className='overflow-x-auto p-6'>
          {/* Wrapper for the grid layout */}
          <div className='grid grid-cols-5 gap-4'>
            {/* Vaccine package for preschool children */}
            <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-2xl'>
              <FaChild className='text-blue-600 text-4xl mb-4' />
              <h4 className='font-semibold text-center'>Vaccine Package for Preschool Children</h4>
              <p className='text-center mt-2'>
                Includes 10 vaccines and 14 basic doses to protect children from more than 20 dangerous infectious
                diseases.
              </p>
              <img
                src='https://cdn.tiemchunglongchau.com.vn/unsafe/768x0/filters:quality(90)/Illus_Goi_blue_1_e4effbd2a2.png' // Replace with your image path
                alt='Preschool Vaccine'
                className='w-32 h-32 object-cover rounded-lg mt-4'
              />
            </div>

            {/* Vaccine package for adolescents and young adults */}
            <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-2xl'>
              <IoIosStats className='text-green-500 text-4xl mb-4' />
              <h4 className='font-semibold text-center'>
                Vaccine Package for Adolescents and Young Adults (Ages 9 – 18)
              </h4>
              <p className='text-center mt-2'>Includes 15 injections for nearly 20 dangerous infectious diseases.</p>
              <img
                src='https://cdn.tiemchunglongchau.com.vn/unsafe/768x0/filters:quality(90)/Illus_Goi_blue_3_ad13668bfe.png' // Replace with your image path
                alt='Adolescent Vaccine'
                className='w-32 h-32 object-cover rounded-lg mt-4'
              />
            </div>

            {/* Vaccine package for adults */}
            <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-2xl'>
              <FaUserAlt className='text-purple-600 text-4xl mb-4' />
              <h4 className='font-semibold text-center'>Vaccine Package for Adults</h4>
              <p className='text-center mt-2'>
                Includes 11 injections, protecting adults against 17 infectious diseases.
              </p>
              <img
                src='https://cdn.tiemchunglongchau.com.vn/unsafe/768x0/filters:quality(90)/Illus_Goi_blue_4_3111f89e24.png' // Replace with your image path
                alt='Adult Vaccine'
                className='w-32 h-32 object-cover rounded-lg mt-4'
              />
            </div>

            {/* Vaccine package for women preparing for pregnancy */}
            <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-2xl'>
              <FaFemale className='text-pink-600 text-4xl mb-4' />
              <h4 className='font-semibold text-center'>Vaccine Package for Women Preparing for Pregnancy</h4>
              <p className='text-center mt-2'>Includes 11 injections, protecting against 17 infectious diseases.</p>
              <img
                src='https://cdn.tiemchunglongchau.com.vn/unsafe/768x0/filters:quality(90)/Illus_02e6955310.png' // Replace with your image path
                alt='Pregnancy Vaccine'
                className='w-32 h-32 object-cover rounded-lg mt-4'
              />
            </div>

            {/* Personalized vaccine package for adults */}
            <div className='flex flex-col items-center border p-4 rounded-lg shadow-lg hover:shadow-2xl'>
              <FaPlusCircle className='text-teal-500 text-4xl mb-4' />
              <h4 className='font-semibold text-center'>Personalized Vaccine Packages for Adults</h4>
              <p className='text-center mt-2'>
                Selection based on specific needs, such as targeted disease prevention or individual requirements.
              </p>
              <img
                src='https://cdn.tiemchunglongchau.com.vn/unsafe/768x0/filters:quality(90)/Illus_Goi_blue_2_0121d2fee9.png' // Replace with your image path
                alt='Personalized Vaccine'
                className='w-32 h-32 object-cover rounded-lg mt-4'
              />
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  )
}

export default VaccinePrices

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
interface Vaccine {
  order: number
  productName: string
  vaccineName: string
  price: number // Đảm bảo là số (number)
  country: string
  status: 'In Stock' | 'Out of Stock'
}

const vaccines: Vaccine[] = [
  {
    order: 1,
    productName: 'Prevenar 13',
    vaccineName: 'PCV13 (Infant)',
    price: 1290000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 2,
    productName: 'Rotarix',
    vaccineName: 'Rotavirus (Infant)',
    price: 630000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 3,
    productName: 'BCG',
    vaccineName: 'BCG (Infant)',
    price: 120000,
    country: 'Vietnam',
    status: 'Out of Stock'
  },
  {
    order: 4,
    productName: 'Infanrix Hexa',
    vaccineName: 'DTP-HB-Hib-IPV (Infant)',
    price: 1200000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 5,
    productName: 'Synflorix',
    vaccineName: 'PCV10 (Infant)',
    price: 990000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 6,
    productName: 'Menjugate',
    vaccineName: 'Meningococcal C (Infant)',
    price: 630000,
    country: 'Vietnam',
    status: 'Out of Stock'
  },
  {
    order: 7,
    productName: 'Hexaxim',
    vaccineName: 'DTP-HB-Hib-IPV (Infant)',
    price: 1200000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 8,
    productName: 'Pentaxim',
    vaccineName: 'DTP-Hib-IPV (Infant)',
    price: 1200000,
    country: 'Vietnam',
    status: 'In Stock'
  },
  {
    order: 9,
    productName: 'Quinvaxem',
    vaccineName: 'DTP-HB-Hib (Infant)',
    price: 290000,
    country: 'Vietnam',
    status: 'Out of Stock'
  },
  {
    order: 10,
    productName: 'Imovax',
    vaccineName: 'Rabies (Adult)',
    price: 420000,
    country: 'India',
    status: 'In Stock'
  },
  {
    order: 11,
    productName: 'Verorab',
    vaccineName: 'Rabies (Adult)',
    price: 420000,
    country: 'India',
    status: 'In Stock'
  },
  {
    order: 12,
    productName: 'Vaxigrip',
    vaccineName: 'Influenza (Adult)',
    price: 390000,
    country: 'Korea',
    status: 'Out of Stock'
  },
  {
    order: 13,
    productName: 'Fluarix',
    vaccineName: 'Influenza (Adult)',
    price: 390000,
    country: 'Korea',
    status: 'In Stock'
  },
  {
    order: 14,
    productName: 'Havrix 720',
    vaccineName: 'Hepatitis A (Child)',
    price: 680000,
    country: 'USA',
    status: 'In Stock'
  }
]

const PriceList: React.FC = () => {
  const [filter, setFilter] = useState<string>('all')
  const [sortOption, setSortOption] = useState<string>('default')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filterAndSortVaccines = () => {
    let filtered = vaccines

    // Lọc theo quốc gia
    if (filter !== 'all') {
      filtered = filtered.filter((vaccine) => vaccine.country.toLowerCase() === filter.toLowerCase())
    }

    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      filtered = filtered.filter((vaccine) => vaccine.status === statusFilter)
    }

    // Sắp xếp theo giá
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    return filtered
  }

  const filteredVaccines = filterAndSortVaccines()
  const countries = ['all', ...new Set(vaccines.map((v) => v.country))]
  const statusOptions = ['all', 'In Stock', 'Out of Stock']
  const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low']

  return (
    <div className=' dark:bg-gray-900/80'>
      <Header />
      <div className='max-w-[70rem] mt-[7rem] mx-auto p-4 bg-white dark:bg-gray-900/80'>
        {/* Tiêu đề và các bộ lọc */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-300'>
            VACCINATION PRICE LIST AND CONVENIENT PAYMENT METHODS AT VAXBOT
          </h1>
          <div className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
            <div className='relative w-full md:w-auto'>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className='p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:focus:ring-gray-400 w-full'
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country === 'all' ? 'All Countries' : country}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400' />
            </div>
            <div className='relative w-full md:w-auto'>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400 w-full'
              >
                {statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400' />
            </div>
            <div className='relative w-full md:w-auto'>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className='p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400 w-full'
              >
                {sortOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400' />
            </div>
          </div>
        </div>

        {/* Bảng giá */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left'>
            <thead className='bg-gray-500 text-white dark:bg-gray-900/80'>
              <tr>
                <th className='p-3 border-b border-gray-300 dark:border-gray-500'>Order</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Product Name</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Vaccine Name</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Price (VND)</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Country</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Status</th>
                <th className='p-3 border-b border-blue-300 dark:border-blue-500'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVaccines.map((vaccine) => (
                <tr key={vaccine.order} className='border-b border-blue-200 dark:border-blue-700'>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>{vaccine.order}</td>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>{vaccine.productName}</td>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>{vaccine.vaccineName}</td>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>{vaccine.price.toLocaleString()}</td>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>{vaccine.country}</td>
                  <td className='p-3 text-gray-800 dark:text-gray-200'>
                    {vaccine.status === 'In Stock' ? (
                      <span className='text-green-500'>In Stock</span>
                    ) : (
                      <span className='text-red-500'>Out of Stock</span>
                    )}
                  </td>
                  <td className='p-3'>
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ${
                        vaccine.status === 'Out of Stock' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={vaccine.status === 'Out of Stock'}
                    >
                      Buy Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ghi chú */}
        <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
          * Note: Prices are subject to change. For the most accurate information, please contact VAXBOT or visit our
          website for updates.
        </p>

        {/* Phần chính sách giá và điều khoản */}
        <div className='mt-8 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
          <h2 className='text-xl font-bold text-gray-800 mb-4 dark:text-gray-300'>Pricing Policy and Terms</h2>
          <ol className='list-decimal list-inside text-gray-700 dark:text-gray-300'>
            <li>The price list is applicable across the entire network effective from April 28, 2024.</li>
            <li>
              VAXBOT offers a complimentary reservation service for all vaccines at the RETAIL PRICE (valid for
              vaccination within 35 days). For vaccinations after 35 days, an additional 20% reservation fee will apply.
            </li>
            <li>
              The reservation fee for customized vaccines includes the retail price + 20% reservation fee (covering
              transportation, rotation, safe vaccine storage in GSP-certified international cold storage facilities,
              price protection, etc.).
            </li>
            <li>
              The total package price for a vaccine series equals the sum of individual vaccine doses (or discounted
              prices if applicable) + approximately 10% reservation fee (covering transportation, rotation,
              GSP-certified cold storage, price protection, etc.).
            </li>
            <li>
              VAXBOT's vaccine prices are inclusive of costs such as pre-vaccination screening with a doctor,
              consultation, and medical documentation, vaccination records, vaccination appointment reminders,
              post-vaccination care through our call center, and a variety of other amenities like parking, indoor play
              areas, clean drinking water, high-speed Wi-Fi, and free diapers.
            </li>
            <li>(*) To check vaccine availability, please contact our hotline at 1900.1900</li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PriceList

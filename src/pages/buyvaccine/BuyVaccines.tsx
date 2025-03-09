// File: VaccineInfoPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Để chuyển trang (cần cài đặt react-router-dom)
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

interface Vaccine {
  id: number
  name: string
  manufacturer: string
  price: string
  description: string
  category: string // "package" hoặc "retail"
  targetGroup: string // "children", "adults", etc.
}

interface SelectedPackage {
  id: number
  name: string
  manufacturer: string
  price: string
  description: string
}

const VaccineInfoPage: React.FC = () => {
  const navigate = useNavigate()

  // State để quản lý các giá trị lọc
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [vaccineCategory, setVaccineCategory] = useState<string>('')
  const [targetGroup, setTargetGroup] = useState<string>('')
  const [selectedVaccines, setSelectedVaccines] = useState<SelectedPackage[]>([])

  // Danh sách vắc xin mẫu (dữ liệu tĩnh, có thể thay bằng API)
  const vaccineList: Vaccine[] = [
    {
      id: 1,
      name: 'Vaxigrip Tetra seasonal flu vaccine',
      manufacturer: 'Sanofi (France)',
      price: '356,000 VND',
      description: 'Disease prevention: Flu',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 2,
      name: 'Influvac Tetra seasonal influenza vaccine',
      manufacturer: 'Abbott (Netherlands)',
      price: '356,000 VND',
      description: 'Disease prevention: Flu',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 3,
      name: 'IVACFLU-S Vaccine 0.5ml (Vietnam)',
      manufacturer: 'IVAC (Viet Nam)',
      price: '315,000 VND',
      description: 'Prevention: Flu (adults > 18 years)',
      category: 'retail',
      targetGroup: 'adults'
    },
    {
      id: 4,
      name: 'GCFlu Quadrivalent Vaccine (Korea)',
      manufacturer: 'Green Cross (Korea)',
      price: '350,000 VND',
      description: 'Disease prevention: Flu',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 5,
      name: 'Measles - Mumps - Rubella Vaccine MMR II',
      manufacturer: 'MSD (America)',
      price: '445,000 VND',
      description: 'Disease prevention: Measles, Mumps,...',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 6,
      name: 'Varilrix GSK Chickenpox Vaccine (Belgium)',
      manufacturer: 'GSK (Belgium)',
      price: '1,085,000 VND',
      description: 'Disease Prevention: Chickenpox',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 7,
      name: 'Priorix vaccine against measles - mumps',
      manufacturer: 'GSK (Belgium)',
      price: '350,000 VND',
      description: 'Disease prevention: Measles, Mumps',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 8,
      name: 'Shingrix vaccine prevents shingles ',
      manufacturer: 'GSK (Belgium)',
      price: '1,085,000 VND',
      description: 'Disease prevention: Shingles (adults)',
      category: 'retail',
      targetGroup: 'adults'
    },
    {
      id: 9,
      name: 'Qdenga dengue vaccine (Takeda)',
      manufacturer: 'Takeda (Japan)',
      price: '1,085,000 VND',
      description: 'Disease Prevention: Dengue Fever',
      category: 'retail',
      targetGroup: 'adults'
    },
    {
      id: 10,
      name: 'HEXAM vaccine package',
      manufacturer: 'Rotarix - Varilrix (0-24)',
      price: '17,341,354 VND',
      description: 'Prevention of Rotavirus, Varicella,... ',
      category: 'package',
      targetGroup: 'children'
    },
    {
      id: 11,
      name: 'Rotarix retail vaccines',
      manufacturer: 'Rotarix (0-24)',
      price: '2,181,064 VND',
      description: 'Prevention ofRotavirus,...',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 12,
      name: 'Varilrix retail vaccines',
      manufacturer: 'Varilrix (0-24)',
      price: '1,828,200 VND',
      description: 'Prevention of Varicella,...',
      category: 'retail',
      targetGroup: 'adults'
    },
    {
      id: 13,
      name: 'Adult Vaccine Package',
      manufacturer: 'Rotarix - Varilrix (0-24)',
      price: '17,341,354 VND',
      description: 'Chickenpox, Measles, Mumps, Rubella,...',
      category: 'package',
      targetGroup: 'adults'
    },
    {
      id: 14,
      name: 'HEXAM vaccine package',
      manufacturer: 'Rotarix - Varilrix (0-9)',
      price: '17,827,977 VND',
      description: 'Prevention of Rotavirus, Varicella,...',
      category: 'package',
      targetGroup: 'children'
    },
    {
      id: 15,
      name: 'HEXAM vaccine package',
      manufacturer: 'Rotarix - Varilrix (0-12)',
      price: '18,863,332 VND',
      description: 'Prevention of Rotavirus, Varicella,...',
      category: 'package',
      targetGroup: 'children'
    },
    {
      id: 16,
      name: ' Rotarix retail vaccines',
      manufacturer: 'Rotarix (0-24)',
      price: '2,181,064 VND',
      description: 'Prevention of Rotavirus,...',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 17,
      name: ' Varilrix retail vaccines',
      manufacturer: 'Varilrix (0-24)',
      price: '1,828,200 VND',
      description: 'Prevention of Varicella,...',
      category: 'retail',
      targetGroup: 'children'
    },
    {
      id: 15,
      name: 'HEXAM vaccine package',
      manufacturer: 'Rotarix - Varilrix (0-12)',
      price: '18,863,332 VND',
      description: 'Prevention of Rotavirus, Varicella,...',
      category: 'package',
      targetGroup: 'children'
    }
  ]

  // Hàm lọc dữ liệu
  const filteredVaccines = vaccineList.filter((vaccine) => {
    const matchesSearch = vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !vaccineCategory || vaccine.category === vaccineCategory
    const matchesTargetGroup = !targetGroup || vaccine.targetGroup === targetGroup
    return matchesSearch && matchesCategory && matchesTargetGroup
  })

  // Hàm xử lý khi nhấn vào tên vắc xin (chuyển trang chi tiết)
  const handleViewDetail = (id: number) => {
    navigate(`/vaccine-detail/${id}`) // Chuyển đến trang chi tiết (cần thiết lập route)
  }

  // Hàm xử lý khi nhấn nút "CHỌN" hoặc "LIÊN HỆ"
  const handleSelectVaccine = (vaccine: Vaccine) => {
    const newSelectedPackage: SelectedPackage = {
      id: vaccine.id,
      name: vaccine.name,
      manufacturer: vaccine.manufacturer,
      price: vaccine.price,
      description: vaccine.description
    }
    setSelectedVaccines([...selectedVaccines, newSelectedPackage])
  }

  // Hàm xóa mục khỏi danh sách đã chọn
  const handleRemoveVaccine = (id: number) => {
    setSelectedVaccines(selectedVaccines.filter((vaccine) => vaccine.id !== id))
  }

  // Hàm xử lý khi submit form
  // const handleFilterSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   log({
  //     searchTerm,
  //     vaccineCategory,
  //     targetGroup
  //   })
  //   // Thêm logic xử lý filter ở đây
  // }

  return (
    <div>
      <Header />
      <div className='w-[100rem] mx-auto mt-[7rem] p-6 bg-gray-100 min-h-screen '>
        {/* Header */}
        <div className='bg-blue-100 p-4 rounded-t-lg flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-blue-800'>VACCINE PRODUCT INFORMATION</h1>
          </div>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for vaccine name...'
            className='px-[4rem] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left placeholder:text-left'
          />
        </div>

        {/* Main Content */}
        <div className='flex flex-row gap-6 mt-6'>
          {/* Left Sidebar: Filter Category */}
          <div className='w-64 bg-white rounded-lg shadow-md p-4'>
            <h3 className='text-lg font-semibold text-blue-700 mb-4'>Vaccine list</h3>
            <select
              value={targetGroup}
              onChange={(e) => setTargetGroup(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All</option>
              <option value='children'>Children</option>
              <option value='adults'>Adults</option>
            </select>

            <div>
              {/* <label className='text-lg font-semibold text-blue-700 mb-4'>Vaccine type</label> */}
              <h3 className='text-lg font-semibold text-blue-700 mb-4'>Vaccine type</h3>
              <select
                value={vaccineCategory}
                onChange={(e) => setVaccineCategory(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>All</option>
                <option value='retail'>Retail</option>
                <option value='package'>Package</option>
              </select>
            </div>
          </div>

          {/* Center Section: Vaccine List */}
          <div className='flex-1'>
            {/* Vaccine List Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredVaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className='bg-blue-50 rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer'
                  onClick={() => handleViewDetail(vaccine.id)}
                >
                  <h3 className='text-lg font-semibold text-blue-700'>{vaccine.name}</h3>
                  <p className='text-sm text-gray-600'>Manufacturer: {vaccine.manufacturer}</p>
                  <p className='text-xl font-bold text-green-600 mt-2'>{vaccine.price}</p>
                  <p className='text-sm text-gray-500 mt-2'>{vaccine.description}</p>
                  {vaccine.category === 'retail' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Ngăn chặn sự kiện click lan ra ngoài
                        handleSelectVaccine(vaccine)
                      }}
                      className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
                    >
                      SELECT
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectVaccine(vaccine)
                      }}
                      className='w-full mt-5 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition'
                    >
                      CONTACT
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Selected Vaccines */}
          <div className='w-80'>
            <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
              <h2 className='text-lg font-semibold text-blue-700 mb-2'>LIST OF VACCINES TO PURCHASE</h2>
              {selectedVaccines.length === 0 ? (
                <p className='text-gray-500 text-sm'>No vaccine has been selected yet.</p>
              ) : (
                selectedVaccines.map((vaccine) => (
                  <div key={vaccine.id} className='border-b border-gray-200 py-4'>
                    <h3 className='text-md font-semibold text-blue-600'>{vaccine.name}</h3>
                    <p className='text-sm text-gray-500 mt-1'>Manufacturer: {vaccine.manufacturer}</p>
                    <p className='text-lg font-bold text-green-600 mt-2'>{vaccine.price}</p>
                    <p className='text-sm text-gray-500 mt-1'>{vaccine.description}</p>
                    <button onClick={() => handleRemoveVaccine(vaccine.id)} className='text-red-500 text-sm mt-2'>
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
            <button className='w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600'>
              REGISTER FOR VACCINATION
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VaccineInfoPage

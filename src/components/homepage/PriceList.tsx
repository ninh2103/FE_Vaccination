import React, { useState, useMemo, useCallback } from 'react'

type Vaccine = {
  id: number
  name: string
  usage: string
  country: string
  price: string
  status: string
}

// Hàm trợ giúp để chuyển giá thành số
const parsePrice = (price: string) => {
  const parsed = parseInt(price.replace(/[^0-9]/g, ''), 10)
  return isNaN(parsed) ? 0 : parsed // Trả về 0 nếu không phải là số hợp lệ
}

const Filter: React.FC<{
  filterOption: string
  onFilterChange: (value: string) => void
}> = ({ filterOption, onFilterChange }) => (
  <div className='mb-6'>
    <div className='flex gap-6'>
      <div className='flex items-center'>
        <label className='font-medium'>Lọc và sắp xếp:</label>
        <select
          value={filterOption}
          onChange={(e) => onFilterChange(e.target.value)}
          className='ml-4 p-2 border rounded-lg shadow-sm bg-white'
          aria-label='Chọn bộ lọc và sắp xếp'
        >
          <option value=''>Sắp Xếp Theo</option>
          <option value='filter-c-on'>Còn Hàng</option>
          <option value='filter-h-on'>Hết Hàng</option>
          <option value='sort-asc'>Giá tăng dần</option>
          <option value='sort-desc'>Giá giảm dần</option>
        </select>
      </div>
    </div>
  </div>
)

const VaccinePrices: React.FC = () => {
  const [prices, setPrices] = useState<Vaccine[]>([
    {
      id: 1,
      name: 'Vắc-xin COVID-19',
      usage: 'Phòng ngừa COVID-19',
      country: 'Việt Nam',
      price: '800.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 2,
      name: 'Vắc-xin Cúm',
      usage: 'Phòng ngừa cúm mùa',
      country: 'Nhật Bản',
      price: '250.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 3,
      name: 'Vắc-xin Dại',
      usage: 'Phòng ngừa bệnh dại',
      country: 'Mỹ',
      price: '1.500.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 4,
      name: 'Vắc-xin Viêm Gan B',
      usage: 'Phòng ngừa viêm gan B',
      country: 'Ấn Độ',
      price: '700.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 5,
      name: 'Vắc-xin HPV',
      usage: 'Phòng ngừa ung thư cổ tử cung',
      country: 'Anh',
      price: '2.000.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 6,
      name: 'Vắc-xin Sởi',
      usage: 'Phòng ngừa bệnh sởi',
      country: 'Mỹ',
      price: '500.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 7,
      name: 'Vắc-xin Bại Liệt',
      usage: 'Phòng ngừa bệnh bại liệt',
      country: 'Pháp',
      price: '900.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 8,
      name: 'Vắc-xin Thủy Đậu',
      usage: 'Phòng ngừa bệnh thủy đậu',
      country: 'Úc',
      price: '600.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 9,
      name: 'Vắc-xin Meningitis',
      usage: 'Phòng ngừa viêm màng não',
      country: 'Hàn Quốc',
      price: '1.200.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 10,
      name: 'Vắc-xin Tetanus',
      usage: 'Phòng ngừa bệnh uốn ván',
      country: 'Đức',
      price: '400.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 11,
      name: 'Vắc-xin Viêm Gan A',
      usage: 'Phòng ngừa viêm gan A',
      country: 'Nhật Bản',
      price: '850.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 12,
      name: 'Vắc-xin Viêm Màng Não',
      usage: 'Phòng ngừa viêm màng não',
      country: 'Brazil',
      price: '1.300.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 13,
      name: 'Vắc-xin Rubella',
      usage: 'Phòng ngừa bệnh Rubella',
      country: 'Canada',
      price: '550.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 14,
      name: 'Vắc-xin Đậu Mùa',
      usage: 'Phòng ngừa bệnh đậu mùa',
      country: 'Trung Quốc',
      price: '1.000.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 15,
      name: 'Vắc-xin Viêm Phổi',
      usage: 'Phòng ngừa viêm phổi',
      country: 'Thái Lan',
      price: '1.100.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 16,
      name: 'Vắc-xin Cúm Mùa',
      usage: 'Phòng ngừa cúm mùa',
      country: 'Nga',
      price: '350.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 17,
      name: 'Vắc-xin Sởi Rubella',
      usage: 'Phòng ngừa bệnh sởi rubella',
      country: 'Mỹ',
      price: '900.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 18,
      name: 'Vắc-xin Viêm Gan C',
      usage: 'Phòng ngừa viêm gan C',
      country: 'Pháp',
      price: '2.500.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 19,
      name: 'Vắc-xin Viêm Màng Não B',
      usage: 'Phòng ngừa viêm màng não B',
      country: 'Anh',
      price: '1.700.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 20,
      name: 'Vắc-xin Dại',
      usage: 'Phòng ngừa bệnh dại',
      country: 'Mỹ',
      price: '1.500.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 21,
      name: 'Vắc-xin Ho Gà',
      usage: 'Phòng ngừa ho gà',
      country: 'Hàn Quốc',
      price: '1.200.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 22,
      name: 'Vắc-xin Viêm Màng Não C',
      usage: 'Phòng ngừa viêm màng não C',
      country: 'Đức',
      price: '1.300.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 23,
      name: 'Vắc-xin Bạch Hầu',
      usage: 'Phòng ngừa bạch hầu',
      country: 'Pháp',
      price: '750.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 24,
      name: 'Vắc-xin Tiêu Chảy',
      usage: 'Phòng ngừa tiêu chảy',
      country: 'Việt Nam',
      price: '450.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 25,
      name: 'Vắc-xin Viêm Màng Não A',
      usage: 'Phòng ngừa viêm màng não A',
      country: 'Brazil',
      price: '1.100.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 26,
      name: 'Vắc-xin Viêm Mắt',
      usage: 'Phòng ngừa viêm mắt',
      country: 'Nhật Bản',
      price: '500.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 27,
      name: 'Vắc-xin Viêm Mạch Máu',
      usage: 'Phòng ngừa viêm mạch máu',
      country: 'Nhật Bản',
      price: '1.400.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 28,
      name: 'Vắc-xin Viêm Hô Hấp',
      usage: 'Phòng ngừa viêm hô hấp',
      country: 'Mỹ',
      price: '1.800.000 VNĐ',
      status: 'Hết hàng'
    },
    {
      id: 29,
      name: 'Vắc-xin Viêm Tụy',
      usage: 'Phòng ngừa viêm tụy',
      country: 'Canada',
      price: '950.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 30,
      name: 'Vắc-xin COVID-19 Booster',
      usage: 'Tăng cường phòng ngừa COVID-19',
      country: 'Hàn Quốc',
      price: '1.000.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 31,
      name: 'Vắc-xin COVID-19',
      usage: 'Phòng ngừa COVID-19',
      country: 'Việt Nam',
      price: '800.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 32,
      name: 'Vắc-xin phòng cúm mùa',
      usage: 'Phòng ngừa cúm mùa',
      country: 'Mỹ',
      price: '500.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 33,
      name: 'Vắc-xin phòng sởi',
      usage: 'Phòng ngừa bệnh sởi',
      country: 'Anh',
      price: '450.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 34,
      name: 'Vắc-xin phòng rubella',
      usage: 'Phòng ngừa bệnh rubella',
      country: 'Nhật Bản',
      price: '600.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 35,
      name: 'Vắc-xin phòng viêm gan B',
      usage: 'Phòng ngừa viêm gan B',
      country: 'Mỹ',
      price: '550.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 36,
      name: 'Vắc-xin phòng viêm phổi do phế cầu',
      usage: 'Phòng ngừa viêm phổi do phế cầu',
      country: 'Hàn Quốc',
      price: '700.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 37,
      name: 'Vắc-xin phòng viêm não Nhật Bản',
      usage: 'Phòng ngừa viêm não Nhật Bản',
      country: 'Nhật Bản',
      price: '850.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 38,
      name: 'Vắc-xin phòng uốn ván',
      usage: 'Phòng ngừa uốn ván',
      country: 'Việt Nam',
      price: '400.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 39,
      name: 'Vắc-xin phòng dại',
      usage: 'Phòng ngừa bệnh dại',
      country: 'Việt Nam',
      price: '1.000.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 40,
      name: 'Vắc-xin phòng HPV',
      usage: 'Phòng ngừa ung thư cổ tử cung',
      country: 'Mỹ',
      price: '1.200.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 41,
      name: 'Vắc-xin phòng bạch hầu',
      usage: 'Phòng ngừa bệnh bạch hầu',
      country: 'Ấn Độ',
      price: '350.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 42,
      name: 'Vắc-xin phòng ho gà',
      usage: 'Phòng ngừa bệnh ho gà',
      country: 'Canada',
      price: '480.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 43,
      name: 'Vắc-xin phòng viêm gan A',
      usage: 'Phòng ngừa viêm gan A',
      country: 'Pháp',
      price: '620.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 44,
      name: 'Vắc-xin phòng viêm màng não',
      usage: 'Phòng ngừa viêm màng não',
      country: 'Mỹ',
      price: '750.000 VNĐ',
      status: 'Còn hàng'
    },
    {
      id: 45,
      name: 'Vắc-xin phòng viêm khớp',
      usage: 'Phòng ngừa viêm khớp',
      country: 'Hàn Quốc',
      price: '900.000 VNĐ',
      status: 'Còn hàng'
    }
  ])

  const [filterOption, setFilterOption] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  const handleFilterChange = useCallback((value: string) => setFilterOption(value), [])

  const filteredPrices = useMemo(() => {
    let result = prices

    if (filterOption) {
      if (filterOption.startsWith('filter')) {
        const status = filterOption === 'filter-c-on' ? 'Còn hàng' : 'Hết hàng'
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

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6 text-center text-teal-600'>Danh sách Bảng Giá vắc-xin</h2>
      <Filter filterOption={filterOption} onFilterChange={handleFilterChange} />

      {filteredPrices.length === 0 ? (
        <p className='text-center mt-4 text-red-500'>Không có kết quả phù hợp với bộ lọc của bạn.</p>
      ) : (
        <div>
          <table className='min-w-full table-auto border-separate border-spacing-0 border border-gray-300 rounded-lg shadow-lg'>
            <thead>
              <tr className='bg-teal-600 text-white'>
                <th className='border px-4 py-3'>STT</th>
                <th className='border px-4 py-3'>Tên Vắc-Xin</th>
                <th className='border px-4 py-3'>Công Dụng</th>
                <th className='border px-4 py-3'>Quốc Gia</th>
                <th className='border px-4 py-3'>Giá</th>
                <th className='border px-4 py-3'>Tình Trạng</th>
              </tr>
            </thead>
            <tbody>
              {currentVaccines.map((vaccine, index) => (
                <tr key={vaccine.id} className='hover:bg-gray-50'>
                  <td className='border-b px-4 py-3'>{startIndex + index + 1}</td>
                  <td className='border-b px-4 py-3'>{vaccine.name}</td>
                  <td className='border-b px-4 py-3'>{vaccine.usage}</td>
                  <td className='border-b px-4 py-3'>{vaccine.country}</td>
                  <td className='border-b px-4 py-3'>{vaccine.price}</td>
                  <td className='border-b px-4 py-3'>
                    <span
                      className={`${vaccine.status === 'Còn hàng' ? 'text-green-600' : 'text-red-600'} font-semibold`}
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

      <div className='flex justify-between mt-6 items-center'>
        <div className='text-gray-600'>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
        </div>
        <div>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 mr-2'
          >
            Trang Trước
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300'
          >
            Trang Sau
          </button>
        </div>
      </div>
    </div>
  )
}

const vaccinePackages = [
  { name: 'Gói cho trẻ từ 0 – 6 tháng', shots: '11-12 mũi', diseases: 'Hơn 15 bệnh' },
  { name: 'Gói cho trẻ từ 0 – 9 tháng', shots: '15-17 mũi', diseases: 'Hơn 17 bệnh' },
  { name: 'Gói cho trẻ từ 0 – 12 tháng', shots: '21-23 mũi', diseases: 'Hơn 22 bệnh' },
  { name: 'Gói cho trẻ từ 0 – 24 tháng', shots: '29-30 mũi', diseases: 'Hơn 24 bệnh' },
  { name: 'Gói cho trẻ tiền học đường', shots: '10 loại vắc xin', diseases: 'Hơn 20 bệnh' },
  {
    name: 'Gói cho tuổi vị thành niên và thanh niên (9 – 18 tuổi)',
    shots: '15 mũi',
    diseases: 'Gần 20 bệnh (Gardasil & Gardasil 9)'
  },
  { name: 'Gói cho người trưởng thành', shots: '11 mũi', diseases: '17 bệnh' },
  { name: 'Gói cho phụ nữ chuẩn bị mang thai', shots: '11 mũi', diseases: '17 bệnh' },
  { name: 'Gói cho phụ nữ chuẩn bị mang thai', shots: '11 mũi', diseases: '17 bệnh' }
]

const App = () => {
  return (
    <div className='font-sans bg-gray-100 min-h-screen'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* Danh sách Bảng Giá Vắc Xin */}
        <VaccinePrices />

        <h1 className='text-2xl font-semibold mb-6'> Các Gói Vắc Xin</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
          {vaccinePackages.map((pkg, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow-lg border'>
              <h3 className='text-xl font-semibold mb-3'>{pkg.name}</h3>
              <p className='text-lg'>{pkg.shots} mũi vắc xin</p>
              <p className='text-lg'>Phòng {pkg.diseases}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

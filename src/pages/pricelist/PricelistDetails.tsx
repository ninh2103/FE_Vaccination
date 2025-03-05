import React, { useState, useMemo, useCallback } from 'react'

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
  const prices: Vaccine[] = [
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

  const categories = [
    { name: 'Danh sách Bảng Giá Vắc-Xin', target: '#price-list' },
    { name: 'Các Dịch Vụ Tiêm Chủng tại VAX-BOX', target: '#vaccine-services' },
    { name: 'Các Gói Tiêm Vắc-Xin', target: '#vaccine-packages' },
    { name: 'Dịch Vụ Tiêm Chủng Lưu Động Theo Yêu Cầu', target: '#vaccine-mobile-services' }
  ]

  return (
    <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-7xl mx-auto px-4'>
      <div className='flex justify-center items-center'>
        <h2 className='text-5xl font-bold  text-transparent  bg-gradient-to-r  from-blue-400 via-green-500 to-teal-500 mb-6 pb-2 bg-clip-text border-b-4 border-teal-600 inline-block shadow-lg'>
          Bảng Giá Tiêm Chủng VAX-BOX
        </h2>
      </div>
      <p className='text-lg text-gray-800 text-center mb-8'>
        Bảng giá tiêm chủng VAX-BOX được niêm yết công khai, cam kết bình ổn giá trên toàn hệ thống, miễn phí khám và
        nhiều tiện ích.
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
  <span className='text-1xl font-bold text-white'>
    Danh Mục
  </span>
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

      <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text' id='price-list'>
        Danh sách Bảng Giá Vắc-Xin
      </h2>

      <Filter filterOption={filterOption} onFilterChange={handleFilterChange} />

      {filteredPrices.length === 0 ? (
        <p className='text-center mt-4 text-red-500'>Không có kết quả phù hợp với bộ lọc của bạn.</p>
      ) : (
        <div className='overflow-x-auto bg-white shadow-md rounded-lg mx-auto'>
          <table className='min-w-full table-auto border-collapse border border-gray-300'>
            <thead className='bg-teal-700 text-white'>
              <tr>
                <th className='border px-6 py-4'>STT</th>
                <th className='border px-6 py-4'>Tên Vắc-Xin</th>
                <th className='border px-6 py-4'>Công Dụng</th>
                <th className='border px-6 py-4'>Quốc Gia</th>
                <th className='border px-6 py-4'>Giá</th>
                <th className='border px-6 py-4'>Tình Trạng</th>
              </tr>
            </thead>
            <tbody>
              {currentVaccines.map((vaccine, index) => (
                <tr key={vaccine.id} className='hover:bg-teal-100'>
                  <td className='border-b px-6 py-4'>{startIndex + index + 1}</td>
                  <td className='border-b px-6 py-4'>{vaccine.name}</td>
                  <td className='border-b px-6 py-4'>{vaccine.usage}</td>
                  <td className='border-b px-6 py-4'>{vaccine.country}</td>
                  <td className='border-b px-6 py-4'>{vaccine.price}</td>
                  <td className='border-b px-6 py-4'>
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
            Trang Trước
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300'
          >
            Trang Sau
          </button>
        </div>
      </div>

      {/* Terms and Services */}
      {/* Terms and Services */}
      <div className='mt-12 text-lg text-gray-800'>
        <ul className='list-decimal pl-6 mt-4 space-y-4 max-w-4xl mx-auto text-left'>
          <li className='text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 ease-in-out'>
            <span className='font-semibold'>Bảng giá áp dụng trên hệ thống tiêm chủng VAX-BOX từ ngày 03/03/2025.</span>
          </li>
          <li className='text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 ease-in-out'>
            <span className='font-semibold'>Giá vắc xin tại VAX-BOX đã bao gồm:</span> miễn phí khám với đội ngũ bác sĩ
            chuyên môn cao, miễn phí các dịch vụ chăm sóc Khách hàng cao cấp; phí cho tài liệu, ấn phẩm phục vụ Khách
            hàng; chi phí cuộc gọi, tin nhắn (SMS) nhắc lịch tiêm vắc xin; phí chăm sóc Khách hàng trên đa nền tảng; phí
            lưu trữ thông tin lịch sử tiêm chủng…
          </li>
          <li className='text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 ease-in-out'>
            <span className='font-semibold'>
              VAX-BOX miễn phí đặt giữ theo yêu cầu tất cả các loại vắc xin, tiêm bằng giá lẻ nếu Quý Khách hoàn tất
              lịch tiêm trong vòng 5 tuần.
            </span>{' '}
            Quý Khách có lịch tiêm sau 5 tuần, phí đặt giữ vắc xin được tính 20% trên giá lẻ hoặc giá lẻ đã được ưu đãi.
          </li>
          <li className='text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 ease-in-out'>
            <span className='font-semibold'>
              VAX-BOX miễn phí bảo quản vắc xin trong hệ thống kho lạnh GSP theo tiêu chuẩn quốc tế, hệ thống dây chuyền
              lạnh Cold Chain,
            </span>{' '}
            đảm bảo vắc xin an toàn, chất lượng cao ở tất cả các trung tâm trên toàn quốc.
          </li>
        </ul>
      </div>

      {/* Thêm phần mô tả các gói tiêm vắc-xin */}
      <div id='vaccine-services' className='mt-12 text-lg text-gray-800'>
        {/* Tiêu đề của phần dịch vụ tiêm chủng */}
        <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
          Các Dịch Vụ Tiêm Chủng tại VAX-BOX
        </h3>

        <p className='max-w-4xl mx-auto text-left'>
          VAX-BOX mang đến cho quý khách hàng nhiều dịch vụ tiêm chủng linh hoạt, đáp ứng nhu cầu bảo vệ sức khỏe cho
          từng đối tượng:
        </p>

        <ul className='list-disc pl-5 mt-4 space-y-2 max-w-4xl mx-auto text-left'>
          <li>
            <strong>Tiêm lẻ tất cả các loại vắc-xin:</strong> Bạn có thể tiêm riêng từng loại vắc-xin theo nhu cầu.
          </li>
          <li>
            <strong>Gói vắc-xin theo độ tuổi:</strong> Gói vắc-xin cho trẻ dưới 24 tháng, trẻ tiền học đường, trẻ vị
            thành niên và thanh niên, phụ nữ chuẩn bị mang thai, người trưởng thành…
          </li>
          <li>
            <strong>Gói vắc-xin cá thể hóa:</strong> Khách hàng có thể linh động lựa chọn vắc-xin thiết kế thành các gói
            riêng biệt tùy theo nhu cầu, độ tuổi và khả năng chi trả.
          </li>
          <li>
            <strong>Đặt giữ vắc-xin theo yêu cầu:</strong> Quý khách có thể đặt giữ vắc-xin theo yêu cầu với nhiều ưu
            đãi hấp dẫn.
          </li>
          <li>
            <strong>Tiêm chủng lưu động:</strong> Chúng tôi cung cấp dịch vụ tiêm chủng lưu động, theo yêu cầu đối với
            các nhóm khách hàng, cơ quan, doanh nghiệp.
          </li>
        </ul>
      </div>

      {/* Các Gói Tiêm Vắc-Xin */}
      <div id='vaccine-packages' className='mt-12 text-lg text-gray-800'>
        {/* Tiêu đề của các gói tiêm vắc-xin */}
        <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
          Các Gói Tiêm Vắc-Xin
        </h3>

        <p className='max-w-4xl mx-auto text-left'>
          Chúng tôi cung cấp các gói tiêm vắc-xin với nhiều lựa chọn khác nhau để bạn có thể bảo vệ sức khỏe cho bản
          thân và gia đình. Dưới đây là một số gói vắc-xin bạn có thể tham khảo:
        </p>

        {/* Tiêu đề của gói vắc-xin cho trẻ em */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4'>Gói vắc xin cho trẻ em</h4>
        <ul className='list-disc pl-5 mt-4 space-y-2 max-w-4xl mx-auto text-left'>
          <li>Gói vắc xin cho trẻ từ 0 – 6 tháng: 11 – 12 mũi tiêm, phòng hơn 15 bệnh truyền nhiễm nguy hiểm.</li>
          <li>Gói vắc xin cho trẻ từ 0 – 9 tháng: 15 – 17 mũi tiêm, phòng hơn 17 bệnh truyền nhiễm nguy hiểm.</li>
          <li>Gói vắc xin cho trẻ từ 0 – 12 tháng: 21 – 23 mũi tiêm, phòng hơn 22 bệnh truyền nhiễm nguy hiểm.</li>
          <li>Gói vắc xin cho trẻ từ 0 – 24 tháng: 29 – 30 mũi tiêm, phòng hơn 24 bệnh truyền nhiễm nguy hiểm.</li>
        </ul>

        {/* Tiêu đề của gói vắc-xin cho trẻ tiền học đường */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4' id='pre-school-vaccine'>
          Gói vắc xin cho trẻ tiền học đường
        </h4>
        <p className='max-w-4xl mx-auto text-left'>
          Gói tiêm chủng VNVC cho trẻ tiền học đường bao gồm 10 loại vắc xin, 14 liều cơ bản bảo vệ trẻ trước hơn 20 căn
          bệnh truyền nhiễm nguy hiểm.
        </p>

        {/* Tiêu đề của gói vắc-xin cho tuổi vị thành niên và thanh niên */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4' id='teenage-vaccine'>
          Gói vắc xin cho tuổi vị thành niên và thanh niên (Từ 9 – 18 tuổi)
        </h4>
        <p className='max-w-4xl mx-auto text-left'>
          Gói tiêm chủng VNVC cho tuổi vị thành niên và thanh niên bao gồm 15 mũi tiêm cho gần 20 bệnh truyền nhiễm nguy
          hiểm. Có 2 gói nhỏ cho khách hàng lựa chọn: vắc xin Gardasil và Gardasil 9.
        </p>

        {/* Tiêu đề của gói vắc-xin cho người trưởng thành */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4' id='adult-vaccine'>
          Gói vắc xin cho người trưởng thành
        </h4>
        <p className='max-w-4xl mx-auto text-left'>
          Gói vắc xin cho người trưởng thành gồm 11 mũi tiêm, bảo vệ người trưởng thành trước 17 căn bệnh truyền nhiễm.
        </p>

        {/* Tiêu đề của gói vắc-xin cho phụ nữ chuẩn bị mang thai */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4' id='pregnant-vaccine'>
          Gói vắc xin cho phụ nữ chuẩn bị mang thai
        </h4>
        <p className='max-w-4xl mx-auto text-left'>
          Gói vắc xin cho phụ nữ chuẩn bị mang thai gồm 11 mũi tiêm, bảo vệ trước 17 căn bệnh truyền nhiễm.
        </p>

        {/* Tiêu đề của gói vắc-xin cá thể hóa cho người trưởng thành */}
        <h4 className='font-semibold mt-6 text-left text-teal-600 text-lg font-bold ml-4'>
          Gói vắc xin cá thể hóa cho người trưởng thành
        </h4>
        <p className='max-w-4xl mx-auto text-left'>
          Gói vắc xin cá thể hóa cho người trưởng thành là gói vắc xin có thể lựa chọn theo nhu cầu, như các bệnh dịch
          đặc thù hoặc yêu cầu riêng của từng cá nhân.
        </p>
      </div>

      {/* Dịch vụ tiêm chủng lưu động theo yêu cầu */}
      <div className='mt-12 text-lg text-gray-800'>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
          Dịch Vụ Tiêm Chủng Lưu Động Theo Yêu Cầu
        </h3>
        <p className='max-w-4xl mx-auto text-left'>
          Sau đại dịch Covid-19, người dân đã ý thức hơn về tầm quan trọng và vai trò của vắc xin đối với sức khỏe. Nhu
          cầu tiêm chủng của người dân ngày càng cao, đặc biệt là các doanh nghiệp sản xuất, kinh doanh có dây chuyền
          vận hành nhiều khâu chuỗi liên đới, quy mô nhân sự lớn, tần suất và tỷ lệ tiếp xúc giữa người – người diễn ra
          rất cao trong môi trường làm việc. Không tiêm vắc xin cũng đồng nghĩa với việc mất đi một lớp “lá chắn” vững
          chãi, nguy cơ mắc bệnh tăng cao, sức khỏe người lao động bị ảnh hưởng dẫn đến đứt gãy chuỗi cung ứng.
        </p>
        <p className='max-w-4xl mx-auto text-left mt-4'>
          Để bảo vệ sức khỏe cho người lao động, đảm bảo quá trình sản xuất không bị ảnh hưởng, Hệ thống tiêm chủng
          VAX-BOX mang đến giải pháp tiêm chủng lưu động theo yêu cầu của Khách hàng, như tiêm chủng cá nhân, cơ quan,
          doanh nghiệp, trường học… giúp thuận tiện, tiết kiệm thời gian và chi phí tiêm chủng.
        </p>
      </div>
    </div>
  )
}

export default VaccinePrices

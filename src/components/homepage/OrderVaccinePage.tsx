import React, { useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const vaccines = [
  { category: 'Vaccine Trẻ Em', name: 'Vaccine sởi', price: '500.000đ', value: 'measles', description: 'Phòng ngừa bệnh sởi, một bệnh truyền nhiễm nguy hiểm.' },
  { category: 'Vaccine Trẻ Em', name: 'Vaccine thủy đậu', price: '700.000đ', value: 'chickenpox', description: 'Bảo vệ chống lại bệnh thủy đậu, giúp giảm nguy cơ biến chứng.' },
  { category: 'Vaccine Trẻ Em', name: 'Vaccine rota', price: '1.200.000đ', value: 'rotavirus', description: 'Ngăn ngừa nhiễm trùng do virus Rota gây tiêu chảy cấp ở trẻ nhỏ.' },
  { category: 'Vaccine Phụ Nữ Mang Thai', name: 'Vaccine uốn ván - bạch hầu - ho gà', price: '900.000đ', value: 'tdap', description: 'Bảo vệ mẹ và bé khỏi uốn ván, bạch hầu và ho gà.' },
  { category: 'Vaccine Phụ Nữ Mang Thai', name: 'Vaccine cúm', price: '400.000đ', value: 'flu_pregnancy', description: 'Giúp phòng ngừa cúm, đặc biệt quan trọng đối với phụ nữ mang thai.' },
  { category: 'Vaccine Người Lớn', name: 'Vaccine Covid-19', price: '1.500.000đ', value: 'covid', description: 'Tăng cường miễn dịch và giảm nguy cơ mắc Covid-19.' },
  { category: 'Vaccine Người Lớn', name: 'Vaccine cúm', price: '500.000đ', value: 'flu', description: 'Giúp phòng ngừa bệnh cúm theo mùa.' },
  { category: 'Vaccine Người Lớn', name: 'Vaccine viêm gan B', price: '800.000đ', value: 'hepb', description: 'Bảo vệ khỏi nhiễm virus viêm gan B.' },
  { category: 'Vaccine Người Lớn', name: 'Vaccine viêm phổi', price: '1.800.000đ', value: 'pneumococcal', description: 'Giúp giảm nguy cơ viêm phổi do vi khuẩn phế cầu.' },
];

const OrderVaccinePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleVaccineSelection = (vaccine) => {
    setSelectedVaccines((prev) =>
      prev.some((v) => v.value === vaccine.value)
        ? prev.filter((v) => v.value !== vaccine.value)
        : [...prev, vaccine]
    );
  };

  const handleRegister = () => {
    alert('Bạn đã đăng ký tiêm các vaccine: ' + selectedVaccines.map(v => v.name).join(', '));
  };

  const filteredVaccines = vaccines.filter(vaccine => 
    (selectedCategory ? vaccine.category === selectedCategory : true) &&
    vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-gray-50 min-h-screen p-10'>
      <header className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-blue-800 mb-4'>THÔNG TIN SẢN PHẨM VẮC XIN</h1>
        <p className='text-2xl text-gray-600'>Hãy đặt mua vaccine để bảo vệ sức khỏe của bạn</p>
      </header>
      <div className='mb-4 flex gap-4'>
        <div>
          <label className='block text-lg font-semibold'>Lọc theo danh mục</label>
          <select className='w-full p-2 border rounded-lg' onChange={handleCategoryChange} value={selectedCategory}>
            <option value=''>Tất cả</option>
            <option value='Vaccine Trẻ Em'>Vaccine Trẻ Em</option>
            <option value='Vaccine Phụ Nữ Mang Thai'>Vaccine Phụ Nữ Mang Thai</option>
            <option value='Vaccine Người Lớn'>Vaccine Người Lớn</option>
          </select>
        </div>
        <div className='flex-1'>
          <label className='block text-lg font-semibold'>Tìm kiếm Vaccine</label>
          <input 
            type='text' 
            className='w-full p-2 border rounded-lg' 
            placeholder='Nhập tên vaccine...' 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </div>
      </div>
      <main className='max-w-4xl mx-auto flex gap-8'>
        <div className='w-2/3'>
          <div className='grid grid-cols-3 gap-4 mt-2'>
            {filteredVaccines.map((vaccine, index) => (
              <div key={index} className='border p-4 rounded-lg shadow-sm bg-white text-center'>
                <h3 className='font-semibold text-lg'>{vaccine.name}</h3>
                <p className='text-gray-600 flex items-center justify-center gap-2'><FaMoneyBillWave />{vaccine.price}</p>
                <p className='text-gray-500'>{vaccine.description}</p>
                <button
                  className={`mt-2 px-4 py-2 rounded-lg ${selectedVaccines.some(v => v.value === vaccine.value) ? 'bg-red-600' : 'bg-blue-600'} text-white`}
                  onClick={() => toggleVaccineSelection(vaccine)}
                >
                  {selectedVaccines.some(v => v.value === vaccine.value) ? 'Bỏ chọn' : 'Chọn'}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/3 bg-white p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Danh sách đã chọn</h2>
          <ul>
            {selectedVaccines.map((vaccine, index) => (
              <li key={index} className='border-b py-2 flex items-center gap-2'><FaMoneyBillWave /> {vaccine.name} - {vaccine.price}</li>
            ))}
          </ul>
          {selectedVaccines.length > 0 && (
            <button
              className='mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg'
              onClick={handleRegister}
            >
              Đăng ký tiêm
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderVaccinePage;

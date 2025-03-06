// File: VaccineInfoPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Để chuyển trang (cần cài đặt react-router-dom)

interface Vaccine {
  id: number;
  name: string;
  manufacturer: string;
  price: string;
  description: string;
  category: string; // "package" hoặc "retail"
  targetGroup: string; // "children", "adults", etc.
}

interface SelectedPackage {
  id: number;
  name: string;
  manufacturer: string;
  price: string;
  description: string;
}

const VaccineInfoPage: React.FC = () => {
  const navigate = useNavigate();

  // State để quản lý các giá trị lọc
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [vaccineCategory, setVaccineCategory] = useState<string>('');
  const [targetGroup, setTargetGroup] = useState<string>('');
  const [selectedVaccines, setSelectedVaccines] = useState<SelectedPackage[]>([]);

  // Danh sách vắc xin mẫu (dữ liệu tĩnh, có thể thay bằng API)
  const vaccineList: Vaccine[] = [
    {
      id: 1,
      name: 'Vắc xin cúm mùa Vaxigrip Tetra',
      manufacturer: 'Sanofi (Pháp)',
      price: '356,000 VND',
      description: 'Phòng bệnh: Cúm',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 2,
      name: 'Vắc xin cúm mùa Influvac Tetra',
      manufacturer: 'Abbott (Hà Lan)',
      price: '356,000 VND',
      description: 'Phòng bệnh: Cúm',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 3,
      name: 'Vắc xin IVACFLU-S 0.5ml',
      manufacturer: 'IVAC (Việt Nam)',
      price: '315,000 VND',
      description: 'Phòng bệnh: Cúm (người lớn > 18 tuổi)',
      category: 'retail',
      targetGroup: 'adults',
    },
    {
      id: 4,
      name: 'Vắc xin GCFlu Quadrivalent',
      manufacturer: 'Green Cross (Hàn Quốc)',
      price: '350,000 VND',
      description: 'Phòng bệnh: Cúm',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 5,
      name: 'Vắc xin sởi - Quai bị - Rubella MMR II',
      manufacturer: 'MSD (Mỹ)',
      price: '445,000 VND',
      description: 'Phòng bệnh: Sởi, Quai bị, Rubella',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 6,
      name: 'Vắc xin phòng thủy đậu Varilrix',
      manufacturer: 'GSK (Bỉ)',
      price: '1,085,000 VND',
      description: 'Phòng bệnh: Thủy đậu',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 7,
      name: 'Vắc xin Priorix phòng sởi - Quai bị',
      manufacturer: 'GSK (Bỉ)',
      price: '350,000 VND',
      description: 'Phòng bệnh: Sởi, Quai bị',
      category: 'retail',
      targetGroup: 'children',
    },
    {
      id: 8,
      name: 'Vắc xin Shingrix phòng zona',
      manufacturer: 'GSK (Bỉ)',
      price: '1,085,000 VND',
      description: 'Phòng bệnh: Zona (người lớn)',
      category: 'retail',
      targetGroup: 'adults',
    },
    {
      id: 9,
      name: 'Vắc xin phòng bệnh sốt xuất huyết Qdenga',
      manufacturer: 'Takeda (Nhật Bản)',
      price: '1,085,000 VND',
      description: 'Phòng bệnh: Sốt xuất huyết',
      category: 'retail',
      targetGroup: 'adults',
    },
  ];

  // Hàm lọc dữ liệu
  const filteredVaccines = vaccineList.filter((vaccine) => {
    const matchesSearch = vaccine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !vaccineCategory || vaccine.category === vaccineCategory;
    const matchesTargetGroup = !targetGroup || vaccine.targetGroup === targetGroup;
    return matchesSearch && matchesCategory && matchesTargetGroup;
  });

  // Hàm xử lý khi nhấn vào tên vắc xin (chuyển trang chi tiết)
  const handleViewDetail = (id: number) => {
    navigate(`/vaccine-detail/${id}`); // Chuyển đến trang chi tiết (cần thiết lập route)
  };

  // Hàm xử lý khi nhấn nút "CHỌN" hoặc "LIÊN HỆ"
  const handleSelectVaccine = (vaccine: Vaccine, isContact: boolean = false) => {
    const newSelectedPackage: SelectedPackage = {
      id: vaccine.id,
      name: vaccine.name,
      manufacturer: vaccine.manufacturer,
      price: vaccine.price,
      description: vaccine.description,
    };
    setSelectedVaccines([...selectedVaccines, newSelectedPackage]);
  };

  // Hàm xóa mục khỏi danh sách đã chọn
  const handleRemoveVaccine = (id: number) => {
    setSelectedVaccines(selectedVaccines.filter((vaccine) => vaccine.id !== id));
  };

  // Hàm xử lý khi submit form
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      searchTerm,
      vaccineCategory,
      targetGroup,
    });
    // Thêm logic xử lý filter ở đây
  };

  return (
    <div className="w-[100rem] mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <button className="bg-orange-500 text-white px-4 py-2 rounded mr-4">
            Đặt lịch
          </button>
          <h1 className="text-2xl font-bold text-blue-800">
            THÔNG TIN SẢN PHẨM VẮC XIN
          </h1>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm tên vắc xin..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-row gap-6 mt-6">
        {/* Left Sidebar: Filter Category */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Danh mục vắc xin
          </h3>
          <select
            value={targetGroup}
            onChange={(e) => setTargetGroup(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="children">Trẻ em</option>
            <option value="adults">Người lớn</option>
          </select>
        </div>

        {/* Center Section: Vaccine List */}
        <div className="flex-1">
          <div className="bg-white rounded-b-lg shadow-md p-6 mb-6">
            <form onSubmit={handleFilterSubmit} className="space-y-4">
              {/* Bộ lọc theo loại vắc xin (bán lẻ, bán theo gói) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại vắc xin
                </label>
                <select
                  value={vaccineCategory}
                  onChange={(e) => setVaccineCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  <option value="retail">Bán lẻ</option>
                  <option value="package">Bán theo gói</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Vaccine List Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVaccines.map((vaccine) => (
              <div
                key={vaccine.id}
                className="bg-blue-50 rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
                onClick={() => handleViewDetail(vaccine.id)}
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {vaccine.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Nhà sản xuất: {vaccine.manufacturer}
                </p>
                <p className="text-xl font-bold text-green-600 mt-2">
                  {vaccine.price}
                </p>
                <p className="text-sm text-gray-500 mt-2">{vaccine.description}</p>
                {vaccine.category === 'retail' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
                      handleSelectVaccine(vaccine);
                    }}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    CHỌN
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectVaccine(vaccine, true);
                    }}
                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                  >
                    LIÊN HỆ
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Selected Vaccines */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              DANH SÁCH VẮC XIN CHỌN MUA
            </h2>
            {selectedVaccines.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có vắc xin nào được chọn.</p>
            ) : (
              selectedVaccines.map((vaccine) => (
                <div key={vaccine.id} className="border-b border-gray-200 py-4">
                  <h3 className="text-md font-semibold text-blue-600">
                    {vaccine.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Nhà sản xuất: {vaccine.manufacturer}
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-2">
                    {vaccine.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{vaccine.description}</p>
                  <button
                    onClick={() => handleRemoveVaccine(vaccine.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Xóa
                  </button>
                </div>
              ))
            )}
          </div>
          <button className="w-full bg-gray-300 text-white py-2 rounded opacity-50 cursor-not-allowed">
            ĐĂNG KÝ MUA TIỀN
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaccineInfoPage;
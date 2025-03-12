import React, { useState, ChangeEvent } from 'react';
import { FaSyringe, FaUsers, FaPills, FaCalendarCheck, FaCheckCircle, FaDollarSign, FaChartBar, FaCreditCard, FaHistory, FaFileAlt, FaIndustry, FaTruck, FaUser, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

// Declare types for the SidebarItem props
interface SidebarItemProps {
  label: string;
  to: string;
  icon: React.ReactNode;
}

// Sidebar Item Component with Icon
const SidebarItem: React.FC<SidebarItemProps> = ({ label, to, icon }) => (
  <div className='flex items-center p-4 rounded-lg hover:bg-teal-600 hover:text-white cursor-pointer transition duration-300'>
    <span className='mr-3 text-xl'>{icon}</span>
    <span className='text-sm font-medium'>{label}</span>
  </div>
);

interface VaccineData {
  name: string;
  active: number;
}

interface VaccineRanking {
  rank: number;
  name: string;
  doses: number;
}

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const monthlyGrowthData: Record<string, VaccineData[]> = {
    '2025': [
      { name: 'Jan', active: 2400 },
      { name: 'Feb', active: 3900 },
      { name: 'Mar', active: 3200 },
      { name: 'Apr', active: 2500 },
      { name: 'May', active: 3300 },
      { name: 'Jun', active: 3400 },
      { name: 'Jul', active: 2800 },
      { name: 'Aug', active: 3600 },
      { name: 'Sep', active: 4200 }
    ],
    '2024': [
      { name: 'Jan', active: 2000 },
      { name: 'Feb', active: 3500 },
      { name: 'Mar', active: 3000 },
      { name: 'Apr', active: 2200 },
      { name: 'May', active: 3100 },
      { name: 'Jun', active: 3300 },
      { name: 'Jul', active: 2700 },
      { name: 'Aug', active: 3400 },
      { name: 'Sep', active: 4000 }
    ]
  };

  const topVaccines: VaccineRanking[] = [
    { rank: 1, name: 'COVID-19 Vaccine', doses: 1500 },
    { rank: 2, name: 'Influenza Vaccine', doses: 1200 },
    { rank: 3, name: 'Rabies Vaccine', doses: 1100 },
    { rank: 4, name: 'Hepatitis B Vaccine', doses: 900 },
    { rank: 5, name: 'HPV vaccine', doses: 850 },
    { rank: 6, name: 'Measles Vaccine', doses: 800 },
    { rank: 7, name: 'Polio Vaccine', doses: 750 },
    { rank: 8, name: 'Chickenpox Vaccine', doses: 700 },
    { rank: 9, name: 'Meningitis Vaccine', doses: 650 },
    { rank: 10, name: 'Tetanus Vaccine', doses: 600 }
  ];

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-72 bg-white shadow-xl p-6'>
        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 mb-8'>
          Quản lý tiêm chủng
        </h2>
        <div className='space-y-4'>
          <SidebarItem label='Vắc xin' to='/dashboard/vaccine' icon={<FaSyringe />} />
          <SidebarItem label='User' to='/dashboard/user' icon={<FaUser />} />
          <SidebarItem label='Đơn đặt lịch tiêm' to='/dashboard/appointments' icon={<FaClipboardList />} />
          <SidebarItem label='Thanh toán' to='/dashboard/payment' icon={<FaCreditCard />} />
          <SidebarItem label='Lịch sử tiêm chủng' to='/dashboard/history' icon={<FaHistory />} />
          <SidebarItem label='Lịch hẹn tiêm chủng' to='/dashboard/schedule' icon={<FaCalendarAlt />} />
          <SidebarItem label='Blog' to='/dashboard/blog' icon={<FaFileAlt />} />
          <SidebarItem label='Nhà sản xuất' to='/dashboard/manufacturer' icon={<FaIndustry />} />
          <SidebarItem label='Nhà cung cấp' to='/dashboard/supplier' icon={<FaTruck />} />
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8 space-y-8'>
        {/* Dashboard Header */}
        <div className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 mb-6'>
          Tổng quan
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='shadow-lg hover:shadow-2xl transition duration-300'>
            <CardContent className='p-3'>
              <div className='flex items-center mb-3'>
                <span className='bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-2 rounded-full'>
                  <FaDollarSign className='text-white text-xl ' />
                </span>
                <div className='text-sm text-gray-500 ml-3'>Doanh thu</div>
              </div>
              <div className='flex items-center justify-between '>
                <div className='text-2xl font-bold'>700</div>
                <div className='text-green-500 text-sm'>+2.5%</div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-lg hover:shadow-2xl transition duration-300'>
            <CardContent className='p-3'>
              <div className='flex items-center mb-3'>
                <span className='bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-2 rounded-full'>
                  <FaUsers className='text-white text-xl' />
                </span>
                <div className='text-sm text-gray-500 ml-3'>Tổng số Khách hàng đã tiêm</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-2xl font-bold'>100</div>
                <div className='text-red-500 text-sm'>-1.2%</div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-lg hover:shadow-2xl transition duration-300'>
            <CardContent className='p-3'>
              <div className='flex items-center mb-3'>
                <span className='bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-2 rounded-full'>
                  <FaCalendarCheck className='text-white text-xl' />
                </span>
                <div className='text-sm text-gray-500 ml-3'>Số lịch hẹn tiêm</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-2xl font-bold'>123</div>
                <div className='text-green-500 text-sm'>+5.2%</div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-lg hover:shadow-2xl transition duration-300'>
            <CardContent className='p-3'>
              <div className='flex items-center mb-3'>
                <span className='bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-2 rounded-full'>
                  <FaCheckCircle className='text-white text-xl' />
                </span>
                <div className='text-sm text-gray-500 ml-3'>Tổng số vaccine đã tiêm</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-2xl font-bold'>260</div>
                <div className='text-green-500 text-sm'>+11%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ với phần chọn năm ở góc phải */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className="lg:col-span-2 flex flex-col h-full shadow-lg hover:shadow-2xl transition duration-300">
            <CardContent className="p-6 flex-1">
              <div className="flex justify-between items-center mb-12">
                <div className="font-semibold">Biểu đồ số mũi tiêm hàng tháng</div>
                <div>
                  <label htmlFor="year" className="text-lg font-semibold">Chọn năm:</label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="ml-4 p-2 border rounded-md"
                  >
                    <option value={2026}>2026</option>
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                  </select>
                </div>
              </div>

              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="74%">
                  <LineChart data={monthlyGrowthData[selectedYear.toString()] || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 6000]} />
                    <Tooltip />
                    {monthlyGrowthData[selectedYear.toString()] && monthlyGrowthData[selectedYear.toString()].length > 0 ? (
                      <Line type="monotone" dataKey="active" stroke="#34D399" />
                    ) : (
                      <text x="50%" y="50%" textAnchor="middle" fill="#999" fontSize="16">
                        Không có dữ liệu cho năm này
                      </text>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className='lg:col-span-1 flex flex-col h-full shadow-lg rounded-lg bg-white'>
            <CardContent className='p-6 flex-1'>
              <div className='font-semibold text-xl text-blue-500 mb-4 flex items-center'>
                <span className='bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 p-2 rounded-full'>
                  <FaChartBar className='text-white text-xl' />
                </span>
                <span className='ml-3'>
                  Bảng xếp hạng vắc xin
                </span>
              </div>
              <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'> </th>
                      <th className='px-4 py-3 text-left text-sm font-medium text-gray-600'>
                        <FaSyringe className='inline-block mr-2 text-blue-500' />
                        Vắc xin
                      </th>
                      <th className='py-3 text-left text-sm font-medium text-gray-600'>
                        <FaPills className='inline-block mr-2 text-green-500' />
                        Số mũi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topVaccines.map((vaccine) => (
                      <tr key={vaccine.rank} className='border-b hover:bg-gray-50 transition-all duration-200'>
                        <td className='px-4 py-3 text-sm text-gray-700'>{vaccine.rank}</td>
                        <td className='px-4 py-3 text-sm text-gray-700'>{vaccine.name}</td>
                        <td className='px-4 py-3 text-sm text-gray-700'>{vaccine.doses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

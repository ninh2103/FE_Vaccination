import React, { useState } from 'react'
import {
  CogIcon,
  UserIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PencilSquareIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { IconMedicalCross } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmojiTransportation } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import { IoCartOutline } from 'react-icons/io5'

interface SidebarItem {
  name: string
  icon: React.ReactNode
  subItems?: { name: string; path: string }[]
  path?: string
}

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const [activeItem, setActiveItem] = useState<string | null>('General')
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null)
  const navigate = useNavigate()

  const sidebarItems: SidebarItem[] = [
    { name: 'General', icon: <CogIcon className='h-5 w-5' />, path: '/admin/dashboard' },
    { name: 'Vaccines', icon: <IconMedicalCross className='h-5 w-5' />, path: '/admin/vaccines' },
    { name: 'Users', icon: <UserIcon className='h-5 w-5' />, path: '/admin/users' },
    { name: 'Appointment Orders', icon: <TbBrandBooking className='h-5 w-5' />, path: '/admin/order' },
    { name: 'Appointment Schedulings', icon: <IoCartOutline className='h-5 w-5' />, path: '/admin/appointments' },
    { name: 'Vaccination History', icon: <ClockIcon className='h-5 w-5' />, path: '/admin/history' },
    { name: 'Payments', icon: <CurrencyDollarIcon className='h-5 w-5' />, path: '/admin/payments' },
    { name: 'Manufacturers', icon: <BuildingOfficeIcon className='h-5 w-5' />, path: '/admin/manufacturers' },
    { name: 'Suppliers', icon: <MdOutlineEmojiTransportation className='h-5 w-5' />, path: '/admin/suppliers' },
    { name: 'Blogs', icon: <PencilSquareIcon className='h-5 w-5' />, path: '/admin/post' }
  ]

  const handleItemClick = (itemName: string, path?: string) => {
    // If the clicked item is already active, do nothing
    if (activeItem === itemName) {
      return
    }

    // Otherwise, update the active item and navigate
    setActiveItem(itemName)
    setActiveSubItem(null) // Reset sub-item khi click vào mục chính
    if (path) {
      navigate(path)
    }
  }

  const handleSubItemClick = (subItemPath: string) => {
    // If the clicked sub-item is already active, do nothing
    if (activeSubItem === subItemPath) {
      return
    }

    // Otherwise, update the active sub-item and navigate
    setActiveSubItem(subItemPath)
    navigate(subItemPath)
  }

  return (
    <div
      className={`h-screen bg-white text-gray-800 transition-all duration-300 border-r border-gray-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col shadow-sm font-inter`}
    >
      <nav className='mt-4 flex-1'>
        {sidebarItems.map((item, index) => (
          <div key={index} className='relative group'>
            <div
              onClick={() => handleItemClick(item.name, item.path)}
              className={`flex items-center p-3 mx-2 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-100 ${
                activeItem === item.name || activeSubItem === item.path ? 'bg-gray-100' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center h-6 w-6 ${
                  activeItem === item.name || activeSubItem === item.path ? 'text-blue-500' : 'text-gray-600'
                }`}
              >
                {item.icon}
              </div>
              {!isCollapsed && (
                <span
                  className={`ml-3 text-sm font-medium ${
                    activeItem === item.name || activeSubItem === item.path
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'
                      : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </span>
              )}
            </div>

            {isCollapsed && (
              <span className='absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap'>
                {item.name}
              </span>
            )}

            {item.subItems && activeItem === item.name && !isCollapsed && (
              <div className='ml-8 mt-1 space-y-1'>
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => handleSubItemClick(subItem.path)}
                    className={`flex items-center p-2 mx-2 cursor-pointer rounded transition-colors duration-200 hover:bg-gray-100 ${
                      activeSubItem === subItem.path ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div
                      className={`flex items-center h-6 w-6 ${
                        activeSubItem === subItem.path ? 'text-blue-500' : 'text-gray-600'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`ml-3 text-sm font-medium ${
                        activeSubItem === subItem.path
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {subItem.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className='p-4'>
        {!isCollapsed && <div className='text-sm text-gray-500'>© {new Date().getFullYear()} VAXBOT</div>}
      </div>
    </div>
  )
}

export default Sidebar

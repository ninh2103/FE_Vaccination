// Sidebar.tsx
import React, { useState } from 'react'
import {
  CogIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PencilSquareIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { IconMedicalCross } from '@tabler/icons-react'
import * as Separator from '@radix-ui/react-separator'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmojiTransportation } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import { IoCartOutline } from 'react-icons/io5'

import path from 'path'

interface SidebarItem {
  name: string
  icon: React.ReactNode
  subItems?: { name: string; path: string }[]
  path?: string
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>('General')
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null)
  const navigate = useNavigate()

  const sidebarItems: SidebarItem[] = [
    { name: 'General', icon: <CogIcon className='h-5 w-5' />, path: '/admin/dashboard' },
    { name: 'Vaccine', icon: <IconMedicalCross className='h-5 w-5' />, path: '/admin/vaccines' },
    { name: 'User', icon: <UserIcon className='h-5 w-5' />, path: '/admin/users' },
    { name: 'Appointment Order', icon: <TbBrandBooking className='h-5 w-5' />, path: '/admin/order' },
    { name: 'Payment', icon: <CurrencyDollarIcon className='h-5 w-5' />, path: '/admin/payments' },
    { name: 'Vaccination History', icon: <ClockIcon className='h-5 w-5' />, path: '/admin/history' },
    { name: 'Appointment Scheduling', icon: <IoCartOutline className='h-5 w-5' />, path: '/admin/appointments' },
    { name: 'Blog', icon: <PencilSquareIcon className='h-5 w-5' />, path: '/admin/post' },
    { name: 'Manufacturer', icon: <BuildingOfficeIcon className='h-5 w-5' />, path: '/admin/manufacturers' },
    { name: 'Supplier', icon: <MdOutlineEmojiTransportation className='h-5 w-5' />, path: '/admin/suppliers' }
  ]

  const handleItemClick = (itemName: string, path?: string) => {
    setActiveItem(activeItem === itemName ? null : itemName)
    if (path) {
      navigate(path)
    }
  }

  const handleSubItemClick = (subItemPath: string) => {
    setActiveSubItem(subItemPath)
    navigate(subItemPath)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`h-screen bg-white text-gray-800 transition-all duration-300 border-r border-gray-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col justify-between shadow-sm font-inter relative`}
    >
      <div className='flex flex-col'>
        {/* Header với Logo và Nút Thu Gọn */}
        <div className='p-4 flex items-center border-b border-gray-200'>
          {!isCollapsed && (
            <span className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
              VAXBOT
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className='absolute top-4 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 opacity-70 hover:opacity-100'
            aria-label='Toggle sidebar'
          >
            {isCollapsed ? (
              <ChevronRightIcon className='h-4 w-4 text-gray-500' />
            ) : (
              <ChevronLeftIcon className='h-4 w-4 text-gray-500' />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className='mt-4'>
          {sidebarItems.map((item, index) => (
            <div key={index} className='relative group'>
              <div
                onClick={() => handleItemClick(item.name, item.path)}
                className={`flex items-center p-3 mx-2 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-100`}
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
                      className={`flex items-center p-2 mx-2 cursor-pointer rounded transition-colors duration-200 hover:bg-gray-100`}
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
      </div>

      <div className='p-4 mb-4'>
        {!isCollapsed && <Separator.Root className='h-[1px] bg-gray-200 mx-2 mb-2' decorative />}
      </div>
    </div>
  )
}

export default Sidebar

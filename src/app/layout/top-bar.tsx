import React, { useState } from 'react'
import { SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useLogoutMutation } from '@/queries/useAuth'
import {
  getRefreshTokenFromLS,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  setUserToLS
} from '@/core/shared/storage'
import { useGetMeQuery } from '@/queries/useUser'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
// Định nghĩa kiểu cho CustomEvent
interface TopbarProps {
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarCollapsed, onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const logoutMutation = useLogoutMutation()
  const getMeQuery = useGetMeQuery()
  const user = getMeQuery.data
  if (user) {
    setUserToLS({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role.name
    })
  }

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Language Options

  const handleLogout = () => {
    logoutMutation.mutate({ params: { refresh_token: getRefreshTokenFromLS() } })
    removeAccessTokenFromLS()
    removeRefreshTokenFromLS()
  }

  return (
    <div className='w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 shadow-sm'>
      {/* Left Section: Logo and Collapse Button */}
      <div className='flex items-center space-x-4'>
        <img src={'/logo33.png'} alt='logo' className='w-24 h-20' />
        <button
          onClick={onToggleSidebar}
          className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center'
          aria-label='Toggle sidebar'
        >
          {isSidebarCollapsed ? (
            <ChevronRightIcon className='h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 transform hover:scale-110' />
          ) : (
            <ChevronLeftIcon className='h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 transform hover:scale-110' />
          )}
        </button>
      </div>

      {/* Right Section */}
      <div className='flex items-center space-x-4'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
          aria-label='Toggle dark mode'
        >
          {isDarkMode ? (
            <SunIcon className='h-5 w-5 text-gray-600 dark:text-gray-300' />
          ) : (
            <MoonIcon className='h-5 w-5 text-gray-600 dark:text-gray-300' />
          )}
        </button>

        {/* Language Dropdown */}
        {/* <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center'
              aria-label='Change language'
            >
              <span className='text-sm font-medium text-gray-700 dark:text-gray-200'>{language}</span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='min-w-[120px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-1'
              sideOffset={5}
            >
              {languages.map((lang) => (
                <DropdownMenu.Item
                  key={lang.code}
                  onSelect={() => setLanguage(lang.code)}
                  className='px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'
                >
                  {lang.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root> */}

        {/* Account Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center'
              aria-label='Account menu'
            >
              <Avatar>
                <AvatarImage src={user?.avatar || ''} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline'>
                {user?.name}
              </span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='min-w-[160px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-1'
              sideOffset={5}
            >
              <Link to={path.admin.profile}>
                <DropdownMenu.Item className='px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'>
                  Hồ sơ cá nhân
                </DropdownMenu.Item>
              </Link>

              <DropdownMenu.Separator className='h-px bg-gray-200 dark:bg-gray-700 my-1' />
              <Link to={path.login}>
                <DropdownMenu.Item
                  className='px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'
                  onClick={handleLogout}
                >
                  Đăng xuất
                </DropdownMenu.Item>
              </Link>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  )
}

export default Topbar

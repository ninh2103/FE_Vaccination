// Topbar.tsx
import React, { useState } from 'react'
import { SunIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const Topbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState('EN')

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
  const languages = [
    { code: 'ENG', label: 'English' },
    { code: 'VIE', label: 'Tiếng Việt' }
  ]

  return (
    <div className='w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-end px-4 shadow-sm'>
      {/* Right Section */}
      <div className='flex items-center space-x-4'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          aria-label='Toggle dark mode'
        >
          {isDarkMode ? (
            <SunIcon className='h-5 w-5 text-gray-600 dark:text-gray-300' />
          ) : (
            <MoonIcon className='h-5 w-5 text-gray-600 dark:text-gray-300' />
          )}
        </button>

        {/* Language Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center'
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
        </DropdownMenu.Root>

        {/* Account Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center'
              aria-label='Account menu'
            >
              <UserCircleIcon className='h-6 w-6 text-gray-600 dark:text-gray-300' />
              <span className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline'>
                Thằng Ánh ngu ngok @1
              </span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='min-w-[160px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-1'
              sideOffset={5}
            >
              <DropdownMenu.Item className='px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'>
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item className='px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'>
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator className='h-px bg-gray-200 dark:bg-gray-700 my-1' />
              <DropdownMenu.Item className='px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer outline-none'>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  )
}

export default Topbar

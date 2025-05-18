'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { Icons } from '@/components/ui/icon'

const navItems = [
  { name: 'Trang chủ', href: path.home, type: 'route' },
  { name: 'Giới thiệu', href: '/introduce', type: 'route' },
  { name: 'Danh mục Vắc xin', href: '/vaccination/list', type: 'route' },
  { name: 'Tin tức ', href: '/blog', type: 'route' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('')
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname
    const activeItem = navItems.find(
      (item) =>
        item.type === 'route' &&
        (item.href === currentPath || (currentPath.startsWith(item.href) && item.href !== path.home))
    )
    setActiveNavItem(activeItem?.name || (currentPath === path.home ? 'Trang chủ' : ''))
  }, [location.pathname])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavItemClick = (name: string) => {
    setActiveNavItem(name)
    setIsMenuOpen(false)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link to={path.home} className='flex items-center space-x-2'>
            <img src={'/logo33.png'} alt='logo' className='w-24 h-20' />
          </Link>
          <nav className='hidden md:flex justify-center flex-1'>
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant='ghost'
                    className={`text-gray-900 dark:text-white hover:text-blue-400 transition-colors mx-3 ${
                      activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                    }`}
                    onClick={() => handleNavItemClick(item.name)}
                  >
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.name}
                  variant='ghost'
                  className={`text-gray-900 dark:text-white hover:text-blue-400 transition-colors mx-3 ${
                    activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                  }`}
                  onClick={() => {
                    scrollToSection(item.name.toLowerCase())
                    handleNavItemClick(item.name)
                  }}
                >
                  {item.name}
                </Button>
              )
            )}
          </nav>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden text-gray-900 dark:text-white hover:text-blue-400'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Icons.X className='h-6 w-6' /> : <Icons.Menu className='h-6 w-6' />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className='mt-4 md:hidden'>
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant='ghost'
                    className={`w-full text-left text-gray-900 dark:text-white hover:text-blue-400 py-2 ${
                      activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                    }`}
                    onClick={() => handleNavItemClick(item.name)}
                  >
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.name}
                  variant='ghost'
                  className={`w-full text-left text-gray-900 dark:text-white hover:text-blue-400 py-2 ${
                    activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                  }`}
                  onClick={() => {
                    scrollToSection(item.name.toLowerCase())
                    handleNavItemClick(item.name)
                  }}
                >
                  {item.name}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </header>
  )
}
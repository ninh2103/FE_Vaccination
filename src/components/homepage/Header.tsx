'use client'
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronUp, UserCircle, LogOut, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link, useLocation } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { Icons } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import Chatbox from '@/pages/chatbox/Chatbox'
import { useGetMeQuery } from '@/queries/useUser'
import {
  setUserToLS,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  getRefreshTokenFromLS,
  removeUserFromLS
} from '@/core/shared/storage'
import { useLogoutMutation } from '@/queries/useAuth'
import MessengerButton from '@/pages/Messenger/messenger'
import { useListVaccinationQuery } from '@/queries/useVaccination'

interface NavItem {
  name: string
  href: string
  type: 'route' | 'section'
  sectionId?: string
}

const navItems: NavItem[] = [
  { name: 'Trang chủ', href: path.home, type: 'route' },
  { name: 'Giới thiệu', href: '#features', type: 'section', sectionId: 'features' },
  { name: 'Vắc xin', href: '#vaccines', type: 'section', sectionId: 'vaccines' },
  { name: 'Bác sĩ', href: '#doctor', type: 'section', sectionId: 'doctor' },
  { name: 'Tin tức', href: '#blog', type: 'section', sectionId: 'blog' },
  { name: 'Liên hệ', href: '#contact', type: 'section', sectionId: 'contact' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('Trang chủ')
  const location = useLocation()
  const rafRef = useRef<number | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const getMeQuery = useGetMeQuery()
  const user = getMeQuery.data
  if (user) {
    setUserToLS({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role.name,
      isVerified: user?.isVerified
    })
  }
  const logoutMutation = useLogoutMutation()

  // Fetch vaccination data
  const { data: vaccination, isLoading } = useListVaccinationQuery({
    page: 1,
    items_per_page: 100,
    search: searchQuery
  })

  // Memoize filtered vaccines to avoid redundant computation
  const filteredVaccines = useMemo(() => {
    if (!vaccination?.data || !searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return vaccination.data.filter(
      (vaccine) =>
        (vaccine.vaccineName?.toLowerCase() || '').includes(query) ||
        (vaccine.description?.toLowerCase() || '').includes(query)
    )
  }, [vaccination?.data, searchQuery])

  // Cache section elements on mount
  useEffect(() => {
    navItems
      .filter((item): item is NavItem & { sectionId: string } => item.type === 'section' && !!item.sectionId)
      .forEach((item) => {
        sectionRefs.current[item.sectionId] = document.getElementById(item.sectionId)
      })
  }, [])

  // Optimized checkSectionInView with priority for "Bác sĩ"
  const checkSectionInView = useCallback(() => {
    if (location.pathname !== path.home) return

    const scrollPosition = window.scrollY
    if (scrollPosition < 300) {
      setActiveNavItem('Trang chủ')
      return
    }

    // Prioritize checking "Bác sĩ" section
    const doctorSection = sectionRefs.current['doctor']
    if (doctorSection) {
      const rect = doctorSection.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        setActiveNavItem('Bác sĩ')
        return
      }
    }

    // Check other sections
    const sections = navItems
      .filter(
        (item): item is NavItem & { sectionId: string } =>
          item.type === 'section' && !!item.sectionId && item.sectionId !== 'doctor'
      )
      .map((item) => ({
        name: item.name,
        sectionId: item.sectionId
      }))

    for (const { name, sectionId } of sections) {
      const element = sectionRefs.current[sectionId]
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveNavItem(name)
          return
        }
      }
    }

    // Default to Trang chủ if no section is in view
    setActiveNavItem('Trang chủ')
  }, [location.pathname])

  // Handle scroll with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
      checkSectionInView()
      rafRef.current = null
    })
  }, [checkSectionInView])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    if (location.pathname === path.home) {
      checkSectionInView()
    } else {
      const sectionItem = navItems.find((item) => item.type === 'section' && location.hash === item.href)
      setActiveNavItem(sectionItem?.name || '')
    }
  }, [location.pathname, location.hash, checkSectionInView])

  const scrollToSection = useCallback(
    (sectionId: string, name: string) => {
      setActiveNavItem(name)
      if (location.pathname !== path.home) {
        window.location.href = `${path.home}${sectionId}`
        return
      }
      const section = sectionRefs.current[sectionId.replace('#', '')]
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [location.pathname]
  )

  const scrollToTop = useCallback(() => {
    setActiveNavItem('Trang chủ')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(
      { params: { refresh_token: getRefreshTokenFromLS() } },
      {
        onSuccess: () => {
          removeAccessTokenFromLS()
          removeRefreshTokenFromLS()
          removeUserFromLS()
          setIsLoggedIn(false)
        }
      }
    )
  }, [logoutMutation])

  const handleSearchResultClick = useCallback(() => {
    setShowSearchResults(false)
    setSearchQuery('')
  }, [])

  const handleNavItemClick = useCallback(
    (item: NavItem) => {
      setActiveNavItem(item.name)
      setIsMenuOpen(false)
      if (item.type === 'route') {
        if (item.href === path.home) {
          scrollToTop()
        }
      } else if (item.sectionId) {
        scrollToSection(item.href, item.name)
      }
    },
    [scrollToTop, scrollToSection]
  )

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-shadow duration-50 ${
          scrollY > 0 ? 'shadow-md' : ''
        }`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link
              to={path.home}
              className='flex items-center space-x-2'
              onClick={() => handleNavItemClick(navItems[0])}
            >
              <img src={'/logo33.png'} alt='logo' className='w-24 h-20' />
            </Link>
            <nav className='hidden md:flex space-x-6'>
              {navItems.map((item) =>
                item.type === 'route' ? (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant='ghost'
                      className={`text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 ${
                        activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                      }`}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={item.name}
                    variant='ghost'
                    className={`text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 ${
                      activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                    }`}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.name}
                  </Button>
                )
              )}
            </nav>

            <div className='relative w-1/2 max-w-xs'>
              <div className='relative'>
                <Input
                  type='search'
                  id='search'
                  placeholder='Tìm kiếm vắc xin...'
                  className='w-full text-sm p-2 text-black-400 pl-10'
                  value={searchQuery}
                  onChange={(e) => {
                    const query = e.target.value
                    setSearchQuery(query)
                    setShowSearchResults(!!query.trim())
                  }}
                  onFocus={() => setShowSearchResults(!!searchQuery.trim())}
                  autoComplete='off'
                  spellCheck='false'
                  autoCorrect='off'
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              </div>
              {showSearchResults && searchQuery && (
                <div className='absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto z-50'>
                  {isLoading ? (
                    <div className='px-4 py-2 text-sm text-gray-500 dark:text-gray-400'>Đang tải...</div>
                  ) : filteredVaccines.length > 0 ? (
                    filteredVaccines.map((vaccine) => (
                      <Link
                        key={vaccine.id}
                        to={`/vaccination/${vaccine.id}`}
                        onClick={handleSearchResultClick}
                        className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 space-x-3'
                      >
                        <img
                          src={vaccine.image || '/placeholder.svg?height=40&width=40'}
                          alt={vaccine.vaccineName}
                          className='w-10 h-10 object-cover rounded-md'
                        />
                        <span>{vaccine.vaccineName}</span>
                      </Link>
                    ))
                  ) : (
                    <div className='px-4 py-2 text-sm text-gray-500 dark:text-gray-400'>Không tìm thấy kết quả</div>
                  )}
                </div>
              )}
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <ThemeToggle />
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src='/avatars/01.png' alt='@user' />
                        <AvatarFallback>
                          <UserCircle className='h-6 w-6' />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <Link to={path.profile}>
                      <DropdownMenuItem className='flex items-center'>
                        <UserCircle className='mr-2 h-4 w-4' />
                        <span>{user?.name}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to={path.login}>
                      <DropdownMenuItem className='flex items-center' onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Đăng xuất</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to={path.login}>
                    <Button
                      variant='ghost'
                      className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50'
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to={path.register}>
                    <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:text-blue-400 text-white'>
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X className='h-6 w-6' /> : <Icons.Menu className='h-6 w-6' />}
            </Button>
          </div>
          {isMenuOpen && (
            <div className='mt-4 md:hidden transition-all duration-50 ease-in-out'>
              {navItems.map((item) =>
                item.type === 'route' ? (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant='ghost'
                      className={`w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 py-2 ${
                        activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                      }`}
                      onClick={() => handleNavItemClick(item)}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={item.name}
                    variant='ghost'
                    className={`w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 py-2 ${
                      activeNavItem === item.name ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                    }`}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.name}
                  </Button>
                )
              )}
              {isLoggedIn ? (
                <>
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 py-2'
                  >
                    {user?.name}
                  </Button>
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 py-2'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Link to={path.login} className='w-full'>
                    <Button
                      variant='ghost'
                      className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-50 py-2'
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to={path.register} className='w-full'>
                    <Button className='w-full mt-2 bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-600 hover:to-blue-600 text-white'>
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {showScrollTop && (
        <div className='fixed bottom-44 right-8 group z-50'>
          <button
            onClick={scrollToTop}
            className='relative bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white text-sm font-medium p-2 rounded-full shadow-md border border-white/20 w-10 h-10 flex items-center justify-center hover:from-blue-600 hover:via-green-600 hover:to-teal-600 transition-all duration-50'
            aria-label='Quay về đầu trang'
          >
            <ChevronUp className='h-5 w-5' />
            <div className='absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-50'>
              <div className='relative bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-md border border-white/20 w-48 text-center'>
                Quay về đầu trang
                <div className='absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-blue-400'></div>
              </div>
            </div>
          </button>
        </div>
      )}
      <div className='fixed bottom-24 right-6 rounded-full shadow-lg z-50'>
        <MessengerButton />
        <Chatbox />
      </div>
    </div>
  )
}

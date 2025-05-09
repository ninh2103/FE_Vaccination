import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle, LogOut, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
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

const navItems = [
  { name: 'Trang chủ', href: '#home' },
  { name: 'Giới thiệu', href: '#features' },
  { name: 'Vắc xin', href: '#vaccines' },
  { name: 'Bác sĩ', href: '#doctor' },
  { name: 'Tin tức', href: '#blog' },
  { name: 'Liên hệ', href: '#contact' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [, setShowAlert] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

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
  const { data: vaccination } = useListVaccinationQuery({
    page: 1,
    items_per_page: 100,
    search: searchQuery
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (scrollY > 60) {
      setShowAlert(false)
    } else {
      setShowAlert(true)
    }

    if (scrollY > 300) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.replace('#', ''))
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    logoutMutation.mutate(
      { params: { refresh_token: getRefreshTokenFromLS() } },
      {
        onSuccess: () => {
          removeAccessTokenFromLS()
          removeRefreshTokenFromLS()
          removeUserFromLS()
        }
      }
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(true)
  }

  const handleSearchResultClick = () => {
    setShowSearchResults(false)
    setSearchQuery('')
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out ${scrollY > 0 ? 'shadow-md' : ''}`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link to={path.home} className='flex items-center space-x-2'>
              <img src={'/logo33.png'} alt='logo' className='w-24 h-20' />
            </Link>
            <nav className='hidden md:flex space-x-6'>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className='relative w-1/2 max-w-xs'>
              <div className='relative'>
                <Input
                  type='search'
                  id='search'
                  placeholder='Tìm kiếm vắc xin...'
                  className='w-full text-sm p-2 text-blue-400 pl-10'
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setShowSearchResults(true)}
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              </div>
              {showSearchResults && searchQuery && (
                <div className='absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto z-50'>
                  {vaccination?.data && vaccination.data.length > 0 ? (
                    vaccination.data.map((vaccine) => (
                      <Link
                        key={vaccine.id}
                        to={`/vaccination/${vaccine.id}`}
                        onClick={handleSearchResultClick}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200'
                      >
                        {vaccine.vaccineName}
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
                      className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
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
              className='md:hidden text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Icons.X className='h-6 w-6' /> : <Icons.Menu className='h-6 w-6' />}
            </Button>
          </div>
          {isMenuOpen && (
            <div className='mt-4 md:hidden transition-all duration-300 ease-in-out'>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors py-2'
                  onClick={() => {
                    scrollToSection(item.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {item.name}
                </Button>
              ))}
              {isLoggedIn ? (
                <>
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors py-2'
                  >
                    {user?.name}
                  </Button>
                  <Button
                    variant='ghost'
                    className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors py-2'
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
                      className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors py-2'
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
        <Button
          variant='secondary'
          size='icon'
          className='fixed bottom-28 right-4 rounded-full shadow-lg z-50'
          onClick={scrollToTop}
        >
          <ChevronUp className='h-6 w-6' />
        </Button>
      )}

      <div className='fixed bottom-4 right-4 flex flex-col items-end gap-3 z-50'>
        <MessengerButton />
        <Chatbox />
      </div>
    </div>
  )
}

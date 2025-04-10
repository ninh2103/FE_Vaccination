import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronUp, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle, LogOut, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { Icons } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import Chatbox from '@/pages/chatbox/Chatbox'
import { useGetMeQuery } from '@/queries/useUser'
import { setUserToLS } from '@/core/shared/storage'
import { Card, CardContent } from '@/components/ui/card'

// Dữ liệu giả lập cho vaccine
const vaccineData = [
  {
    id: 1,
    name: 'Pfizer-BioNTech COVID-19 Vaccine',
    brand: 'Pfizer',
    price: 500000,
    image: '/images/pfizer-vaccine.jpg',
    category: 'COVID-19'
  },
  {
    id: 2,
    name: 'Moderna COVID-19 Vaccine',
    brand: 'Moderna',
    price: 550000,
    image: '/images/moderna-vaccine.jpg',
    category: 'COVID-19'
  },
  {
    id: 3,
    name: 'AstraZeneca COVID-19 Vaccine',
    brand: 'AstraZeneca',
    price: 450000,
    image: '/images/astrazeneca-vaccine.jpg',
    category: 'COVID-19'
  },
  {
    id: 4,
    name: 'Gardasil HPV Vaccine',
    brand: 'Merck',
    price: 2000000,
    image: '/images/gardasil-vaccine.jpg',
    category: 'HPV'
  },
  {
    id: 5,
    name: 'Fluarix Influenza Vaccine',
    brand: 'GSK',
    price: 300000,
    image: '/images/fluarix-vaccine.jpg',
    category: 'Influenza'
  }
]

interface Vaccine {
  id: number
  name: string
  brand: string
  price: number
  image: string
  category: string
}

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Vaccines', href: '#vaccines' },
  { name: 'Doctor', href: '#doctor' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blog', href: '#blog' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Vaccine[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigate = useNavigate()
  const getMeQuery = useGetMeQuery()
  const user = getMeQuery.data

  useEffect(() => {
    if (user) {
      setUserToLS({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      })
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (scrollY > 300) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }, [scrollY])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  // Xử lý tìm kiếm theo thời gian thực
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = vaccineData.filter(
        (vaccine) =>
          vaccine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vaccine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vaccine.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
      setIsSearchOpen(true)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }, [searchQuery])

  const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== 'Enter') return
    if (searchQuery.trim()) {
      setIsSearchOpen(false)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearchOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <header
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
          scrollY > 0 ? 'shadow-md' : ''
        }`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link to={path.home} className='flex items-center space-x-2'>
              <Icons.Syringe className='h-8 w-8 text-blue-400' />
              <span className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                VAX-BOT
              </span>
            </Link>
            <nav className='hidden md:flex space-x-6'>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                >
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className='relative w-1/2 max-w-xs flex items-center gap-2'>
              <div className='relative flex-1'>
                <Input
                  type='search'
                  id='search'
                  placeholder='Search for vaccine...'
                  className='w-full text-sm p-3 pr-10 rounded-full border border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 transition-all duration-300 shadow-sm dark:bg-gray-800 dark:text-white placeholder-gray-400'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 text-white hover:from-blue-500 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
                onClick={() => handleSearch()}
              >
                <Search className='h-5 w-5' />
              </Button>
              {isSearchOpen && searchResults.length > 0 && (
                <Card className='absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700'>
                  <CardContent className='p-2'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-sm font-semibold text-gray-900 dark:text-white'>Kết quả tìm kiếm: </span>
                    </div>
                    {searchResults.map((vaccine) => (
                      <Link
                        key={vaccine.id}
                        to={`/search?q=${encodeURIComponent(vaccine.name)}`}
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <div className='flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors'>
                          <img src={vaccine.image} alt={vaccine.name} className='w-10 h-10 object-contain rounded' />
                          <div>
                            <p className='text-sm font-semibold text-gray-900 dark:text-white'>{vaccine.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className='hidden md:flex items-center space-x-4'>
              <ThemeToggle />
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
              >
                <Icons.Globe className='h-5 w-5' />
              </Button>
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
                    <DropdownMenuItem className='flex items-center' onClick={handleSignOut}>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to={path.login}>
                    <Button
                      variant='ghost'
                      className='text-gray-900 dark:text-white hover:text-blue-400 transition-colors'
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to={path.register}>
                    <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white rounded-full px-4 py-2 shadow-sm transition-all duration-300'>
                      Sign up
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
                    scrollToSection(item.name.toLowerCase())
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
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to={path.login} className='w-full'>
                    <Button
                      variant='ghost'
                      className='w-full text-left text-gray-900 dark:text-white hover:text-blue-400 transition-colors py-2'
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to={path.register} className='w-full'>
                    <Button className='w-full mt-2 bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-600 hover:to-blue-600 text-white rounded-full'>
                      Sign up
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
      <Chatbox />
    </div>
  )
}

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { ChevronUp, ChevronDown, Search, Calendar, Tag } from 'lucide-react'

// Use the same interface from the VaccineDetail page
interface Vaccine {
  id: number
  name: string
  image?: string
  info: string
  price: number
  manufacturer: string
  country: string
  type: string
  quantity: number
  expiryDate: string
  doseInterval: string
  target: string
  dosage: string
  administration: string
  contraindications: string
  sideEffects: string
  storage: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

// Mock data - in a real app, this would come from an API
const vaccines: Vaccine[] = [
  {
    id: 1,
    name: 'COVID-19 Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'COVID-19 prevention vaccine that provides protection against COVID-19 and its variants, helping to reduce the spread of the virus.',
    price: 500000,
    manufacturer: 'BioNTech',
    country: 'Germany',
    type: 'Adult',
    quantity: 15,
    expiryDate: '2025-12-31',
    doseInterval: '21 days',
    target: 'People over 12',
    dosage: '0.3ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy to vaccine components',
    sideEffects: 'Pain at injection site, fatigue, headache, muscle pain, chills, joint pain, fever',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Influenza Vaccine',
    image: 'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
    info: 'Annual vaccination to protect against influenza viruses and reduce flu-related complications.',
    price: 300000,
    manufacturer: 'Sanofi Pasteur',
    country: 'France',
    type: 'Children',
    quantity: 8,
    expiryDate: '2025-09-30',
    doseInterval: 'N/A',
    target: 'Children from 6 months',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Egg allergy',
    sideEffects: 'Mild fever, soreness at injection site',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 3,
    name: 'Hepatitis B Vaccine',
    image: 'https://images.unsplash.com/photo-1625831152157-2b0e2ca79efa',
    info: 'Hepatitis B prevention',
    price: 200000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 0,
    expiryDate: '2025-03-15',
    doseInterval: '30 days',
    target: 'Adults',
    dosage: '1ml',
    administration: 'Intramuscular',
    contraindications: 'Yeast allergy',
    sideEffects: 'Muscle pain',
    storage: '2-8°C',
    status: 'Out of Stock'
  },
  {
    id: 4,
    name: 'Tetanus Vaccine',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e',
    info: 'Tetanus prevention',
    price: 150000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Adult',
    quantity: 20,
    expiryDate: '2025-06-20',
    doseInterval: 'N/A',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'None',
    sideEffects: 'Soreness',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 5,
    name: 'MMR Vaccine',
    image: 'https://images.unsplash.com/photo-1576073353698-c6406c5f1796',
    info: 'Measles, Mumps, Rubella',
    price: 400000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Children',
    quantity: 5,
    expiryDate: '2025-10-05',
    doseInterval: '28 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Subcutaneous',
    contraindications: 'Immunodeficiency',
    sideEffects: 'Rash',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 6,
    name: 'Polio Vaccine',
    image: 'https://images.unsplash.com/photo-1612277803164-2d529af86595',
    info: 'Polio prevention',
    price: 250000,
    manufacturer: 'Sanofi',
    country: 'France',
    type: 'Children',
    quantity: 12,
    expiryDate: '2025-07-15',
    doseInterval: '60 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Oral',
    contraindications: 'None',
    sideEffects: 'None',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 7,
    name: 'HPV Vaccine',
    image: 'https://images.unsplash.com/photo-1582650544481-b98ce8b7319f',
    info: 'Human Papillomavirus',
    price: 600000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 3,
    expiryDate: '2025-11-30',
    doseInterval: '60 days',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy',
    sideEffects: 'Pain',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 8,
    name: 'Rotavirus Vaccine',
    image: 'https://images.unsplash.com/photo-1617391258000-4b063a3066fa',
    info: 'Rotavirus prevention',
    price: 350000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Children',
    quantity: 0,
    expiryDate: '2025-08-25',
    doseInterval: '60 days',
    target: 'Infants',
    dosage: '2ml',
    administration: 'Oral',
    contraindications: 'Intussusception',
    sideEffects: 'Diarrhea',
    storage: '2-8°C',
    status: 'Out of Stock'
  }
]

export default function ListVaccination() {
  const navigate = useNavigate()

  // State for search, filtering, sorting and pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<'all' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Format currency for displaying price
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  // Get status color for badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Toggle sort direction
  const toggleSort = (field: 'name' | 'price') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  // Navigate to detail page when clicking on a vaccine card
  const handleCardClick = (id: number) => {
    navigate(`/vaccination/${id}`)
  }

  // Filter, sort and paginate vaccines
  const filteredAndSortedVaccines = useMemo(() => {
    // First, filter by search term and status
    let result = vaccines.filter((vaccine) => {
      const matchesSearch = vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filter === 'all' || vaccine.status === filter
      return matchesSearch && matchesFilter
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      }
    })

    return result
  }, [vaccines, searchTerm, filter, sortBy, sortDirection])

  // Get current page items
  const currentVaccines = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredAndSortedVaccines.slice(indexOfFirstItem, indexOfLastItem)
  }, [filteredAndSortedVaccines, currentPage, itemsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedVaccines.length / itemsPerPage)

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Available Vaccines</h1>

      {/* Search and Filter Section */}
      <div className='grid gap-4 mb-6 md:grid-cols-3'>
        {/* Search input */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
          <Input
            placeholder='Search vaccines...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        {/* Filter dropdown */}
        <Select
          value={filter}
          onValueChange={(value: 'all' | 'In Stock' | 'Low Stock' | 'Out of Stock') => setFilter(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='In Stock'>In Stock</SelectItem>
            <SelectItem value='Low Stock'>Low Stock</SelectItem>
            <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        {/* Sorting buttons */}
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => toggleSort('name')} className='flex-1'>
            Name
            {sortBy === 'name' &&
              (sortDirection === 'asc' ? (
                <ChevronUp className='ml-1 h-4 w-4' />
              ) : (
                <ChevronDown className='ml-1 h-4 w-4' />
              ))}
          </Button>
          <Button variant='outline' onClick={() => toggleSort('price')} className='flex-1'>
            Price
            {sortBy === 'price' &&
              (sortDirection === 'asc' ? (
                <ChevronUp className='ml-1 h-4 w-4' />
              ) : (
                <ChevronDown className='ml-1 h-4 w-4' />
              ))}
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className='mb-4 text-sm text-gray-500'>
        Showing {currentVaccines.length} of {filteredAndSortedVaccines.length} vaccines
      </div>

      {/* Vaccines grid */}
      {currentVaccines.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {currentVaccines.map((vaccine) => (
            <Card
              key={vaccine.id}
              className='overflow-hidden cursor-pointer hover:shadow-lg transition-shadow'
              onClick={() => handleCardClick(vaccine.id)}
            >
              <div className='aspect-video relative'>
                <img
                  src={vaccine.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                  alt={vaccine.name}
                  className='w-full h-full object-cover'
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(vaccine.status)}`}>{vaccine.status}</Badge>
              </div>
              <CardContent className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>{vaccine.name}</h2>
                <p className='text-gray-500 text-sm mb-3 line-clamp-2'>{vaccine.info}</p>

                <div className='flex items-center justify-between text-sm mb-2'>
                  <div className='flex items-center'>
                    <Tag className='mr-1 h-4 w-4' />
                    <span>Price:</span>
                  </div>
                  <span className='font-semibold'>{formatCurrency(vaccine.price)}</span>
                </div>

                <div className='flex items-center justify-between text-sm mb-2'>
                  <div className='flex items-center'>
                    <Tag className='mr-1 h-4 w-4' />
                    <span>Quantity:</span>
                  </div>
                  <span>{vaccine.quantity} doses</span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-4 w-4' />
                    <span>Expires:</span>
                  </div>
                  <span>{vaccine.expiryDate}</span>
                </div>

                <div className='mt-4'>
                  <span className='text-xs text-gray-500'>Manufacturer: {vaccine.manufacturer}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-lg text-gray-500'>No vaccines match your search criteria</p>
          <Button
            variant='outline'
            onClick={() => {
              setSearchTerm('')
              setFilter('all')
            }}
            className='mt-4'
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className='mt-8'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

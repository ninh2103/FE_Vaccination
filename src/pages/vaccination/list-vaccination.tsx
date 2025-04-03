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
import { useListVaccinationQuery } from '@/queries/useVaccination'

export default function ListVaccination() {
  const navigate = useNavigate()

  // State for search, filtering, sorting and pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'vaccineName' | 'price'>('vaccineName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<'all' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { data: vaccinationList } = useListVaccinationQuery({
    page: currentPage,
    items_per_page: itemsPerPage,
    search: searchTerm
  })

  // Format currency for displaying price
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  // Get status color for badges
  const getStatusColor = (quantity: number) => {
    if (quantity > 10) return 'bg-green-100 text-green-800'
    if (quantity > 0) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  // Get status text for badges
  const getStatusText = (quantity: number) => {
    if (quantity > 10) return 'In Stock'
    if (quantity > 0) return 'Low Stock'
    return 'Out of Stock'
  }

  // Toggle sort direction
  const toggleSort = (field: 'vaccineName' | 'price') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  // Navigate to detail page when clicking on a vaccine card
  const handleCardClick = (id: string) => {
    navigate(`/vaccination/${id}`)
  }

  // Filter, sort and paginate vaccines
  const filteredAndSortedVaccines = useMemo(() => {
    if (!vaccinationList?.data) return []

    // First, filter by search term and status
    let result = vaccinationList.data.filter((vaccine) => {
      const matchesSearch = vaccine.vaccineName.toLowerCase().includes(searchTerm.toLowerCase())
      const status = getStatusText(vaccine.remainingQuantity)
      const matchesFilter = filter === 'all' || status === filter
      return matchesSearch && matchesFilter
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'vaccineName') {
        return sortDirection === 'asc'
          ? a.vaccineName.localeCompare(b.vaccineName)
          : b.vaccineName.localeCompare(a.vaccineName)
      } else {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      }
    })

    return result
  }, [vaccinationList?.data, searchTerm, filter, sortBy, sortDirection])

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
          <Button variant='outline' onClick={() => toggleSort('vaccineName')} className='flex-1 dark:text-white'>
            Name
            {sortBy === 'vaccineName' &&
              (sortDirection === 'asc' ? (
                <ChevronUp className='ml-1 h-4 w-4 dark:text-white' />
              ) : (
                <ChevronDown className='ml-1 h-4 w-4 dark:text-white' />
              ))}
          </Button>
          <Button variant='outline' onClick={() => toggleSort('price')} className='flex-1 dark:text-white'>
            Price
            {sortBy === 'price' &&
              (sortDirection === 'asc' ? (
                <ChevronUp className='ml-1 h-4 w-4 dark:text-white' />
              ) : (
                <ChevronDown className='ml-1 h-4 w-4 dark:text-white' />
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
                  alt={vaccine.vaccineName}
                  className='w-full h-full object-cover'
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(vaccine.remainingQuantity)}`}>
                  {getStatusText(vaccine.remainingQuantity)}
                </Badge>
              </div>
              <CardContent className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>{vaccine.vaccineName}</h2>
                <p className='text-gray-500 text-sm mb-3 line-clamp-2'>{vaccine.description}</p>

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
                  <span>{vaccine.remainingQuantity} doses</span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-4 w-4' />
                    <span>Expires:</span>
                  </div>
                  <span>{new Date(vaccine.expirationDate).toLocaleDateString()}</span>
                </div>

                <div className='mt-4'>
                  <span className='text-xs text-gray-500'>Location: {vaccine.location}</span>
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
              <PaginationItem key={index} className='dark!:bg-white'>
                <PaginationLink
                  className='dark!:text-white'
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
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

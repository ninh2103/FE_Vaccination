import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronUp, ChevronDown, Search, Calendar, Tag } from 'lucide-react'
import { useListVaccinationQuery } from '@/queries/useVaccination'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useListCategoryQuery } from '@/queries/useCategory'
import { VaccineType } from '@/schemaValidator/vaccination.schema'

export default function ListVaccination() {
  const navigate = useNavigate()

  // State for search, filtering, sorting and pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'vaccineName' | 'price'>('vaccineName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [, setVaccines] = useState<VaccineType[]>([])
  const itemsPerPage = 9
  const { data: vaccinationList, isLoading } = useListVaccinationQuery({
    page: 1,
    items_per_page: 100
  })
  const { data: categories } = useListCategoryQuery()

  useEffect(() => {
    if (vaccinationList?.data) {
      let filteredVaccines = vaccinationList.data

      // Apply tag filter if a specific tag is selected
      if (filter !== 'all') {
        filteredVaccines = filteredVaccines.filter((vaccine) => vaccine.categoryVaccinationId === filter)
      }

      setVaccines(filteredVaccines)
    }
  }, [vaccinationList?.data, filter])

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
    if (quantity > 5) return 'Còn hàng'
    if (quantity > 0) return 'Sắp hết hàng'
    return 'Hết hàng'
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

    // First, filter by search term and category
    let result = vaccinationList.data.filter((vaccine) => {
      const matchesSearch =
        searchTerm === '' ||
        vaccine.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filter === 'all' || vaccine.categoryVaccinationId === filter
      return matchesSearch && matchesCategory
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
  }, [vaccinationList?.data, searchTerm, sortBy, sortDirection, filter])

  // Get current page items
  const currentVaccines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAndSortedVaccines.slice(startIndex, endIndex)
  }, [filteredAndSortedVaccines, currentPage, itemsPerPage])

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(filteredAndSortedVaccines.length / itemsPerPage)
  const totalItems = filteredAndSortedVaccines.length
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filter, sortBy, sortDirection])

  if (isLoading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='flex items-center justify-center text-muted-foreground'>
            <LoadingSpinner className='mr-2 h-10 w-10' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 mt-12'>
      <h1 className='text-3xl font-bold mb-6'>Danh sách vaccine</h1>

      {/* Search and Filter Section */}
      <div className='grid gap-4 mb-6 md:grid-cols-3'>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <LoadingSpinner className='h-8 w-8' />
          </div>
        ) : (
          <>
            {/* Search input */}
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
              <Input
                placeholder='Tìm kiếm vaccine...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                type='search'
              />
            </div>
          </>
        )}

        {/* Filter dropdown */}
        <Select value={filter} onValueChange={(value: string) => setFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Lọc theo danh mục' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả danh mục</SelectItem>
            {categories?.data.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sorting buttons */}
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => toggleSort('vaccineName')}
            className='flex-1 dark:text-white dark:bg-gray-900'
          >
            Tên vaccine
            {sortBy === 'vaccineName' &&
              (sortDirection === 'asc' ? (
                <ChevronUp className='ml-1 h-4 w-4 dark:text-white' />
              ) : (
                <ChevronDown className='ml-1 h-4 w-4 dark:text-white' />
              ))}
          </Button>
          <Button
            variant='outline'
            onClick={() => toggleSort('price')}
            className='flex-1 dark:text-white dark:bg-gray-900'
          >
            Giá
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

      {/* Vaccines grid */}
      {currentVaccines.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 '>
          {currentVaccines.map((vaccine) => (
            <Card
              key={vaccine.id}
              className='overflow-hidden cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-green-500'
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
                <p className='dark:text-white text-sm mb-3 line-clamp-2'>{vaccine.description}</p>

                <div className='flex items-center justify-between text-sm mb-2'>
                  <div className='flex items-center'>
                    <Tag className='mr-1 h-4 w-4' />
                    <span>Giá:</span>
                  </div>
                  <span className='font-semibold'>{formatCurrency(vaccine.price)}</span>
                </div>

                <div className='flex items-center justify-between text-sm mb-2'>
                  <div className='flex items-center'>
                    <Tag className='mr-1 h-4 w-4' />
                    <span>Số lượng:</span>
                  </div>
                  <span>{vaccine.remainingQuantity} liệu pháp</span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-4 w-4' />
                    <span>Hạn sử dụng:</span>
                  </div>
                  <span>{new Date(vaccine.expirationDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-lg text-gray-500'>Không tìm thấy vaccine phù hợp</p>
          <Button
            variant='outline'
            onClick={() => {
              setSearchTerm('')
              setFilter('all')
            }}
            className='mt-4'
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2 mt-6'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Hiển thị {startIndex} đến {endIndex} của {totalItems} vaccine
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trang trước
            </Button>
            <div className='flex items-center gap-1'>
              {/* Always show first page */}
              <Button
                variant={currentPage === 1 ? 'default' : 'outline'}
                size='sm'
                onClick={() => setCurrentPage(1)}
                className='min-w-[2.5rem]'
              >
                1
              </Button>

              {/* Show ellipsis if needed */}
              {currentPage > 3 && <span className='px-2'>...</span>}

              {/* Show pages around current page */}
              {(() => {
                const pages = new Set<number>()
                const startPage = Math.max(2, currentPage - 2)
                const endPage = Math.min(totalPages - 1, currentPage + 2)

                for (let page = startPage; page <= endPage; page++) {
                  pages.add(page)
                }

                return Array.from(pages).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className='min-w-[2.5rem]'
                  >
                    {page}
                  </Button>
                ))
              })()}

              {/* Show ellipsis if needed */}
              {currentPage < totalPages - 2 && <span className='px-2'>...</span>}

              {/* Always show last page if there's more than one page */}
              {totalPages > 1 && (
                <Button
                  variant={currentPage === totalPages ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(totalPages)}
                  className='min-w-[2.5rem]'
                >
                  {totalPages}
                </Button>
              )}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Trang tiếp
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

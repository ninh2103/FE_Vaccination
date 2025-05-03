// src/pages/ListVaccination.tsx
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Tag } from 'lucide-react'
import { useListVaccinationQuery } from '@/queries/useVaccination'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useListCategoryQuery } from '@/queries/useCategory'

export default function ListVaccination() {
  const navigate = useNavigate()

  const [sortBy, setSortBy] = useState<'vaccineName' | 'price'>('vaccineName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const { data: vaccinationList, isLoading } = useListVaccinationQuery({
    page: currentPage,
    items_per_page: itemsPerPage
  })
  const { data: categories } = useListCategoryQuery()

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

  const getStatusColor = (quantity: number) => {
    if (quantity > 10) return 'bg-green-100 text-green-800'
    if (quantity > 0) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusText = (quantity: number) => {
    if (quantity > 5) return 'Còn hàng'
    if (quantity > 0) return 'Sắp hết hàng'
    return 'Hết hàng'
  }

  const handleCardClick = (id: string) => {
    navigate(`/vaccination/${id}`)
  }

  const filteredAndSortedVaccines = useMemo(() => {
    if (!vaccinationList?.data) return []

    // console.log('filter', filter)
    let result = vaccinationList.data.filter((vaccine: any) => {
      // console.log('vaccine', vaccine)
      const matchesCategory = filter === 'all' || vaccine?.CategoryVaccination.id?.toString() === filter
      return matchesCategory
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
  }, [vaccinationList?.data, filter, sortBy, sortDirection])

  const currentVaccines = useMemo(() => filteredAndSortedVaccines, [filteredAndSortedVaccines])
  const totalPages = Math.ceil((vaccinationList?.total ?? 0) / itemsPerPage)
  const totalItems = vaccinationList?.total ?? 0
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, sortBy, sortDirection])

  if (isLoading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <LoadingSpinner className='h-10 w-10' />
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Danh sách Vắc Xin </h1>

      {/* Filter + Sort Dropdown */}
      <div className='flex justify-end mb-6'>
        <div className='w-[250px]'>
          <Select
            onValueChange={(value) => {
              if (value.startsWith('filter-')) {
                setFilter(value.replace('filter-', ''))
              } else if (value.startsWith('sort-')) {
                const [, field, direction] = value.split('-')
                setSortBy(field as 'vaccineName' | 'price')
                setSortDirection(direction as 'asc' | 'desc')
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Lọc hoặc sắp xếp' />
            </SelectTrigger>
            <SelectContent>
              <div className='px-3 py-1 text-sm text-muted-foreground'>Lọc theo danh mục</div>
              <SelectItem value='filter-all'>Tất cả danh mục</SelectItem>
              {categories?.data.map((category) => (
                <SelectItem key={category.id} value={`filter-${category.id}`}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vaccine Grid */}
      {currentVaccines.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
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
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(i + 1)}
                  className='min-w-[2.5rem]'
                >
                  {i + 1}
                </Button>
              ))}
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

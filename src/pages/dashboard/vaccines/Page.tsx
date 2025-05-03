import { useState, useEffect, useMemo } from 'react'
import { AlertCircle, Plus, Search, Download, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDeleteVaccinationQuery, useListVaccinationQuery } from '@/queries/useVaccination'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import * as XLSX from 'xlsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select'
import { useListCategoryQuery } from '@/queries/useCategory'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import VaccineTable from './VaccineTable'
import AddVaccine from './AddVaccine'
import UpdateVaccine from './UpdateVaccine'

export default function VaccinesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineType | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all') // Default to 'all'
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const {
    data: vaccineData,
    refetch,
    isLoading
  } = useListVaccinationQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: debouncedSearchTerm
  })

  const { mutate: deleteVaccine, isPending: isDeletingVaccine } = useDeleteVaccinationQuery()
  const { data: categories } = useListCategoryQuery()

  // Filter vaccines by category on the frontend
  const filteredVaccines = useMemo(() => {
    if (!vaccineData?.data) return []

    return vaccineData.data.filter((vaccine) => {
      // If 'selectedCategory' is 'all', show all vaccines
      if (selectedCategory === 'all') return true

      // Otherwise, filter by category id
      return vaccine.CategoryVaccination.id === selectedCategory
    })
  }, [vaccineData?.data, selectedCategory])

  // Get current page items

  const totalPages = Math.ceil((vaccineData?.total ?? 0) / ITEMS_PER_PAGE)
  const totalItems = vaccineData?.total ?? 0
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems)

  const toggleDescription = (vaccineId: string) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(vaccineId)) {
        newSet.delete(vaccineId)
      } else {
        newSet.add(vaccineId)
      }
      return newSet
    })
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(vaccineData?.data || [])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
      XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch()
    toast.success('Dữ liệu đã được cập nhật')
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleDelete = (vaccineId: string) => {
    const vaccine = vaccineData?.data.find((v) => v.id === vaccineId)
    setSelectedVaccine(vaccine || null)
    setOpenDeleteDialog(true)
  }

  const handleDeleteVaccine = () => {
    if (selectedVaccine) {
      deleteVaccine(selectedVaccine.id, {
        onSuccess: () => {
          setOpenDeleteDialog(false)
          setSelectedVaccine(null)
          refetch()
          toast.success('Vaccine đã được xóa thành công')
        },
        onError: (error) => {
          handleErrorApi({ error, setError: () => {}, duration: 3000 })
        }
      })
    }
    setOpenDeleteDialog(false)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1) // Reset to first page when category changes
  }

  return (
    <div className='flex flex-col gap-4 px-6 pt-4 pb-6'>
      {/* Title and Action Buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Vaccines
        </h1>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full'
              type='search'
            />
          </div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='w-[200px]'>
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
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Xuất dữ liệu
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Cập nhật
          </Button>
          <Button size='sm' onClick={() => setOpenAddDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Thêm vaccine
          </Button>
        </div>
      </div>

      {/* Stock Alert */}
      {filteredVaccines.some((v: VaccineType) => v.remainingQuantity <= 10) && (
        <Alert variant='destructive' className='bg-red-50 border-red-200 p-2'>
          <div className='flex items-center space-x-2'>
            <AlertCircle className='h-3 w-3' />
            <AlertTitle className='text-sm font-semibold text-red-700'>Cảnh báo tồn kho</AlertTitle>
            <AlertDescription className='text-xs'>
              Một số vaccine đã hết hàng hoặc tồn kho thấp. Kiểm tra kho hàng và xem xét cung cấp lại.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Vaccine Table */}
      <VaccineTable
        vaccines={filteredVaccines} // Pass filtered vaccines here
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        expandedDescriptions={expandedDescriptions}
        onToggleDescription={toggleDescription}
        onEdit={(vaccine) => {
          setSelectedVaccine(vaccine)
          setOpenEditDialog(true)
        }}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Hiển thị {startIndex} đến {endIndex} của {totalItems} bài viết
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(page)}
                  className='min-w-[2.5rem]'
                >
                  {page}
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

      {/* Add Vaccine Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm vaccine mới</DialogTitle>
            <DialogDescription>Điền thông tin để thêm vaccine mới vào hệ thống.</DialogDescription>
          </DialogHeader>
          <AddVaccine open={openAddDialog} onOpenChange={setOpenAddDialog} />
        </DialogContent>
      </Dialog>

      {/* Edit Vaccine Dialog */}
      <UpdateVaccine open={openEditDialog} onOpenChange={setOpenEditDialog} selectedVaccine={selectedVaccine} />

      {/* Delete Vaccine Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Xóa vaccine</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa vaccine này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedVaccine && (
              <p className='text-sm font-medium'>
                Bạn đang xóa: <span className='font-bold'>{selectedVaccine.vaccineName}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button disabled={isDeletingVaccine} variant='destructive' onClick={handleDeleteVaccine}>
              {isDeletingVaccine ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

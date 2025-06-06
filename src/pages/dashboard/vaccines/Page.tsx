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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [allVaccines, setAllVaccines] = useState<VaccineType[]>([])
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
    search: debouncedSearchTerm,
    items_per_page: 1000
  })

  const { mutate: deleteVaccine, isPending: isDeletingVaccine } = useDeleteVaccinationQuery()
  const { data: categories } = useListCategoryQuery()

  // Filter vaccines by category and search term
  useEffect(() => {
    if (vaccineData?.data) {
      let filteredVaccines = vaccineData.data

      // Apply category filter if a specific category is selected
      if (selectedCategory !== 'all') {
        filteredVaccines = filteredVaccines.filter((vaccine) => vaccine.categoryVaccinationId === selectedCategory)
      }

      setAllVaccines(filteredVaccines)
      // Reset to first page when filters change
      setCurrentPage(1)
    }
  }, [vaccineData?.data, selectedCategory])

  // Get current page items
  const currentPageVaccines = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return allVaccines.slice(startIndex, endIndex)
  }, [allVaccines, currentPage])

  const totalPages = Math.max(1, Math.ceil(allVaccines.length / ITEMS_PER_PAGE))
  const totalItems = allVaccines.length
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems)

  // Debug logging

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
    toast.success('Dữ liệu mới đã được cập nhật')
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
          toast.success('Vắc xin đã được xóa thành công')
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
    setCurrentPage(1)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and Action Buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Vắc xin
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi vắc xin trong hệ thống.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
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
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Stock Alert */}
      {currentPageVaccines.some((v: VaccineType) => v.remainingQuantity <= 10) && (
        <Alert variant='destructive' className='bg-red-50 border-red-200'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Cảnh báo tồn kho</AlertTitle>
          <AlertDescription>
            Một số vaccine đã hết hàng hoặc tồn kho thấp. Kiểm tra kho hàng và xem xét cung cấp lại.
          </AlertDescription>
        </Alert>
      )}

      {/* Vaccine Table */}
      <VaccineTable
        vaccines={currentPageVaccines}
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
      {allVaccines.length > 0 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Hiển thị {startIndex} đến {endIndex} của {totalItems} vắc xin
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
            <DialogTitle>Thêm vắc xin mới</DialogTitle>
            <DialogDescription>Điền thông tin để thêm vắc xin mới vào hệ thống.</DialogDescription>
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
            <DialogTitle>Xóa vắc xin</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa vắc xin này? Hành động này không thể hoàn tác.
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

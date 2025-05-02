import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Download, RefreshCw, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { ManufacturerTable, Manufacturer } from './ManufacturerTable'
import { AddManufacturer } from './AddManufacturer'
import { UpdateManufacturer } from './UpdateManufacturer' // Verify this import
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  useListManufacturerQuery,
  useCreateManufacturerQuery,
  useUpdateManufacturerQuery,
  useDeleteManufacturerQuery,
  useDetailManufacturerQuery
} from '@/queries/useManufacturer'
import { ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'

const ROWS_PER_PAGE = 10

export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null)
  const [manufacturerToView, setManufacturerToView] = useState<Manufacturer | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>([])

  const {
    data: manufacturersData,
    isLoading,
    refetch
  } = useListManufacturerQuery({
    page: currentPage,
    items_per_page: ROWS_PER_PAGE,
    search: searchTerm
  })

  const { mutate: createManufacturer } = useCreateManufacturerQuery()
  const { mutate: updateManufacturer } = useUpdateManufacturerQuery()
  const { mutate: deleteManufacturer } = useDeleteManufacturerQuery()
  const { data: manufacturerDetail, isLoading: isLoadingDetail } = useDetailManufacturerQuery(
    manufacturerToView?.id ?? ''
  )

  // Update manufacturers state when data changes
  useEffect(() => {
    if (manufacturersData?.data) {
      setManufacturers(manufacturersData.data)
    } else {
      setManufacturers([])
    }
  }, [manufacturersData])

  // Apply frontend filtering as a fallback
  useEffect(() => {
    if (!searchTerm) {
      setFilteredManufacturers(manufacturers)
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase()
      const filtered = manufacturers.filter(
        (manufacturer) =>
          manufacturer.name.toLowerCase().includes(lowerSearchTerm) ||
          manufacturer.contactInfo.toLowerCase().includes(lowerSearchTerm)
      )
      setFilteredManufacturers(filtered)
    }
  }, [manufacturers, searchTerm])

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(manufacturers)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Manufacturers')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'manufacturers.xlsx')
      setIsExporting(false)
    }, 1000)
  }

  const handleAddManufacturer = (newManufacturer: ManufacturerBodyType) => {
    createManufacturer(newManufacturer, {
      onSuccess: (response) => {
        setOpenAddDialog(false)
        toast.success('Nhà sản xuất đã được thêm thành công.')
        setManufacturers((prev) => [response, ...prev])
        setCurrentPage(1)
        refetch()
      }
    })
  }

  const handleDeleteManufacturer = () => {
    if (selectedManufacturer) {
      deleteManufacturer(selectedManufacturer.id, {
        onSuccess: () => {
          setOpenDeleteDialog(false)
          setSelectedManufacturer(null)
          toast.success('Nhà sản xuất đã được xóa thành công.')
          refetch()
        },
        onError: (error) => {
          handleErrorApi({ error, setError: () => {}, duration: 5000 })
        }
      })
    }
  }

  const handleUpdateManufacturer = (updatedManufacturer: ManufacturerBodyType) => {
    if (selectedManufacturer) {
      updateManufacturer(
        { id: selectedManufacturer.id, body: updatedManufacturer },
        {
          onSuccess: () => {
            setIsEditMode(false)
            setSelectedManufacturer(null)
            toast.success('Nhà sản xuất đã được cập nhật thành công.')
            refetch()
          }
        }
      )
    }
  }

  const handleEditManufacturer = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer)
    setIsEditMode(true)
  }

  const handleViewManufacturer = (manufacturer: Manufacturer) => {
    setManufacturerToView(manufacturer)
    setOpenViewDialog(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Dữ liệu mới đã được cập nhật.')
    })
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Nhà sản xuất
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi nhà sản xuất trong hệ thống.</p>
        </div>
      </div>

      {/* Search */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full max-w-sm'>
            <div className='relative w-full max-w-sm'>
              <Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Tìm theo tên nhà sản xuất ...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className='w-full pl-8 pr-8'
                type='search'
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
                >
                  <X className='h-4 w-4' />
                </button>
              )}
              <style>
                {`
                  input[type="search"]::-webkit-search-cancel-button {
                    -webkit-appearance: none;
                    display: none;
                  }
                `}
              </style>
            </div>
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

        {/* Table */}
        <Card>
          <CardContent className='p-0'>
            <ManufacturerTable
              isLoading={isLoading}
              manufacturers={filteredManufacturers}
              currentPage={currentPage}
              rowsPerPage={ROWS_PER_PAGE}
              onEdit={handleEditManufacturer}
              onDelete={(id) => {
                setSelectedManufacturer(manufacturers.find((m) => m.id === id) || null)
                setOpenDeleteDialog(true)
              }}
              onView={handleViewManufacturer}
            />
          </CardContent>
        </Card>

        {/* Pagination */}
        {manufacturersData?.total && manufacturersData.total > ROWS_PER_PAGE && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị từ {(currentPage - 1) * ROWS_PER_PAGE + 1} đến{' '}
              {Math.min(currentPage * ROWS_PER_PAGE, filteredManufacturers.length)} của {filteredManufacturers.length}{' '}
              bản ghi
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
                {Array.from({ length: Math.ceil(filteredManufacturers.length / ROWS_PER_PAGE) }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setCurrentPage(page)}
                      className='min-w-[2.5rem]'
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredManufacturers.length / ROWS_PER_PAGE)))
                }
                disabled={currentPage >= Math.ceil(filteredManufacturers.length / ROWS_PER_PAGE)}
              >
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Manufacturer Dialog */}
      <AddManufacturer open={openAddDialog} onOpenChange={setOpenAddDialog} onSubmit={handleAddManufacturer} />

      {/* Update Manufacturer Dialog */}
      <UpdateManufacturer
        open={isEditMode}
        onOpenChange={(open: boolean) => {
          setIsEditMode(open)
          if (!open) setSelectedManufacturer(null)
        }}
        onSubmit={handleUpdateManufacturer}
        manufacturer={selectedManufacturer}
      />

      {/* View Manufacturer Dialog */}
      <Dialog
        open={openViewDialog}
        onOpenChange={(open: boolean) => {
          setOpenViewDialog(open)
          if (!open) setManufacturerToView(null)
        }}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết nhà cung cấp</DialogTitle>
            <DialogDescription>Thông tin chi tiết của nhà cung cấp.</DialogDescription>
          </DialogHeader>
          {isLoadingDetail ? (
            <div className='flex items-center justify-center py-4'>
              <span className='text-muted-foreground'>Đang tải...</span>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Tên nhà cung cấp</label>
                <p className='text-sm'>{manufacturerDetail?.name || 'N/A'}</p>
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Địa chỉ</label>
                <p className='text-sm'>{manufacturerDetail?.country || 'N/A'}</p>
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Số điện thoại</label>
                <p className='text-sm'>{manufacturerDetail?.contactInfo || 'N/A'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenViewDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Xóa nhà sản xuất</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa nhà sản xuất này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedManufacturer && (
              <p className='text-sm font-medium'>
                Bạn đang xóa: <span className='font-bold'>{selectedManufacturer.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleDeleteManufacturer}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

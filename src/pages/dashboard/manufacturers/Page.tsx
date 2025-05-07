import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Download, RefreshCw, Search } from 'lucide-react'
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
import { ManufacturerTable } from './ManufacturerTable'
import { AddManufacturer } from './AddManufacturer'
import { UpdateManufacturer } from './UpdateManufacturer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  useListManufacturerQuery,
  useCreateManufacturerQuery,
  useUpdateManufacturerQuery,
  useDeleteManufacturerQuery
} from '@/queries/useManufacturer'
import { ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'

interface Manufacturer {
  id: string
  name: string
  country: string
  contactInfo: string
}

const ROWS_PER_PAGE = 10

export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])

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

  useEffect(() => {
    if (manufacturersData?.data) {
      setManufacturers(manufacturersData.data)
    }
  }, [manufacturersData])

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
              manufacturers={manufacturers}
              currentPage={currentPage}
              rowsPerPage={ROWS_PER_PAGE}
              onEdit={handleEditManufacturer}
              onDelete={(id) => {
                setSelectedManufacturer(manufacturers.find((m) => m.id === id) || null)
                setOpenDeleteDialog(true)
              }}
            />
          </CardContent>
        </Card>

        {/* Pagination */}
        {manufacturersData?.total && manufacturersData.total > ROWS_PER_PAGE && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị từ {(currentPage - 1) * ROWS_PER_PAGE + 1} đến{' '}
              {Math.min(currentPage * ROWS_PER_PAGE, manufacturersData.total)} của {manufacturersData.total} bản ghi
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
                {Array.from({ length: Math.ceil(manufacturersData.total / ROWS_PER_PAGE) }, (_, i) => i + 1).map(
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
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(manufacturersData.total / ROWS_PER_PAGE)))
                }
                disabled={currentPage >= Math.ceil(manufacturersData.total / ROWS_PER_PAGE)}
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
        onOpenChange={(open) => {
          setIsEditMode(open)
          if (!open) setSelectedManufacturer(null)
        }}
        onSubmit={handleUpdateManufacturer}
        manufacturer={selectedManufacturer}
      />

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

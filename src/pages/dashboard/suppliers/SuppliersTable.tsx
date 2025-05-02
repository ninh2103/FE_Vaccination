import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  Plus,
  Download,
  Edit,
  Trash,
  Truck,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  X,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Supplier } from '@/pages/dashboard/suppliers/types'
import { UpdateSupplier } from '@/pages/dashboard/suppliers/UpdateSupplier'
import { AddSupplier } from '@/pages/dashboard/suppliers/AddSupplier'
import { useListSupplierQuery, useDeleteSupplierQuery } from '@/queries/useSupplier'
import { handleErrorApi } from '@/core/lib/utils'
import { toast } from 'sonner'

// Constants
const ROWS_PER_PAGE = 10

interface SuppliersTableProps {
  onUpdateSuppliers: (suppliers: Supplier[]) => void
}

export function SuppliersTable({ onUpdateSuppliers }: SuppliersTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const {
    data: suppliersData,
    isLoading: isLoadingSuppliers,
    refetch
  } = useListSupplierQuery({
    page: currentPage,
    items_per_page: ROWS_PER_PAGE,
    search: '' // Không gửi searchTerm lên BE
  })
  const { mutate: deleteSupplier, isPending: isDeletingSupplier } = useDeleteSupplierQuery()

  // Lọc dữ liệu phía client dựa trên searchTerm
  const filteredSuppliers =
    suppliersData?.data.filter((supplier) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.address.toLowerCase().includes(searchLower) ||
        supplier.contactInfo.includes(searchTerm)
      )
    }) || []

  // Pagination dựa trên dữ liệu đã lọc
  const totalItems = filteredSuppliers.length
  const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE)
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ROWS_PER_PAGE - 1, totalItems)

  // Lấy dữ liệu cho trang hiện tại
  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  // Define handlePageChange for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Event handlers
  const handleExport = () => {
    setIsExporting(true)
    try {
      // Tạo dữ liệu cho file Excel
      const exportData =
        filteredSuppliers.map((supplier, index) => ({
          STT: index + 1,
          'Tên Nhà cung cấp': supplier.name,
          'Địa chỉ': supplier.address,
          'Số điện thoại': supplier.contactInfo
        })) || []

      const worksheet = XLSX.utils.json_to_sheet([])

      // Thêm tiêu đề công ty và địa chỉ
      XLSX.utils.sheet_add_aoa(worksheet, [['CÔNG TY CỔ PHẦN VẮC XIN VAXBOT']], { origin: 'A1' })
      XLSX.utils.sheet_add_aoa(worksheet, [['Số 120 Hoàng Minh Thảo, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng']], {
        origin: 'A2'
      })
      worksheet['A1'].s = {
        font: {
          bold: true
        }
      }
      // Thêm tên báo cáo và ngày
      XLSX.utils.sheet_add_aoa(worksheet, [['BÁO CÁO NHÀ CUNG CẤP']], { origin: 'A4' })
      const currentDate = new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      XLSX.utils.sheet_add_aoa(worksheet, [[`Ngày: ${currentDate}`]], { origin: 'A5' })

      // Thêm tiêu đề cột và dữ liệu
      const header = ['STT', 'Tên nhà cung cấp', 'Địa chỉ', 'Số điện thoại']
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A7' })
      XLSX.utils.sheet_add_json(worksheet, exportData, { origin: 'A8', skipHeader: true })

      // Định dạng cột
      worksheet['!cols'] = [
        { wch: 5 }, // STT
        { wch: 35 }, // Tên nhà cung cấp
        { wch: 60 }, // Địa chỉ
        { wch: 20 } // Số điện thoại
      ]

      // Định dạng tiêu đề công ty, địa chỉ, tên báo cáo, ngày
      worksheet['A1'].s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: 'left' }
      }
      worksheet['A2'].s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: 'left' }
      }
      worksheet['A4'].s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: 'left' }
      }
      worksheet['A5'].s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: 'left' }
      }

      // Định dạng tiêu đề cột (căn giữa, in đậm, cỡ chữ 12)
      header.forEach((_, index) => {
        const cell = XLSX.utils.encode_cell({ r: 6, c: index })
        worksheet[cell].s = {
          font: { bold: true, sz: 12 },
          alignment: { horizontal: 'center' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      })

      // Định dạng dữ liệu
      exportData.forEach((row, rowIndex) => {
        // STT (căn giữa)
        const sttCell = XLSX.utils.encode_cell({ r: rowIndex + 7, c: 0 })
        worksheet[sttCell].s = {
          font: { sz: 12 },
          alignment: { horizontal: 'center' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }

        // Tên nhà cung cấp (căn trái)
        const nameCell = XLSX.utils.encode_cell({ r: rowIndex + 7, c: 1 })
        worksheet[nameCell].s = {
          font: { sz: 12 },
          alignment: { horizontal: 'left' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }

        // Địa chỉ (căn trái)
        const addressCell = XLSX.utils.encode_cell({ r: rowIndex + 7, c: 2 })
        worksheet[addressCell].s = {
          font: { sz: 12 },
          alignment: { horizontal: 'left' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }

        // Số điện thoại (căn trái)
        const phoneCell = XLSX.utils.encode_cell({ r: rowIndex + 7, c: 3 })
        worksheet[phoneCell].s = {
          font: { sz: 12 },
          alignment: { horizontal: 'left' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      })

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'BÁO CÁO NHÀ CUNG CẤP.xlsx')
      toast.success('Xuất báo cáo thành công')
    } catch (error) {
      toast.error('Lỗi khi xuất báo cáo')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      deleteSupplier(selectedSupplier.id, {
        onSuccess: () => {
          refetch()
          setOpenDeleteDialog(false)
          setSelectedSupplier(null)
          toast.success('Nhà cung cấp đã được xóa thành công')
        },
        onError: (error) => {
          handleErrorApi({ error, setError: () => {}, duration: 3000 })
        }
      })
    } else {
      setOpenDeleteDialog(false)
      setSelectedSupplier(null)
    }
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setOpenEditDialog(true)
  }

  const handleShowDetail = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setOpenDetailDialog(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Dữ liệu đã được cập nhật thành công')
    })
  }

  return (
    <div className='grid gap-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Nhà cung cấp
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi nhà cung cấp trong hệ thống.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='relative w-full max-w-sm'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm nhà cung cấp...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset về trang 1 khi tìm kiếm
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
            {isExporting ? <RefreshCw className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
            {isExporting ? 'Đang xuất...' : 'Xuất dữ liệu '}
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            {isRefreshing ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Thêm mới
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <AddSupplier
                onAdd={(newSupplier: Supplier) => {
                  onUpdateSuppliers([newSupplier, ...(suppliersData?.data || [])])
                  setOpenAddDialog(false)
                }}
                onCancel={() => setOpenAddDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className='p-0'>
          {isLoadingSuppliers ? (
            <div className='p-4 text-center text-muted-foreground'>Đang tải dữ liệu...</div>
          ) : paginatedSuppliers.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>
              Không tìm thấy nhà cung cấp phù hợp với các bộ lọc hiện tại.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên Nhà cung cấp</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead className='w-[80px]'>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSuppliers.map((supplier, index) => (
                  <TableRow key={supplier.id} className='cursor-pointer hover:bg-muted/50'>
                    <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                    <TableCell onClick={() => handleShowDetail(supplier)}>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                          <Truck className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <div>
                          <div className='font-medium'>{supplier.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                        <span>{supplier.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1 text-sm'>
                        <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                        <span>{supplier.contactInfo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleEditSupplier(supplier)}
                          className='h-8 w-8'
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => {
                            setSelectedSupplier(supplier)
                            setOpenDeleteDialog(true)
                          }}
                          className='h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Hiển thị {startIndex} đến {endIndex} của {totalItems} mục
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || isRefreshing}
            >
              <ChevronFirst className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1 || isRefreshing}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm'>
              Trang {currentPage} của {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages || isRefreshing}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || isRefreshing}
            >
              <ChevronLast className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết nhà cung cấp</DialogTitle>
            <DialogDescription>Thông tin chi tiết của nhà cung cấp.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <label className='font-medium'>Tên nhà cung cấp</label>
              <p>{selectedSupplier?.name}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium'>Địa chỉ</label>
              <div className='flex items-center gap-1'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <span>{selectedSupplier?.address}</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium'>Số điện thoại</label>
              <div className='flex items-center gap-1'>
                <Phone className='h-4 w-4 text-muted-foreground' />
                <span>{selectedSupplier?.contactInfo}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Xóa nhà cung cấp</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa nhà cung cấp này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedSupplier && (
              <p className='text-sm font-medium'>
                Bạn đang xóa: <span className='font-bold'>{selectedSupplier.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleDeleteSupplier} disabled={isDeletingSupplier}>
              {isDeletingSupplier ? (
                <>
                  <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                  Đang xóa...
                </>
              ) : (
                'Xóa'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <UpdateSupplier
            supplier={selectedSupplier!}
            onUpdate={() => {
              refetch().then(() => {
                if (filteredSuppliers.length === 1 && currentPage > 1) {
                  setCurrentPage(currentPage - 1)
                }
                setOpenEditDialog(false)
                setSelectedSupplier(null)
              })
            }}
            onCancel={() => {
              setOpenEditDialog(false)
              setSelectedSupplier(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

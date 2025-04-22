import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Download, Edit, Trash, Truck, MapPin, Phone, RefreshCw, Search } from 'lucide-react'
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: suppliersData,
    isLoading: isLoadingSuppliers,
    refetch
  } = useListSupplierQuery({
    page: currentPage,
    items_per_page: ROWS_PER_PAGE,
    search: searchTerm
  })
  const { mutate: deleteSupplier, isPending: isDeletingSupplier } = useDeleteSupplierQuery()

  // Pagination
  const totalPages = Math.ceil((suppliersData?.total || 0) / ROWS_PER_PAGE)
  const totalItems = suppliersData?.total ?? 0
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ROWS_PER_PAGE - 1, totalItems)

  // Event handlers
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(suppliersData?.data || [])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'suppliers.xlsx')
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
    }
    setOpenDeleteDialog(false)
    setSelectedSupplier(null)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsEditMode(true)
    setOpenAddDialog(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Nhà cung cấp đã được cập nhật thành công')
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
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
            <Download className='mr-2 h-4 w-4' />
            Xuất dữ liệu
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Cập nhật
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Thêm nhà cung cấp
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              {isEditMode ? (
                <UpdateSupplier
                  supplier={selectedSupplier!}
                  onUpdate={(updatedSupplier: Supplier) => {
                    onUpdateSuppliers(
                      suppliersData?.data.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s)) || []
                    )
                    setOpenAddDialog(false)
                    setIsEditMode(false)
                    setSelectedSupplier(null)
                  }}
                  onCancel={() => {
                    setOpenAddDialog(false)
                    setIsEditMode(false)
                    setSelectedSupplier(null)
                  }}
                />
              ) : (
                <AddSupplier
                  onAdd={(newSupplier: Supplier) => {
                    onUpdateSuppliers([...(suppliersData?.data || []), newSupplier])
                    setOpenAddDialog(false)
                  }}
                  onCancel={() => setOpenAddDialog(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className='p-0'>
          {isLoadingSuppliers ? (
            <div className='p-4 text-center text-muted-foreground'>Đang tải dữ liệu...</div>
          ) : suppliersData?.data.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>
              Không tìm thấy nhà cung cấp phù hợp với các bộ lọc hiện tại.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên nhà cung cấp</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Thông tin liên hệ</TableHead>
                  <TableHead className='w-[80px]'>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliersData?.data.map((supplier, index) => (
                  <TableRow key={supplier.id} className='cursor-pointer hover:bg-muted/50'>
                    <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                    <TableCell>
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
            <Button disabled={isDeletingSupplier} variant='destructive' onClick={handleDeleteSupplier}>
              {isDeletingSupplier ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

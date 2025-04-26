import { useState, useMemo, useCallback, useEffect } from 'react'
import { format, parseISO, isBefore } from 'date-fns'
import * as XLSX from 'xlsx'
import { Download, RefreshCw, Plus, X, Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrdersTable } from './OrdersTable'
import { AddOrder } from './AddOrder'
import { UpdateOrder } from './UpdateOrder'
import { useDeleteBookingQuery, useListBookingQuery } from '@/queries/useBooking'
import { toast } from 'sonner'

interface Booking {
  id: string
  vaccinationId: string
  userId: string
  vaccinationQuantity: number
  vaccinationPrice: number
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'SUCCESS' | 'WAITING_PAYMENT'
  vaccinationDate: string
  confirmationTime: string
  appointmentDate: string
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [rowsPerPage] = useState(10)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })
  const [activeTab, setActiveTab] = useState('all')

  const { data: bookingData } = useListBookingQuery({
    page: currentPage,
    items_per_page: rowsPerPage,
    search: searchTerm,
    status: activeTab === 'all' ? undefined : activeTab === 'confirmed' ? 'CONFIRMED' : 'PENDING'
  })

  const { mutate: deleteBooking } = useDeleteBookingQuery()

  const bookingsData = useMemo(() => bookingData?.data || [], [bookingData])

  useEffect(() => {
    if (bookingData?.total) {
      setTotalItems(bookingData.total)
    }
  }, [bookingData?.total])

  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking: Booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vaccinationId.toLowerCase().includes(searchTerm.toLowerCase())

      const bookingDate = parseISO(booking.appointmentDate)
      const fromDate = dateRange.from ? parseISO(format(dateRange.from, 'yyyy-MM-dd')) : null
      const toDate = dateRange.to ? parseISO(format(dateRange.to, 'yyyy-MM-dd')) : null
      const matchesDateRange =
        (!fromDate || !isBefore(bookingDate, fromDate)) && (!toDate || !isBefore(toDate, bookingDate))

      return matchesSearch && matchesDateRange
    })
  }, [bookingsData, searchTerm, dateRange])

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setDateRange({
        from: undefined,
        to: undefined
      })
      toast.success('Đã làm mới dữ liệu')
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    try {
      const exportData = filteredBookings.map((booking: Booking) => ({
        'Order ID': booking.id,
        'Vaccination ID': booking.vaccinationId,
        'User ID': booking.userId,
        Quantity: booking.vaccinationQuantity,
        Price: booking.vaccinationPrice,
        'Total Amount': booking.totalAmount,
        'Created At': booking.createdAt,
        Status: booking.status,
        'Vaccination Date': booking.vaccinationDate,
        'Confirmation Time': booking.confirmationTime,
        'Appointment Date': booking.appointmentDate
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
      XLSX.writeFile(workbook, `orders_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast.success('Đã xuất file thành công')
    } catch (error) {
      toast.error('Đã xuất file thất bại')
    } finally {
      setIsExporting(false)
    }
  }, [filteredBookings])

  const handleUpdateOrder = useCallback(() => {
    toast.success(`Đã cập nhật trạng thái đơn hàng thành công`)
    setOpenUpdateDialog(false)
  }, [])

  const handleDeleteOrder = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedOrder) return
    toast.success('Đã xóa đơn hàng thành công')
    setOpenDeleteDialog(false)
    deleteBooking(selectedOrder.id, {
      onSuccess: () => {
        toast.success('Đã xóa đơn hàng thành công')
      },
      onError: () => {
        toast.error('Đã xóa đơn hàng thất bại')
      }
    })
  }, [selectedOrder])

  const handleViewDetails = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenUpdateDialog(true)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setCurrentPage(1)
    setDateRange({
      from: undefined,
      to: undefined
    })
    toast.success('Đã xóa bộ lọc')
  }, [setSearchTerm, setCurrentPage, setDateRange])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Đơn hàng
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi đơn hàng trong hệ thống.</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-2'>
            <div className='relative w-full max-w-sm'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Tìm kiếm...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className='pl-8 w-full'
                type='search'
              />
              {searchTerm && (
                <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                  <X className='h-4 w-4' />
                </Button>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-2'>
                <Input
                  type='date'
                  value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, from: new Date(e.target.value) }))}
                  className='w-[150px]'
                />
                <span className='text-muted-foreground'>đến</span>
                <Input
                  type='date'
                  value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, to: new Date(e.target.value) }))}
                  className='w-[150px]'
                />
              </div>
              <div className='flex items-center space-x-2'></div>
            </div>
            <Button variant='outline' size='sm' onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
              {isExporting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
              Xuất file
            </Button>
            <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <RefreshCw className='mr-2 h-4 w-4' />
              )}
              Làm mới
            </Button>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button size='sm' className='h-9'>
                  <Plus className='mr-2 h-4 w-4' />
                  Thêm đơn hàng
                </Button>
              </DialogTrigger>
              <AddOrder
                onAdd={() => {
                  setOpenAddDialog(false)
                }}
                onCancel={() => setOpenAddDialog(false)}
              />
            </Dialog>
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue='all' className='w-full' onValueChange={setActiveTab}>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>Tất cả đơn hàng</TabsTrigger>
            <TabsTrigger value='confirmed'>Đã xác nhận</TabsTrigger>
            <TabsTrigger value='pending'>Chờ xác nhận/Hủy bỏ</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                <OrdersTable
                  onUpdateOrder={handleUpdateOrder}
                  onDeleteOrder={handleDeleteOrder}
                  onViewDetails={handleViewDetails}
                  currentPage={currentPage}
                  itemsPerPage={rowsPerPage}
                  bookings={filteredBookings}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='confirmed' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                <OrdersTable
                  onUpdateOrder={handleUpdateOrder}
                  onDeleteOrder={handleDeleteOrder}
                  onViewDetails={handleViewDetails}
                  currentPage={currentPage}
                  itemsPerPage={rowsPerPage}
                  bookings={filteredBookings}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='pending' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                <OrdersTable
                  onUpdateOrder={handleUpdateOrder}
                  onDeleteOrder={handleDeleteOrder}
                  onViewDetails={handleViewDetails}
                  currentPage={currentPage}
                  itemsPerPage={rowsPerPage}
                  bookings={filteredBookings}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {startIndex} đến {endIndex} của {totalItems} mục
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
                Trang trước
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handlePageChange(page)}
                    className='min-w-[2.5rem]'
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant='outline' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Update Order Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        {selectedOrder && (
          <UpdateOrder order={selectedOrder} onUpdate={handleUpdateOrder} onCancel={() => setOpenUpdateDialog(false)} />
        )}
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa đơn hàng {selectedOrder?.id}? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={!selectedOrder}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

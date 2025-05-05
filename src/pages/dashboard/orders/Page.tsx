import { useState, useMemo, useCallback } from 'react'
import { format, parseISO } from 'date-fns'
import * as XLSX from 'xlsx'
import { Download, RefreshCw, Loader2, Search, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrdersTable } from './OrdersTable'
import { AddOrder } from './AddOrder'
import { UpdateOrder } from './UpdateOrder'
import { useDeleteBookingQuery, useListBookingQuery } from '@/queries/useBooking'
import { useListPaymentQuery } from '@/queries/useMomo'
import { toast } from 'sonner'
import { formatVND } from '@/core/lib/utils'

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

interface Payment {
  id: string
  orderId: string
  amount: number
  userId: string
  bookingId: string | null
  appointmentDate: string | null
  createdAt: string
  updatedAt: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  paymentMethod: 'MOMO' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'CASH'
  user: {
    id: string
    name: string
    email: string
    phone: string
  }
}

interface BookingQueryResult {
  data: Booking[]
  total: number
  itemsPerPage: number
}

interface PaymentQueryResult {
  data: Payment[]
  total: number
  itemsPerPage: number
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
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
  const [currentTab, setCurrentTab] = useState('all')
  const ITEMS_PER_PAGE = 10

  const { data: bookingData, isLoading: isBookingLoading } = useListBookingQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: searchTerm
  })

  const { data: paymentData, isLoading: isPaymentLoading } = useListPaymentQuery({
    page: 1,
    items_per_page: 1000,
    search: ''
  })

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBookingQuery()

  const bookingsData = useMemo(() => bookingData?.data || [], [bookingData])
  const paymentsData = useMemo(() => paymentData?.data || [], [paymentData])
  const totalBookings = bookingData?.total || 0

  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking: Booking) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        searchTerm === '' ||
        booking.id.toLowerCase().includes(searchLower) ||
        booking.vaccinationId.toLowerCase().includes(searchLower)

      const appointmentDate = parseISO(booking.appointmentDate)
      const fromDate = dateRange.from ? new Date(dateRange.from) : null
      const toDate = dateRange.to ? new Date(dateRange.to) : null
      if (toDate) toDate.setHours(23, 59, 59, 999)

      const matchesDateRange = (!fromDate || appointmentDate >= fromDate) && (!toDate || appointmentDate <= toDate)

      return matchesSearch && matchesDateRange
    })
  }, [bookingsData, searchTerm, dateRange])

  const getTabFilteredBookings = useCallback(
    (tab: string) => {
      return filteredBookings.filter((booking: Booking) => {
        if (tab === 'all') return true
        if (tab === 'confirmed') return booking.status === 'CONFIRMED'
        if (tab === 'pending') return booking.status === 'WAITING_PAYMENT' || booking.status === 'PENDING'
        return true
      })
    },
    [filteredBookings]
  )

  const getPaginatedBookings = useCallback(
    (tab: string) => {
      const tabFilteredBookings = getTabFilteredBookings(tab)
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      return tabFilteredBookings.slice(startIndex, endIndex)
    },
    [getTabFilteredBookings, currentPage]
  )

  const handleClearFilters = useCallback(() => {
    setDateRange({ from: undefined, to: undefined })
    setSearchTerm('')
    setCurrentPage(1)
    toast.success('Đã xóa bộ lọc')
  }, [])

  const handleExport = useCallback(() => {
    setIsExporting(true)
    try {
      const paymentMap = new Map<string, Payment>()
      paymentsData.forEach((payment) => {
        if (payment.bookingId) {
          paymentMap.set(payment.bookingId, payment)
        }
      })

      const exportData = getTabFilteredBookings(currentTab).map((booking: Booking) => {
        const payment = paymentMap.get(booking.id)
        return {
          'Order ID': booking.id,
          'Payment ID': payment ? payment.id : '-',
          Customer: payment ? payment.user.name : '-',
          'Vaccination ID': booking.vaccinationId,
          'User ID': booking.userId,
          Quantity: booking.vaccinationQuantity,
          Price: formatVND(booking.vaccinationPrice),
          'Total Amount': formatVND(booking.totalAmount),
          'Created At': format(parseISO(booking.createdAt), 'dd/MM/yyyy HH:mm'),
          Status: booking.status,
          'Vaccination Date': booking.vaccinationDate,
          'Confirmation Time': booking.confirmationTime,
          'Appointment Date': format(parseISO(booking.appointmentDate), 'dd/MM/yyyy HH:mm')
        }
      })

      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
      XLSX.writeFile(workbook, `orders_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast.success('Xuất dữ liệu thành công.')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Xuất dữ liệu thất bại.')
    } finally {
      setIsExporting(false)
    }
  }, [currentTab, getTabFilteredBookings, paymentsData])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setDateRange({ from: undefined, to: undefined })
      toast.success('Dữ liệu mới đã được cập nhật')
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleDeleteOrder = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedOrder) return
    deleteBooking(selectedOrder.id, {
      onSuccess: () => {
        toast.success('Đã xóa đơn hàng thành công.')
        setOpenDeleteDialog(false)
        setSelectedOrder(null)
        setCurrentPage(1)
      },
      onError: () => {
        toast.error('Xóa đơn hàng thất bại.')
      }
    })
  }, [selectedOrder, deleteBooking])

  const handleViewDetails = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenDetailsDialog(true)
  }, [])

  const handleEditOrder = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenUpdateDialog(true)
  }, [])

  const handleUpdateOrder = useCallback((updatedOrder: Booking) => {
    toast.success('Cập nhật đơn hàng thành công.')
    setOpenUpdateDialog(false)
    setSelectedOrder(null)
  }, [])

  const handleAddOrder = useCallback(() => {
    setOpenAddDialog(false)
    toast.success('Thêm đơn hàng thành công.')
  }, [])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Đơn hàng
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi đơn hàng trong hệ thống.</p>
        </div>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm...'
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
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
              {isExporting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
              Xuất dữ liệu
            </Button>
            <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <RefreshCw className='mr-2 h-4 w-4' />
              )}
              Cập nhật
            </Button>
            <div className='flex items-center space-x-2'>
              <Input
                type='date'
                value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    from: e.target.value ? new Date(e.target.value) : undefined
                  }))
                }
                className='w-[150px]'
              />
              <span className='text-muted-foreground'>đến</span>
              <Input
                type='date'
                value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    to: e.target.value ? new Date(e.target.value) : undefined
                  }))
                }
                className='w-[150px]'
              />
            </div>
            <Button variant='outline' size='sm' onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
            <Button size='sm' className='h-9' onClick={() => setOpenAddDialog(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Thêm mới
            </Button>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>Tất cả đơn hàng</TabsTrigger>
            <TabsTrigger value='confirmed'>Đã xác nhận</TabsTrigger>
            <TabsTrigger value='pending'>Chờ xác nhận/Hủy bỏ</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isBookingLoading || isPaymentLoading ? (
                  <div className='p-8 flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
                ) : getPaginatedBookings('all').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại.
                  </div>
                ) : (
                  <OrdersTable
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditOrder}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    bookings={getPaginatedBookings('all')}
                    payments={paymentsData}
                    isLoading={isBookingLoading || isPaymentLoading}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='confirmed' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isBookingLoading || isPaymentLoading ? (
                  <div className='p-8 flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
                ) : getPaginatedBookings('confirmed').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại.
                  </div>
                ) : (
                  <OrdersTable
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditOrder}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    bookings={getPaginatedBookings('confirmed')}
                    payments={paymentsData}
                    isLoading={isBookingLoading || isPaymentLoading}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='pending' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isBookingLoading || isPaymentLoading ? (
                  <div className='p-8 flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
                ) : getPaginatedBookings('pending').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại.
                  </div>
                ) : (
                  <OrdersTable
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditOrder}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    bookings={getPaginatedBookings('pending')}
                    payments={paymentsData}
                    isLoading={isBookingLoading || isPaymentLoading}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {!isBookingLoading && totalBookings > 0 && (
          <div className='flex items-center justify-between p-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1} đến{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, totalBookings)} trong tổng số {totalBookings} đơn hàng
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
                {Array.from({ length: Math.ceil(totalBookings / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalBookings / ITEMS_PER_PAGE)))}
                disabled={currentPage === Math.ceil(totalBookings / ITEMS_PER_PAGE)}
              >
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <AddOrder onAdd={handleAddOrder} onCancel={() => setOpenAddDialog(false)} />
      </Dialog>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        {selectedOrder && (
          <DialogContent className='sm:max-w-[550px]'>
            <DialogHeader>
              <DialogTitle>Chi tiết đơn hàng</DialogTitle>
              <DialogDescription>Xem thông tin chi tiết về đơn hàng này.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mã đơn hàng</h4>
                  <p>#{selectedOrder.id.slice(0, 8)}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Trạng thái</h4>
                  <p>{selectedOrder.status}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mã vacxin</h4>
                  <p>{selectedOrder.vaccinationId}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Số lượng</h4>
                  <p>{selectedOrder.vaccinationQuantity}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Giá</h4>
                  <p>{formatVND(selectedOrder.vaccinationPrice)}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Tổng tiền</h4>
                  <p>{formatVND(selectedOrder.totalAmount)}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Ngày</h4>
                  <p>{format(parseISO(selectedOrder.appointmentDate), 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Giờ</h4>
                  <p>{format(parseISO(selectedOrder.appointmentDate), 'HH:mm')}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mã thanh toán</h4>
                  <p>
                    {paymentsData.find((payment) => payment.bookingId === selectedOrder.id)?.id.slice(0, 8) || '-'}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Khách hàng</h4>
                  <p>
                    {paymentsData.find((payment) => payment.bookingId === selectedOrder.id)?.user.name || '-'}
                  </p>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Ngày tạo</h4>
                <p>{format(parseISO(selectedOrder.createdAt), 'dd/MM/yyyy HH:mm')}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        {selectedOrder && (
          <UpdateOrder order={selectedOrder} onUpdate={handleUpdateOrder} onCancel={() => setOpenUpdateDialog(false)} />
        )}
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa đơn hàng {selectedOrder?.id.slice(0, 8)}? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isDeleting}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={isDeleting || !selectedOrder}>
              {isDeleting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
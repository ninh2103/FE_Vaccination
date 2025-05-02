import { useState, useMemo, useCallback, useEffect } from 'react'
import { format, parseISO, isBefore } from 'date-fns'
import * as XLSX from 'xlsx'
import { Download, RefreshCw, Plus, Loader2, Search } from 'lucide-react'
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
  const [tabPages, setTabPages] = useState<Record<string, number>>({
    all: 1,
    confirmed: 1,
    pending: 1
  })
  const [, setTotalItems] = useState(0)
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

  const { data: bookingData, isLoading: isLoadingBookings } = useListBookingQuery({
    page: 1,
    items_per_page: 100, // Fetch more items to handle frontend pagination
    search: '' // Remove search from backend since we're doing it in frontend
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
        searchTerm === '' ||
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
      const startIndex = (tabPages[tab] - 1) * rowsPerPage
      const endIndex = startIndex + rowsPerPage
      return tabFilteredBookings.slice(startIndex, endIndex)
    },
    [getTabFilteredBookings, tabPages, rowsPerPage]
  )

  const getTotalPages = useCallback(
    (tab: string) => {
      const tabFilteredBookings = getTabFilteredBookings(tab)
      return Math.max(1, Math.ceil(tabFilteredBookings.length / rowsPerPage))
    },
    [getTabFilteredBookings, rowsPerPage]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setTabPages((prev) => ({
        ...prev,
        [activeTab]: page
      }))
    },
    [activeTab]
  )

  const handlePreviousPage = useCallback(() => {
    setTabPages((prev) => ({
      ...prev,
      [activeTab]: Math.max(prev[activeTab] - 1, 1)
    }))
  }, [activeTab])

  const handleNextPage = useCallback(() => {
    const totalPages = getTotalPages(activeTab)
    setTabPages((prev) => ({
      ...prev,
      [activeTab]: Math.min(prev[activeTab] + 1, totalPages)
    }))
  }, [activeTab, getTotalPages])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSearchTerm('')
      setTabPages({
        all: 1,
        confirmed: 1,
        pending: 1
      })
      setDateRange({
        from: undefined,
        to: undefined
      })
      toast.success('Dữ liệu mới đã được cập nhật')
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    try {
      const exportData = getTabFilteredBookings(activeTab).map((booking: Booking) => ({
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
      toast.success('Xuất dữ liệu thành công.')
    } catch (error) {
      toast.error('Xuất dữ liệu thất bại.')
    } finally {
      setIsExporting(false)
    }
  }, [activeTab, getTabFilteredBookings])

  const handleUpdateOrder = useCallback(() => {
    toast.success(`Đã cập nhật trạng thái đơn hàng thành công.`)
    setOpenUpdateDialog(false)
  }, [])

  const handleDeleteOrder = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedOrder) return
    toast.success('Đã xóa đơn hàng thành công.')
    setOpenDeleteDialog(false)
    deleteBooking(selectedOrder.id, {
      onSuccess: () => {
        toast.success('Đã xóa đơn hàng thành công.')
      },
      onError: () => {
        toast.error('Đã xóa đơn hàng thất bại.')
      }
    })
  }, [selectedOrder])

  const handleViewDetails = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenUpdateDialog(true)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setTabPages({
      all: 1,
      confirmed: 1,
      pending: 1
    })
    setDateRange({
      from: undefined,
      to: undefined
    })
    toast.success('Đã xóa bộ lọc.')
  }, [setSearchTerm, setTabPages, setDateRange])

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
                  setTabPages({
                    all: 1,
                    confirmed: 1,
                    pending: 1
                  })
                }}
                className='pl-8 w-full'
                type='search'
              />
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
                  Thêm mới
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
                  currentPage={tabPages.all}
                  itemsPerPage={rowsPerPage}
                  bookings={getPaginatedBookings('all')}
                  isLoading={isLoadingBookings}
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
                  currentPage={tabPages.confirmed}
                  itemsPerPage={rowsPerPage}
                  bookings={getPaginatedBookings('confirmed')}
                  isLoading={isLoadingBookings}
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
                  currentPage={tabPages.pending}
                  itemsPerPage={rowsPerPage}
                  bookings={getPaginatedBookings('pending')}
                  isLoading={isLoadingBookings}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {getTotalPages(activeTab) > 1 && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {(tabPages[activeTab] - 1) * rowsPerPage + 1} đến{' '}
              {Math.min(tabPages[activeTab] * rowsPerPage, getTabFilteredBookings(activeTab).length)} của{' '}
              {getTabFilteredBookings(activeTab).length} mục
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={tabPages[activeTab] === 1}>
                Trang trước
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: getTotalPages(activeTab) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={tabPages[activeTab] === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handlePageChange(page)}
                    className='min-w-[2.5rem]'
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={handleNextPage}
                disabled={tabPages[activeTab] === getTotalPages(activeTab)}
              >
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

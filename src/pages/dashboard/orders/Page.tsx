import { useState, useMemo, useCallback, useEffect } from 'react'
import { format, parseISO, isBefore } from 'date-fns'
import * as XLSX from 'xlsx'
import { Filter, Download, RefreshCw, Plus, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { OrdersTable } from './OrdersTable'
import { AddOrder } from './AddOrder'
import { UpdateOrder } from './UpdateOrder'
import { useListBookingQuery } from '@/queries/useBooking'

interface Booking {
  id: string
  vaccinationId: string
  userId: string
  vaccinationQuantity: number
  vaccinationPrice: number
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
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
  const [filters, setFilters] = useState({
    status: { confirmed: false, pending: false, cancelled: false },
    dateRange: { from: '', to: '' }
  })
  const [activeTab, setActiveTab] = useState('all')

  const { data: bookingData } = useListBookingQuery({
    page: currentPage,
    items_per_page: rowsPerPage,
    search: searchTerm,
    status: activeTab === 'confirmed' ? 'CONFIRMED' : activeTab === 'pending' ? 'PENDING' : undefined
  })

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

      // Handle status filtering based on both tab and filter dropdown
      let matchesStatus = true
      if (activeTab === 'confirmed') {
        matchesStatus = booking.status === 'CONFIRMED'
      } else if (activeTab === 'pending') {
        matchesStatus = booking.status === 'PENDING' || booking.status === 'CANCELLED'
      } else {
        // For 'all' tab, use the filter dropdown settings
        const noStatusFilter = !filters.status.confirmed && !filters.status.pending && !filters.status.cancelled
        matchesStatus =
          noStatusFilter ||
          (filters.status.confirmed && booking.status === 'CONFIRMED') ||
          (filters.status.pending && booking.status === 'PENDING') ||
          (filters.status.cancelled && booking.status === 'CANCELLED')
      }

      const bookingDate = parseISO(booking.appointmentDate)
      const fromDate = filters.dateRange.from ? parseISO(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? parseISO(filters.dateRange.to) : null
      const matchesDateRange =
        (!fromDate || !isBefore(bookingDate, fromDate)) && (!toDate || !isBefore(toDate, bookingDate))

      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [bookingsData, searchTerm, filters, activeTab])

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
      setFilters({
        status: { confirmed: false, pending: false, cancelled: false },
        dateRange: { from: '', to: '' }
      })
      toast({ title: 'Refreshed', description: 'Data has been refreshed' })
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleExport = useCallback(async () => {
    setIsRefreshing(true)
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
      toast({ title: 'Success', description: 'File exported successfully' })
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export file', variant: 'destructive' })
    } finally {
      setIsRefreshing(false)
    }
  }, [filteredBookings])

  const handleUpdateOrder = useCallback((updatedOrder: Booking) => {
    toast({
      title: 'Changes Saved',
      description: `Order status updated successfully to ${updatedOrder.status}`
    })
    setOpenUpdateDialog(false)
  }, [])

  const handleDeleteOrder = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedOrder) return
    toast({
      title: 'Deleted',
      description: `Order has been deleted successfully`
    })
    setOpenDeleteDialog(false)
  }, [selectedOrder])

  const handleViewDetails = useCallback((order: Booking) => {
    setSelectedOrder(order)
    setOpenUpdateDialog(true)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      status: { confirmed: false, pending: false, cancelled: false },
      dateRange: { from: '', to: '' }
    })
  }, [])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Orders
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Refresh
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Add Order
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

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by order ID or vaccination ID...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              className='w-full'
              type='search'
            />
            {searchTerm && (
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Filter className='mr-2 h-4 w-4' />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[300px] p-4'>
                <DropdownMenuLabel className='font-semibold'>Filters</DropdownMenuLabel>
                <p className='text-sm text-muted-foreground mb-4'>
                  Filter orders by status and appointment date range.
                </p>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Order Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status.confirmed}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, confirmed: checked }
                      }))
                    }
                  >
                    Confirmed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.pending}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, pending: checked }
                      }))
                    }
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.cancelled}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, cancelled: checked }
                      }))
                    }
                  >
                    Cancelled
                  </DropdownMenuCheckboxItem>
                </div>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Appointment Date Range</DropdownMenuLabel>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>From</Label>
                      <Input
                        type='date'
                        value={filters.dateRange.from}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, from: e.target.value }
                          }))
                        }
                        className='w-full'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>To</Label>
                      <Input
                        type='date'
                        value={filters.dateRange.to}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, to: e.target.value }
                          }))
                        }
                        className='w-full'
                      />
                    </div>
                  </div>
                </div>

                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue='all' className='w-full' onValueChange={setActiveTab}>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>All Orders</TabsTrigger>
            <TabsTrigger value='confirmed'>Confirmed</TabsTrigger>
            <TabsTrigger value='pending'>Pending/Cancelled</TabsTrigger>
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
              Showing {startIndex} to {endIndex} of {totalItems} entries
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
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
                Next
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
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order {selectedOrder?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={!selectedOrder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

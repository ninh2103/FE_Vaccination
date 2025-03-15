'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { format, parseISO, isWithinInterval, addDays, isBefore } from 'date-fns'
import * as XLSX from 'xlsx'
import {
  Search,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Check,
  X,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader2,
  Plus,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/core/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ITEMS_PER_PAGE = 10

export default function BookingsPage() {
  // Replace the useState for bookings to make it mutable
  const [bookingsData, setBookingsData] = useState(bookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState([])
  const [filterDateRange, setFilterDateRange] = useState({ start: null, end: null })
  const [isLoading, setIsLoading] = useState(false)
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false)
  const [newOrder, setNewOrder] = useState({
    patient: { name: '', phone: '', avatar: '/placeholder.svg', initials: '' },
    vaccine: '',
    preferredDate: '',
    preferredTime: 'Morning',
    notes: ''
  })

  // Get current date and time for validation
  const now = new Date()
  const currentHour = now.getHours()
  const today = format(now, 'yyyy-MM-dd')
  const tomorrow = format(addDays(now, 1), 'yyyy-MM-dd')

  // Effect to update time options when date changes
  useEffect(() => {
    if (!openAddOrderDialog) {
      setNewOrder({
        patient: { name: '', phone: '', avatar: '/placeholder.svg', initials: '' },
        vaccine: '',
        preferredDate: '',
        preferredTime: 'Morning',
        notes: ''
      })
    }
  }, [openAddOrderDialog])

  // Replace the bookingsWithOrder useMemo to use the mutable bookingsData
  const bookingsWithOrder = useMemo(() => {
    return bookingsData.map((booking, index) => {
      const date = parseISO(booking.requestDate)
      const dateCode = format(date, 'ddMMyy')
      const orderNum = String(index + 1).padStart(2, '0')
      return {
        ...booking,
        orderCode: `ODR${dateCode}${orderNum}`,
        stt: index + 1,
        phone: booking.patient.phone
      }
    })
  }, [bookingsData])

  // Xử lý lọc dữ liệu - filters apply automatically now
  const filteredBookings = useMemo(() => {
    let result = bookingsWithOrder

    if (searchTerm) {
      result = result.filter(
        (booking) =>
          (booking.patient.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
          (booking.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
          (booking.orderCode?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus.length > 0) {
      result = result.filter((booking) => filterStatus.includes(booking.status))
    }

    if (filterDateRange.start && filterDateRange.end) {
      result = result.filter((booking) => {
        const requestDate = parseISO(booking.requestDate)
        return isWithinInterval(requestDate, {
          start: filterDateRange.start,
          end: filterDateRange.end
        })
      })
    }

    return result
  }, [searchTerm, filterStatus, filterDateRange, bookingsWithOrder])

  // Phân trang
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredBookings, currentPage])

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE))

  // Các hàm xử lý
  const handleExport = useCallback(async () => {
    setIsLoading(true)
    try {
      const exportData = filteredBookings.map((booking) => ({
        'Mã Order': booking.orderCode,
        STT: booking.stt,
        Patient: booking.patient.name,
        Phone: booking.phone,
        Vaccine: booking.vaccine,
        'Request Date': booking.requestDate,
        'Preferred Date': booking.preferredDate,
        'Preferred Time': booking.preferredTime,
        Status: booking.status,
        Notes: booking.notes
      }))

      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings')
      XLSX.writeFile(workbook, `bookings_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast({ title: 'Success', description: 'File exported successfully' })
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export file', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }, [filteredBookings])

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setSearchTerm('')
      setFilterStatus([])
      setFilterDateRange({ start: null, end: null })
      setCurrentPage(1)
      toast({ title: 'Refreshed', description: 'Data has been refreshed' })
      setIsLoading(false)
    }, 500) // Simulate loading for better UX
  }, [])

  // Improved status update function that actually updates the data
  const handleStatusUpdate = useCallback((booking, newStatus) => {
    setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null))
  }, [])

  // Improved save changes function
  const handleSaveChanges = useCallback(() => {
    if (!selectedBooking) return

    setBookingsData((prev) =>
      prev.map((booking) =>
        booking.id === selectedBooking.id ? { ...booking, status: selectedBooking.status } : booking
      )
    )

    toast({
      title: 'Changes Saved',
      description: `Booking status updated successfully to ${selectedBooking.status}`
    })

    setOpenDetailsDialog(false)
  }, [selectedBooking])

  // Improved direct status update function for the table actions
  const handleDirectStatusUpdate = useCallback((bookingId, newStatus) => {
    setBookingsData((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking))
    )

    toast({
      title: 'Status Updated',
      description: `Booking status changed to ${newStatus}`
    })
  }, [])

  const handleDelete = useCallback((booking) => {
    setSelectedBooking(booking)
    setOpenDeleteDialog(true)
  }, [])

  // Improved delete function that actually removes the booking
  const confirmDelete = useCallback(() => {
    if (!selectedBooking) return

    setBookingsData((prev) => prev.filter((booking) => booking.id !== selectedBooking.id))

    toast({
      title: 'Deleted',
      description: `Booking has been deleted successfully`
    })

    setOpenDeleteDialog(false)
    setOpenDetailsDialog(false)
  }, [selectedBooking])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge className='bg-green-100 text-green-800'>Approved</Badge>
      case 'Pending':
        return <Badge className='bg-yellow-100 text-yellow-800'>Pending</Badge>
      case 'Rejected':
        return <Badge className='bg-red-100 text-red-800'>Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='container mx-auto py-10 ml-[1cm]'>
      <Card className='shadow-lg'>
        <CardHeader className='flex flex-col p-6 bg-muted'>
          <div className='flex items-center justify-between w-full mb-4'>
            <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
              Orders
            </h1>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' onClick={handleExport} disabled={isLoading}>
                {isLoading ? <Loader2 className='h-4 w-4 animate-spin mr-2' /> : <Download className='h-4 w-4 mr-2' />}
                <span className='hidden md:inline'>Export to Excel</span>
              </Button>
              <Button variant='outline' size='sm' onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')} />
                <span className='hidden md:inline'>Refresh</span>
              </Button>
              <Button
                className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
                variant='default'
                size='sm'
                onClick={() => setOpenAddOrderDialog(true)}
              >
                <Plus className='h-4 w-4 mr-2' />
                <span className='hidden md:inline'>Add Order</span>
              </Button>
            </div>
          </div>
          <div className='relative w-full max-w-md'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search by name, phone, or order ID...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-full'
            />
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-end mb-4 gap-4'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Filter className='h-4 w-4 mr-2' />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-80 p-4'>
                <div className='space-y-4'>
                  <h3 className='font-semibold text-lg'>Filters</h3>
                  <p className='text-sm text-muted-foreground'>Filter bookings by status and request date.</p>

                  <div className='space-y-2'>
                    <h4 className='font-medium'>Status</h4>
                    <div className='space-y-1'>
                      {['Approved', 'Pending', 'Rejected'].map((status) => (
                        <div key={status} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`status-${status}`}
                            checked={filterStatus.includes(status)}
                            onCheckedChange={(checked) => {
                              setFilterStatus(
                                checked ? [...filterStatus, status] : filterStatus.filter((s) => s !== status)
                              )
                              // Reset to page 1 when filter changes
                              setCurrentPage(1)
                            }}
                          />
                          <label htmlFor={`status-${status}`} className='text-sm'>
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <h4 className='font-medium'>Request Date Range</h4>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='space-y-1'>
                        <label className='text-sm text-muted-foreground'>From</label>
                        <Input
                          type='date'
                          value={filterDateRange.start ? format(filterDateRange.start, 'yyyy-MM-dd') : ''}
                          onChange={(e) => {
                            setFilterDateRange((prev) => ({
                              ...prev,
                              start: e.target.value ? parseISO(e.target.value) : null
                            }))
                            // Reset to page 1 when filter changes
                            setCurrentPage(1)
                          }}
                        />
                      </div>
                      <div className='space-y-1'>
                        <label className='text-sm text-muted-foreground'>To</label>
                        <Input
                          type='date'
                          value={filterDateRange.end ? format(filterDateRange.end, 'yyyy-MM-dd') : ''}
                          onChange={(e) => {
                            setFilterDateRange((prev) => ({
                              ...prev,
                              end: e.target.value ? parseISO(e.target.value) : null
                            }))
                            // Reset to page 1 when filter changes
                            setCurrentPage(1)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2 mt-4'>
                    <Button
                      variant='outline'
                      onClick={() => {
                        setFilterStatus([])
                        setFilterDateRange({ start: null, end: null })
                        setCurrentPage(1)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[60px]'>No.</TableHead>
                <TableHead className='w-[120px]'>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Vaccine</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className='w-[100px]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <TableRow key={booking.id} className='hover:bg-muted/50'>
                    <TableCell>{booking.stt}</TableCell>
                    <TableCell className='font-mono'>{booking.orderCode}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src={booking.patient.avatar} />
                          <AvatarFallback>{booking.patient.initials}</AvatarFallback>
                        </Avatar>
                        <div>{booking.patient.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{booking.vaccine}</TableCell>
                    <TableCell>{booking.requestDate}</TableCell>
                    <TableCell>{booking.preferredDate}</TableCell>
                    <TableCell>{booking.preferredTime}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className='max-w-[200px] truncate'>{booking.notes}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {booking.status === 'Pending' && (
                          <>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDirectStatusUpdate(booking.id, 'Approved')
                              }}
                              title='Approve'
                            >
                              <Check className='h-4 w-4 text-green-500' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDirectStatusUpdate(booking.id, 'Rejected')
                              }}
                              title='Reject'
                            >
                              <X className='h-4 w-4 text-red-500' />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBooking(booking)
                                setOpenDetailsDialog(true)
                              }}
                            >
                              <Edit className='mr-2 h-4 w-4' />
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-red-600' onClick={() => handleDelete(booking)}>
                              <Trash className='mr-2 h-4 w-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className='text-center py-4'>
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md z-10'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <span className='text-sm font-medium'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      {/* Dialog Details */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>View and manage booking request</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className='grid gap-6 py-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={selectedBooking.patient.avatar} />
                  <AvatarFallback>{selectedBooking.patient.initials}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h3 className='font-semibold'>{selectedBooking.patient.name}</h3>
                  <p className='text-sm text-muted-foreground'>{selectedBooking.orderCode}</p>
                </div>
                <Badge variant='outline'>{selectedBooking.status}</Badge>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Request Date</p>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    {selectedBooking.requestDate}
                  </div>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Preferred Date</p>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4' />
                    {selectedBooking.preferredDate}
                  </div>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Time</p>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    {selectedBooking.preferredTime}
                  </div>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Vaccine</p>
                  <p className='font-medium'>{selectedBooking.vaccine}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Phone</p>
                  <p className='font-medium'>{selectedBooking.phone}</p>
                </div>
              </div>

              <div className='space-y-1'>
                <p className='text-sm text-muted-foreground'>Notes</p>
                <p className='text-sm'>{selectedBooking.notes}</p>
              </div>

              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Update Status</p>
                <div className='flex gap-2'>
                  <Button
                    variant={selectedBooking.status === 'Approved' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedBooking, 'Approved')}
                    className='flex-1 '
                  >
                    Approve
                  </Button>
                  <Button
                    variant={selectedBooking.status === 'Pending' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedBooking, 'Pending')}
                    className='flex-1'
                  >
                    Pending
                  </Button>
                  <Button
                    variant={selectedBooking.status === 'Rejected' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedBooking, 'Rejected')}
                    className='flex-1'
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Cancel
            </Button>
            <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white' onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Delete Confirmation */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete booking {selectedBooking?.orderCode}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Order Dialog */}
      <Dialog open={openAddOrderDialog} onOpenChange={setOpenAddOrderDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>Create a new booking order</DialogDescription>
          </DialogHeader>
          <div className='grid gap-6 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='patient-name'>Patient Name</Label>
                <Input
                  id='patient-name'
                  value={newOrder.patient.name}
                  onChange={(e) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      patient: {
                        ...prev.patient,
                        name: e.target.value,
                        initials: e.target.value
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                      }
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='patient-phone'>Phone Number</Label>
                <Input
                  id='patient-phone'
                  value={newOrder.patient.phone}
                  onChange={(e) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      patient: { ...prev.patient, phone: e.target.value }
                    }))
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='vaccine'>Vaccine</Label>
              <Input
                id='vaccine'
                value={newOrder.vaccine}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, vaccine: e.target.value }))}
              />
            </div>

            {/* Improved date picker with calendar */}
            <div className='space-y-2'>
              <Label htmlFor='preferred-date'>Preferred Date</Label>
              <div className='relative'>
                <Input
                  id='preferred-date'
                  type='date'
                  min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                  value={newOrder.preferredDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value
                    setNewOrder((prev) => ({ ...prev, preferredDate: selectedDate }))
                  }}
                />
              </div>
              <p className='text-xs text-muted-foreground'>Only future dates are allowed for booking.</p>
            </div>

            {/* Improved time selection */}
            <div className='space-y-2'>
              <Label htmlFor='preferred-time'>Preferred Time</Label>
              <Select
                value={newOrder.preferredTime}
                onValueChange={(value) => setNewOrder((prev) => ({ ...prev, preferredTime: value }))}
                disabled={!newOrder.preferredDate}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Morning'>Morning</SelectItem>
                  <SelectItem value='Afternoon'>Afternoon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='notes'>Notes</Label>
              <Input
                id='notes'
                value={newOrder.notes}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenAddOrderDialog(false)}>
              Cancel
            </Button>
            <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
              onClick={() => {
                // Validate form
                if (
                  !newOrder.patient.name ||
                  !newOrder.patient.phone ||
                  !newOrder.vaccine ||
                  !newOrder.preferredDate ||
                  !newOrder.preferredTime
                ) {
                  toast({
                    title: 'Missing Information',
                    description: 'Please fill in all required fields',
                    variant: 'destructive'
                  })
                  return
                }

                // Validate date is in the future
                const selectedDate = parseISO(newOrder.preferredDate)
                const tomorrow = addDays(new Date(), 1)
                tomorrow.setHours(0, 0, 0, 0)

                if (isBefore(selectedDate, tomorrow)) {
                  toast({
                    title: 'Invalid Date',
                    description: 'Please select a future date for your booking',
                    variant: 'destructive'
                  })
                  return
                }

                // Add new order logic
                const date = new Date()
                const newBooking = {
                  id: Math.max(...bookingsData.map((b) => b.id)) + 1,
                  patient: {
                    ...newOrder.patient,
                    email: `${newOrder.patient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                    avatar: '/placeholder.svg',
                    initials: newOrder.patient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  },
                  vaccine: newOrder.vaccine,
                  requestDate: format(date, 'yyyy-MM-dd'),
                  preferredDate: newOrder.preferredDate,
                  preferredTime: newOrder.preferredTime,
                  status: 'Pending',
                  notes: newOrder.notes
                }

                // Add to bookings data
                setBookingsData((prev) => [...prev, newBooking])

                toast({
                  title: 'Order Created',
                  description: `New order has been created successfully`
                })
                setOpenAddOrderDialog(false)
                setNewOrder({
                  patient: { name: '', phone: '', avatar: '/placeholder.svg', initials: '' },
                  vaccine: '',
                  preferredDate: '',
                  preferredTime: 'Morning',
                  notes: ''
                })
              }}
            >
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const bookings = [
  {
    id: 1,
    patient: {
      name: 'Nguyễn Văn An',
      avatar: '/placeholder.svg',
      initials: 'NVA',
      phone: '0901234567',
      email: 'an.nguyen@example.com'
    },
    vaccine: 'Vaccine COVID-19',
    requestDate: '2025-03-01',
    preferredDate: '2025-03-05',
    preferredTime: 'Morning',
    status: 'Pending',
    notes: 'First dose'
  },
  {
    id: 2,
    patient: {
      name: 'Trần Thị Bình',
      avatar: '/placeholder.svg',
      initials: 'TTB',
      phone: '0912345678',
      email: 'binh.tran@example.com'
    },
    vaccine: 'Vaccine cúm',
    requestDate: '2025-03-02',
    preferredDate: '2025-03-06',
    preferredTime: 'Afternoon',
    status: 'Approved',
    notes: 'Annual vaccination'
  },
  {
    id: 3,
    patient: {
      name: 'Lê Văn Cường',
      avatar: '/placeholder.svg',
      initials: 'LVC',
      phone: '0923456789',
      email: 'cuong.le@example.com'
    },
    vaccine: 'Vaccine uốn ván',
    requestDate: '2025-03-03',
    preferredDate: '2025-03-07',
    preferredTime: 'Morning',
    status: 'Rejected',
    notes: 'Supplementary dose'
  },
  {
    id: 4,
    patient: {
      name: 'Phạm Thị Duyên',
      avatar: '/placeholder.svg',
      initials: 'PTD',
      phone: '0934567890',
      email: 'duyen.pham@example.com'
    },
    vaccine: 'Vaccine viêm gan B',
    requestDate: '2025-03-04',
    preferredDate: '2025-03-08',
    preferredTime: 'Afternoon',
    status: 'Pending',
    notes: 'Second dose'
  },
  {
    id: 5,
    patient: {
      name: 'Hoàng Văn Đức',
      avatar: '/placeholder.svg',
      initials: 'HVD',
      phone: '0945678901',
      email: 'duc.hoang@example.com'
    },
    vaccine: 'Vaccine COVID-19',
    requestDate: '2025-03-05',
    preferredDate: '2025-03-09',
    preferredTime: 'Morning',
    status: 'Approved',
    notes: 'Booster dose'
  },
  {
    id: 6,
    patient: {
      name: 'Vũ Thị Giang',
      avatar: '/placeholder.svg',
      initials: 'VTG',
      phone: '0956789012',
      email: 'giang.vu@example.com'
    },
    vaccine: 'Vaccine MMR',
    requestDate: '2025-03-06',
    preferredDate: '2025-03-10',
    preferredTime: 'Afternoon',
    status: 'Pending',
    notes: 'Regular vaccination'
  },
  {
    id: 7,
    patient: {
      name: 'Đặng Văn Hải',
      avatar: '/placeholder.svg',
      initials: 'DVH',
      phone: '0967890123',
      email: 'hai.dang@example.com'
    },
    vaccine: 'Vaccine phế cầu',
    requestDate: '2025-03-07',
    preferredDate: '2025-03-11',
    preferredTime: 'Morning',
    status: 'Approved',
    notes: 'First time'
  },
  {
    id: 8,
    patient: {
      name: 'Lý Thị Hồng',
      avatar: '/placeholder.svg',
      initials: 'LTH',
      phone: '0978901234',
      email: 'hong.ly@example.com'
    },
    vaccine: 'Vaccine HPV',
    requestDate: '2025-03-08',
    preferredDate: '2025-03-12',
    preferredTime: 'Afternoon',
    status: 'Rejected',
    notes: 'First dose'
  },
  {
    id: 9,
    patient: {
      name: 'Mai Văn Hùng',
      avatar: '/placeholder.svg',
      initials: 'MVH',
      phone: '0989012345',
      email: 'hung.mai@example.com'
    },
    vaccine: 'Vaccine thủy đậu',
    requestDate: '2025-03-09',
    preferredDate: '2025-03-13',
    preferredTime: 'Morning',
    status: 'Pending',
    notes: 'Child vaccination'
  },
  {
    id: 10,
    patient: {
      name: 'Trịnh Thị Lan',
      avatar: '/placeholder.svg',
      initials: 'TTL',
      phone: '0990123456',
      email: 'lan.trinh@example.com'
    },
    vaccine: 'Vaccine COVID-19',
    requestDate: '2025-03-10',
    preferredDate: '2025-03-14',
    preferredTime: 'Afternoon',
    status: 'Approved',
    notes: 'Reminder dose'
  },
  {
    id: 11,
    patient: {
      name: 'Ngô Văn Nam',
      avatar: '/placeholder.svg',
      initials: 'NVN',
      phone: '0901234568',
      email: 'nam.ngo@example.com'
    },
    vaccine: 'Vaccine sởi',
    requestDate: '2025-03-11',
    preferredDate: '2025-03-15',
    preferredTime: 'Morning',
    status: 'Pending',
    notes: 'Preventive vaccination'
  },
  {
    id: 12,
    patient: {
      name: 'Đỗ Thị Oanh',
      avatar: '/placeholder.svg',
      initials: 'DTO',
      phone: '0912345679',
      email: 'oanh.do@example.com'
    },
    vaccine: 'Vaccine bại liệt',
    requestDate: '2025-03-12',
    preferredDate: '2025-03-16',
    preferredTime: 'Afternoon',
    status: 'Approved',
    notes: 'Supplementary dose'
  },
  {
    id: 13,
    patient: {
      name: 'Phan Văn Phong',
      avatar: '/placeholder.svg',
      initials: 'PVP',
      phone: '0923456780',
      email: 'phong.phan@example.com'
    },
    vaccine: 'Vaccine viêm màng não',
    requestDate: '2025-03-13',
    preferredDate: '2025-03-17',
    preferredTime: 'Morning',
    status: 'Rejected',
    notes: 'First time'
  },
  {
    id: 14,
    patient: {
      name: 'Vũ Thị Quỳnh',
      avatar: '/placeholder.svg',
      initials: 'VTQ',
      phone: '0934567891',
      email: 'quynh.vu@example.com'
    },
    vaccine: 'Vaccine rubella',
    requestDate: '2025-03-14',
    preferredDate: '2025-03-18',
    preferredTime: 'Afternoon',
    status: 'Pending',
    notes: "Women's vaccination"
  },
  {
    id: 15,
    patient: {
      name: 'Hoàng Thị Sương',
      avatar: '/placeholder.svg',
      initials: 'HTS',
      phone: '0945678902',
      email: 'suong.hoang@example.com'
    },
    vaccine: 'Vaccine COVID-19',
    requestDate: '2025-03-15',
    preferredDate: '2025-03-19',
    preferredTime: 'Morning',
    status: 'Approved',
    notes: 'Third dose'
  }
]

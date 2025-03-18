'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { format, parseISO, isBefore, addDays } from 'date-fns'
import * as XLSX from 'xlsx'
import {
  Search,
  Filter,
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
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ITEMS_PER_PAGE = 10

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

type Patient = {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

type Booking = {
  id: number
  patient: Patient
  vaccine: string
  requestDate: string
  preferredDate: string
  preferredTime: string
  status: string
  notes: string
  orderCode?: string // Thêm orderCode là optional vì nó được thêm sau
  stt?: number // Thêm stt là optional vì nó được thêm sau
  phone?: string // Thêm phone là optional để khớp với bookingsWithOrder
}

export default function BookingsPage() {
  const [bookingsData, setBookingsData] = useState<Booking[]>(bookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: { approved: false, pending: false, rejected: false },
    dateRange: { from: '', to: '' }
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false)
  const [newOrder, setNewOrder] = useState({
    patient: { name: '', phone: '', avatar: '/placeholder.svg', initials: '' },
    vaccine: '',
    preferredDate: '',
    preferredTime: 'Morning',
    notes: ''
  })

  const now = new Date()
  const today = format(now, 'yyyy-MM-dd')
  const tomorrow = format(addDays(now, 1), 'yyyy-MM-dd')

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

  const bookingsWithOrder = useMemo(() => {
    return bookingsData.map((booking, index) => {
      const date = parseISO(booking.requestDate)
      const dateCode = format(date, 'ddMMyy')
      const orderNum = String(index + 1).padStart(2, '0')
      return {
        ...booking,
        orderCode: `ODR${dateCode}${orderNum}`,
        stt: index + 1,
        phone: booking.patient.phone // Đảm bảo phone được thêm từ patient
      }
    })
  }, [bookingsData])

  const filteredBookings = useMemo(() => {
    return bookingsWithOrder.filter((booking) => {
      const matchesSearch =
        booking.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) || // Sử dụng booking.patient.phone
        booking.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) || // Kiểm tra optional
        booking.vaccine.toLowerCase().includes(searchTerm.toLowerCase())

      const noStatusFilter = !filters.status.approved && !filters.status.pending && !filters.status.rejected
      const matchesStatus =
        noStatusFilter ||
        (filters.status.approved && booking.status === 'Approved') ||
        (filters.status.pending && booking.status === 'Pending') ||
        (filters.status.rejected && booking.status === 'Rejected')

      const bookingDate = parseISO(booking.requestDate)
      const fromDate = filters.dateRange.from ? parseISO(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? parseISO(filters.dateRange.to) : null
      const matchesDateRange =
        (!fromDate || !isBefore(bookingDate, fromDate)) && (!toDate || !isBefore(toDate, bookingDate))

      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [bookingsWithOrder, searchTerm, filters])

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE))
  const paginatedBookings = useMemo(
    () => filteredBookings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredBookings, currentPage]
  )

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const handleExport = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const exportData = filteredBookings.map((booking) => ({
        'Mã Order': booking.orderCode,
        STT: booking.stt,
        Patient: booking.patient.name,
        Phone: booking.patient.phone, // Sử dụng booking.patient.phone
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
      setIsRefreshing(false)
    }
  }, [filteredBookings])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setBookingsData(bookings)
      setSearchTerm('')
      setFilters({
        status: { approved: false, pending: false, rejected: false },
        dateRange: { from: '', to: '' }
      })
      setCurrentPage(1)
      toast({ title: 'Refreshed', description: 'Data has been refreshed' })
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleStatusUpdate = useCallback((booking: Booking, newStatus: string) => {
    setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null))
  }, [])

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

  const handleDirectStatusUpdate = useCallback((bookingId: number, newStatus: string) => {
    setBookingsData((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking))
    )
    toast({
      title: 'Status Updated',
      description: `Booking status changed to ${newStatus}`
    })
  }, [])

  const handleDelete = useCallback((booking: Booking) => {
    setSelectedBooking(booking)
    setOpenDeleteDialog(true)
  }, [])

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

  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className='bg-green-500 hover:bg-green-600'>Approved</Badge>
      case 'Pending':
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            Pending
          </Badge>
        )
      case 'Rejected':
        return <Badge variant='destructive'>Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      status: { approved: false, pending: false, rejected: false },
      dateRange: { from: '', to: '' }
    })
    setCurrentPage(1)
  }, [])

  const handleAddOrder = useCallback(() => {
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
    const selectedDate = parseISO(newOrder.preferredDate)
    const tomorrowDate = addDays(new Date(), 1)
    tomorrowDate.setHours(0, 0, 0, 0)
    if (isBefore(selectedDate, tomorrowDate)) {
      toast({
        title: 'Invalid Date',
        description: 'Please select a future date for your booking',
        variant: 'destructive'
      })
      return
    }
    const date = new Date()
    const newBooking: Booking = {
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
    setBookingsData((prev) => [...prev, newBooking])
    toast({
      title: 'Order Created',
      description: `New order has been created successfully`
    })
    setOpenAddOrderDialog(false)
  }, [newOrder, bookingsData])

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
          <Button size='sm' onClick={() => setOpenAddOrderDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Order
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by name, phone, or order ID...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full'
              type='search'
            />
            <Button variant='outline' size='icon' className='h-9 w-9'>
              <Search className='h-4 w-4' />
            </Button>
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
                <p className='text-sm text-muted-foreground mb-4'>Filter bookings by status and request date range.</p>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Booking Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status.approved}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, approved: checked }
                      }))
                    }
                  >
                    Approved
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
                    checked={filters.status.rejected}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, rejected: checked }
                      }))
                    }
                  >
                    Rejected
                  </DropdownMenuCheckboxItem>
                </div>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Request Date Range</DropdownMenuLabel>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <div className='flex flex-col gap-1'>
                      <label className='text-xs text-muted-foreground'>From</label>
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
                      <label className='text-xs text-muted-foreground'>To</label>
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
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>All Bookings</TabsTrigger>
            <TabsTrigger value='approved'>Approved</TabsTrigger>
            <TabsTrigger value='pending'>Pending/Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedBookings.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No bookings found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Preferred Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBookings.map((booking, index) => (
                        <TableRow
                          key={booking.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => {
                            setSelectedBooking(booking)
                            setOpenDetailsDialog(true)
                          }}
                        >
                          <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                          <TableCell className='font-medium'>{booking.orderCode}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={booking.patient.avatar} alt={booking.patient.name} />
                                <AvatarFallback>{booking.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{booking.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {booking.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.vaccine}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(parseISO(booking.requestDate), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(parseISO(booking.preferredDate), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                              {booking.preferredTime}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                                  <MoreHorizontal className='h-4 w-4' />
                                  <span className='sr-only'>Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBooking(booking)
                                    setOpenDetailsDialog(true)
                                  }}
                                >
                                  <Edit className='mr-2 h-4 w-4' />
                                  Details
                                </DropdownMenuItem>
                                {booking.status === 'Pending' && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDirectStatusUpdate(booking.id, 'Approved')
                                      }}
                                    >
                                      <Check className='mr-2 h-4 w-4 text-green-500' />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDirectStatusUpdate(booking.id, 'Rejected')
                                      }}
                                    >
                                      <X className='mr-2 h-4 w-4 text-red-500' />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(booking)
                                  }}
                                >
                                  <Trash className='mr-2 h-4 w-4' />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='approved' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedBookings.filter((b) => b.status === 'Approved').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No approved bookings found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Preferred Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBookings
                        .filter((booking) => booking.status === 'Approved')
                        .map((booking, index) => (
                          <TableRow
                            key={booking.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => {
                              setSelectedBooking(booking)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className='font-medium'>{booking.orderCode}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={booking.patient.avatar} alt={booking.patient.name} />
                                  <AvatarFallback>{booking.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium'>{booking.patient.name}</div>
                                  <div className='text-sm text-muted-foreground flex items-center'>
                                    <Phone className='h-3 w-3 mr-1' />
                                    {booking.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.vaccine}</TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(parseISO(booking.requestDate), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(parseISO(booking.preferredDate), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                                {booking.preferredTime}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className='h-4 w-4' />
                                    <span className='sr-only'>Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedBooking(booking)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDelete(booking)
                                    }}
                                  >
                                    <Trash className='mr-2 h-4 w-4' />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='pending' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedBookings.filter((b) => b.status === 'Pending' || b.status === 'Rejected').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No pending or rejected bookings found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Preferred Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBookings
                        .filter((booking) => booking.status === 'Pending' || booking.status === 'Rejected')
                        .map((booking, index) => (
                          <TableRow
                            key={booking.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => {
                              setSelectedBooking(booking)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className='font-medium'>{booking.orderCode}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={booking.patient.avatar} alt={booking.patient.name} />
                                  <AvatarFallback>{booking.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium'>{booking.patient.name}</div>
                                  <div className='text-sm text-muted-foreground flex items-center'>
                                    <Phone className='h-3 w-3 mr-1' />
                                    {booking.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.vaccine}</TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(parseISO(booking.requestDate), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(parseISO(booking.preferredDate), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                                {booking.preferredTime}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className='h-4 w-4' />
                                    <span className='sr-only'>Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedBooking(booking)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Details
                                  </DropdownMenuItem>
                                  {booking.status === 'Pending' && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDirectStatusUpdate(booking.id, 'Approved')
                                        }}
                                      >
                                        <Check className='mr-2 h-4 w-4 text-green-500' />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDirectStatusUpdate(booking.id, 'Rejected')
                                        }}
                                      >
                                        <X className='mr-2 h-4 w-4 text-red-500' />
                                        Reject
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDelete(booking)
                                    }}
                                  >
                                    <Trash className='mr-2 h-4 w-4' />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed pagination controls */}
      {paginatedBookings.length > 0 && totalPages > 1 && (
        <div className='mb-[2rem] fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isRefreshing}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='text-sm'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isRefreshing}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}

      {/* Booking details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>View and manage booking request.</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className='grid gap-4 py-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={selectedBooking.patient.avatar} alt={selectedBooking.patient.name} />
                    <AvatarFallback>{selectedBooking.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-medium'>{selectedBooking.patient.name}</h3>
                    <p className='text-sm text-muted-foreground'>{selectedBooking.orderCode}</p>
                  </div>
                </div>
                <div>{getStatusBadge(selectedBooking.status)}</div>
              </div>

              <div className='rounded-lg border p-4'>
                <div className='flex justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Request Date</h4>
                    <p>{format(parseISO(selectedBooking.requestDate), 'dd/MM/yyyy')}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Preferred Date</h4>
                    <p>{format(parseISO(selectedBooking.preferredDate), 'dd/MM/yyyy')}</p>
                  </div>
                </div>
                <div className='mt-4 flex justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Time</h4>
                    <p>{selectedBooking.preferredTime}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                    <p className='font-medium'>{selectedBooking.vaccine}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <h4 className='text-sm font-medium text-muted-foreground'>Notes</h4>
                  <p>{selectedBooking.notes}</p>
                </div>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Contact Information</h4>
                <p className='text-sm flex items-center gap-1'>
                  <Phone className='h-3 w-3' /> {selectedBooking.patient.phone}
                </p>
                <p className='text-sm'>{selectedBooking.patient.email}</p>
              </div>

              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>Update Status</h4>
                <div className='flex gap-2'>
                  <Button
                    variant={selectedBooking.status === 'Approved' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedBooking, 'Approved')}
                    className='flex-1'
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
              Close
            </Button>
            <Button onClick={handleSaveChanges} disabled={!selectedBooking}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
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
            <Button variant='destructive' onClick={confirmDelete} disabled={!selectedBooking}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add order dialog */}
      <Dialog open={openAddOrderDialog} onOpenChange={setOpenAddOrderDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>Create a new booking order.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
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
            <div className='space-y-2'>
              <Label htmlFor='preferred-date'>Preferred Date</Label>
              <Input
                id='preferred-date'
                type='date'
                min={tomorrow}
                value={newOrder.preferredDate}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, preferredDate: e.target.value }))}
              />
              <p className='text-xs text-muted-foreground'>Only future dates are allowed for booking.</p>
            </div>
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
            <Button onClick={handleAddOrder}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

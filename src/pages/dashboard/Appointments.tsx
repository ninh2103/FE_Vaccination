'use client'

import { useState, useEffect, useMemo } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  CalendarIcon,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  Filter,
  Phone,
  Mail,
  Clock,
  Calendar,
  AlertCircle,
  Eye
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
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Define data types for appointments
interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Appointment {
  id: number
  patient: Patient
  vaccine: string
  date: string
  time: string
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
  notes: string
}

// Sample data for today's appointments
const todayAppointments: Appointment[] = [
  {
    id: 1,
    patient: {
      name: 'Nguyen Van An',
      avatar: '/placeholder.svg',
      initials: 'NA',
      phone: '0912 345 678',
      email: 'nguyenvanan@example.com'
    },
    vaccine: 'COVID-19 Vaccine',
    date: '2023-03-13',
    time: '09:00',
    status: 'Confirmed',
    notes: 'First dose'
  },
  {
    id: 2,
    patient: {
      name: 'Tran Thi Binh',
      avatar: '/placeholder.svg',
      initials: 'TB',
      phone: '0987 654 321',
      email: 'tranthibinh@example.com'
    },
    vaccine: 'Flu Vaccine',
    date: '2023-03-13',
    time: '10:15',
    status: 'Pending',
    notes: 'Annual flu shot'
  },
  {
    id: 3,
    patient: {
      name: 'Le Van Cuong',
      avatar: '/placeholder.svg',
      initials: 'LC',
      phone: '0933 456 789',
      email: 'levancuong@example.com'
    },
    vaccine: 'Hepatitis B Vaccine',
    date: '2025-03-17',
    time: '11:00',
    status: 'Confirmed',
    notes: 'Second dose'
  },
  {
    id: 4,
    patient: {
      name: 'Pham Thi Dung',
      avatar: '/placeholder.svg',
      initials: 'PD',
      phone: '0905 123 456',
      email: 'phamthidung@example.com'
    },
    vaccine: 'Tetanus Vaccine',
    date: '2025-03-17',
    time: '12:30',
    status: 'Confirmed',
    notes: 'Booster shot'
  },
  {
    id: 6,
    patient: {
      name: 'Do Thi Giang',
      avatar: '/placeholder.svg',
      initials: 'DG',
      phone: '0923 654 987',
      email: 'dothigiang@example.com'
    },
    vaccine: 'MMR Vaccine',
    date: '2025-03-17',
    time: '14:00',
    status: 'Confirmed',
    notes: 'Routine vaccination'
  },
  // ... (other sample data remains the same, only translated to English)
]

// Sample data for all appointments
const initialAppointments: Appointment[] = [
  ...todayAppointments,

  {
    id: 7,
    patient: {
      name: 'Vu Van Hai',
      avatar: '/placeholder.svg',
      initials: 'VH',
      phone: '0944 321 654',
      email: 'vuvanhai@example.com'
    },
    vaccine: 'COVID-19 Vaccine',
    date: '2025-03-13',
    time: '15:15',
    status: 'Confirmed',
    notes: 'Booster dose'
  },
  {
    id: 8,
    patient: {
      name: 'Bui Thi Hoa',
      avatar: '/placeholder.svg',
      initials: 'BH',
      phone: '0967 890 123',
      email: 'buithihoa@example.com'
    },
    vaccine: 'Flu Vaccine',
    date: '2025-03-13',
    time: '16:30',
    status: 'Pending',
    notes: 'Annual flu shot'
  },
  {
    id: 9,
    patient: {
      name: 'Nguyen Thi Kim',
      avatar: '/placeholder.svg',
      initials: 'NK',
      phone: '0911 234 567',
      email: 'nguyenthikim@example.com'
    },
    vaccine: 'Hepatitis B Vaccine',
    date: '2025-03-14',
    time: '17:00',
    status: 'Confirmed',
    notes: 'Third dose'
  }
  // ... (other sample data remains the same, only translated to English)
]

// Pagination constant
const ROWS_PER_PAGE = 10

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    patient: { name: '', avatar: '', initials: '', phone: '', email: '' },
    vaccine: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    status: 'Pending',
    notes: ''
  })
  const [currentTab, setCurrentTab] = useState('today')
  const [filters, setFilters] = useState({
    status: {
      confirmed: false,
      pending: false,
      completed: false,
      cancelled: false
    },
    dateRange: {
      from: '',
      to: ''
    }
  })

  // Filter data
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const today = format(new Date(), 'yyyy-MM-dd')
      const matchesTab = (currentTab === 'today' && appointment.date === today) || currentTab === 'all'
      const matchesSearch =
        appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
      const noStatusFilter =
        !filters.status.confirmed && !filters.status.pending && !filters.status.completed && !filters.status.cancelled
      const matchesStatus =
        noStatusFilter ||
        (filters.status.confirmed && appointment.status === 'Confirmed') ||
        (filters.status.pending && appointment.status === 'Pending') ||
        (filters.status.completed && appointment.status === 'Completed') ||
        (filters.status.cancelled && appointment.status === 'Cancelled')
      const appointmentDate = new Date(appointment.date)
      const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null
      const matchesDateRange = (!fromDate || appointmentDate >= fromDate) && (!toDate || appointmentDate <= toDate)

      return matchesTab && matchesSearch && matchesStatus && matchesDateRange
    })
  }, [appointments, searchTerm, currentTab, filters])

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / ROWS_PER_PAGE)
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Status badge renderer
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className='bg-green-500 hover:bg-green-600'>Confirmed</Badge>
      case 'Pending':
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            Pending
          </Badge>
        )
      case 'Cancelled':
        return <Badge variant='destructive'>Cancelled</Badge>
      case 'Completed':
        return <Badge className='bg-blue-500 hover:bg-blue-600'>Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Handle adding new appointment
  const handleAddAppointment = () => {
    if (!newAppointment.patient?.name || !newAppointment.vaccine || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields')
      return
    }

    const initials = newAppointment.patient.name
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase()

    const newAppointmentWithId: Appointment = {
      id: appointments.length + 1,
      patient: {
        ...(newAppointment.patient as Patient),
        initials: initials
      },
      vaccine: newAppointment.vaccine,
      date: newAppointment.date,
      time: newAppointment.time,
      status: newAppointment.status as 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed',
      notes: newAppointment.notes || ''
    }

    setAppointments([...appointments, newAppointmentWithId])
    setOpenAddDialog(false)
    setNewAppointment({
      patient: { name: '', avatar: '', initials: '', phone: '', email: '' },
      vaccine: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '',
      status: 'Pending',
      notes: ''
    })
  }

  // Handle updating appointment
  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === selectedAppointment.id ? selectedAppointment : appointment
      )
      setAppointments(updatedAppointments)
      setOpenEditDialog(false)
    }
  }

  // Handle deleting appointment
  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter((appointment) => appointment.id !== selectedAppointment.id))
      setOpenDeleteDialog(false)
      setSelectedAppointment(null)
    }
  }

  // Handle quick status update
  const handleQuickStatusUpdate = (appointmentId: number, newStatus: 'Confirmed' | 'Cancelled' | 'Completed') => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    )
    setAppointments(updatedAppointments)
  }

  // Handle exporting to Excel
  const handleExport = () => {
    const dataToExport = filteredAppointments.map((appointment) => ({
      ID: appointment.id,
      'Patient Name': appointment.patient.name,
      'Phone Number': appointment.patient.phone,
      Email: appointment.patient.email,
      Vaccine: appointment.vaccine,
      Date: appointment.date,
      Time: appointment.time,
      Status: appointment.status,
      Notes: appointment.notes
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `Appointments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
  }

  // Handle refreshing data
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setAppointments([...initialAppointments])
      setSearchTerm('')
      setFilters({
        status: {
          confirmed: false,
          pending: false,
          completed: false,
          cancelled: false
        },
        dateRange: {
          from: '',
          to: ''
        }
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  // Handle clearing filters
  const handleClearFilters = () => {
    setFilters({
      status: {
        confirmed: false,
        pending: false,
        completed: false,
        cancelled: false
      },
      dateRange: {
        from: '',
        to: ''
      }
    })
    setCurrentPage(1)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Appointments
        </h1>
        <div className='flex items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-9 gap-1'>
                <CalendarIcon className='h-4 w-4' />
                {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : <span>Select Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <CalendarComponent mode='single' selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
            <Download className='mr-2 h-4 w-4' />
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
          <Dialog  open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'>
                <Plus className='mr-2 h-4 w-4' />
                Add Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>Enter details for the new appointment.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='patient-name'>Patient Name</Label>
                  <Input
                    id='patient-name'
                    value={newAppointment.patient?.name || ''}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        patient: { ...(newAppointment.patient as Patient), name: e.target.value }
                      })
                    }
                    placeholder='Enter patient name'
                    required
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='patient-phone'>Phone Number</Label>
                    <Input
                      id='patient-phone'
                      value={newAppointment.patient?.phone || ''}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          patient: { ...(newAppointment.patient as Patient), phone: e.target.value }
                        })
                      }
                      placeholder='Enter phone number'
                      required
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='patient-email'>Email</Label>
                    <Input
                      id='patient-email'
                      type='email'
                      value={newAppointment.patient?.email || ''}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          patient: { ...(newAppointment.patient as Patient), email: e.target.value }
                        })
                      }
                      placeholder='Enter email'
                    />
                  </div>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='vaccine'>Vaccine</Label>
                  <Select
                    value={newAppointment.vaccine}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, vaccine: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select vaccine' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='COVID-19 Vaccine'>COVID-19 Vaccine</SelectItem>
                      <SelectItem value='Flu Vaccine'>Flu Vaccine</SelectItem>
                      <SelectItem value='Hepatitis B Vaccine'>Hepatitis B Vaccine</SelectItem>
                      <SelectItem value='Tetanus Vaccine'>Tetanus Vaccine</SelectItem>
                      <SelectItem value='MMR Vaccine'>MMR Vaccine</SelectItem>
                      <SelectItem value='HPV Vaccine'>HPV Vaccine</SelectItem>
                      <SelectItem value='Pneumococcal Vaccine'>Pneumococcal Vaccine</SelectItem>
                      <SelectItem value='Varicella Vaccine'>Varicella Vaccine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='date'>Appointment Date</Label>
                    <Input
                      id='date'
                      type='date'
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      required
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='time'>Appointment Time</Label>
                    <Input
                      id='time'
                      type='time'
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='status'>Status</Label>
                  <Select
                    value={newAppointment.status}
                    onValueChange={(value: any) => setNewAppointment({ ...newAppointment, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Confirmed'>Confirmed</SelectItem>
                      <SelectItem value='Pending'>Pending</SelectItem>
                      <SelectItem value='Completed'>Completed</SelectItem>
                      <SelectItem value='Cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='notes'>Notes</Label>
                  <Textarea
                    id='notes'
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder='Enter notes'
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                  Cancel
                </Button>
                <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white' onClick={handleAddAppointment}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Input
            placeholder='Search by name, phone number, vaccine...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className='w-full max-w-sm'
            type='search'
          />
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
                <p className='text-sm text-muted-foreground mb-4'>Filter appointments by status and date range.</p>

                {/* Status filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Status</DropdownMenuLabel>
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
                    checked={filters.status.completed}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, completed: checked }
                      }))
                    }
                  >
                    Completed
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

                {/* Date range filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Date Range</DropdownMenuLabel>
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

                {/* Clear filters button */}
                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue='today' onValueChange={setCurrentTab} className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-2'>
            <TabsTrigger value='today'>Today's Appointments</TabsTrigger>
            <TabsTrigger value='all'>All Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value='today' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No appointments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className='w-[100px]'>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAppointments.map((appointment, index) => (
                        <TableRow key={appointment.id} className='cursor-pointer hover:bg-muted/50'>
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{appointment.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {appointment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.vaccine}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                              {appointment.time}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell className='max-w-[200px] truncate'>{appointment.notes}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              {appointment.status === 'Pending' && (
                                <>
                                  <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8'
                                    onClick={() => handleQuickStatusUpdate(appointment.id, 'Confirmed')}
                                    title='Accept'
                                  >
                                    <Check className='h-4 w-4 text-green-500' />
                                  </Button>
                                  <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8'
                                    onClick={() => handleQuickStatusUpdate(appointment.id, 'Cancelled')}
                                    title='Reject'
                                  >
                                    <X className='h-4 w-4 text-red-500' />
                                  </Button>
                                </>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <MoreHorizontal className='h-4 w-4' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Eye className='mr-2 h-4 w-4' />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenEditDialog(true)
                                    }}
                                  >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className='text-red-600'
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenDeleteDialog(true)
                                    }}
                                  >
                                    <Trash className='mr-2 h-4 w-4' />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No appointments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No. </TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[80px]'>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAppointments.map((appointment, index) => (
                        <TableRow key={appointment.id} className='cursor-pointer hover:bg-muted/50'>
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{appointment.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {appointment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.vaccine}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(appointment.date), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              {appointment.status === 'Pending' && (
                                <>
                                  <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8'
                                    onClick={() => handleQuickStatusUpdate(appointment.id, 'Confirmed')}
                                    title='Accept'
                                  >
                                    <Check className='h-4 w-4 text-green-500' />
                                  </Button>
                                  <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8'
                                    onClick={() => handleQuickStatusUpdate(appointment.id, 'Cancelled')}
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
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Eye className='mr-2 h-4 w-4' />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenEditDialog(true)
                                    }}
                                  >
                                    <Edit className='mr-2 h-4 w-4' />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className='text-red-600'
                                    onClick={() => {
                                      setSelectedAppointment(appointment)
                                      setOpenDeleteDialog(true)
                                    }}
                                  >
                                    <Trash className='mr-2 h-4 w-4' />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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

        {/* Fixed pagination */}
        {paginatedAppointments.length > 0 && totalPages > 1 && (
          <div className='fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>View and manage appointment information.</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className='grid gap-4 py-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={selectedAppointment.patient.avatar} alt={selectedAppointment.patient.name} />
                  <AvatarFallback>{selectedAppointment.patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-medium'>{selectedAppointment.patient.name}</h3>
                  <p className='text-sm text-muted-foreground'>{selectedAppointment.patient.email}</p>
                </div>
                <div className='ml-auto'>{getStatusBadge(selectedAppointment.status)}</div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Date</h4>
                  <p>{format(new Date(selectedAppointment.date), 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Time</h4>
                  <p>{selectedAppointment.time}</p>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                <p>{selectedAppointment.vaccine}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Notes</h4>
                <p>{selectedAppointment.notes}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Contact Information</h4>
                <p className='text-sm flex items-center gap-1'>
                  <Phone className='h-3 w-3' /> {selectedAppointment.patient.phone}
                </p>
                <p className='text-sm flex items-center gap-1'>
                  <Mail className='h-3 w-3' /> {selectedAppointment.patient.email}
                </p>
              </div>
              <div className='mt-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>Update Status</h4>
                <div className='mt-2'>
                  <Select
                    defaultValue={selectedAppointment.status}
                    onValueChange={(value: any) => {
                      setSelectedAppointment({
                        ...selectedAppointment,
                        status: value
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Confirmed'>Confirmed</SelectItem>
                      <SelectItem value='Pending'>Pending</SelectItem>
                      <SelectItem value='Completed'>Completed</SelectItem>
                      <SelectItem value='Cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleUpdateAppointment()
                setOpenDetailsDialog(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Update appointment details.</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='edit-patient-name'>Patient Name</Label>
                <Input
                  id='edit-patient-name'
                  value={selectedAppointment.patient.name}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      patient: { ...selectedAppointment.patient, name: e.target.value }
                    })
                  }
                  placeholder='Enter patient name'
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='edit-patient-phone'>Phone Number</Label>
                  <Input
                    id='edit-patient-phone'
                    value={selectedAppointment.patient.phone}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        patient: { ...selectedAppointment.patient, phone: e.target.value }
                      })
                    }
                    placeholder='Enter phone number'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='edit-patient-email'>Email</Label>
                  <Input
                    id='edit-patient-email'
                    type='email'
                    value={selectedAppointment.patient.email}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        patient: { ...selectedAppointment.patient, email: e.target.value }
                      })
                    }
                    placeholder='Enter email'
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-vaccine'>Vaccine</Label>
                <Select
                  value={selectedAppointment.vaccine}
                  onValueChange={(value) => setSelectedAppointment({ ...selectedAppointment, vaccine: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select vaccine' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='COVID-19 Vaccine'>COVID-19 Vaccine</SelectItem>
                    <SelectItem value='Flu Vaccine'>Flu Vaccine</SelectItem>
                    <SelectItem value='Hepatitis B Vaccine'>Hepatitis B Vaccine</SelectItem>
                    <SelectItem value='Tetanus Vaccine'>Tetanus Vaccine</SelectItem>
                    <SelectItem value='MMR Vaccine'>MMR Vaccine</SelectItem>
                    <SelectItem value='HPV Vaccine'>HPV Vaccine</SelectItem>
                    <SelectItem value='Pneumococcal Vaccine'>Pneumococcal Vaccine</SelectItem>
                    <SelectItem value='Varicella Vaccine'>Varicella Vaccine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='edit-date'>Date</Label>
                  <Input
                    id='edit-date'
                    type='date'
                    value={selectedAppointment.date}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='edit-time'>Time</Label>
                  <Input
                    id='edit-time'
                    type='time'
                    value={selectedAppointment.time}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-status'>Status</Label>
                <Select
                  value={selectedAppointment.status}
                  onValueChange={(value: any) => setSelectedAppointment({ ...selectedAppointment, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Confirmed'>Confirmed</SelectItem>
                    <SelectItem value='Pending'>Pending</SelectItem>
                    <SelectItem value='Completed'>Completed</SelectItem>
                    <SelectItem value='Cancelled'>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-notes'>Notes</Label>
                <Textarea
                  id='edit-notes'
                  value={selectedAppointment.notes}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, notes: e.target.value })}
                  placeholder='Enter notes'
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAppointment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedAppointment && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  You are deleting the appointment for{' '}
                  <span className='font-bold'>{selectedAppointment.patient.name}</span> on{' '}
                  {format(new Date(selectedAppointment.date), 'dd/MM/yyyy')} at {selectedAppointment.time}.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteAppointment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

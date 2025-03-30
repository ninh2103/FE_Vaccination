import { useState, useMemo, useCallback } from 'react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'
import { Filter, Download, RefreshCw, Plus, X, Loader2, CalendarIcon } from 'lucide-react'
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
import { AppointmentTable } from './AppointmentTable'
import { AddAppointment } from './AddAppointment'
import { UpdateAppointment } from './UpdateAppointment'

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

const initialAppointments: Appointment[] = [
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
    date: format(new Date(), 'yyyy-MM-dd'),
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
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:15',
    status: 'Pending',
    notes: 'Annual flu shot'
  }
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
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

  const handleExport = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const exportData = filteredAppointments.map((appointment) => ({
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
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments')
      XLSX.writeFile(workbook, `appointments_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast({ title: 'Success', description: 'File exported successfully' })
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export file', variant: 'destructive' })
    } finally {
      setIsRefreshing(false)
    }
  }, [filteredAppointments])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setAppointments(initialAppointments)
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
      toast({ title: 'Refreshed', description: 'Data has been refreshed' })
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleUpdateAppointment = useCallback((updatedAppointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === updatedAppointment.id ? updatedAppointment : appointment))
    )
    toast({
      title: 'Changes Saved',
      description: `Appointment status updated successfully to ${updatedAppointment.status}`
    })
    setOpenUpdateDialog(false)
  }, [])

  const handleDeleteAppointment = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedAppointment) return
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== selectedAppointment.id))
    toast({
      title: 'Deleted',
      description: `Appointment has been deleted successfully`
    })
    setOpenDeleteDialog(false)
  }, [selectedAppointment])

  const handleViewDetails = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenUpdateDialog(true)
  }, [])

  const handleClearFilters = useCallback(() => {
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
  }, [])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Appointments
        </h1>
        <div className='flex items-center gap-2'>
          <div className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
            <CalendarIcon className='h-4 w-4' />
            <span>{format(new Date(), 'dd/MM/yyyy')}</span>
          </div>
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
                Add Appointment
              </Button>
            </DialogTrigger>
            <AddAppointment
              onAdd={(newAppointment: Appointment) => {
                setAppointments((prev) => [...prev, newAppointment])
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
              placeholder='Search by name, phone number, vaccine...'
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
                <p className='text-sm text-muted-foreground mb-4'>Filter appointments by status and date range.</p>

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
                {filteredAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No appointments found matching the current filters.
                  </div>
                ) : (
                  <AppointmentTable
                    appointments={filteredAppointments}
                    onUpdateAppointment={handleUpdateAppointment}
                    onDeleteAppointment={handleDeleteAppointment}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {filteredAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No appointments found matching the current filters.
                  </div>
                ) : (
                  <AppointmentTable
                    appointments={filteredAppointments}
                    onUpdateAppointment={handleUpdateAppointment}
                    onDeleteAppointment={handleDeleteAppointment}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Appointment Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        {selectedAppointment && (
          <UpdateAppointment
            appointment={selectedAppointment}
            onUpdate={handleUpdateAppointment}
            onCancel={() => setOpenUpdateDialog(false)}
          />
        )}
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={!selectedAppointment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

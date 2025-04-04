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
import { AppointmentTable } from './AppointmentTable'
import { AddAppointment } from './AddAppointment'
import { UpdateAppointment } from './UpdateAppointment'
import {
  useListAppointmentQuery,
  useListAppointmentDailyQuery,
  useDeleteAppointmentMutation
} from '@/queries/useAppointment'
import { toast } from 'sonner'

interface ApiAppointment {
  id: string
  userId: string
  vaccinationId: string
  appointmentDate: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  createdAt: string
  updatedAt: string
  vaccination: {
    id: string
    vaccineName: string
    image: string
    location: string
    description: string
    price: number
    batchNumber: string
    certificate: string | null
    manufacturer: string
    expiryDate: string
    sideEffect: string | null
  }
  user: {
    id: string
    name: string
    email: string
    avatar: string
    role: {
      id: string
      name: string
    }
  }
}

interface Patient {
  name: string
  avatar: string
  initials: string
  email: string
}

interface Appointment {
  id: string
  patient: Patient
  vaccine: string
  date: string
  time: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  notes: string
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [currentTab, setCurrentTab] = useState('today')
  const [filters, setFilters] = useState({
    status: {
      confirmed: false,
      pending: false,
      completed: false,
      canceled: false
    },
    dateRange: {
      from: '',
      to: ''
    }
  })
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const {
    data: apiResponse,
    isLoading,
    refetch
  } = useListAppointmentQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: searchTerm
  })
  const {
    data: appointmentsDaily,
    isLoading: isLoadingDaily,
    refetch: refetchDaily
  } = useListAppointmentDailyQuery(searchTerm)
  const { mutate: deleteAppointment } = useDeleteAppointmentMutation()

  const mapApiToAppointment = (apiAppointment: ApiAppointment): Appointment => {
    const appointmentDate = new Date(apiAppointment.appointmentDate)
    return {
      id: apiAppointment.id,
      patient: {
        name: apiAppointment.user.name,
        avatar: apiAppointment.user.avatar || '/placeholder.svg',
        initials: apiAppointment.user.name
          .split(' ')
          .map((n: string) => n[0])
          .join(''),
        email: apiAppointment.user.email
      },
      vaccine: apiAppointment.vaccination.vaccineName,
      date: format(appointmentDate, 'yyyy-MM-dd'),
      time: format(appointmentDate, 'HH:mm'),
      status: apiAppointment.status,
      notes: apiAppointment.vaccination.description
    }
  }

  const filteredAppointments = useMemo(() => {
    if (currentTab === 'today') {
      if (!appointmentsDaily?.data) return []
      return appointmentsDaily.data.appointments.map((appointment) =>
        mapApiToAppointment(appointment as unknown as ApiAppointment)
      )
    } else {
      if (!apiResponse?.data) return []
      return apiResponse.data.map((appointment) => mapApiToAppointment(appointment as unknown as ApiAppointment))
    }
  }, [apiResponse, appointmentsDaily, currentTab])

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    try {
      const exportData = filteredAppointments.map((appointment) => ({
        ID: appointment.id,
        'Patient Name': appointment.patient.name,
        Email: appointment.patient.email,
        Vaccine: appointment.vaccine,
        Date: appointment.date,
        Status: appointment.status
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments')
      XLSX.writeFile(workbook, `appointments_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast.success('File exported successfully')
    } catch (error) {
      toast.error('Failed to export file')
    } finally {
      setIsExporting(false)
    }
  }, [filteredAppointments])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      refetch()
      refetchDaily()
      setSearchTerm('')
      setFilters({
        status: {
          confirmed: false,
          pending: false,
          completed: false,
          canceled: false
        },
        dateRange: {
          from: '',
          to: ''
        }
      })
      toast.success('Data has been refreshed')
      setIsRefreshing(false)
    }, 1000)
  }, [refetch, refetchDaily])

  const handleDeleteAppointment = useCallback(
    (appointment: Appointment) => {
      deleteAppointment(appointment.id, {
        onSuccess: () => {
          toast.success('Appointment deleted successfully')
          refetch()
          refetchDaily()
          setOpenDeleteDialog(false)
        },
        onError: () => {
          toast.error('Failed to delete appointment')
        }
      })
    },
    [deleteAppointment, refetch, refetchDaily]
  )
  const handleViewDetails = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenUpdateDialog(true)
  }, [])

  const handleAddAppointment = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenAddDialog(false)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      status: {
        confirmed: false,
        pending: false,
        completed: false,
        canceled: false
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
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
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
            <AddAppointment onAdd={handleAddAppointment} onCancel={() => setOpenAddDialog(false)} />
          </Dialog>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by name, email, vaccine...'
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
                    checked={filters.status.canceled}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, canceled: checked }
                      }))
                    }
                  >
                    Canceled
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
                {isLoadingDaily ? (
                  <div className='p-8 flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No appointments found matching the current filters.
                  </div>
                ) : (
                  <AppointmentTable
                    appointments={filteredAppointments}
                    onDeleteAppointment={handleDeleteAppointment}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='all' className='mt-4'>
            <div className='space-y-4'>
              <Card>
                <CardContent className='p-0'>
                  {isLoading ? (
                    <div className='p-8 flex justify-center items-center'>
                      <Loader2 className='h-6 w-6 animate-spin' />
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className='p-4 text-center text-muted-foreground'>
                      No appointments found matching the current filters.
                    </div>
                  ) : (
                    <AppointmentTable
                      appointments={filteredAppointments}
                      onDeleteAppointment={handleDeleteAppointment}
                      onViewDetails={handleViewDetails}
                    />
                  )}
                </CardContent>
              </Card>
              {!isLoading && filteredAppointments.length > 0 && (
                <div className='flex items-center justify-between p-2'>
                  <div className='flex-1 text-sm text-muted-foreground'>
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, apiResponse?.total || 0)} of {apiResponse?.total || 0}{' '}
                    entries
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className='flex items-center gap-1'>
                      {Array.from(
                        { length: Math.ceil((apiResponse?.total || 0) / ITEMS_PER_PAGE) },
                        (_, i) => i + 1
                      ).map((page) => (
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
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, Math.ceil((apiResponse?.total || 0) / ITEMS_PER_PAGE))
                        )
                      }
                      disabled={currentPage === Math.ceil((apiResponse?.total || 0) / ITEMS_PER_PAGE)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Appointment Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        {selectedAppointment && (
          <UpdateAppointment
            appointment={selectedAppointment}
            onUpdate={(updatedAppointment) => {
              setSelectedAppointment(updatedAppointment)
              setOpenUpdateDialog(false)
            }}
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
            <Button
              variant='destructive'
              onClick={() => {
                setSelectedAppointment(null)
                setOpenDeleteDialog(false)
              }}
              disabled={!selectedAppointment}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

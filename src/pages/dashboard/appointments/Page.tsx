import { useState, useMemo, useCallback } from 'react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'
import { Download, RefreshCw, Loader2, CalendarIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppointmentTable } from './AppointmentTable'
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
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [currentTab, setCurrentTab] = useState('today')
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
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
    search: ''
  })
  const { data: appointmentsDaily, isLoading: isLoadingDaily, refetch: refetchDaily } = useListAppointmentDailyQuery('')

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

  const handleClearFilters = useCallback(() => {
    setDateRange({
      from: undefined,
      to: undefined
    })
    setSearchTerm('')
    setCurrentPage(1)
    toast.success('Đã xóa bộ lọc')
  }, [])

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }, [])

  const handleDateRangeChange = useCallback((from: Date | undefined, to: Date | undefined) => {
    setDateRange({ from, to })
    setCurrentPage(1) // Reset to first page when changing date range
  }, [])

  const filteredAppointments = useMemo(() => {
    let appointments: Appointment[] = []

    if (currentTab === 'today') {
      if (!appointmentsDaily?.data) return []
      appointments = appointmentsDaily.data.appointments.map((appointment) =>
        mapApiToAppointment(appointment as unknown as ApiAppointment)
      )
    } else {
      if (!apiResponse?.data) return []
      appointments = apiResponse.data.map((appointment) =>
        mapApiToAppointment(appointment as unknown as ApiAppointment)
      )
    }

    // Apply search filter
    if (searchTerm) {
      appointments = appointments.filter((appointment) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          appointment.patient.name.toLowerCase().includes(searchLower) ||
          appointment.vaccine.toLowerCase().includes(searchLower) ||
          appointment.patient.email.toLowerCase().includes(searchLower)
        )
      })
    }

    // Apply date range filter
    if (dateRange.from || dateRange.to) {
      appointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(0, 0, 0, 0)

        if (dateRange.from) {
          const fromDate = new Date(dateRange.from)
          fromDate.setHours(0, 0, 0, 0)
          if (appointmentDate < fromDate) return false
        }

        if (dateRange.to) {
          const toDate = new Date(dateRange.to)
          toDate.setHours(23, 59, 59, 999)
          if (appointmentDate > toDate) return false
        }

        return true
      })
    }

    return appointments
  }, [apiResponse, appointmentsDaily, currentTab, searchTerm, dateRange])

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
      toast.success('Xuất dữ liệu thành công')
    } catch (error) {
      toast.error('Lỗi khi xuất dữ liệu')
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
      toast.success('Dữ liệu mới đã được cập nhật')
      setIsRefreshing(false)
    }, 1000)
  }, [refetch, refetchDaily])

  const handleDeleteAppointment = useCallback(
    (appointment: Appointment) => {
      deleteAppointment(appointment.id, {
        onSuccess: () => {
          toast.success('Đã xóa lịch hẹn thành công.')
          refetch()
          refetchDaily()
        },
        onError: () => {
          toast.error('Không thể xóa lịch hẹn.')
        }
      })
    },
    [deleteAppointment, refetch, refetchDaily]
  )
  const handleViewDetails = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenUpdateDialog(true)
  }, [])

  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Lịch hẹn
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi lịch hẹn trong hệ thống.</p>
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
                onChange={(e) => handleSearch(e.target.value)}
                className='w-full'
                type='search'
              />
            </div>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-2'>
                <Input
                  type='date'
                  value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                  onChange={(e) =>
                    handleDateRangeChange(e.target.value ? new Date(e.target.value) : undefined, dateRange.to)
                  }
                  className='w-[150px]'
                />
                <span className='text-muted-foreground'>đến</span>
                <Input
                  type='date'
                  value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                  onChange={(e) =>
                    handleDateRangeChange(dateRange.from, e.target.value ? new Date(e.target.value) : undefined)
                  }
                  className='w-[150px]'
                />
              </div>
            </div>
            <Button variant='outline' size='sm' onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <div className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
              <CalendarIcon className='h-4 w-4' />
              <span>{format(new Date(), 'dd/MM/yyyy')}</span>
            </div>
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
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue='today' onValueChange={setCurrentTab} className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-2'>
            <TabsTrigger value='today'>Lịch hẹn hôm nay</TabsTrigger>
            <TabsTrigger value='all'>Tất cả lịch hẹn</TabsTrigger>
          </TabsList>
          <TabsContent value='today' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isLoadingDaily ? (
                  <div className='p-8 flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin' />
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>Không tìm thấy lịch hẹn ngày hôm nay.</div>
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
                      Không tìm thấy lịch hẹn phù hợp với bộ lọc hiện tại.
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
              {!isLoading && apiResponse?.total && apiResponse.total > 0 && (
                <div className='flex items-center justify-between p-2'>
                  <div className='flex-1 text-sm text-muted-foreground'>
                    Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1} đến{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, apiResponse.total)} trong tổng số {apiResponse.total} lịch
                    hẹn
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
                      {Array.from({ length: Math.ceil(apiResponse.total / ITEMS_PER_PAGE) }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size='sm'
                            onClick={() => setCurrentPage(page)}
                            className='min-w-[2.5rem]'
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(apiResponse.total / ITEMS_PER_PAGE)))
                      }
                      disabled={currentPage === Math.ceil(apiResponse.total / ITEMS_PER_PAGE)}
                    >
                      Trang tiếp
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
    </div>
  )
}

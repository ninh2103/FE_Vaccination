import { useState, useMemo, useCallback } from 'react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'
import { Download, RefreshCw, Loader2, Search, X } from 'lucide-react'
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AppointmentTable } from './AppointmentTable'
import { UpdateAppointment } from './UpdateAppointment'
import { useListBookingQuery, useDeleteBookingQuery } from '@/queries/useBooking'
import { useListPaymentQuery } from '@/queries/useMomo'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Định nghĩa interface
interface Patient {
  name: string
  avatar: string
  initials: string
  email: string
}

interface Appointment {
  id: string
  paymentId: string | null
  orderId: string
  patient: Patient
  vaccine: string
  date: string
  time: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  notes: string
}

interface Booking {
  id: string
  appointmentDate: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'SUCCESS' | 'WAITING_PAYMENT'
  vaccinationId: string
}

interface Payment {
  id: string
  bookingId: string | null // Cập nhật để cho phép null
  user: {
    name: string
    avatar: string
    email: string
  }
}

// Hàm ánh xạ Booking và Payment sang Appointment
const mapBookingToAppointment = (booking: Booking, payment: Payment | null, vaccineName: string): Appointment => {
  const appointmentDate = new Date(booking.appointmentDate)
  // Ánh xạ status từ Booking sang Appointment
  let status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  switch (booking.status) {
    case 'SUCCESS':
      status = 'COMPLETED'
      break
    case 'WAITING_PAYMENT':
      status = 'PENDING'
      break
    case 'PENDING':
    case 'CONFIRMED':
    case 'CANCELED':
      status = booking.status
      break
    default:
      status = 'PENDING' // Giá trị mặc định nếu status không xác định
  }

  return {
    id: booking.id,
    paymentId: payment?.id ?? null,
    orderId: booking.id,
    patient: {
      name: payment?.user.name || 'Unknown',
      avatar: payment?.user.avatar || '/placeholder.svg',
      initials: payment?.user.name
        ? payment.user.name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
        : 'UN',
      email: payment?.user.email || 'N/A'
    },
    vaccine: vaccineName,
    date: format(appointmentDate, 'yyyy-MM-dd'),
    time: format(appointmentDate, 'HH:mm'),
    status: status,
    notes: ''
  }
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [currentTab, setCurrentTab] = useState('all')
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  // Query dữ liệu
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError
  } = useListBookingQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: searchTerm
  })

  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    error: paymentError
  } = useListPaymentQuery({
    page: 1,
    items_per_page: 1000,
    search: ''
  })

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBookingQuery()

  // Xử lý lỗi từ query
  if (bookingError) {
    toast.error('Lỗi khi tải danh sách booking')
  }
  if (paymentError) {
    toast.error('Lỗi khi tải danh sách payment')
  }

  const bookings = useMemo(() => bookingData?.data || [], [bookingData])
  const payments = useMemo(() => paymentData?.data || [], [paymentData])
  const totalBookings = bookingData?.total || 0

  // Tạo map để truy cập payment nhanh hơn
  const paymentMap = useMemo(() => {
    const map = new Map<string, Payment>()
    payments.forEach((payment) => {
      if (payment.bookingId) {
        // Kiểm tra bookingId không phải null
        map.set(payment.bookingId, payment)
      }
    })
    return map
  }, [payments])

  // Chuyển đổi bookings thành appointments
  const appointments = useMemo(() => {
    return bookings.map((booking) => {
      const payment = paymentMap.get(booking.id) || null
      const vaccineName = 'Unknown Vaccine' // Thay bằng logic lấy tên vaccine nếu có
      return mapBookingToAppointment(booking, payment, vaccineName)
    })
  }, [bookings, paymentMap])

  // Lọc appointments
  const filteredAppointments = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return appointments.filter((appointment) => {
      const searchLower = searchTerm.toLowerCase()
      const appointmentDate = new Date(appointment.date)
      const fromDate = dateRange.from ? new Date(dateRange.from) : null
      const toDate = dateRange.to ? new Date(dateRange.to) : null
      if (toDate) toDate.setHours(23, 59, 59, 999)

      const matchesSearch =
        appointment.orderId.toLowerCase().includes(searchLower) ||
        (appointment.paymentId && appointment.paymentId.toLowerCase().includes(searchLower)) ||
        appointment.patient.name.toLowerCase().includes(searchLower) ||
        appointment.vaccine.toLowerCase().includes(searchLower) ||
        appointment.patient.email.toLowerCase().includes(searchLower)

      const matchesDateRange = (!fromDate || appointmentDate >= fromDate) && (!toDate || appointmentDate <= toDate)

      const matchesTab =
        currentTab === 'all' ||
        (currentTab === 'today' &&
          appointmentDate.getFullYear() === today.getFullYear() &&
          appointmentDate.getMonth() === today.getMonth() &&
          appointmentDate.getDate() === today.getDate())

      return matchesSearch && matchesDateRange && matchesTab
    })
  }, [appointments, searchTerm, dateRange, currentTab])

  // Xử lý các hành động
  const handleClearFilters = useCallback(() => {
    setDateRange({ from: undefined, to: undefined })
    setSearchTerm('')
    setCurrentPage(1)
    setCurrentTab('all')
    toast.success('Đã xóa bộ lọc')
  }, [])

  const handleExport = useCallback(() => {
    setIsExporting(true)
    try {
      const exportData = filteredAppointments.map((appointment) => ({
        'Order ID': appointment.orderId,
        'Payment ID': appointment.paymentId || '-',
        'Patient Name': appointment.patient.name,
        Email: appointment.patient.email,
        Vaccine: appointment.vaccine,
        Date: appointment.date,
        Time: appointment.time,
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
      setSearchTerm('')
      setCurrentPage(1)
      setDateRange({ from: undefined, to: undefined })
      setCurrentTab('all')
      toast.success('Dữ liệu mới đã được cập nhật')
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleDeleteAppointment = useCallback(
    (appointment: Appointment) => {
      deleteBooking(appointment.id, {
        onSuccess: () => {
          toast.success('Đã xóa lịch hẹn thành công')
          setOpenDeleteDialog(false)
          setSelectedAppointment(null)
        },
        onError: (error: any) => {
          toast.error(`Lỗi khi xóa lịch hẹn: ${error.message || 'Không xác định'}`)
        }
      })
    },
    [deleteBooking]
  )

  const handleViewDetails = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenDetailsDialog(true)
  }, [])

  const handleEditAppointment = useCallback((appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenUpdateDialog(true)
  }, [])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Lịch hẹn
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi lịch hẹn trong hệ thống.</p>
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
          </div>
          <div className='flex items-center gap-2 flex-wrap'>
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
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-2'>
            <TabsTrigger value='today'>Lịch hẹn hôm nay</TabsTrigger>
            <TabsTrigger value='all'>Tất cả lịch hẹn</TabsTrigger>
          </TabsList>
          <TabsContent value='today' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isBookingLoading || isPaymentLoading ? (
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
                    onDeleteAppointment={(appointment) => {
                      setSelectedAppointment(appointment)
                      setOpenDeleteDialog(true)
                    }}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditAppointment}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {isBookingLoading || isPaymentLoading ? (
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
                    onDeleteAppointment={(appointment) => {
                      setSelectedAppointment(appointment)
                      setOpenDeleteDialog(true)
                    }}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditAppointment}
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
              {Math.min(currentPage * ITEMS_PER_PAGE, totalBookings)} trong tổng số {totalBookings} lịch hẹn
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

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        {selectedAppointment && (
          <DialogContent className='sm:max-w-[550px]'>
            <DialogHeader>
              <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
              <DialogDescription>Xem thông tin chi tiết về lịch hẹn này.</DialogDescription>
            </DialogHeader>
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
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mã đơn hàng</h4>
                  <p>#{selectedAppointment.orderId.slice(0, 8)}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mã thanh toán</h4>
                  <p>{selectedAppointment.paymentId ? `#${selectedAppointment.paymentId.slice(0, 8)}` : '-'}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                  <p>{selectedAppointment.vaccine}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Trạng thái</h4>
                  <p>{selectedAppointment.status}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Ngày</h4>
                  <p>{format(new Date(selectedAppointment.date), 'dd/MM/yyyy')}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Giờ</h4>
                  <p>{selectedAppointment.time}</p>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Ghi chú</h4>
                <p>{selectedAppointment.notes || 'Không có ghi chú'}</p>
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
        {selectedAppointment && (
          <UpdateAppointment
            appointment={selectedAppointment}
            onUpdate={(updatedAppointment: any) => {
              setSelectedAppointment(updatedAppointment)
              setOpenUpdateDialog(false)
              toast.success('Cập nhật lịch hẹn thành công')
            }}
            onCancel={() => setOpenUpdateDialog(false)}
          />
        )}
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lịch hẹn này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button
              variant='destructive'
              onClick={() => {
                if (selectedAppointment) {
                  handleDeleteAppointment(selectedAppointment)
                }
              }}
              disabled={!selectedAppointment || isDeleting}
            >
              {isDeleting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

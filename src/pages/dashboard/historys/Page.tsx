import { useState, useEffect, useMemo } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import {
  Calendar,
  RefreshCw,
  Search,
  Download,
  FileText,
  Printer,
  Phone,
  Clock,
  MapPin,
  User,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { format } from 'date-fns'
import { HistorysTable } from './HistorysTable'
import { useListAppointmentQuery } from '@/queries/useAppointment'
import { toast } from 'sonner'

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Vaccination {
  id: string
  patient: Patient
  vaccine: string
  date: string
  time: string
  doseNumber: number
  administeredBy: string
  location: string
  notes: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

// Constants
const ROWS_PER_PAGE = 10

const generateCertificateContent = (vaccination: Vaccination) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      .certificate { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 20px; }
      .header { text-align: center; margin-bottom: 20px; }
      .header h1 { margin: 0; color: #4f46e5; }
      .info { margin-bottom: 20px; }
      .info-row { display: flex; margin-bottom: 5px; }
      .info-label { font-weight: bold; width: 150px; }
      .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
      .seal { text-align: center; margin: 30px 0; }
      .seal div { border: 2px solid #4f46e5; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="header">
        <h1>CHỨNG NHẬN TIÊM CHỦNG</h1>
        <p>Mã chứng nhận: CERT-${vaccination.id.slice(0, 8)}-${new Date().getFullYear()}</p>
        <p>Ngày: ${format(new Date(), 'dd/MM/yyyy')}</p>
      </div>
      <div class="info">
        <h3>Thông tin khách hàng</h3>
        <div class="info-row"><div class="info-label">Tên:</div><div>${vaccination.patient.name}</div></div>
        <div class="info-row"><div class="info-label">SĐT:</div><div>${vaccination.patient.phone || ''}</div></div>
        <div class="info-row"><div class="info-label">Email:</div><div>${vaccination.patient.email || ''}</div></div>
      </div>
      <div class="info">
        <h3>Thông tin tiêm chủng</h3>
        <div class="info-row"><div class="info-label">Vaccine:</div><div>${vaccination.vaccine}</div></div>
        <div class="info-row"><div class="info-label">Số liều:</div><div>${vaccination.doseNumber}</div></div>
        <div class="info-row"><div class="info-label">Ngày:</div><div>${format(new Date(vaccination.date), 'dd/MM/yyyy')}</div></div>
        <div class="info-row"><div class="info-label">Giờ:</div><div>${vaccination.time}</div></div>
        <div class="info-row"><div class="info-label">Người tiêm:</div><div>${vaccination.administeredBy}</div></div>
        <div class="info-row"><div class="info-label">Địa điểm:</div><div>${vaccination.location}</div></div>
      </div>
      <div class="seal">
        <p>Chữ ký</p>
        <div><span style="color: #4f46e5; font-weight: bold;">VERIFIED</span></div>
      </div>
      <div class="footer">
        <p>Chứng nhận này xác nhận rằng khách hàng đã nhận tiêm chủng được chỉ định.</p>
        <p>Để biết thêm thông tin, vui lòng liên hệ: 1900 1900</p>
      </div>
    </div>
    <script>window.onload = function() { window.print(); }</script>
  </body>
  </html>
`

const generateInvoicePDF = (vaccination: Vaccination) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  pdf.setFontSize(16).setFont('times', 'bold').text(`CHỨNG NHẬN TIÊM CHỦNG`, 105, 20, { align: 'center' })
  pdf
    .setFontSize(12)
    .setFont('times', 'normal')
    .text(`Mã chứng nhận: CERT-${vaccination.id.slice(0, 8)}-${new Date().getFullYear()}`, 105, 30, { align: 'center' })
    .text(`Ngày: ${format(new Date(), 'dd/MM/yyyy')}`, 105, 38, { align: 'center' })

  pdf.setFontSize(14).setFont('times', 'bold').text('Thông tin khách hàng', 20, 55)
  pdf
    .setFontSize(12)
    .setFont('times', 'normal')
    .text(`Tên: ${vaccination.patient.name}`, 20, 65)
    .text(`Email: ${vaccination.patient.email || ''}`, 20, 81)
    .text(`SĐT: ${vaccination.patient.phone || ''}`, 20, 97)

  pdf.setFontSize(14).setFont('times', 'bold').text('Thông tin tiêm chủng', 20, 95)
  pdf
    .setFontSize(12)
    .setFont('times', 'normal')
    .text(`Vaccine: ${vaccination.vaccine}`, 20, 105)
    .text(`Dose Number: ${vaccination.doseNumber}`, 20, 113)
    .text(`Date: ${format(new Date(vaccination.date), 'dd/MM/yyyy')}`, 20, 121)
    .text(`Time: ${vaccination.time}`, 20, 129)
    .text(`Administered By: ${vaccination.administeredBy}`, 20, 137)
    .text(`Location: ${vaccination.location}`, 20, 145)

  pdf
    .setFontSize(10)
    .setTextColor(100)
    .text('Chứng nhận xác nhận dịch vụ tiêm chủng đã cung cấp.', 105, 260, { align: 'center' })
    .text('Để biết thêm thông tin, vui lòng liên hệ: 1900 1234', 105, 268, { align: 'center' })

  pdf.setDrawColor(79, 70, 229).setLineWidth(1).circle(105, 200, 20)
  pdf.setFontSize(12).setTextColor(79, 70, 229).text('VERIFIED', 105, 203, { align: 'center' })

  pdf.save(`vaccination_certificate_${vaccination.patient.name}_${format(new Date(), 'yyyyMMdd')}.pdf`)
}

// Sample data

export default function HistorysPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const {
    data: apiResponse,
    refetch,
    isLoading
  } = useListAppointmentQuery({
    items_per_page: 1000,
    page: 1,
    search: ''
  })

  // Filter vaccinations based on search and filters
  const filteredVaccinations = useMemo(() => {
    if (!apiResponse?.data) return []

    return apiResponse.data
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate)
        const isCompleted = appointment.status === 'COMPLETED'

        // Search by username or vaccine name
        const matchesSearch = searchTerm
          ? appointment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.vaccination.vaccineName.toLowerCase().includes(searchTerm.toLowerCase())
          : true

        // Date range filter
        const isInDateRange = (() => {
          if (!dateRange.from && !dateRange.to) return true

          const appointmentDateOnly = new Date(appointmentDate)
          appointmentDateOnly.setHours(0, 0, 0, 0)

          if (dateRange.from) {
            const fromDate = new Date(dateRange.from)
            fromDate.setHours(0, 0, 0, 0)
            if (appointmentDateOnly < fromDate) return false
          }

          if (dateRange.to) {
            const toDate = new Date(dateRange.to)
            toDate.setHours(23, 59, 59, 999)
            if (appointmentDateOnly > toDate) return false
          }

          return true
        })()

        return isCompleted && matchesSearch && isInDateRange
      })
      .map((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate)
        return {
          id: appointment.id,
          patient: {
            name: appointment.user.name,
            avatar: appointment.user.avatar || '/placeholder.svg',
            initials: appointment.user.name
              .split(' ')
              .map((n: string) => n[0])
              .join(''),
            phone: appointment.user.email,
            email: appointment.user.email
          },
          vaccine: appointment.vaccination.vaccineName,
          date: format(appointmentDate, 'yyyy-MM-dd'),
          time: format(appointmentDate, 'HH:mm'),
          doseNumber: 1,
          administeredBy: appointment.user.name,
          location: appointment.vaccination.location,
          notes: appointment.vaccination.description,
          status: appointment.status
        }
      })
  }, [apiResponse, dateRange, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredVaccinations.length / ROWS_PER_PAGE)
  const paginatedVaccinations = filteredVaccinations.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ROWS_PER_PAGE - 1, filteredVaccinations.length)
  const totalItems = filteredVaccinations.length

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, dateRange.from, dateRange.to])

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSearchTerm('')
      setDateRange({ from: undefined, to: undefined })
      setCurrentPage(1)
      refetch()
      toast.success('Dữ liệu mới đã được cập nhật')
      setIsRefreshing(false)
    }, 1000)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setDateRange({ from: undefined, to: undefined })
    setSearchTerm('')
    setCurrentPage(1)
    refetch()
    toast.success('Đã xóa bộ lọc')
  }

  // Handle export to Excel
  const handleExport = () => {
    const exportData = filteredVaccinations.map((vaccination, index) => ({
      'No.': index + 1,
      'Patient Name': vaccination.patient.name,
      'Phone Number': vaccination.patient.phone,
      Email: vaccination.patient.email,
      Vaccine: vaccination.vaccine,
      Date: vaccination.date,
      Time: vaccination.time,
      'Dose Number': vaccination.doseNumber,
      'Administered By': vaccination.administeredBy,
      Location: vaccination.location,
      Notes: vaccination.notes
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lịch sử tiêm chủng')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `lịch_sử_tiêm_chủng_${format(new Date(), 'yyyyMMdd')}.xlsx`)
  }

  // Handle print certificate
  const handlePrintCertificate = (vaccination: Vaccination) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.open()
    printWindow.document.write(generateCertificateContent(vaccination))
    printWindow.document.close()
  }

  // Handle download invoice
  const handleDownloadInvoice = (vaccination: Vaccination) => {
    generateInvoicePDF(vaccination)
  }

  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Lịch sử tiêm chủng
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi lịch sử tiêm chủng trong hệ thống.</p>
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
                  setCurrentPage(1)
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
            <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
              <Download className='mr-2 h-4 w-4' />
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
          </div>
        </div>

        {/* Vaccination history table */}
        <Card>
          <CardContent className='p-0'>
            {isLoading ? (
              <div className='p-8 flex justify-center items-center'>
                <Loader2 className='h-6 w-6 animate-spin' />
              </div>
            ) : paginatedVaccinations.length === 0 ? (
              <div className='p-4 text-center text-muted-foreground'>
                Không tìm thấy lịch sử tiêm chủng phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              <HistorysTable
                vaccinations={paginatedVaccinations}
                currentPage={currentPage}
                rowsPerPage={ROWS_PER_PAGE}
                onPrintCertificate={handlePrintCertificate}
                onDownloadInvoice={handleDownloadInvoice}
                onViewDetails={(vaccination) => {
                  setSelectedVaccination(vaccination)
                  setOpenDetailsDialog(true)
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {startIndex} đến {endIndex} trong tổng số {totalItems} lịch sử tiêm chủng
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Vaccination details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết tiêm chủng</DialogTitle>
            <DialogDescription>Xem thông tin chi tiết về lịch sử tiêm chủng này.</DialogDescription>
          </DialogHeader>
          {selectedVaccination && (
            <div className='grid gap-4 py-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={selectedVaccination.patient.avatar} alt={selectedVaccination.patient.name} />
                  <AvatarFallback>{selectedVaccination.patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-medium'>{selectedVaccination.patient.name}</h3>
                  <p className='text-sm text-muted-foreground'>{selectedVaccination.patient.email}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                  <p>{selectedVaccination.vaccine}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Số liều</h4>
                  <p>{selectedVaccination.doseNumber}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Ngày</h4>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <p>{format(new Date(selectedVaccination.date), 'MM/dd/yyyy')}</p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Giờ</h4>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.time}</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Người tiêm</h4>
                  <div className='flex items-center gap-1'>
                    <User className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.administeredBy}</p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Địa điểm</h4>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Ghi chú</h4>
                <p>{selectedVaccination.notes}</p>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Thông tin liên hệ</h4>
                <p className='text-sm flex items-center gap-1'>
                  <Phone className='h-3 w-3' /> {selectedVaccination.patient.phone}
                </p>
                <p className='text-sm'>{selectedVaccination.patient.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Đóng
            </Button>
            <Button onClick={() => selectedVaccination && handlePrintCertificate(selectedVaccination)}>
              <FileText className='mr-2 h-4 w-4' />
              In chứng nhận
            </Button>
            <Button onClick={() => selectedVaccination && handleDownloadInvoice(selectedVaccination)}>
              <Printer className='mr-2 h-4 w-4' />
              Tải chứng nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
import { useState, useEffect, useMemo } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import {
  Filter,
  Calendar,
  RefreshCw,
  Search,
  Download,
  FileText,
  Printer,
  Phone,
  Clock,
  MapPin,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { HistorysTable } from './HistorysTable'

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Vaccination {
  id: number
  patient: Patient
  vaccine: string
  date: string
  time: string
  doseNumber: number
  administeredBy: string
  location: string
  notes: string
}

// Constants
const ROWS_PER_PAGE = 10
const DOCTORS = ['All Doctors', 'Dr. Tran Van Binh', 'Nurse Nguyen Thi Cuc', 'Dr. Pham Thi Hoa']
const LOCATIONS = ['All Locations', '120 Hoang Minh Thao', 'Main Clinic']
const DOSE_NUMBERS = ['All Doses', '1', '2', '3']
const VACCINES = [
  'All Vaccines',
  'COVID-19 Vaccine',
  'Influenza Vaccine',
  'Hepatitis B Vaccine',
  'Tetanus Vaccine',
  'MMR Vaccine',
  'HPV Vaccine',
  'Pneumococcal Vaccine',
  'Varicella Vaccine',
  'Hepatitis A Vaccine',
  'Diphtheria Vaccine'
]

const generateCertificateContent = (vaccination: Vaccination) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Vaccination Certificate</title>
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
        <h1>VACCINATION CERTIFICATE</h1>
        <p>Certificate ID: CERT-${vaccination.id}-${new Date().getFullYear()}</p>
        <p>Date: ${format(new Date(), 'dd/MM/yyyy')}</p>
      </div>
      <div class="info">
        <h3>Patient Information</h3>
        <div class="info-row"><div class="info-label">Name:</div><div>${vaccination.patient.name}</div></div>
        <div class="info-row"><div class="info-label">Phone:</div><div>${vaccination.patient.phone}</div></div>
        <div class="info-row"><div class="info-label">Email:</div><div>${vaccination.patient.email}</div></div>
      </div>
      <div class="info">
        <h3>Vaccination Details</h3>
        <div class="info-row"><div class="info-label">Vaccine:</div><div>${vaccination.vaccine}</div></div>
        <div class="info-row"><div class="info-label">Dose Number:</div><div>${vaccination.doseNumber}</div></div>
        <div class="info-row"><div class="info-label">Date:</div><div>${format(new Date(vaccination.date), 'dd/MM/yyyy')}</div></div>
        <div class="info-row"><div class="info-label">Time:</div><div>${vaccination.time}</div></div>
        <div class="info-row"><div class="info-label">Administered By:</div><div>${vaccination.administeredBy}</div></div>
        <div class="info-row"><div class="info-label">Location:</div><div>${vaccination.location}</div></div>
      </div>
      <div class="seal">
        <p>Official Seal</p>
        <div><span style="color: #4f46e5; font-weight: bold;">VERIFIED</span></div>
      </div>
      <div class="footer">
        <p>This certificate confirms that the individual named above has received the specified vaccination.</p>
        <p>For inquiries, please contact: 1900 1900</p>
      </div>
    </div>
    <script>window.onload = function() { window.print(); }</script>
  </body>
  </html>
`

const generateInvoicePDF = (vaccination: Vaccination) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  doc.setFontSize(16).setFont('helvetica', 'bold').text('VACCINATION INVOICE', 105, 20, { align: 'center' })
  doc
    .setFontSize(12)
    .setFont('helvetica', 'normal')
    .text(`Invoice ID: INV-${vaccination.id}-${new Date().getFullYear()}`, 105, 30, { align: 'center' })
    .text(`Date: ${format(new Date(), 'dd/MM/yyyy')}`, 105, 38, { align: 'center' })

  doc.setFontSize(14).setFont('helvetica', 'bold').text('Patient Information', 20, 55)
  doc
    .setFontSize(12)
    .setFont('helvetica', 'normal')
    .text(`Name: ${vaccination.patient.name}`, 20, 65)
    .text(`Phone: ${vaccination.patient.phone}`, 20, 73)
    .text(`Email: ${vaccination.patient.email}`, 20, 81)

  doc.setFontSize(14).setFont('helvetica', 'bold').text('Vaccination Details', 20, 95)
  doc
    .setFontSize(12)
    .setFont('helvetica', 'normal')
    .text(`Vaccine: ${vaccination.vaccine}`, 20, 105)
    .text(`Dose Number: ${vaccination.doseNumber}`, 20, 113)
    .text(`Date: ${format(new Date(vaccination.date), 'dd/MM/yyyy')}`, 20, 121)
    .text(`Time: ${vaccination.time}`, 20, 129)
    .text(`Administered By: ${vaccination.administeredBy}`, 20, 137)
    .text(`Location: ${vaccination.location}`, 20, 145)

  doc
    .setFontSize(10)
    .setTextColor(100)
    .text('This invoice confirms the vaccination service provided.', 105, 260, { align: 'center' })
    .text('For inquiries, please contact: 1900 1234', 105, 268, { align: 'center' })

  doc.setDrawColor(79, 70, 229).setLineWidth(1).circle(105, 200, 20)
  doc.setFontSize(12).setTextColor(79, 70, 229).text('VERIFIED', 105, 203, { align: 'center' })

  doc.save(`vaccination_invoice_${vaccination.patient.name}_${format(new Date(), 'yyyyMMdd')}.pdf`)
}

// Sample data
const vaccinationHistory: Vaccination[] = [
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
    date: '2023-03-01',
    time: '09:15',
    doseNumber: 1,
    administeredBy: 'Dr. Tran Van Binh',
    location: '120 Hoang Minh Thao',
    notes: 'No adverse reactions'
  }
  // ... Add more sample data as needed
]

export default function HistorysPage1() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedDate] = useState<Date>(new Date())
  const [filters, setFilters] = useState({
    doctor: 'All Doctors',
    location: 'All Locations',
    doseNumber: 'All Doses',
    vaccine: 'All Vaccines',
    dateRange: { from: '', to: '' }
  })

  // Filter vaccinations based on search and filters
  const filteredVaccinations = useMemo(() => {
    return vaccinationHistory.filter((vaccination) => {
      const matchesSearch =
        vaccination.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccination.patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccination.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccination.administeredBy.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDoctor = filters.doctor === 'All Doctors' || vaccination.administeredBy === filters.doctor
      const matchesLocation = filters.location === 'All Locations' || vaccination.location === filters.location
      const matchesDose = filters.doseNumber === 'All Doses' || vaccination.doseNumber.toString() === filters.doseNumber
      const matchesVaccine = filters.vaccine === 'All Vaccines' || vaccination.vaccine === filters.vaccine
      const vaccinationDate = new Date(vaccination.date)
      const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null
      const matchesDateRange = (!fromDate || vaccinationDate >= fromDate) && (!toDate || vaccinationDate <= toDate)

      return matchesSearch && matchesDoctor && matchesLocation && matchesDose && matchesVaccine && matchesDateRange
    })
  }, [searchTerm, filters])

  // Pagination
  const totalPages = Math.ceil(filteredVaccinations.length / ROWS_PER_PAGE)
  const paginatedVaccinations = filteredVaccinations.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSearchTerm('')
      setFilters({
        doctor: 'All Doctors',
        location: 'All Locations',
        doseNumber: 'All Doses',
        vaccine: 'All Vaccines',
        dateRange: { from: '', to: '' }
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      doctor: 'All Doctors',
      location: 'All Locations',
      doseNumber: 'All Doses',
      vaccine: 'All Vaccines',
      dateRange: { from: '', to: '' }
    })
    setCurrentPage(1)
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccination History')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `vaccination_history_${format(new Date(), 'yyyyMMdd')}.xlsx`)
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
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Vaccination History
        </h1>
        <div className='flex items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-9 gap-1' disabled>
                <Calendar className='h-4 w-4' />
                <span>{format(selectedDate, 'MM/dd/yyyy')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <CalendarComponent mode='single' selected={selectedDate} disabled />
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
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search by name, phone, vaccine...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='pl-8 w-full'
              type='search'
            />
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
                  Filter vaccination history by doctor, location, dose number, vaccine type, and date range.
                </p>

                {/* Doctor filter */}
                <div className='mb-4'>
                  <Label className='text-sm font-medium'>Doctor</Label>
                  <Select
                    value={filters.doctor}
                    onValueChange={(value) => {
                      setFilters((prev) => ({ ...prev, doctor: value }))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className='mt-2'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCTORS.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location filter */}
                <div className='mb-4'>
                  <Label className='text-sm font-medium'>Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => {
                      setFilters((prev) => ({ ...prev, location: value }))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className='mt-2'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dose number filter */}
                <div className='mb-4'>
                  <Label className='text-sm font-medium'>Dose Number</Label>
                  <Select
                    value={filters.doseNumber}
                    onValueChange={(value) => {
                      setFilters((prev) => ({ ...prev, doseNumber: value }))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className='mt-2'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DOSE_NUMBERS.map((dose) => (
                        <SelectItem key={dose} value={dose}>
                          {dose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vaccine type filter */}
                <div className='mb-4'>
                  <Label className='text-sm font-medium'>Vaccine Type</Label>
                  <Select
                    value={filters.vaccine}
                    onValueChange={(value) => {
                      setFilters((prev) => ({ ...prev, vaccine: value }))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className='mt-2'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VACCINES.map((vaccine) => (
                        <SelectItem key={vaccine} value={vaccine}>
                          {vaccine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date range filter */}
                <div className='mb-4'>
                  <Label className='text-sm font-medium'>Date Range</Label>
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

        {/* Vaccination history table */}
        <Card>
          <CardContent className='p-0'>
            {paginatedVaccinations.length === 0 ? (
              <div className='p-4 text-center text-muted-foreground'>
                No vaccination records found matching the current filters.
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

        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-4'>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className='flex items-center px-4'>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-4'>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className='flex items-center px-4'>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Vaccination details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Vaccination Details</DialogTitle>
            <DialogDescription>View detailed information about this vaccination record.</DialogDescription>
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
                  <h4 className='text-sm font-medium text-muted-foreground'>Dose Number</h4>
                  <p>{selectedVaccination.doseNumber}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Date</h4>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <p>{format(new Date(selectedVaccination.date), 'MM/dd/yyyy')}</p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Time</h4>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.time}</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Administered By</h4>
                  <div className='flex items-center gap-1'>
                    <User className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.administeredBy}</p>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Location</h4>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedVaccination.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Notes</h4>
                <p>{selectedVaccination.notes}</p>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Contact Information</h4>
                <p className='text-sm flex items-center gap-1'>
                  <Phone className='h-3 w-3' /> {selectedVaccination.patient.phone}
                </p>
                <p className='text-sm'>{selectedVaccination.patient.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => selectedVaccination && handlePrintCertificate(selectedVaccination)}>
              <FileText className='mr-2 h-4 w-4' />
              Print Certificate
            </Button>
            <Button onClick={() => selectedVaccination && handleDownloadInvoice(selectedVaccination)}>
              <Printer className='mr-2 h-4 w-4' />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

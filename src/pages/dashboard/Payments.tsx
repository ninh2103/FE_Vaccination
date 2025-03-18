'use client'

import { useState, useMemo, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Receipt,
  QrCode,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Calendar,
  Phone,
  Printer
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
import { format } from 'date-fns'

// Định nghĩa kiểu dữ liệu
interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Payment {
  id: number
  orderCode: string
  patient: Patient
  amount: number
  date: string
  time: string
  method: string
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded'
  service: string
  transactionId?: string
  refundReason?: string
}

interface Filters {
  status: {
    completed: boolean
    pending: boolean
    failed: boolean
    refunded: boolean
  }
  method: {
    qrMomo: boolean
    cash: boolean
  }
  dateRange: {
    from: string
    to: string
  }
}

// Định nghĩa kiểu cho variant của Badge
type BadgeVariant = 'default' | 'destructive' | 'outline' | 'secondary' | null | undefined

// Sample data
const initialPayments: Payment[] = [
  {
    id: 1,
    orderCode: 'ODR010325-01',
    patient: {
      name: 'Nguyễn Văn An',
      avatar: '/placeholder.svg',
      initials: 'NVA',
      phone: '0901234567',
      email: 'an.nguyen@example.com'
    },
    amount: 500000,
    date: '2025-03-01',
    time: '10:15',
    method: 'QR Momo',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'COVID-19 Vaccine',
    transactionId: 'MOMO123456789'
  },
  {
    id: 2,
    orderCode: 'ODR020325-02',
    patient: {
      name: 'Trần Thị Bình',
      avatar: '/placeholder.svg',
      initials: 'TTB',
      phone: '0912345678',
      email: 'binh.tran@example.com'
    },
    amount: 350000,
    date: '2025-03-02',
    time: '11:30',
    method: 'Cash',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'Influenza Vaccine'
  },
  {
    id: 3,
    orderCode: 'ODR030325-03',
    patient: {
      name: 'Lê Văn Cường',
      avatar: '/placeholder.svg',
      initials: 'LVC',
      phone: '0923456789',
      email: 'cuong.le@example.com'
    },
    amount: 450000,
    date: '2025-03-03',
    time: '14:45',
    method: 'QR Momo',
    status: 'Pending', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'Tetanus Vaccine',
    transactionId: 'MOMO234567890'
  },
  {
    id: 4,
    orderCode: 'ODR040325-04',
    patient: {
      name: 'Phạm Thị Duyên',
      avatar: '/placeholder.svg',
      initials: 'PTD',
      phone: '0934567890',
      email: 'duyen.pham@example.com'
    },
    amount: 600000,
    date: '2025-03-04',
    time: '09:00',
    method: 'Cash',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'Hepatitis B Vaccine'
  },
  {
    id: 5,
    orderCode: 'ODR050325-05',
    patient: {
      name: 'Hoàng Văn Đức',
      avatar: '/placeholder.svg',
      initials: 'HVD',
      phone: '0945678901',
      email: 'duc.hoang@example.com'
    },
    amount: 500000,
    date: '2025-03-05',
    time: '13:15',
    method: 'QR Momo',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'COVID-19 Vaccine',
    transactionId: 'MOMO345678901'
  },
  {
    id: 6,
    orderCode: 'ODR060325-06',
    patient: {
      name: 'Vũ Thị Giang',
      avatar: '/placeholder.svg',
      initials: 'VTG',
      phone: '0956789012',
      email: 'giang.vu@example.com'
    },
    amount: 400000,
    date: '2025-03-06',
    time: '15:30',
    method: 'Cash',
    status: 'Failed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'MMR Vaccine'
  },
  {
    id: 7,
    orderCode: 'ODR070325-07',
    patient: {
      name: 'Đặng Văn Hải',
      avatar: '/placeholder.svg',
      initials: 'DVH',
      phone: '0967890123',
      email: 'hai.dang@example.com'
    },
    amount: 550000,
    date: '2025-03-07',
    time: '10:45',
    method: 'QR Momo',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'Pneumococcal Vaccine',
    transactionId: 'MOMO456789012'
  },
  {
    id: 8,
    orderCode: 'ODR080325-08',
    patient: {
      name: 'Lý Thị Hồng',
      avatar: '/placeholder.svg',
      initials: 'LTH',
      phone: '0978901234',
      email: 'hong.ly@example.com'
    },
    amount: 650000,
    date: '2025-03-08',
    time: '12:00',
    method: 'Cash',
    status: 'Pending', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'HPV Vaccine'
  },
  {
    id: 9,
    orderCode: 'ODR090325-09',
    patient: {
      name: 'Mai Văn Hùng',
      avatar: '/placeholder.svg',
      initials: 'MVH',
      phone: '0989012345',
      email: 'hung.mai@example.com'
    },
    amount: 350000,
    date: '2025-03-09',
    time: '16:15',
    method: 'QR Momo',
    status: 'Completed', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'Varicella Vaccine',
    transactionId: 'MOMO567890123'
  },
  {
    id: 10,
    orderCode: 'ODR100325-10',
    patient: {
      name: 'Trịnh Thị Lan',
      avatar: '/placeholder.svg',
      initials: 'TTL',
      phone: '0990123456',
      email: 'lan.trinh@example.com'
    },
    amount: 500000,
    date: '2025-03-10',
    time: '11:30',
    method: 'Cash',
    status: 'Refunded', // Đảm bảo là một trong các giá trị hợp lệ
    service: 'COVID-19 Vaccine',
    refundReason: 'Service not provided' // Đảm bảo là string, không phải undefined
  }
]
const ROWS_PER_PAGE = 10

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    status: { completed: false, pending: false, failed: false, refunded: false },
    method: { qrMomo: false, cash: false },
    dateRange: { from: '', to: '' }
  })

  // Filter payments
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.patient.phone.includes(searchTerm.toLowerCase()) ||
        payment.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.service.toLowerCase().includes(searchTerm.toLowerCase())

      const noStatusFilter =
        !filters.status.completed && !filters.status.pending && !filters.status.failed && !filters.status.refunded
      const matchesStatus =
        noStatusFilter ||
        (filters.status.completed && payment.status === 'Completed') ||
        (filters.status.pending && payment.status === 'Pending') ||
        (filters.status.failed && payment.status === 'Failed') ||
        (filters.status.refunded && payment.status === 'Refunded')

      const noMethodFilter = !filters.method.qrMomo && !filters.method.cash
      const matchesMethod =
        noMethodFilter ||
        (filters.method.qrMomo && payment.method === 'QR Momo') ||
        (filters.method.cash && payment.method === 'Cash')

      const paymentDate = new Date(payment.date)
      const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null
      const matchesDateRange = (!fromDate || paymentDate >= fromDate) && (!toDate || paymentDate <= toDate)

      return matchesSearch && matchesStatus && matchesMethod && matchesDateRange
    })
  }, [payments, searchTerm, filters])

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / ROWS_PER_PAGE)
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE
    const end = start + ROWS_PER_PAGE
    return filteredPayments.slice(start, end)
  }, [filteredPayments, currentPage])

  // Reset to page 1 when filters change or total pages change
  useEffect(() => {
    if (filteredPayments.length === 0 || currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [filteredPayments, totalPages])

  // Get status badge
  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: BadgeVariant; className?: string } } = {
      Completed: { variant: 'default', className: 'bg-green-500 text-white' },
      Pending: { variant: 'outline', className: 'bg-yellow-100 text-yellow-800' },
      Failed: { variant: 'destructive', className: 'text-white' },
      Refunded: { variant: 'default', className: 'bg-blue-500 text-white' }
    }
    const { variant = 'default', className = '' } = variants[status] || {}
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  // Get payment method icon
  const getPaymentMethodIcon = (method: string) => {
    return method === 'QR Momo' ? (
      <QrCode className='h-4 w-4 text-pink-500' />
    ) : method === 'Cash' ? (
      <DollarSign className='h-4 w-4 text-green-500' />
    ) : (
      <Receipt className='h-4 w-4 text-muted-foreground' />
    )
  }

  // Format currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

  // Handle export to Excel
  const handleExport = () => {
    const exportData = filteredPayments.map((payment, index) => ({
      'No.': index + 1,
      'Order ID': payment.orderCode,
      'Patient Name': payment.patient.name,
      'Phone Number': payment.patient.phone,
      Email: payment.patient.email,
      Amount: formatCurrency(payment.amount),
      Date: payment.date,
      Time: payment.time,
      'Payment Method': payment.method,
      Status: payment.status,
      Service: payment.service
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `payments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
  }

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setPayments([...initialPayments])
      setSearchTerm('')
      setFilters({
        status: { completed: false, pending: false, failed: false, refunded: false },
        method: { qrMomo: false, cash: false },
        dateRange: { from: '', to: '' }
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      status: { completed: false, pending: false, failed: false, refunded: false },
      method: { qrMomo: false, cash: false },
      dateRange: { from: '', to: '' }
    })
    setCurrentPage(1)
  }

  // Generate PDF content directly with jsPDF
  const generatePDF = (payment: Payment) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 15
    let y = margin

    // Add header
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('VAXBOT Vaccine Joint Stock Company', pageWidth / 2, y, { align: 'center' })
    y += 10

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Receipt #${payment.orderCode}`, pageWidth / 2, y, { align: 'center' })
    y += 5
    pdf.text(`Date: ${format(new Date(payment.date), 'dd/MM/yyyy')}`, pageWidth / 2, y, { align: 'center' })
    y += 10

    // Add line
    pdf.setLineWidth(0.5)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 10

    // Add details
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Patient Name:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(payment.patient.name, margin + 30, y)
    y += 8

    pdf.setFont('helvetica', 'bold')
    pdf.text('Service:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(payment.service, margin + 30, y)
    y += 8

    pdf.setFont('helvetica', 'bold')
    pdf.text('Time:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(payment.time, margin + 30, y)
    y += 8

    pdf.setFont('helvetica', 'bold')
    pdf.text('Payment Method:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(payment.method, margin + 30, y)
    y += 8

    pdf.setFont('helvetica', 'bold')
    pdf.text('Amount:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(formatCurrency(payment.amount), margin + 30, y)
    y += 8

    if (payment.method === 'QR Momo' && payment.transactionId) {
      pdf.setFont('helvetica', 'bold')
      pdf.text('Transaction ID:', margin, y)
      pdf.setFont('helvetica', 'normal')
      pdf.text(payment.transactionId, margin + 30, y)
      y += 8
    }

    if (payment.status === 'Refunded' && payment.refundReason) {
      pdf.setFont('helvetica', 'bold')
      pdf.text('Refund Reason:', margin, y)
      pdf.setFont('helvetica', 'normal')
      pdf.text(payment.refundReason, margin + 30, y)
      y += 8
    }

    pdf.setFont('helvetica', 'bold')
    pdf.text('Status:', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(payment.status, margin + 30, y)
    y += 10

    // Add footer
    pdf.setLineWidth(0.5)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Thank you for your payment!', pageWidth / 2, y, { align: 'center' })
    y += 5
    pdf.text(`Contact: ${payment.patient.phone}`, pageWidth / 2, y, { align: 'center' })
    y += 5
    pdf.text(`VAXBOT © ${new Date().getFullYear()}`, pageWidth / 2, y, { align: 'center' })

    return pdf
  }

  // Handle Download Receipt as PDF
  const handleDownloadReceipt = (payment: Payment | null) => {
    if (!payment) return
    const pdf = generatePDF(payment)
    pdf.save(`receipt_${payment.orderCode}.pdf`)
  }

  // Handle Print Receipt
  const handlePrintReceipt = (payment: Payment | null) => {
    if (!payment) return

    const printWindow = window.open('', '', 'width=800,height=600')
    if (!printWindow) return

    const statusClass = payment.status.toLowerCase()
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Receipt - ${payment.orderCode}</title>
        <style>
          @media print {
            body { margin: 0; padding: 20mm; font-family: Arial, sans-serif; }
            .receipt { width: 100%; max-width: 500px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; box-shadow: none; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h2 { font-size: 24px; margin: 0; }
            .header p { font-size: 16px; margin: 5px 0; }
            .details { margin-bottom: 15px; }
            .details h4 { font-size: 14px; color: #666; margin-bottom: 5px; font-weight: 600; }
            .details p { font-size: 16px; margin: 0; font-weight: 500; }
            .status-badge { padding: 5px 10px; border-radius: 12px; color: white; font-size: 14px; }
            .completed { background-color: #4CAF50; }
            .pending { background-color: #FFCA28; color: #333; }
            .failed { background-color: #F44336; }
            .refunded { background-color: #2196F3; }
            @page { margin: 20mm; }
          }
          @media screen {
            body { font-family: Arial, sans-serif; padding: 20mm; }
            .receipt { width: 100%; max-width: 500px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 20px; }
            .header h2 { font-size: 24px; margin: 0; }
            .header p { font-size: 16px; margin: 5px 0; }
            .details { margin-bottom: 15px; }
            .details h4 { font-size: 14px; color: #666; margin-bottom: 5px; font-weight: 600; }
            .details p { font-size: 16px; margin: 0; font-weight: 500; }
            .status-badge { padding: 5px 10px; border-radius: 12px; color: white; font-size: 14px; }
            .completed { background-color: #4CAF50; }
            .pending { background-color: #FFCA28; color: #333; }
            .failed { background-color: #F44336; }
            .refunded { background-color: #2196F3; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>VAXBOT Vaccine Joint Stock Company</h2>
            <p>Receipt #${payment.orderCode}</p>
            <p>Date: ${format(new Date(payment.date), 'dd/MM/yyyy')}</p>
          </div>
          <div class="details">
            <h4>Patient Name</h4>
            <p>${payment.patient.name}</p>
          </div>
          <div class="details">
            <h4>Service</h4>
            <p>${payment.service}</p>
          </div>
          <div class="details">
            <h4>Time</h4>
            <p>${payment.time}</p>
          </div>
          <div class="details">
            <h4>Payment Method</h4>
            <p>${payment.method}</p>
          </div>
          <div class="details">
            <h4>Amount</h4>
            <p>${formatCurrency(payment.amount)}</p>
          </div>
          ${
            payment.method === 'QR Momo' && payment.transactionId
              ? `<div class="details"><h4>Transaction ID</h4><p>${payment.transactionId}</p></div>`
              : ''
          }
          ${
            payment.status === 'Refunded' && payment.refundReason
              ? `<div class="details"><h4>Refund Reason</h4><p>${payment.refundReason}</p></div>`
              : ''
          }
          <div class="details">
            <h4>Status</h4>
            <span class="status-badge ${statusClass}">${payment.status}</span>
          </div>
          <div class="footer">
            <p>Thank you for your payment!</p>
            <p>Contact: ${payment.patient.phone}</p>
            <p>VAXBOT © ${new Date().getFullYear()}</p>
          </div>
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Payments
        </h1>
        <div className='flex items-center gap-2'>
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
                <p className='text-sm text-muted-foreground mb-4'>Filter payments by status, method, and date range.</p>
                {/* Status filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Payment Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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
                    checked={filters.status.failed}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, failed: checked }
                      }))
                    }
                  >
                    Failed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.refunded}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, refunded: checked }
                      }))
                    }
                  >
                    Refunded
                  </DropdownMenuCheckboxItem>
                </div>
                {/* Payment method filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Payment Method</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.method.qrMomo}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        method: { ...prev.method, qrMomo: checked }
                      }))
                    }
                  >
                    QR Momo
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.method.cash}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        method: { ...prev.method, cash: checked }
                      }))
                    }
                  >
                    Cash
                  </DropdownMenuCheckboxItem>
                </div>
                {/* Date range filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Date Range</DropdownMenuLabel>
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
            <TabsTrigger value='all'>All Payments</TabsTrigger>
            <TabsTrigger value='completed'>Completed</TabsTrigger>
            <TabsTrigger value='pending'>Pending/Failed</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedPayments.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => {
                            setSelectedPayment(payment)
                            setOpenDetailsDialog(true)
                          }}
                        >
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{payment.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {payment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(payment.date), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              {getPaymentMethodIcon(payment.method)}
                              <span>{payment.method}</span>
                            </div>
                          </TableCell>
                          <TableCell>{payment.service}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                    setSelectedPayment(payment)
                                    setOpenDetailsDialog(true)
                                  }}
                                >
                                  <Receipt className='mr-2 h-4 w-4' />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDownloadReceipt(payment)
                                  }}
                                >
                                  <Download className='mr-2 h-4 w-4' />
                                  Download Receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePrintReceipt(payment)
                                  }}
                                >
                                  <Printer className='mr-2 h-4 w-4' />
                                  Print Receipt
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
          <TabsContent value='completed' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedPayments.filter((p) => p.status === 'Completed').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No completed payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments
                        .filter((payment) => payment.status === 'Completed')
                        .map((payment, index) => (
                          <TableRow
                            key={payment.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => {
                              setSelectedPayment(payment)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                  <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium'>{payment.patient.name}</div>
                                  <div className='text-sm text-muted-foreground flex items-center'>
                                    <Phone className='h-3 w-3 mr-1' />
                                    {payment.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(new Date(payment.date), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center gap-1'>
                                {getPaymentMethodIcon(payment.method)}
                                <span>{payment.method}</span>
                              </div>
                            </TableCell>
                            <TableCell>{payment.service}</TableCell>
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
                                      setSelectedPayment(payment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Receipt className='mr-2 h-4 w-4' />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDownloadReceipt(payment)
                                    }}
                                  >
                                    <Download className='mr-2 h-4 w-4' />
                                    Download Receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handlePrintReceipt(payment)
                                    }}
                                  >
                                    <Printer className='mr-2 h-4 w-4' />
                                    Print Receipt
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
                {paginatedPayments.filter((p) => p.status === 'Pending' || p.status === 'Failed').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No pending or failed payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments
                        .filter((payment) => payment.status === 'Pending' || payment.status === 'Failed')
                        .map((payment, index) => (
                          <TableRow
                            key={payment.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => {
                              setSelectedPayment(payment)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                  <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium'>{payment.patient.name}</div>
                                  <div className='text-sm text-muted-foreground flex items-center'>
                                    <Phone className='h-3 w-3 mr-1' />
                                    {payment.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                                {format(new Date(payment.date), 'dd/MM/yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center gap-1'>
                                {getPaymentMethodIcon(payment.method)}
                                <span>{payment.method}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                      setSelectedPayment(payment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Receipt className='mr-2 h-4 w-4' />
                                    View Details
                                  </DropdownMenuItem>
                                  {payment.status === 'Pending' && (
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <QrCode className='mr-2 h-4 w-4' />
                                      Process Payment
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDownloadReceipt(payment)
                                    }}
                                  >
                                    <Download className='mr-2 h-4 w-4' />
                                    Download Receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handlePrintReceipt(payment)
                                    }}
                                  >
                                    <Printer className='mr-2 h-4 w-4' />
                                    Print Receipt
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
      {paginatedPayments.length > 0 && totalPages > 1 && (
        <div className='mb-[2rem] fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
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

      {/* Payment details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>View complete payment information.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className='grid gap-4 py-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={selectedPayment.patient.avatar} alt={selectedPayment.patient.name} />
                    <AvatarFallback>{selectedPayment.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-medium'>{selectedPayment.patient.name}</h3>
                    <p className='text-sm text-muted-foreground'>{selectedPayment.patient.email}</p>
                  </div>
                </div>
                <div>{getStatusBadge(selectedPayment.status)}</div>
              </div>

              <div className='rounded-lg border p-4'>
                <div className='flex justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Order ID</h4>
                    <p className='font-medium'>{selectedPayment.orderCode}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Service</h4>
                    <p className='font-medium'>{selectedPayment.service}</p>
                  </div>
                </div>

                <div className='mt-4 flex justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Date</h4>
                    <p>{format(new Date(selectedPayment.date), 'dd/MM/yyyy')}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Time</h4>
                    <p>{selectedPayment.time}</p>
                  </div>
                </div>

                <div className='mt-4 flex justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Method</h4>
                    <div className='flex items-center gap-1'>
                      {getPaymentMethodIcon(selectedPayment.method)}
                      <span>{selectedPayment.method}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Amount</h4>
                    <p className='text-xl font-bold'>{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                </div>

                {selectedPayment.method === 'QR Momo' && selectedPayment.transactionId && (
                  <div className='mt-4'>
                    <h4 className='text-sm font-medium text-muted-foreground'>Transaction ID</h4>
                    <p>{selectedPayment.transactionId}</p>
                  </div>
                )}

                {selectedPayment.status === 'Failed' && (
                  <div className='mt-4'>
                    <h4 className='text-sm font-medium text-muted-foreground text-red-500'>Failure Reason</h4>
                    <p className='text-red-500'>Payment processing failed</p>
                  </div>
                )}

                {selectedPayment.status === 'Refunded' && selectedPayment.refundReason && (
                  <div className='mt-4'>
                    <h4 className='text-sm font-medium text-muted-foreground text-blue-500'>Refund Reason</h4>
                    <p className='text-blue-500'>{selectedPayment.refundReason}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Contact Information</h4>
                <p className='text-sm flex items-center gap-1'>
                  <Phone className='h-3 w-3' /> {selectedPayment.patient.phone}
                </p>
                <p className='text-sm'>{selectedPayment.patient.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => handlePrintReceipt(selectedPayment)}>
              <Printer className='mr-2 h-4 w-4' />
              Print
            </Button>
            <Button variant='outline' onClick={() => handleDownloadReceipt(selectedPayment)}>
              <Download className='mr-2 h-4 w-4' />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

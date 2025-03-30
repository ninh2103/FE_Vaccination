import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import { Download, RefreshCw, X, QrCode, DollarSign, Phone, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { PaymentTable } from './PaymentTable'
import { format } from 'date-fns'

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
    status: 'Completed',
    service: 'COVID-19 Vaccine',
    transactionId: 'MOMO123456789'
  }
  // ... Add more sample payments as needed
]

export default function PaymentsPage1() {
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
  const filteredPayments = payments.filter((payment) => {
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

  // Reset to page 1 when filters change or total pages change
  useEffect(() => {
    if (filteredPayments.length === 0 || currentPage > Math.ceil(filteredPayments.length / 10)) {
      setCurrentPage(1)
    }
  }, [filteredPayments])

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

  // Generate PDF content
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

  // Handle Download Receipt as PDF
  const handleDownloadReceipt = (payment: Payment | null) => {
    if (!payment) return
    const pdf = generatePDF(payment)
    pdf.save(`receipt_${payment.orderCode}.pdf`)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Payments
          </h1>
          <p className='text-muted-foreground'>Manage and monitor payments in your system.</p>
        </div>
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
              placeholder='Search by name, phone...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full'
            />
            {searchTerm && (
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>

        {/* Alert */}
        {filteredPayments.some((p) => p.status === 'Pending' || p.status === 'Failed') && (
          <Alert variant='destructive' className='bg-red-50 border-red-200'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Payment Alert</AlertTitle>
            <AlertDescription>Some payments are pending or failed. Review and process them as needed.</AlertDescription>
          </Alert>
        )}

        {/* Payment Table */}
        <PaymentTable
          payments={filteredPayments}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onViewDetails={(payment) => {
            setSelectedPayment(payment)
            setOpenDetailsDialog(true)
          }}
          onDownloadReceipt={handleDownloadReceipt}
          onPrintReceipt={handlePrintReceipt}
        />
      </div>

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
                  <div className='h-12 w-12 rounded-full bg-muted flex items-center justify-center'>
                    <span className='text-lg font-medium'>{selectedPayment.patient.initials}</span>
                  </div>
                  <div>
                    <h3 className='font-medium'>{selectedPayment.patient.name}</h3>
                    <p className='text-sm text-muted-foreground'>{selectedPayment.patient.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPayment.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : selectedPayment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedPayment.status === 'Failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>
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
                      {selectedPayment.method === 'QR Momo' ? (
                        <QrCode className='h-4 w-4 text-pink-500' />
                      ) : (
                        <DollarSign className='h-4 w-4 text-green-500' />
                      )}
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

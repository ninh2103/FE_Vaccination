'use client'

import { MoreHorizontal, Receipt, QrCode, DollarSign, Calendar, Printer, Download, Trash, Edit } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface Payment {
  id: string
  orderId: string
  amount: number
  userId: string
  bookingId: string | null
  appointmentDate: string | null
  createdAt: string
  updatedAt: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  paymentMethod: 'MOMO' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'CASH'
  user: {
    id: string
    name: string
    email: string
    phone: string
  }
}

interface PaymentTableProps {
  payments: Payment[]
  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  onDownloadReceipt: (payment: Payment) => void
  onPrintReceipt: (payment: Payment) => void
  onEdit: (payment: Payment) => void
  onDelete: (paymentId: string) => void
  isLoading?: boolean
  total?: number
  itemsPerPage?: number
}

export function PaymentTable({
  payments,
  currentPage,
  setCurrentPage,
  onDownloadReceipt,
  onPrintReceipt,
  onEdit,
  onDelete,
  isLoading = false,
  total = 0,
  itemsPerPage = 10
}: PaymentTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: string; className?: string } } = {
      COMPLETED: { variant: 'default', className: 'bg-green-500 text-white' },
      PENDING: { variant: 'outline', className: 'bg-yellow-100 text-yellow-800' },
      FAILED: { variant: 'destructive', className: 'text-white bg-red-500' }
    }
    const { variant, className } = variants[status] || {}
    return (
      <Badge variant={variant as any} className={className}>
        {status}
      </Badge>
    )
  }

  const getPaymentMethodIcon = (method: string) => {
    if (method === 'MOMO') return <QrCode className='h-4 w-4 text-pink-500' />
    if (method === 'BANK_TRANSFER') return <DollarSign className='h-4 w-4 text-green-500' />
    return <Receipt className='h-4 w-4 text-muted-foreground' />
  }

  const renderTable = (filteredPayments: Payment[]) => {
    if (isLoading) {
      return (
        <div className='p-4 text-center'>
          <LoadingSpinner className='h-8 w-8' />
        </div>
      )
    }

    if (filteredPayments.length === 0) {
      return <div className='p-4 text-center text-muted-foreground'>Không có thanh toán nào.</div>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>STT</TableHead>
            <TableHead>Mã thanh toán</TableHead>
            <TableHead>Người dùng</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Phương thức</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment, index) => (
            <TableRow key={payment.id} className='hover:bg-muted/50'>
              <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell className='font-medium'>#{payment.id.slice(0, 8)}</TableCell>
              <TableCell
                className='px-2 truncate whitespace-nowrap max-w-[120px] font-semibold text-black hover:underline cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPayment(payment)
                }}
              >
                {payment.user.name}
              </TableCell>
              <TableCell>{formatCurrency(payment.amount)}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1'>
                  {getPaymentMethodIcon(payment.paymentMethod)}
                  <span>{payment.paymentMethod}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
              <TableCell>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation()
                      onDownloadReceipt(payment)
                    }}
                  >
                    <Download className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrintReceipt(payment)
                    }}
                  >
                    <Printer className='h-4 w-4' />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {payment.paymentMethod === 'CASH' && (
                        <DropdownMenuItem onClick={() => onEdit(payment)}>
                          <Edit className='mr-2 h-4 w-4' />
                          Sửa
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDelete(payment.id)}>
                        <Trash className='mr-2 h-4 w-4 text-red-500' />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const totalPages = Math.ceil(total / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, total)

  return (
    <div className='grid gap-6'>
      <Tabs defaultValue='all' className='w-full'>
        <TabsList className='flex w-full max-w-md grid-cols-3 justify-center gap-2 px-2'>
          <TabsTrigger value='all'>Tất cả thanh toán</TabsTrigger>
          <TabsTrigger value='completed'>Đã thanh toán</TabsTrigger>
          <TabsTrigger value='pending'>Chờ thanh toán / Thất bại</TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='mt-4'>
          <Card>
            <CardContent className='p-0'>{renderTable(payments)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='completed' className='mt-4'>
          <Card>
            <CardContent className='p-0'>{renderTable(payments.filter((p) => p.status === 'COMPLETED'))}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='pending' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              {renderTable(payments.filter((p) => p.status === 'PENDING' || p.status === 'FAILED'))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className='flex items-center justify-between text-sm text-muted-foreground px-2'>
        <div>
          Hiển thị {startIndex} đến {endIndex} / {total} thanh toán
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Trước
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size='sm'
              className='min-w-[2rem]'
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Tiếp
          </Button>
        </div>
      </div>

      {/* Chi tiết thanh toán (Dialog) */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết mã thanh toán #{selectedPayment.id.slice(0, 8)}</DialogTitle>
            </DialogHeader>
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Người dùng:</strong> {selectedPayment.user.name} ({selectedPayment.user.email})
              </p>
              <p>
                <strong>Số tiền:</strong> {formatCurrency(selectedPayment.amount)}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedPayment.status}
              </p>
              <p>
                <strong>Phương thức:</strong> {selectedPayment.paymentMethod}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {format(new Date(selectedPayment.createdAt), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

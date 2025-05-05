import { format, parseISO } from 'date-fns'
import { Edit, Trash, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

import { formatVND } from '@/core/lib/utils'

interface Booking {
  id: string
  vaccinationId: string
  userId: string
  vaccinationQuantity: number
  vaccinationPrice: number
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'SUCCESS' | 'WAITING_PAYMENT'
  vaccinationDate: string
  confirmationTime: string
  appointmentDate: string
}

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

interface OrdersTableProps {
  onDeleteOrder: (order: Booking) => void
  onViewDetails: (order: Booking) => void
  onEdit: (order: Booking) => void
  currentPage: number
  itemsPerPage: number
  bookings: Booking[]
  payments: Payment[]
  isLoading: boolean
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return <Badge className='bg-blue-500 hover:bg-blue-600'>Confirmed</Badge>
    case 'PENDING':
      return (
        <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
          Pending
        </Badge>
      )
    case 'CANCELED':
      return (
        <Badge variant='destructive' className='bg-red-500 hover:bg-red-600'>
          Canceled
        </Badge>
      )
    case 'SUCCESS':
      return <Badge className='bg-green-500 hover:bg-green-600'>Success</Badge>
    case 'WAITING_PAYMENT':
      return (
        <Badge variant='outline' className='bg-orange-100 text-orange-800'>
          Waiting Payment
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export function OrdersTable({
  onDeleteOrder,
  onViewDetails,
  onEdit,
  currentPage,
  itemsPerPage,
  bookings,
  payments,
  isLoading
}: OrdersTableProps) {
  if (isLoading) {
    return (
      <div className='p-8 flex justify-center items-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  // Map payments to bookings by bookingId
  const paymentMap = new Map<string, Payment>()
  payments.forEach((payment) => {
    if (payment.bookingId) {
      paymentMap.set(payment.bookingId, payment)
    }
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[60px]'>STT</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Mã thanh toán</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Số lượng</TableHead>
          <TableHead>Tổng tiền</TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className='text-center'>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking, index) => {
          const payment = paymentMap.get(booking.id) || null
          return (
            <TableRow key={booking.id} className='transition-colors hover:bg-muted/50'>
              <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell onClick={() => onViewDetails(booking)} className='cursor-pointer'>
                <div className='font-medium'>#{booking.id.slice(0, 8)}</div>
              </TableCell>
              <TableCell>{payment ? `#${payment.id.slice(0, 8)}` : '-'}</TableCell>
              <TableCell>{payment ? payment.user.name : '-'}</TableCell>
              <TableCell>{booking.vaccinationQuantity}</TableCell>
              <TableCell>{formatVND(booking.totalAmount)}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(parseISO(booking.appointmentDate), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell className='text-center' onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-center gap-2'>
                  <Button variant='ghost' size='icon' onClick={() => onEdit(booking)} className='h-8 w-8'>
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onDeleteOrder(booking)}
                    className='h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
import { format, parseISO } from 'date-fns'
import { Trash, Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

import { formatVND } from '@/core/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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
  user: {
    name: string
    email: string
  }
}

interface OrdersTableProps {
  onUpdateOrder: (order: Booking) => void
  onDeleteOrder: (order: Booking) => void
  onViewDetails: (order: Booking) => void
  currentPage: number
  itemsPerPage: number
  bookings: Booking[]
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
      return <Badge variant='destructive'>Canceled</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function OrdersTable({ onDeleteOrder, currentPage, itemsPerPage, bookings, isLoading }: OrdersTableProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }
  return (
    <div className='grid gap-6'>
      {bookings.length === 0 ? (
        <div className='p-4 text-center text-muted-foreground'>Không tìm thấy đơn hàng.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60px] text-center'>STT</TableHead>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className=' text-center'>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={booking.id} className='cursor-pointer hover:bg-muted/50'>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell className='font-medium'>#{booking.id.slice(0, 8)}</TableCell>
                <TableCell>
                  <div>
                    <div className='font-medium'>{booking.user.name}</div>
                    <div className='text-sm text-muted-foreground flex items-center'>
                      <Mail className='h-3 w-3 mr-1' />
                      {booking.user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.vaccinationQuantity}</TableCell>
                <TableCell>{formatVND(booking.vaccinationPrice)}</TableCell>
                <TableCell>{formatVND(booking.totalAmount)}</TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                    {format(parseISO(booking.appointmentDate), 'dd/MM/yyyy')}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <Button variant='ghost' size='icon' onClick={() => onDeleteOrder(booking)}>
                      <Trash className='h-4 w-4 text-destructive text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

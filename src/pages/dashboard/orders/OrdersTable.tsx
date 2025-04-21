import { format, parseISO } from 'date-fns'
import { Trash, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

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

interface OrdersTableProps {
  onUpdateOrder: (order: Booking) => void
  onDeleteOrder: (order: Booking) => void
  onViewDetails: (order: Booking) => void
  currentPage: number
  itemsPerPage: number
  bookings: Booking[]
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

export function OrdersTable({ onDeleteOrder, currentPage, itemsPerPage, bookings }: OrdersTableProps) {
  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>No.</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='w-[80px]'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={booking.id} className='cursor-pointer hover:bg-muted/50'>
              <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell className='font-medium'>#{booking.id.slice(0, 8)}</TableCell>
              <TableCell>{booking.vaccinationQuantity}</TableCell>
              <TableCell>{formatVND(booking.vaccinationPrice)}</TableCell>
              <TableCell>{formatVND(booking.totalAmount)}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(parseISO(booking.appointmentDate), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(parseISO(booking.appointmentDate), 'HH:mm')}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='icon' onClick={() => onDeleteOrder(booking)}>
                    <Trash className='h-4 w-4 text-destructive text-red-500' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

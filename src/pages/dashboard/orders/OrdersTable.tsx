import { format, parseISO } from 'date-fns'
import { Trash, Calendar, Mail, Clock, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'

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
    case 'SUCCESS':
      return <Badge className='bg-green-500 hover:bg-green-600'>Success</Badge>
    case 'WAITING_PAYMENT':
      return (
        <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
          Waiting Payment
        </Badge>
      )

    default:
      return <Badge>{status}</Badge>
  }
}

export function OrdersTable({ onDeleteOrder, currentPage, itemsPerPage, bookings, isLoading }: OrdersTableProps) {
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null)

  const handleViewOrder = (order: Booking) => {
    setSelectedOrder(order)
    setOpenViewDialog(true)
  }

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
              <TableRow
                key={booking.id}
                className='cursor-pointer hover:bg-muted/50'
                onClick={() => handleViewOrder(booking)}
              >
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
                  <div className='flex items-center justify-center' onClick={(e) => e.stopPropagation()}>
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

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            {selectedOrder && (
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-medium'>#{selectedOrder.id.slice(0, 8)}</h3>
                  <div className='mt-1 text-sm text-muted-foreground'>
                    Ngày tạo: {format(parseISO(selectedOrder.createdAt), 'dd/MM/yyyy HH:mm')}
                  </div>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Thông tin khách hàng</h4>
                  <div className='mt-2 space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-muted-foreground' />
                      <span>{selectedOrder.user.name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-muted-foreground' />
                      <span>{selectedOrder.user.email}</span>
                    </div>
                  </div>
                </div>

                <div className='grid gap-4 grid-cols-2'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Thông tin đơn hàng</h4>
                    <div className='mt-2 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Package className='h-4 w-4 text-muted-foreground' />
                        <span>Số lượng: {selectedOrder.vaccinationQuantity}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span>Đơn giá: {formatVND(selectedOrder.vaccinationPrice)}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span>Tổng tiền: {formatVND(selectedOrder.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Thời gian</h4>
                    <div className='mt-2 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-muted-foreground' />
                        <span>Ngày hẹn: {format(parseISO(selectedOrder.appointmentDate), 'dd/MM/yyyy')}</span>
                      </div>
                      {selectedOrder.confirmationTime && (
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-muted-foreground' />
                          <span>Xác nhận: {format(parseISO(selectedOrder.confirmationTime), 'dd/MM/yyyy HH:mm')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Trạng thái</h4>
                  <div className='mt-2'>{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenViewDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

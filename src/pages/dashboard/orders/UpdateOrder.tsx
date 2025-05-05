import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, Clock, Loader2 } from 'lucide-react'
import { useUpdateBookingAdminQuery } from '@/queries/useBooking'
import { toast } from 'sonner'
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

interface UpdateOrderProps {
  order: Booking
  onUpdate: (order: Booking) => void
  onCancel: () => void
}

export function UpdateOrder({ order, onUpdate, onCancel }: UpdateOrderProps) {
  const [status, setStatus] = useState<Booking['status']>(order.status)
  const [appointmentDate, setAppointmentDate] = useState(format(parseISO(order.appointmentDate), 'yyyy-MM-dd'))
  const [appointmentTime, setAppointmentTime] = useState(format(parseISO(order.appointmentDate), 'HH:mm'))

  const { mutate: updateBooking, isPending } = useUpdateBookingAdminQuery()

  const handleSave = () => {
    const [year, month, day] = appointmentDate.split('-').map(Number)
    const [hours, minutes] = appointmentTime.split(':').map(Number)
    const updatedAppointmentDate = new Date(year, month - 1, day, hours, minutes)

    // Chuyển đổi updatedAppointmentDate thành chuỗi ISO
    const appointmentDateString = updatedAppointmentDate.toISOString()

    const updatedOrder = {
      ...order,
      status,
      appointmentDate: appointmentDateString // Gán chuỗi ISO thay vì Date
    }

    updateBooking(
      {
        id: order.id,
        data: {
          status,
          appointmentDate: appointmentDateString // Gửi chuỗi ISO
        }
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật đơn hàng thành công')
          onUpdate(updatedOrder)
        },
        onError: () => {
          toast.error('Lỗi khi cập nhật đơn hàng')
        }
      }
    )
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Cập nhật đơn hàng</DialogTitle>
        <DialogDescription>Cập nhật chi tiết đơn hàng này.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='order-id' className='text-right'>
            Mã đơn hàng
          </Label>
          <div className='col-span-3'>
            <span>#{order.id.slice(0, 8)}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='vaccination-id' className='text-right'>
            Mã vacxin
          </Label>
          <div className='col-span-3'>
            <span>{order.vaccinationId}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='quantity' className='text-right'>
            Số lượng
          </Label>
          <div className='col-span-3'>
            <span>{order.vaccinationQuantity}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='price' className='text-right'>
            Giá
          </Label>
          <div className='col-span-3'>
            <span>{formatVND(order.vaccinationPrice)}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='total' className='text-right'>
            Tổng tiền
          </Label>
          <div className='col-span-3'>
            <span>{formatVND(order.totalAmount)}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='date' className='text-right'>
            Ngày
          </Label>
          <div className='col-span-3 flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <Input
              id='appointment-date'
              type='date'
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='time' className='text-right'>
            Giờ
          </Label>
          <div className='col-span-3 flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <Input
              id='appointment-time'
              type='time'
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='status' className='text-right'>
            Trạng thái
          </Label>
          <Select value={status} onValueChange={(value) => setStatus(value as Booking['status'])} disabled={isPending}>
            <SelectTrigger className='col-span-3'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
              <SelectItem value='CANCELED'>Canceled</SelectItem>
              <SelectItem value='SUCCESS'>Success</SelectItem>
              <SelectItem value='WAITING_PAYMENT'>Waiting Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel} disabled={isPending}>
          Hủy
        </Button>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Lưu'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

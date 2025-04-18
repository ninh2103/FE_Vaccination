import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useDetailBookingQuery } from '@/queries/useBooking'

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
  const [updatedOrder, setUpdatedOrder] = useState(order)
  const appointmentDate = parseISO(updatedOrder.appointmentDate)
  const [date, setDate] = useState(format(appointmentDate, 'yyyy-MM-dd'))
  const [time, setTime] = useState(format(appointmentDate, 'HH:mm'))

  const { data: bookingDetail } = useDetailBookingQuery(order.id)

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Update Order</DialogTitle>
        <DialogDescription>Update the booking order details.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='space-y-2'>
          <Label htmlFor='status'>Status</Label>
          <Select
            value={updatedOrder.status}
            onValueChange={(value: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'SUCCESS' | 'WAITING_PAYMENT') =>
              setUpdatedOrder((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
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
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='appointment-date'>Appointment Date</Label>
            <Input id='appointment-date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='appointment-time'>Appointment Time</Label>
            <Input id='appointment-time' type='time' value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

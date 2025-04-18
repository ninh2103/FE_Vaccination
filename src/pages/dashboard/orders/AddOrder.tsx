import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Booking {
  id: string
  vaccinationId: string
  userId: string
  vaccinationQuantity: number
  vaccinationPrice: number
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED'
  vaccinationDate: string
  confirmationTime: string
  appointmentDate: string
}

interface AddOrderProps {
  onAdd: (booking: Booking) => void
  onCancel: () => void
}

export function AddOrder({ onAdd, onCancel }: AddOrderProps) {
  const [newBooking, setNewBooking] = useState({
    vaccinationId: '',
    userId: '',
    vaccinationQuantity: 1,
    vaccinationPrice: 0,
    appointmentDate: '',
    vaccinationDate: ''
  })

  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const handleSubmit = () => {
    if (!newBooking.vaccinationId || !newBooking.userId || !newBooking.appointmentDate || !newBooking.vaccinationDate) {
      return
    }

    const date = new Date()
    const booking: Booking = {
      id: Math.random().toString(36).substring(7),
      vaccinationId: newBooking.vaccinationId,
      userId: newBooking.userId,
      vaccinationQuantity: newBooking.vaccinationQuantity,
      vaccinationPrice: newBooking.vaccinationPrice,
      totalAmount: newBooking.vaccinationQuantity * newBooking.vaccinationPrice,
      createdAt: date.toISOString(),
      status: 'PENDING',
      vaccinationDate: newBooking.vaccinationDate,
      confirmationTime: '',
      appointmentDate: newBooking.appointmentDate
    }

    onAdd(booking)
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Add New Booking</DialogTitle>
        <DialogDescription>Create a new vaccination booking.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='vaccination-id'>Vaccination ID</Label>
            <Input
              id='vaccination-id'
              value={newBooking.vaccinationId}
              onChange={(e) =>
                setNewBooking((prev) => ({
                  ...prev,
                  vaccinationId: e.target.value
                }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='user-id'>User ID</Label>
            <Input
              id='user-id'
              value={newBooking.userId}
              onChange={(e) =>
                setNewBooking((prev) => ({
                  ...prev,
                  userId: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              id='quantity'
              type='number'
              min={1}
              value={newBooking.vaccinationQuantity}
              onChange={(e) =>
                setNewBooking((prev) => ({
                  ...prev,
                  vaccinationQuantity: parseInt(e.target.value)
                }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              type='number'
              min={0}
              value={newBooking.vaccinationPrice}
              onChange={(e) =>
                setNewBooking((prev) => ({
                  ...prev,
                  vaccinationPrice: parseInt(e.target.value)
                }))
              }
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='appointment-date'>Appointment Date</Label>
          <Input
            id='appointment-date'
            type='date'
            min={tomorrow}
            value={newBooking.appointmentDate}
            onChange={(e) =>
              setNewBooking((prev) => ({
                ...prev,
                appointmentDate: e.target.value
              }))
            }
          />
          <p className='text-xs text-muted-foreground'>Only future dates are allowed for booking.</p>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='vaccination-date'>Vaccination Date</Label>
          <Input
            id='vaccination-date'
            type='date'
            min={tomorrow}
            value={newBooking.vaccinationDate}
            onChange={(e) =>
              setNewBooking((prev) => ({
                ...prev,
                vaccinationDate: e.target.value
              }))
            }
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </DialogFooter>
    </DialogContent>
  )
}

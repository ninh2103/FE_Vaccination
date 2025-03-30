import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Order {
  id: number
  patient: Patient
  vaccine: string
  requestDate: string
  preferredDate: string
  preferredTime: string
  status: string
  notes: string
  orderCode?: string
  stt?: number
  phone?: string
}

interface UpdateOrderProps {
  order: Order
  onUpdate: (order: Order) => void
  onCancel: () => void
}

export function UpdateOrder({ order, onUpdate, onCancel }: UpdateOrderProps) {
  const [updatedOrder, setUpdatedOrder] = useState(order)
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const handleSubmit = () => {
    if (
      !updatedOrder.patient.name ||
      !updatedOrder.patient.phone ||
      !updatedOrder.vaccine ||
      !updatedOrder.preferredDate ||
      !updatedOrder.preferredTime
    ) {
      return
    }

    onUpdate(updatedOrder)
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Update Order</DialogTitle>
        <DialogDescription>Update the booking order details.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='patient-name'>Patient Name</Label>
            <Input
              id='patient-name'
              value={updatedOrder.patient.name}
              onChange={(e) =>
                setUpdatedOrder((prev) => ({
                  ...prev,
                  patient: {
                    ...prev.patient,
                    name: e.target.value,
                    initials: e.target.value
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  }
                }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='patient-phone'>Phone Number</Label>
            <Input
              id='patient-phone'
              value={updatedOrder.patient.phone}
              onChange={(e) =>
                setUpdatedOrder((prev) => ({
                  ...prev,
                  patient: { ...prev.patient, phone: e.target.value }
                }))
              }
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='vaccine'>Vaccine</Label>
          <Input
            id='vaccine'
            value={updatedOrder.vaccine}
            onChange={(e) => setUpdatedOrder((prev) => ({ ...prev, vaccine: e.target.value }))}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='preferred-date'>Preferred Date</Label>
          <Input
            id='preferred-date'
            type='date'
            min={tomorrow}
            value={updatedOrder.preferredDate}
            onChange={(e) => setUpdatedOrder((prev) => ({ ...prev, preferredDate: e.target.value }))}
          />
          <p className='text-xs text-muted-foreground'>Only future dates are allowed for booking.</p>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='preferred-time'>Preferred Time</Label>
          <Select
            value={updatedOrder.preferredTime}
            onValueChange={(value) => setUpdatedOrder((prev) => ({ ...prev, preferredTime: value }))}
            disabled={!updatedOrder.preferredDate}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select time' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Morning'>Morning</SelectItem>
              <SelectItem value='Afternoon'>Afternoon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='notes'>Notes</Label>
          <Input
            id='notes'
            value={updatedOrder.notes}
            onChange={(e) => setUpdatedOrder((prev) => ({ ...prev, notes: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Update Order</Button>
      </DialogFooter>
    </DialogContent>
  )
}

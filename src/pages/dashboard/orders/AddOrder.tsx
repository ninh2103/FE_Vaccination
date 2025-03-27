'use client'

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

interface AddOrderProps {
  onAdd: (order: Order) => void
  onCancel: () => void
}

export function AddOrder({ onAdd, onCancel }: AddOrderProps) {
  const [newOrder, setNewOrder] = useState({
    patient: { name: '', phone: '', avatar: '/placeholder.svg', initials: '' },
    vaccine: '',
    preferredDate: '',
    preferredTime: 'Morning',
    notes: ''
  })

  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const handleSubmit = () => {
    if (
      !newOrder.patient.name ||
      !newOrder.patient.phone ||
      !newOrder.vaccine ||
      !newOrder.preferredDate ||
      !newOrder.preferredTime
    ) {
      return
    }

    const date = new Date()
    const order: Order = {
      id: Math.floor(Math.random() * 1000),
      patient: {
        ...newOrder.patient,
        email: `${newOrder.patient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        avatar: '/placeholder.svg',
        initials: newOrder.patient.name
          .split(' ')
          .map((n) => n[0])
          .join('')
      },
      vaccine: newOrder.vaccine,
      requestDate: format(date, 'yyyy-MM-dd'),
      preferredDate: newOrder.preferredDate,
      preferredTime: newOrder.preferredTime,
      status: 'Pending',
      notes: newOrder.notes
    }

    onAdd(order)
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogDescription>Create a new booking order.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='patient-name'>Patient Name</Label>
            <Input
              id='patient-name'
              value={newOrder.patient.name}
              onChange={(e) =>
                setNewOrder((prev) => ({
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
              value={newOrder.patient.phone}
              onChange={(e) =>
                setNewOrder((prev) => ({
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
            value={newOrder.vaccine}
            onChange={(e) => setNewOrder((prev) => ({ ...prev, vaccine: e.target.value }))}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='preferred-date'>Preferred Date</Label>
          <Input
            id='preferred-date'
            type='date'
            min={tomorrow}
            value={newOrder.preferredDate}
            onChange={(e) => setNewOrder((prev) => ({ ...prev, preferredDate: e.target.value }))}
          />
          <p className='text-xs text-muted-foreground'>Only future dates are allowed for booking.</p>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='preferred-time'>Preferred Time</Label>
          <Select
            value={newOrder.preferredTime}
            onValueChange={(value) => setNewOrder((prev) => ({ ...prev, preferredTime: value }))}
            disabled={!newOrder.preferredDate}
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
            value={newOrder.notes}
            onChange={(e) => setNewOrder((prev) => ({ ...prev, notes: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Order</Button>
      </DialogFooter>
    </DialogContent>
  )
}

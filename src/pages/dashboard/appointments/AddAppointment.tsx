import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface Patient {
  name: string
  avatar: string
  initials: string
  email: string
}

interface Appointment {
  id: string
  patient: Patient
  vaccine: string
  date: string
  time: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  notes: string
}

interface AddAppointmentProps {
  onAdd: (appointment: Appointment) => void
  onCancel: () => void
}

export function AddAppointment({ onAdd, onCancel }: AddAppointmentProps) {
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    patient: {
      name: '',
      avatar: '/placeholder.svg',
      initials: '',
      email: ''
    },
    vaccine: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    status: 'PENDING',
    notes: ''
  })

  const handleSubmit = () => {
    if (
      !newAppointment.patient.name ||
      !newAppointment.patient.email ||
      !newAppointment.vaccine ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      return
    }

    const appointment: Appointment = {
      ...newAppointment,
      id: Math.random().toString(36).substr(2, 9)
    }

    onAdd(appointment)
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogDescription>Enter details for the new appointment.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <Label htmlFor='patient-name'>Patient Name</Label>
          <Input
            id='patient-name'
            value={newAppointment.patient.name}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                patient: {
                  ...newAppointment.patient,
                  name: e.target.value,
                  initials: e.target.value
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                }
              })
            }
            placeholder='Enter patient name'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='patient-email'>Email</Label>
          <Input
            id='patient-email'
            type='email'
            value={newAppointment.patient.email}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                patient: { ...newAppointment.patient, email: e.target.value }
              })
            }
            placeholder='Enter email'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='vaccine'>Vaccine</Label>
          <Select
            value={newAppointment.vaccine}
            onValueChange={(value) => setNewAppointment({ ...newAppointment, vaccine: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select vaccine' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='COVID-19 Vaccine'>COVID-19 Vaccine</SelectItem>
              <SelectItem value='Flu Vaccine'>Flu Vaccine</SelectItem>
              <SelectItem value='Hepatitis B Vaccine'>Hepatitis B Vaccine</SelectItem>
              <SelectItem value='Tetanus Vaccine'>Tetanus Vaccine</SelectItem>
              <SelectItem value='MMR Vaccine'>MMR Vaccine</SelectItem>
              <SelectItem value='HPV Vaccine'>HPV Vaccine</SelectItem>
              <SelectItem value='Pneumococcal Vaccine'>Pneumococcal Vaccine</SelectItem>
              <SelectItem value='Varicella Vaccine'>Varicella Vaccine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='date'>Appointment Date</Label>
            <Input
              id='date'
              type='date'
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='time'>Appointment Time</Label>
            <Input
              id='time'
              type='time'
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              required
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='status'>Status</Label>
          <Select
            value={newAppointment.status}
            onValueChange={(value) =>
              setNewAppointment({
                ...newAppointment,
                status: value as 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
              <SelectItem value='COMPLETED'>Completed</SelectItem>
              <SelectItem value='CANCELED'>Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            value={newAppointment.notes}
            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
            placeholder='Enter notes'
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogFooter>
    </DialogContent>
  )
}

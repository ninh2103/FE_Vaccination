import { useState } from 'react'
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
  phone: string
  email: string
}

interface Appointment {
  id: number
  patient: Patient
  vaccine: string
  date: string
  time: string
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
  notes: string
}

interface UpdateAppointmentProps {
  appointment: Appointment
  onUpdate: (appointment: Appointment) => void
  onCancel: () => void
}

export function UpdateAppointment({ appointment, onUpdate, onCancel }: UpdateAppointmentProps) {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment)

  const handleSubmit = () => {
    if (
      !updatedAppointment.patient.name ||
      !updatedAppointment.patient.phone ||
      !updatedAppointment.vaccine ||
      !updatedAppointment.date ||
      !updatedAppointment.time
    ) {
      return
    }

    onUpdate(updatedAppointment)
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogDescription>Update appointment details.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <Label htmlFor='patient-name'>Patient Name</Label>
          <Input
            id='patient-name'
            value={updatedAppointment.patient.name}
            onChange={(e) =>
              setUpdatedAppointment({
                ...updatedAppointment,
                patient: {
                  ...updatedAppointment.patient,
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
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='patient-phone'>Phone Number</Label>
            <Input
              id='patient-phone'
              value={updatedAppointment.patient.phone}
              onChange={(e) =>
                setUpdatedAppointment({
                  ...updatedAppointment,
                  patient: { ...updatedAppointment.patient, phone: e.target.value }
                })
              }
              placeholder='Enter phone number'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='patient-email'>Email</Label>
            <Input
              id='patient-email'
              type='email'
              value={updatedAppointment.patient.email}
              onChange={(e) =>
                setUpdatedAppointment({
                  ...updatedAppointment,
                  patient: { ...updatedAppointment.patient, email: e.target.value }
                })
              }
              placeholder='Enter email'
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='vaccine'>Vaccine</Label>
          <Select
            value={updatedAppointment.vaccine}
            onValueChange={(value) => setUpdatedAppointment({ ...updatedAppointment, vaccine: value })}
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
              value={updatedAppointment.date}
              onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, date: e.target.value })}
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='time'>Appointment Time</Label>
            <Input
              id='time'
              type='time'
              value={updatedAppointment.time}
              onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, time: e.target.value })}
              required
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='status'>Status</Label>
          <Select
            value={updatedAppointment.status}
            onValueChange={(value) =>
              setUpdatedAppointment({
                ...updatedAppointment,
                status: value as 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Confirmed'>Confirmed</SelectItem>
              <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Completed'>Completed</SelectItem>
              <SelectItem value='Cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            value={updatedAppointment.notes}
            onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, notes: e.target.value })}
            placeholder='Enter notes'
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}

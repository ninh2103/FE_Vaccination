import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Clock, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateAppointmentMutation } from '@/queries/useAppointment'
import { toast } from 'sonner'

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

interface UpdateAppointmentProps {
  appointment: Appointment
  onUpdate: (updatedAppointment: Appointment) => void
  onCancel: () => void
}

export function UpdateAppointment({ appointment, onUpdate, onCancel }: UpdateAppointmentProps) {
  const [status, setStatus] = useState<Appointment['status']>(appointment.status)

  // Use isPending instead of isLoading to match newer @tanstack/react-query versions
  const { mutate: updateAppointment, isPending } = useUpdateAppointmentMutation()

  const handleSave = () => {
    updateAppointment(
      { id: appointment.id, data: { status } },
      {
        onSuccess: () => {
          toast.success('Cập nhật trạng thái lịch hẹn thành công')
          onUpdate({ ...appointment, status })
        },
        onError: () => {
          toast.error('Lỗi khi cập nhật trạng thái lịch hẹn')
        }
      }
    )
  }

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Cập nhật lịch hẹn</DialogTitle>
        <DialogDescription>Cập nhật trạng thái của lịch hẹn này.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='patient' className='text-right'>
            Bệnh nhân
          </Label>
          <div className='col-span-3 flex items-center gap-2'>
            <User className='h-4 w-4 text-muted-foreground' />
            <span>
              {appointment.patient.name} ({appointment.patient.email})
            </span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='vaccine' className='text-right'>
            Vaccine
          </Label>
          <div className='col-span-3'>
            <span>{appointment.vaccine}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='date' className='text-right'>
            Ngày
          </Label>
          <div className='col-span-3 flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span>{format(new Date(appointment.date), 'dd/MM/yyyy')}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='time' className='text-right'>
            Giờ
          </Label>
          <div className='col-span-3 flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span>{appointment.time}</span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='status' className='text-right'>
            Trạng thái
          </Label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as Appointment['status'])}
            disabled={isPending}
          >
            <SelectTrigger className='col-span-3'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
              <SelectItem value='CANCELED'>Canceled</SelectItem>
              <SelectItem value='COMPLETED'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='notes' className='text-right'>
            Ghi chú
          </Label>
          <div className='col-span-3'>
            <span>{appointment.notes || 'Không có ghi chú'}</span>
          </div>
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

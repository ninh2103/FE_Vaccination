import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useGetAppointmentByIdQuery, useUpdateAppointmentMutation } from '@/queries/useAppointment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AppointmentUpdateBodySchema, AppointmentUpdateBodyType } from '@/schemaValidator/appointment.schema'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

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
  onUpdate: (appointment: Appointment) => void
  onCancel: () => void
}

export function UpdateAppointment({ appointment, onUpdate, onCancel }: UpdateAppointmentProps) {
  const { mutate: updateAppointment, isPending: isUpdating } = useUpdateAppointmentMutation()
  const { data: appointmentData, isLoading } = useGetAppointmentByIdQuery(appointment.id)

  const form = useForm<AppointmentUpdateBodyType>({
    resolver: zodResolver(AppointmentUpdateBodySchema),
    defaultValues: {
      status: (appointmentData?.status || appointment.status) as AppointmentUpdateBodyType['status']
    }
  })

  const onSubmit = (data: AppointmentUpdateBodyType) => {
    if (!appointment?.id) return

    updateAppointment(
      { id: appointment.id, data },
      {
        onSuccess: () => {
          toast.success('Cập nhật trạng thái lịch hẹn thành công')
          // Update the local appointment with new status
          onUpdate({
            ...appointment,
            status: data.status as Appointment['status']
          })
          onCancel()
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
        <DialogTitle>Cập nhật trạng thái lịch hẹn</DialogTitle>
        <DialogDescription>Thay đổi trạng thái của lịch hẹn này.</DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        {isLoading ? (
          <div className='flex justify-center items-center p-4'>
            <Loader2 className='h-6 w-6 animate-spin' />
          </div>
        ) : (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='status'>Trạng thái</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(value) => form.setValue('status', value as AppointmentUpdateBodyType['status'])}
              >
                <SelectTrigger>{form.watch('status')}</SelectTrigger>
                <SelectContent>
                  <SelectItem value='PENDING'>PENDING</SelectItem>
                  <SelectItem value='CONFIRMED'>CONFIRMED</SelectItem>
                  <SelectItem value='COMPLETED'>COMPLETED</SelectItem>
                  <SelectItem value='CANCELED'>CANCELED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={onCancel}>
                Hủy bỏ
              </Button>
              <Button type='submit' disabled={isUpdating}>
                {isUpdating ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </>
        )}
      </form>
    </DialogContent>
  )
}

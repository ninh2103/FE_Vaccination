import { useState } from 'react'
import { format } from 'date-fns'
import { MoreHorizontal, Edit, Trash, Check, X, Calendar, Clock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

interface AppointmentTableProps {
  appointments: Appointment[]
  onDeleteAppointment: (appointment: Appointment) => void
  onViewDetails: (appointment: Appointment) => void
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
      return (
        <Badge variant='destructive' className='bg-red-500 hover:bg-red-600'>
          Canceled
        </Badge>
      )
    case 'COMPLETED':
      return <Badge className='bg-green-500 hover:bg-green-600'>Completed</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function AppointmentTable({ appointments, onDeleteAppointment, onViewDetails }: AppointmentTableProps) {
  const { mutate: updateAppointment, isPending: isUpdating } = useUpdateAppointmentMutation()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleQuickStatusUpdate = (appointment: Appointment, newStatus: Appointment['status']) => {
    setUpdatingId(appointment.id)
    updateAppointment(
      {
        id: appointment.id,
        data: { status: newStatus }
      },
      {
        onSuccess: () => {
          toast.success(`Lịch hẹn ${newStatus === 'CONFIRMED' ? 'đã được xác nhận' : 'đã bị hủy'} thành công`)
          // Update the local state without triggering the dialog
          const updatedAppointment = {
            ...appointment,
            status: newStatus
          }
          // Replace the appointment in the list
          const index = appointments.findIndex((a) => a.id === appointment.id)
          if (index !== -1) {
            appointments[index] = updatedAppointment
          }
          setUpdatingId(null)
        },
        onError: () => {
          toast.error('Cập nhật trạng thái lịch hẹn thất bại')
          setUpdatingId(null)
        }
      }
    )
  }

  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>STT</TableHead>
            <TableHead>Bệnh nhân</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Giờ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className='w-[80px]'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={appointment.id} className='cursor-pointer hover:bg-muted/50'>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                    <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium'>{appointment.patient.name}</div>
                    <div className='text-sm text-muted-foreground flex items-center'>{appointment.patient.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.vaccine}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(new Date(appointment.date), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                  {appointment.time}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  {appointment.status === 'PENDING' && (
                    <>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickStatusUpdate(appointment, 'CONFIRMED')
                        }}
                        disabled={isUpdating && updatingId === appointment.id}
                      >
                        {isUpdating && updatingId === appointment.id ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <Check className='h-4 w-4 text-green-500' />
                        )}
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickStatusUpdate(appointment, 'CANCELED')
                        }}
                        disabled={isUpdating && updatingId === appointment.id}
                      >
                        {isUpdating && updatingId === appointment.id ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <X className='h-4 w-4 text-red-500' />
                        )}
                      </Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewDetails(appointment)}>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600' onClick={() => onDeleteAppointment(appointment)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

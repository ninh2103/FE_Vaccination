import { format } from 'date-fns'
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Patient {
  name: string
  avatar: string
  initials: string
  email: string
}

interface Appointment {
  id: string
  paymentId: string | null
  orderId: string
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
  onEdit: (appointment: Appointment) => void
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

export function AppointmentTable({ appointments, onDeleteAppointment, onViewDetails, onEdit }: AppointmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[60px]'>STT</TableHead>
          <TableHead>Mã thanh toán</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Bệnh nhân</TableHead>
          <TableHead>Vaccine</TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Giờ</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className='text-center'>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow key={appointment.id} className='transition-colors hover:bg-muted/50'>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{appointment.paymentId ? `#${appointment.paymentId.slice(0, 8)}` : '-'}</TableCell>
            <TableCell>#{appointment.orderId.slice(0, 8)}</TableCell>
            <TableCell onClick={() => onViewDetails(appointment)} className='cursor-pointer'>
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
              <div className='flex items-center'>{format(new Date(appointment.date), 'dd/MM/yyyy')}</div>
            </TableCell>
            <TableCell>
              <div className='flex items-center'>{appointment.time}</div>
            </TableCell>
            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
            <TableCell className='text-center' onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center justify-center gap-2'>
                <Button variant='ghost' size='icon' onClick={() => onEdit(appointment)} className='h-8 w-8'>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => onDeleteAppointment(appointment)}
                  className='h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

import { useState } from 'react'
import { format } from 'date-fns'
import { MoreHorizontal, Edit, Trash, Check, X, Calendar, Clock, Loader2, Mail } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'

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
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null)

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setOpenViewDialog(true)
  }

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
          // The React Query cache will be automatically invalidated and refetched
          setUpdatingId(null)
        },
        onError: () => {
          toast.error('Cập nhật trạng thái lịch hẹn thất bại')
          setUpdatingId(null)
        }
      }
    )
  }

  const handleDeleteClick = (appointment: Appointment) => {
    setAppointmentToDelete(appointment)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      onDeleteAppointment(appointmentToDelete)
      setOpenDeleteDialog(false)
      setAppointmentToDelete(null)
    }
  }

  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>STT</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Giờ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className='w-[80px]'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow
              key={appointment.id}
              className='cursor-pointer hover:bg-muted/50'
              onClick={() => handleViewAppointment(appointment)}
            >
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
                <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                  {appointment.status === 'PENDING' && (
                    <>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => handleQuickStatusUpdate(appointment, 'CONFIRMED')}
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
                        onClick={() => handleQuickStatusUpdate(appointment, 'CANCELED')}
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
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewDetails(appointment)}>
                        <Edit className='mr-2 h-4 w-4' />
                        Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600' onClick={() => handleDeleteClick(appointment)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            {selectedAppointment && (
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage src={selectedAppointment.patient.avatar} alt={selectedAppointment.patient.name} />
                    <AvatarFallback>{selectedAppointment.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='text-lg font-medium'>{selectedAppointment.patient.name}</h3>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Mail className='h-4 w-4' />
                      {selectedAppointment.patient.email}
                    </div>
                  </div>
                </div>

                <div className='grid gap-4 grid-cols-2'>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                    <p className='mt-1'>{selectedAppointment.vaccine}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Trạng thái</h4>
                    <div className='mt-1'>{getStatusBadge(selectedAppointment.status)}</div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Ngày hẹn</h4>
                    <div className='mt-1 flex items-center'>
                      <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                      {format(new Date(selectedAppointment.date), 'dd/MM/yyyy')}
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-muted-foreground'>Giờ hẹn</h4>
                    <div className='mt-1 flex items-center'>
                      <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                      {selectedAppointment.time}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Ghi chú</h4>
                  <p className='mt-2 whitespace-pre-wrap'>{selectedAppointment.notes || 'Không có ghi chú'}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenViewDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lịch hẹn này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

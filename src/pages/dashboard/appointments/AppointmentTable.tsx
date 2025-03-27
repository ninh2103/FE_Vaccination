'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { MoreHorizontal, Edit, Trash, Check, X, Calendar, Clock, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
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

const ITEMS_PER_PAGE = 10

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

interface AppointmentTableProps {
  appointments: Appointment[]
  onUpdateAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (appointment: Appointment) => void
  onViewDetails: (appointment: Appointment) => void
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return <Badge className='bg-green-500 hover:bg-green-600'>Confirmed</Badge>
    case 'Pending':
      return (
        <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
          Pending
        </Badge>
      )
    case 'Cancelled':
      return <Badge variant='destructive'>Cancelled</Badge>
    case 'Completed':
      return <Badge className='bg-blue-500 hover:bg-blue-600'>Completed</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function AppointmentTable({
  appointments,
  onUpdateAppointment,
  onDeleteAppointment,
  onViewDetails
}: AppointmentTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(appointments.length / ITEMS_PER_PAGE))
  const paginatedAppointments = appointments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>No.</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='w-[80px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAppointments.map((appointment, index) => (
            <TableRow key={appointment.id} className='cursor-pointer hover:bg-muted/50'>
              <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                    <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium'>{appointment.patient.name}</div>
                    <div className='text-sm text-muted-foreground flex items-center'>
                      <Phone className='h-3 w-3 mr-1' />
                      {appointment.patient.phone}
                    </div>
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
                  {appointment.status === 'Pending' && (
                    <>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => onUpdateAppointment({ ...appointment, status: 'Confirmed' })}
                        title='Accept'
                      >
                        <Check className='h-4 w-4 text-green-500' />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => onUpdateAppointment({ ...appointment, status: 'Cancelled' })}
                        title='Reject'
                      >
                        <X className='h-4 w-4 text-red-500' />
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className='flex items-center px-4'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

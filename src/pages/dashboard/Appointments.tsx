'use client'

import { useState } from 'react'
import {
  CalendarIcon,
  Search,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns' // Thay vì "date-fns"'

// Sample data
const todayAppointments = [
  {
    id: 1,
    patient: {
      name: 'John Doe',
      avatar: '/placeholder.svg',
      initials: 'JD',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com'
    },
    vaccine: 'COVID-19 Vaccine',
    date: '2023-03-13',
    time: '09:00 AM',
    status: 'Confirmed',
    notes: 'First dose'
  },
  {
    id: 2,
    patient: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      initials: 'JS',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com'
    },
    vaccine: 'Influenza Vaccine',
    date: '2023-03-13',
    time: '10:15 AM',
    status: 'Pending',
    notes: 'Annual flu shot'
  },
  {
    id: 3,
    patient: {
      name: 'Robert Johnson',
      avatar: '/placeholder.svg',
      initials: 'RJ',
      phone: '+1 (555) 456-7890',
      email: 'robert.johnson@example.com'
    },
    vaccine: 'Tetanus Vaccine',
    date: '2023-03-13',
    time: '11:30 AM',
    status: 'Confirmed',
    notes: 'Booster shot'
  },
  {
    id: 4,
    patient: {
      name: 'Emily Wilson',
      avatar: '/placeholder.svg',
      initials: 'EW',
      phone: '+1 (555) 234-5678',
      email: 'emily.wilson@example.com'
    },
    vaccine: 'Hepatitis B Vaccine',
    date: '2023-03-13',
    time: '01:45 PM',
    status: 'Pending',
    notes: 'Second dose'
  },
  {
    id: 5,
    patient: {
      name: 'Michael Brown',
      avatar: '/placeholder.svg',
      initials: 'MB',
      phone: '+1 (555) 876-5432',
      email: 'michael.brown@example.com'
    },
    vaccine: 'COVID-19 Vaccine',
    date: '2023-03-13',
    time: '03:00 PM',
    status: 'Confirmed',
    notes: 'Second dose'
  }
]

const allAppointments = [
  ...todayAppointments,
  {
    id: 6,
    patient: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      initials: 'SJ',
      phone: '+1 (555) 345-6789',
      email: 'sarah.johnson@example.com'
    },
    vaccine: 'MMR Vaccine',
    date: '2023-03-14',
    time: '09:30 AM',
    status: 'Confirmed',
    notes: 'Routine vaccination'
  },
  {
    id: 7,
    patient: {
      name: 'David Lee',
      avatar: '/placeholder.svg',
      initials: 'DL',
      phone: '+1 (555) 567-8901',
      email: 'david.lee@example.com'
    },
    vaccine: 'Pneumococcal Vaccine',
    date: '2023-03-14',
    time: '11:00 AM',
    status: 'Pending',
    notes: 'First time'
  },
  {
    id: 8,
    patient: {
      name: 'Lisa Wang',
      avatar: '/placeholder.svg',
      initials: 'LW',
      phone: '+1 (555) 678-9012',
      email: 'lisa.wang@example.com'
    },
    vaccine: 'HPV Vaccine',
    date: '2023-03-15',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: 'First dose of three'
  },
  {
    id: 9,
    patient: {
      name: 'James Wilson',
      avatar: '/placeholder.svg',
      initials: 'JW',
      phone: '+1 (555) 789-0123',
      email: 'james.wilson@example.com'
    },
    vaccine: 'Varicella Vaccine',
    date: '2023-03-15',
    time: '02:30 PM',
    status: 'Confirmed',
    notes: 'Childhood vaccination'
  },
  {
    id: 10,
    patient: {
      name: 'Maria Garcia',
      avatar: '/placeholder.svg',
      initials: 'MG',
      phone: '+1 (555) 890-1234',
      email: 'maria.garcia@example.com'
    },
    vaccine: 'COVID-19 Vaccine',
    date: '2023-03-16',
    time: '09:15 AM',
    status: 'Pending',
    notes: 'Booster shot'
  }
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const filteredTodayAppointments = todayAppointments.filter(
    (appointment) =>
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAllAppointments = allAppointments.filter(
    (appointment) =>
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className='bg-green-500 hover:bg-green-600'>Confirmed</Badge>
      case 'Pending':
        return (
          <Badge
            variant='outline'
            className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-500'
          >
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Appointments</h1>
        <div className='flex items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-9 gap-1'>
                <CalendarIcon className='h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant='outline' size='sm' className='h-9'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          placeholder='Search appointments...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full'
          type='search'
        />
        <Button variant='outline' size='icon'>
          <Search className='h-4 w-4' />
        </Button>
      </div>

      <Tabs defaultValue='today' className='w-full'>
        <TabsList className='grid w-full max-w-md grid-cols-2'>
          <TabsTrigger value='today'>Today's Appointments</TabsTrigger>
          <TabsTrigger value='all'>All Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value='today' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className='w-[100px]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTodayAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className='cursor-pointer transition-colors hover:bg-muted/50'
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setOpenDetailsDialog(true)
                      }}
                    >
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                            <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                          </Avatar>
                          <div>{appointment.patient.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.vaccine}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className='max-w-[200px] truncate'>{appointment.notes}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button variant='outline' size='icon' className='h-8 w-8'>
                            <Check className='h-4 w-4 text-green-500' />
                          </Button>
                          <Button variant='outline' size='icon' className='h-8 w-8'>
                            <X className='h-4 w-4 text-red-500' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='all' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='w-[80px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className='cursor-pointer transition-colors hover:bg-muted/50'
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setOpenDetailsDialog(true)
                      }}
                    >
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                            <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
                          </Avatar>
                          <div>{appointment.patient.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.vaccine}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <MoreHorizontal className='h-4 w-4' />
                              <span className='sr-only'>Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className='mr-2 h-4 w-4' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-red-600 focus:text-red-600'>
                              <Trash className='mr-2 h-4 w-4' />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Button variant='outline' size='sm'>
              <ChevronLeft className='h-4 w-4' />
              Previous
            </Button>
            <Button variant='outline' size='sm'>
              Next
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>View and manage appointment information.</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className='grid gap-4 py-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={selectedAppointment.patient.avatar} alt={selectedAppointment.patient.name} />
                  <AvatarFallback>{selectedAppointment.patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-medium'>{selectedAppointment.patient.name}</h3>
                  <p className='text-sm text-muted-foreground'>{selectedAppointment.patient.email}</p>
                </div>
                <div className='ml-auto'>{getStatusBadge(selectedAppointment.status)}</div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Date</h4>
                  <p>{selectedAppointment.date}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Time</h4>
                  <p>{selectedAppointment.time}</p>
                </div>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Vaccine</h4>
                <p>{selectedAppointment.vaccine}</p>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Notes</h4>
                <p>{selectedAppointment.notes}</p>
              </div>

              <div>
                <h4 className='text-sm font-medium text-muted-foreground'>Contact Information</h4>
                <p className='text-sm'>{selectedAppointment.patient.phone}</p>
                <p className='text-sm'>{selectedAppointment.patient.email}</p>
              </div>

              <div className='mt-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>Update Status</h4>
                <div className='mt-2'>
                  <Select defaultValue={selectedAppointment.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='confirmed'>Confirmed</SelectItem>
                      <SelectItem value='pending'>Pending</SelectItem>
                      <SelectItem value='completed'>Completed</SelectItem>
                      <SelectItem value='cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => setOpenDetailsDialog(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

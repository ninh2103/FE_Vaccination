import { format } from 'date-fns'
import { MoreHorizontal, FileText, Calendar, Phone, Clock, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Vaccination {
  id: string
  patient: Patient
  vaccine: string
  date: string
  time: string
  doseNumber: number
  administeredBy: string
  location: string
  notes: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

interface HistorysTableProps {
  vaccinations: Vaccination[]
  currentPage: number
  rowsPerPage: number
  onPrintCertificate: (vaccination: Vaccination) => void
  onDownloadInvoice: (vaccination: Vaccination) => void
  onViewDetails: (vaccination: Vaccination) => void
}
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return <Badge className='bg-green-500 hover:bg-green-600'>Completed</Badge>

    default:
      return <Badge>{status}</Badge>
  }
}

export function HistorysTable({
  vaccinations,
  currentPage,
  rowsPerPage,
  onPrintCertificate,
  onDownloadInvoice,
  onViewDetails
}: HistorysTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[60px]'>No.</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Vaccine</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Dose</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='w-[80px]'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vaccinations.map((vaccination, index) => (
          <TableRow
            key={vaccination.id}
            className='cursor-pointer transition-colors hover:bg-muted/50'
            onClick={() => onViewDetails(vaccination)}
          >
            <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={vaccination.patient.avatar} alt={vaccination.patient.name} />
                  <AvatarFallback>{vaccination.patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-medium'>{vaccination.patient.name}</div>
                  <div className='text-sm text-muted-foreground flex items-center'>
                    <Phone className='h-3 w-3 mr-1' />
                    {vaccination.patient.phone}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{vaccination.vaccine}</TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                {format(new Date(vaccination.date), 'MM/dd/yyyy')}
              </div>
              <div className='text-sm text-muted-foreground flex items-center'>
                <Clock className='h-3 w-3 mr-1' />
                {vaccination.time}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant='outline'>{vaccination.doseNumber}</Badge>
            </TableCell>
            <TableCell>{vaccination.location}</TableCell>
            <TableCell>{getStatusBadge(vaccination.status)}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
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
                  <DropdownMenuItem onClick={() => onPrintCertificate(vaccination)}>
                    <FileText className='mr-2 h-4 w-4' />
                    Print Certificate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownloadInvoice(vaccination)}>
                    <Printer className='mr-2 h-4 w-4' />
                    Download Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

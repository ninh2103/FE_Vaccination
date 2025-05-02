import { format } from 'date-fns'
import { Download, Printer, Calendar, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
          <TableHead className='w-[60px]'>STT</TableHead>
          <TableHead>Bệnh nhân</TableHead>
          <TableHead>Vaccine</TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Số liều</TableHead>
          <TableHead>Địa điểm</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className='text-center'>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vaccinations.map((vaccination, index) => (
          <TableRow key={vaccination.id} className='transition-colors hover:bg-muted/50'>
            <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
            <TableCell onClick={() => onViewDetails(vaccination)} className='cursor-pointer'>
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
              <Badge variant='outline' className='text-center'>
                {vaccination.doseNumber}
              </Badge>
            </TableCell>
            <TableCell>{vaccination.location}</TableCell>
            <TableCell>{getStatusBadge(vaccination.status)}</TableCell>
            <TableCell className='text-center' onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center justify-center gap-2'>
                <Button variant='ghost' size='icon' onClick={() => onPrintCertificate(vaccination)} className='h-8 w-8'>
                  <Printer className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => onDownloadInvoice(vaccination)} className='h-8 w-8'>
                  <Download className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

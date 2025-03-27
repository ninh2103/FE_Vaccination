import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Factory, MapPin, Phone, Mail, Globe, Edit, Trash } from 'lucide-react'

interface Manufacturer {
  id: number
  name: string
  logo: string
  country: string
  address: string
  phone: string
  email: string
  website: string
  status: 'Active' | 'Inactive'
  vaccines: string[]
  contactPerson: string
  established: string
  leadTime: string
  rating: number
}

interface ManufacturerTableProps {
  manufacturers: Manufacturer[]
  currentPage: number
  rowsPerPage: number
  onEdit: (manufacturer: Manufacturer) => void
  onDelete: (id: number) => void
}

const getStatusBadge = (status: string) =>
  status === 'Active' ? (
    <Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
  ) : (
    <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
      Inactive
    </Badge>
  )

const getRatingBadge = (rating: number) => {
  if (rating >= 4.5) return <Badge className='bg-green-500'>{rating.toFixed(1)}</Badge>
  if (rating >= 4.0) return <Badge className='bg-blue-500'>{rating.toFixed(1)}</Badge>
  if (rating >= 3.5) {
    return (
      <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
        {rating.toFixed(1)}
      </Badge>
    )
  }
  return <Badge variant='destructive'>{rating.toFixed(1)}</Badge>
}

export const ManufacturerTable: React.FC<ManufacturerTableProps> = ({
  manufacturers,
  currentPage,
  rowsPerPage,
  onEdit,
  onDelete
}) => {
  const handleVisitWebsite = (website: string) => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Vaccines</TableHead>
          <TableHead>Established Year</TableHead>
          <TableHead>Lead Time</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='w-[80px]'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {manufacturers.map((manufacturer, index) => (
          <TableRow key={manufacturer.id} className='cursor-pointer hover:bg-muted/50'>
            <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
            <TableCell>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                  <Factory className='h-5 w-5 text-muted-foreground' />
                </div>
                <div>
                  <div className='font-medium'>{manufacturer.name}</div>
                  <div className='text-sm text-muted-foreground'>{manufacturer.contactPerson}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-1'>
                <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                <span>{manufacturer.country}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-col'>
                <div className='flex items-center gap-1 text-sm'>
                  <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                  <span>{manufacturer.phone}</span>
                </div>
                <div className='flex items-center gap-1 text-sm'>
                  <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                  <span>{manufacturer.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {manufacturer.vaccines.map((vaccine, idx) => (
                  <Badge key={idx} variant='outline' className='bg-primary/10 text-primary'>
                    {vaccine}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{manufacturer.established || 'N/A'}</TableCell>
            <TableCell>{manufacturer.leadTime}</TableCell>
            <TableCell>{getRatingBadge(manufacturer.rating)}</TableCell>
            <TableCell>{getStatusBadge(manufacturer.status)}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => handleVisitWebsite(manufacturer.website)}
                >
                  <Globe className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => onEdit(manufacturer)}>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-red-600 hover:text-red-700'
                  onClick={() => onDelete(manufacturer.id)}
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

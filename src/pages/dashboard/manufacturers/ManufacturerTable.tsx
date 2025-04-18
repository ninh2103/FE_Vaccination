import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash, Home, MapPin, Phone } from 'lucide-react'

export interface Manufacturer {
  id: string
  name: string
  country: string
  contactInfo: string
}

interface ManufacturerTableProps {
  manufacturers: Manufacturer[]
  currentPage: number
  rowsPerPage: number
  onEdit: (manufacturer: Manufacturer) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export function ManufacturerTable({
  manufacturers,
  currentPage,
  rowsPerPage,
  onEdit,
  onDelete,
  isLoading
}: ManufacturerTableProps) {
  return (
    <div>
      {isLoading ? (
        <div className='p-4 text-center text-muted-foreground'>Loading manufacturers...</div>
      ) : manufacturers.length === 0 ? (
        <div className='p-4 text-center text-muted-foreground'>No manufacturers found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.map((manufacturer, index) => (
              <TableRow key={manufacturer.id} className='cursor-pointer hover:bg-muted/50'>
                <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                      <Home className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div>
                      <div className='font-medium'>{manufacturer.name}</div>
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
                  <div className='flex items-center gap-1 text-sm'>
                    <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                    <span>{manufacturer.contactInfo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => onEdit(manufacturer)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onDelete(manufacturer.id)}>
                      <Trash className='h-4 w-4 text-destructive text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

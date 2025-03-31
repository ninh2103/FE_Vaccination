import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'

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
}

export function ManufacturerTable({ manufacturers, onEdit, onDelete }: ManufacturerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Contact Information</TableHead>
          <TableHead className='w-[100px]'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {manufacturers.map((manufacturer) => (
          <TableRow key={manufacturer.id}>
            <TableCell className='font-medium'>{manufacturer.name}</TableCell>
            <TableCell>{manufacturer.country}</TableCell>
            <TableCell>{manufacturer.contactInfo}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon' onClick={() => onEdit(manufacturer)}>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => onDelete(manufacturer.id)}>
                  <Trash className='h-4 w-4 text-destructive' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

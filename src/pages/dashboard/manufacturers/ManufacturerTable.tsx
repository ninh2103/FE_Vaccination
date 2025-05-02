import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash, Home, MapPin, Phone } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export interface Manufacturer {
  id: string
  name: string
  country: string
  contactInfo: string
}

export interface ManufacturerTableProps {
  manufacturers: Manufacturer[]
  currentPage: number
  rowsPerPage: number
  onEdit: (manufacturer: Manufacturer) => void
  onDelete: (id: string) => void
  onView: (manufacturer: Manufacturer) => void
  isLoading: boolean
}

export function ManufacturerTable({
  manufacturers,
  currentPage,
  rowsPerPage,
  onEdit,
  onDelete,
  onView,
  isLoading
}: ManufacturerTableProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }
  return (
    <div>
      {manufacturers.length === 0 ? (
        <div className='p-4 text-center text-muted-foreground'>
          Không tìm thấy nhà sản xuất phù hợp với các bộ lọc hiện tại.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[45px]'>STT</TableHead>
              <TableHead className='w-[550px]'>Tên nhà sản xuất</TableHead>
              <TableHead className='w-[480px]' >Địa chỉ</TableHead>
              <TableHead className='w-[160px]'>Số điện thoại</TableHead>
              <TableHead className='w-[80px]'>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.map((manufacturer, index) => (
              <TableRow key={manufacturer.id}>
                <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-3 cursor-pointer' onClick={() => onView(manufacturer)}>
                    <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                      <Home className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div className='font-medium'>{manufacturer.name}</div>
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

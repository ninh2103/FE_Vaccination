import { Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Manufacturer } from '@/schemaValidator/manufacturer.schema'

interface ManufacturerTableProps {
  isLoading: boolean
  manufacturers: Manufacturer[]
  currentPage: number
  rowsPerPage: number
  onEdit: (manufacturer: Manufacturer) => void
  onDelete: (id: string) => void
  onView: (manufacturer: Manufacturer) => void
}

export function ManufacturerTable({
  isLoading,
  manufacturers,
  currentPage,
  rowsPerPage,
  onEdit,
  onDelete,
  onView
}: ManufacturerTableProps) {
  const startIndex = (currentPage - 1) * rowsPerPage

  if (isLoading) {
    return <div className='p-4 text-center text-muted-foreground'>Đang tải dữ liệu...</div>
  }

  if (manufacturers.length === 0) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        Không tìm thấy nhà sản xuất phù hợp với các bộ lọc hiện tại.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[45px]'>STT</TableHead>
          <TableHead className='w-[350px]'>Tên nhà sản xuất</TableHead>
          <TableHead className='w-[480px]'>Quốc gia</TableHead>
          <TableHead className='w-[220px]'>Số điện thoại</TableHead>
          <TableHead className='w-[80px]'>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {manufacturers.slice(startIndex, startIndex + rowsPerPage).map((manufacturer, index) => (
          <TableRow key={manufacturer.id} className='transition-colors hover:bg-muted/50'>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell onClick={() => onView(manufacturer)} className='cursor-pointer'>
              <span className='font-medium'>{manufacturer.name}</span>
            </TableCell>
            <TableCell>{manufacturer.country}</TableCell>
            <TableCell>{manufacturer.contactInfo}</TableCell>
            <TableCell className='text-center'>
              <div className='flex items-center justify-center gap-2'>
                <Button variant='ghost' size='icon' onClick={() => onEdit(manufacturer)} className='h-8 w-8'>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => onDelete(manufacturer.id)}
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

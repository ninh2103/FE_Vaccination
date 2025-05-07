import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash, Home, MapPin, Phone } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'

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
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null)

  const handleViewManufacturer = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer)
    setOpenViewDialog(true)
  }

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
        <div className='p-4 text-center text-muted-foreground'>Không tìm thấy nhà sản xuất.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên nhà sản xuất</TableHead>
              <TableHead>Quốc gia</TableHead>
              <TableHead>Thông tin liên hệ</TableHead>
              <TableHead className='w-[100px]'>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.map((manufacturer, index) => (
              <TableRow
                key={manufacturer.id}
                className='cursor-pointer hover:bg-muted/50'
                onClick={() => handleViewManufacturer(manufacturer)}
              >
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
                  <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
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

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Xem chi tiết nhà sản xuất</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            {selectedManufacturer && (
              <div className='space-y-6'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Tên nhà sản xuất</h3>
                  <p className='text-lg font-medium'>{selectedManufacturer.name}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Quốc gia</h3>
                  <div className='flex items-center gap-1 mt-1'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedManufacturer.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Thông tin liên hệ</h3>
                  <div className='flex items-center gap-1 mt-1'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <p>{selectedManufacturer.contactInfo}</p>
                  </div>
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
    </div>
  )
}

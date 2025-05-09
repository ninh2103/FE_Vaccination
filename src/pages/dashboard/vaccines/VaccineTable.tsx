import { Edit, Trash, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import { cn } from '@/core/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useState } from 'react'

interface VaccineTableProps {
  vaccines: VaccineType[]
  currentPage: number
  itemsPerPage: number
  expandedDescriptions: Set<string>
  onToggleDescription: (vaccineId: string) => void
  onEdit: (vaccine: VaccineType) => void
  onDelete: (vaccineId: string) => void
  isLoading: boolean
}

export default function VaccineTable({
  vaccines,
  currentPage,
  itemsPerPage,
  expandedDescriptions,
  onToggleDescription,
  onEdit,
  onDelete,
  isLoading
}: VaccineTableProps) {
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineType | null>(null)

  const handleViewVaccine = (vaccine: VaccineType) => {
    setSelectedVaccine(vaccine)
    setOpenViewDialog(true)
  }

  const getStatusBadge = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge className='bg-red-500 hover:bg-red-600 text-white'>Hết hàng</Badge>
    } else if (quantity < 10) {
      return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white'>Tồn kho</Badge>
    } else {
      return <Badge className='bg-green-500 hover:bg-green-600 text-white'>Còn hàng</Badge>
    }
  }

  // Sort vaccines by createdAt date in descending order (newest first)
  const sortedVaccines = [...vaccines].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }

  return (
    <Card>
      <CardContent className='p-0'>
        {sortedVaccines.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>Không tìm thấy vaccine.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[60px]'>STT</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên vaccine</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá (VND)</TableHead>
                <TableHead>Số lô</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Hạn sử dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className='w-[80px]'>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVaccines.map((vaccine, index) => (
                <TableRow
                  key={vaccine.id}
                  className='cursor-pointer hover:bg-muted/50'
                  onClick={() => handleViewVaccine(vaccine)}
                >
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {vaccine.image ? (
                      <img
                        src={vaccine.image}
                        alt={vaccine.vaccineName}
                        className='w-12 h-12 object-cover rounded-md'
                      />
                    ) : (
                      <div className='w-12 h-12 bg-muted rounded-md flex items-center justify-center'>
                        <span className='text-xs text-muted-foreground'>Không có ảnh</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='font-medium'>{vaccine.vaccineName}</TableCell>
                  <TableCell>
                    <div className='flex items-start gap-2'>
                      <div className='max-w-[300px] flex-1'>
                        <div
                          className={cn(
                            'text-sm transition-all duration-300',
                            expandedDescriptions.has(vaccine.id) ? 'whitespace-pre-wrap' : 'line-clamp-2 max-h-[3.5rem]'
                          )}
                        >
                          {vaccine.description || 'Không có mô tả'}
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-5 w-5 mt-1'
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleDescription(vaccine.id)
                        }}
                      >
                        {expandedDescriptions.has(vaccine.id) ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{vaccine.CategoryVaccination.name || 'N/A'}</TableCell>
                  <TableCell>{vaccine.price.toLocaleString()}đ</TableCell>
                  <TableCell>{vaccine.batchNumber}</TableCell>
                  <TableCell className='text-center'>{vaccine.remainingQuantity}</TableCell>
                  <TableCell>{new Date(vaccine.expirationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(vaccine.remainingQuantity)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                      <Button variant='ghost' size='icon' onClick={() => onEdit(vaccine)}>
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' onClick={() => onDelete(vaccine.id)}>
                        <Trash className='h-4 w-4 text-destructive text-red-500' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className='sm:max-w-[800px]'>
          <DialogHeader>
            <DialogTitle>Xem chi tiết vaccine</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            {selectedVaccine && (
              <div className='space-y-6'>
                <div className='flex items-start gap-6'>
                  <div className='w-32 h-32 flex-shrink-0'>
                    {selectedVaccine.image ? (
                      <img
                        src={selectedVaccine.image}
                        alt={selectedVaccine.vaccineName}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    ) : (
                      <div className='w-full h-full bg-muted rounded-lg flex items-center justify-center'>
                        <span className='text-sm text-muted-foreground'>Không có ảnh</span>
                      </div>
                    )}
                  </div>
                  <div className='flex-1 space-y-4'>
                    <div>
                      <h3 className='text-lg font-medium'>{selectedVaccine.vaccineName}</h3>
                      <p className='text-sm text-muted-foreground'>{selectedVaccine.CategoryVaccination.name}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <h4 className='text-sm font-medium text-muted-foreground'>Giá</h4>
                        <p className='text-lg font-medium'>{selectedVaccine.price.toLocaleString()}đ</p>
                      </div>
                      <div>
                        <h4 className='text-sm font-medium text-muted-foreground'>Số lượng</h4>
                        <p className='text-lg font-medium'>{selectedVaccine.remainingQuantity}</p>
                      </div>
                      <div>
                        <h4 className='text-sm font-medium text-muted-foreground'>Số lô</h4>
                        <p>{selectedVaccine.batchNumber}</p>
                      </div>
                      <div>
                        <h4 className='text-sm font-medium text-muted-foreground'>Hạn sử dụng</h4>
                        <p>{new Date(selectedVaccine.expirationDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-muted-foreground'>Trạng thái</h4>
                      <div className='mt-1'>{getStatusBadge(selectedVaccine.remainingQuantity)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Mô tả</h4>
                  <p className='mt-2 whitespace-pre-wrap'>{selectedVaccine.description || 'Không có mô tả'}</p>
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
    </Card>
  )
}

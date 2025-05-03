import { useState } from 'react'
import { Edit, Trash, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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
  onEdit,
  onDelete,
  isLoading
}: VaccineTableProps) {
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineType | null>(null)

  const getStatusBadge = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge className='bg-red-500 hover:bg-red-600 text-white text-center'>Hết hàng</Badge>
    } else if (quantity < 10) {
      return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white text-center'>Tồn kho</Badge>
    } else {
      return <Badge className='bg-green-500 hover:bg-green-600 text-white text-center'>Còn hàng</Badge>
    }
  }

  const sortedVaccines = [...vaccines].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardContent className='p-0'>
          {sortedVaccines.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>Không tìm thấy vaccine.</div>
          ) : (
            <Table className='text-sm'>
              <TableHeader>
                <TableRow>
                  <TableHead className='px-1 w-[30px] text-center'>STT</TableHead>
                  <TableHead className='px-2 w-[50px]'>Ảnh</TableHead>
                  <TableHead className='px-2 w-[120px] whitespace-nowrap'>Tên vaccine</TableHead>
                  <TableHead className='px-2 w-[180px] whitespace-nowrap'>Mô tả</TableHead>
                  <TableHead className='px-2 w-[80px] whitespace-nowrap'>Danh mục</TableHead>
                  <TableHead className='px-2 w-[80px] whitespace-nowrap'>Giá (VND)</TableHead>
                  <TableHead className='px-2 w-[80px] whitespace-nowrap'>Số lô</TableHead>
                  <TableHead className='px-2 w-[80px] text-center whitespace-nowrap'>Số lượng</TableHead>
                  <TableHead className='px-2 w-[80px] whitespace-nowrap'>Hạn sử dụng</TableHead>
                  <TableHead className='px-2 w-[80px] whitespace-nowrap'>Trạng thái</TableHead>
                  <TableHead className='px-2 w-[60px] text-center'>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedVaccines.map((vaccine, index) => (
                  <TableRow key={vaccine.id} className='hover:bg-muted/50 text-sm'>
                    <TableCell className='px-1 text-center'>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className='px-2'>
                      {vaccine.image ? (
                        <img
                          src={vaccine.image}
                          alt={vaccine.vaccineName}
                          className='w-8 h-8 object-cover rounded-md'
                        />
                      ) : (
                        <div className='w-8 h-8 bg-muted rounded-md flex items-center justify-center'>
                          <span className='text-[10px] text-muted-foreground'>No Img</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell
                      className='px-2 truncate whitespace-nowrap max-w-[120px] font-semibold text-black hover:underline cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedVaccine(vaccine)
                      }}
                    >
                      {vaccine.vaccineName}
                    </TableCell>
                    <TableCell className='px-2 truncate whitespace-nowrap max-w-[180px]'>
                      {vaccine.description || 'Không có mô tả'}
                    </TableCell>
                    <TableCell className='px-2 w-[100px] whitespace-nowrap'>
                      {vaccine.CategoryVaccination?.name || 'N/A'}
                    </TableCell>
                    <TableCell className='px-2 w-[100px] whitespace-nowrap'>
                      {vaccine.price.toLocaleString()}đ
                    </TableCell>
                    <TableCell className='px-2 w-[100px] whitespace-nowrap'>{vaccine.batchNumber}</TableCell>
                    <TableCell className='px-2 text-center'>{vaccine.remainingQuantity}</TableCell>
                    <TableCell className='px-2 w-[100px] whitespace-nowrap'>
                      {new Date(vaccine.expirationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='px-2 w-[100px]'>{getStatusBadge(vaccine.remainingQuantity)}</TableCell>
                    <TableCell className='px-2'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem onClick={() => onEdit(vaccine)}>
                            <Edit className='mr-2 h-4 w-4' /> Sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(vaccine.id)}>
                            <Trash className='mr-2 h-4 w-4 text-red-500' /> Xoá
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog hiển thị chi tiết vaccine */}
      <Dialog open={!!selectedVaccine} onOpenChange={() => setSelectedVaccine(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin vaccine</DialogTitle>
          </DialogHeader>
          {selectedVaccine && (
            <div className='space-y-2 text-sm'>
              <div>
                <strong>Tên:</strong> {selectedVaccine.vaccineName}
              </div>
              <div>
                <strong>Mô tả:</strong> {selectedVaccine.description || 'Không có mô tả'}
              </div>
              <div>
                <strong>Danh mục:</strong> {selectedVaccine.CategoryVaccination?.name || 'N/A'}
              </div>
              <div>
                <strong>Giá:</strong> {selectedVaccine.price.toLocaleString()}đ
              </div>
              <div>
                <strong>Số lô:</strong> {selectedVaccine.batchNumber}
              </div>
              <div>
                <strong>Số lượng:</strong> {selectedVaccine.remainingQuantity}
              </div>
              <div>
                <strong>Hạn sử dụng:</strong> {new Date(selectedVaccine.expirationDate).toLocaleDateString()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

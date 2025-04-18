import { Edit, Trash, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import { cn } from '@/core/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface VaccineTableProps {
  vaccines: VaccineType[]
  currentPage: number
  itemsPerPage: number
  expandedDescriptions: Set<string>
  onToggleDescription: (vaccineId: string) => void
  onEdit: (vaccine: VaccineType) => void
  onDelete: (vaccineId: string) => void
}

export default function VaccineTable({
  vaccines,
  currentPage,
  itemsPerPage,
  expandedDescriptions,
  onToggleDescription,
  onEdit,
  onDelete
}: VaccineTableProps) {
  const getStatusBadge = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge className='bg-red-500 hover:bg-red-600 text-white'>Out</Badge>
    } else if (quantity < 10) {
      return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white'>Low</Badge>
    } else {
      return <Badge className='bg-green-500 hover:bg-green-600 text-white'>High</Badge>
    }
  }

  return (
    <Card>
      <CardContent className='p-0'>
        {vaccines.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>No vaccines found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[60px]'>No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (VND)</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='w-[80px]'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccines.map((vaccine, index) => (
                <TableRow key={vaccine.id} className='cursor-pointer hover:bg-muted/50' onClick={() => onEdit(vaccine)}>
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
                        <span className='text-xs text-muted-foreground'>No image</span>
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
                  <TableCell>{vaccine.price.toLocaleString()}</TableCell>
                  <TableCell>{vaccine.batchNumber}</TableCell>
                  <TableCell>{vaccine.remainingQuantity}</TableCell>
                  <TableCell>{new Date(vaccine.expirationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(vaccine.remainingQuantity)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(vaccine)
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(vaccine.id)
                        }}
                      >
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
    </Card>
  )
}

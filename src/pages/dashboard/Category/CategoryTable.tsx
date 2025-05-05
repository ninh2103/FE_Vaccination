import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export interface Category {
  id: string
  name: string
  description: string
}

interface CategoryTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export function CategoryTable({ categories, onEdit, onDelete, isLoading }: CategoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const handleView = (category: Category) => {
    setSelectedCategory(category)
    setIsViewOpen(true)
  }

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
          {categories.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>Không tìm thấy danh mục.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className='w-[120px] text-center'>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='font-medium'>
                      <button
                        onClick={() => handleView(category)}
                        className='font-semibold text-black hover:underline focus:outline-none'
                      >
                        {category.name}
                      </button>
                    </TableCell>
                    <TableCell>
                      {category.description.length > 100
                        ? `${category.description.substring(0, 100)}...`
                        : category.description}
                    </TableCell>
                    <TableCell className='flex items-center justify-center gap-2'>
  <Button
    variant='ghost'
    size='icon'
    onClick={() => onEdit(category)}
  >
    <Edit className='h-4 w-4' />
  </Button>
  <Button
    variant='ghost'
    size='icon'
    onClick={() => onDelete(category.id)}
  >
    <Trash className='h-4 w-4 text-red-500' />
  </Button>
</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết danh mục</DialogTitle>
          </DialogHeader>
          {selectedCategory ? (
            <div className='space-y-4'>
              <div>
                <strong>Tên:</strong> {selectedCategory.name}
              </div>
              <div>
                <strong>Mô tả:</strong> {selectedCategory.description}
              </div>
            </div>
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

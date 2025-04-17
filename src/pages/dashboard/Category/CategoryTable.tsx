import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, Edit, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export interface Category {
  id: string
  name: string
  description: string
}

interface CategoryTableProps {
  categories: Category[]
  onView: (id: string) => void
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export function CategoryTable({ categories, onView, onEdit, onDelete, isLoading }: CategoryTableProps) {
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>{category.description.substring(0, 100)}...</TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => onView(category.id)}>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onEdit(category)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onDelete(category.id)}>
                      <Trash className='h-4 w-4 text-destructive text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

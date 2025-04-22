import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category } from './CategoryTable'
import { useAddCategoryMutation } from '@/queries/useCategory'
import { CategoryBodySchema, CategoryBodyType } from '@/schemaValidator/category.schema'
import { toast } from 'sonner'

interface AddCategoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (category: Omit<Category, 'id'>) => void
}

export function AddCategory({ open, onOpenChange }: AddCategoryProps) {
  const { mutate: addCategory } = useAddCategoryMutation()

  const form = useForm<CategoryBodyType>({
    resolver: zodResolver(CategoryBodySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const handleSubmit = (data: CategoryBodyType) => {
    addCategory(data, {
      onSuccess: () => {
        toast.success('Danh mục đã được tạo thành công')
        form.reset()
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
          <DialogDescription>Tạo mới danh mục bằng cách điền vào form dưới đây.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Tên danh mục *</Label>
            <Input id='name' {...form.register('name')} placeholder='Nhập tên danh mục' className={form.formState.errors.name ? 'border-red-500' : ''} />
            {form.formState.errors.name && <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='description'>Mô tả danh mục *</Label>
            <Textarea id='description' {...form.register('description')} placeholder='Nhập mô tả danh mục' className={form.formState.errors.description ? 'border-red-500' : ''} />
            {form.formState.errors.description && (
              <p className='text-sm text-red-500'>{form.formState.errors.description.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Hủy bỏ
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Đang tạo...' : 'Tạo danh mục'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

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
import { CategoryBodyType } from '@/schemaValidator/category.schema'
import { CategoryBodySchema } from '@/schemaValidator/category.schema'
import { useUpdateCategoryMutation, useGetCategoryByIdQuery } from '@/queries/useCategory'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface UpdateCategoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string
}

export function UpdateCategory({ open, onOpenChange, id }: UpdateCategoryProps) {
  const { mutate: updateCategory } = useUpdateCategoryMutation()
  const { data: category } = useGetCategoryByIdQuery(id)

  const form = useForm<CategoryBodyType>({
    resolver: zodResolver(CategoryBodySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description
      })
    }
  }, [category, form])

  const handleSubmit = (data: CategoryBodyType) => {
    if (!category) return
    updateCategory({
      id: category.id,
      body: data
    })
    toast.success('Danh mục đã được cập nhật thành công')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Cập nhật danh mục</DialogTitle>
          <DialogDescription>Cập nhật danh mục bằng cách sửa đổi form dưới đây.</DialogDescription>
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
            <Button disabled={form.formState.isSubmitting} type='submit'>
              {form.formState.isSubmitting ? 'Đang cập nhật...' : 'Cập nhật danh mục'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

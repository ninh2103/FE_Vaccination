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
        toast.success('Category created successfully')
        form.reset()
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new category by filling out the form below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' {...form.register('name')} placeholder='Enter category name' />
            {form.formState.errors.name && <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea id='description' {...form.register('description')} placeholder='Enter category description' />
            {form.formState.errors.description && (
              <p className='text-sm text-red-500'>{form.formState.errors.description.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

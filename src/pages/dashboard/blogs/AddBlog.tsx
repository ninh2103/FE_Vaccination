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
import type { BlogPost } from './BlogTable'
import { useAddBlogMutation } from '@/queries/useBlog'
import { useListTagQuery } from '@/queries/useTag'
import { BlogBodySchema, BlogBodyType } from '@/schemaValidator/blog.schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
interface AddBlogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (post: Omit<BlogPost, 'id'>) => void
}

export function AddBlog({ open, onOpenChange }: AddBlogProps) {
  const { mutate: addBlog } = useAddBlogMutation()
  const { data: tags } = useListTagQuery()

  const form = useForm<BlogBodyType>({
    resolver: zodResolver(BlogBodySchema),
    defaultValues: {
      title: '',
      content: '',
      tagId: ''
    }
  })

  const handleSubmit = (data: BlogBodyType) => {
    addBlog(data, {
      onSuccess: () => {
        toast.success('Blog post created successfully')
        form.reset()
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add New Blog Post</DialogTitle>
          <DialogDescription>Create a new blog post by filling out the form below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' {...form.register('title')} placeholder='Enter blog post title' />
            {form.formState.errors.title && (
              <p className='text-sm text-red-500'>{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='content'>Content</Label>
            <Textarea id='content' {...form.register('content')} placeholder='Enter blog post content' />
            {form.formState.errors.content && (
              <p className='text-sm text-red-500'>{form.formState.errors.content.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='tagId'>Tag ID</Label>
            <Select onValueChange={(value) => form.setValue('tagId', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select a tag' />
              </SelectTrigger>
              <SelectContent>
                {tags?.data.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.tagId && (
              <p className='text-sm text-red-500'>{form.formState.errors.tagId.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

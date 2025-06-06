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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { BlogPost } from './BlogTable'
import { useAddBlogMutation } from '@/queries/useBlog'
import { useListTagQuery } from '@/queries/useTag'
import { BlogBodySchema, BlogBodyType } from '@/schemaValidator/blog.schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import InputEditor from '@/hooks/inputEditor'
import { handleEditorChange } from '@/core/lib/utils'
import parse from 'html-react-parser'
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
        toast.success('Bài viết blog đã thành công')
        form.reset()
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Thêm bài viết blog mới</DialogTitle>
          <DialogDescription>Tạo một bài viết blog mới bằng cách điền vào biểu mẫu bên dưới.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Tiêu đề bài viết *</Label>
            <Input
              id='title'
              {...form.register('title')}
              placeholder='Nhập tiêu đề bài viết blog'
              className={form.formState.errors.title ? 'border-red-500' : ''}
            />
            {form.formState.errors.title && (
              <p className='text-sm text-red-500'>{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='content'>Nội dung bài viết *</Label>
            <InputEditor
              label=''
              value={form.watch('content') || ''}
              setValue={(content: string) => handleEditorChange(content, form)}
            />
            {form.formState.errors.content && (
              <p className='text-sm text-red-500'>{form.formState.errors.content.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='tagId'>Tag *</Label>
            <Select onValueChange={(value) => form.setValue('tagId', value)}>
              <SelectTrigger className={form.formState.errors.tagId ? 'border-red-500' : ''}>
                <SelectValue placeholder='Chọn một tag' />
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
          {form.watch('content') && (
            <div className='mt-6 border-t pt-4'>
              <h3 className='text-lg font-semibold mb-2'>Xem trước nội dung</h3>
              <div className='prose max-w-none'>{parse(form.watch('content'))}</div>
            </div>
          )}

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Hủy bỏ
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Đang tạo...' : 'Tạo bài viết'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

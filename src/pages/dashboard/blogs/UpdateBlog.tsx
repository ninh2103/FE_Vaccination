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
import { BlogBodyType } from '@/schemaValidator/blog.schema'
import { BlogBodySchema } from '@/schemaValidator/blog.schema'
import { useUpdateBlogMutation, useGetBlogByIdQuery } from '@/queries/useBlog'
import { useListTagQuery } from '@/queries/useTag'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect } from 'react'
import { toast } from 'sonner'
import InputEditor from '@/hooks/inputEditor'
import { handleEditorChange } from '@/core/lib/utils'

interface UpdateBlogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string
}

export function UpdateBlog({ open, onOpenChange, id }: UpdateBlogProps) {
  const { mutate: updateBlog } = useUpdateBlogMutation()
  const { data: tags } = useListTagQuery()
  const { data: post } = useGetBlogByIdQuery(id)

  const form = useForm<BlogBodyType>({
    resolver: zodResolver(BlogBodySchema),
    defaultValues: {
      title: '',
      content: '',
      tagId: ''
    }
  })

  // Update form values when post data is loaded
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        tagId: post.tagId
      })
    }
  }, [post, form])

  const handleSubmit = (data: BlogBodyType) => {
    if (!post) return
    updateBlog({
      id: post.id,
      body: data
    })
    toast.success('Bài viết blog đã được cập nhật thành công')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Cập nhật bài viết blog</DialogTitle>
          <DialogDescription>Cập nhật bài viết blog bằng cách sửa đổi biểu mẫu bên dưới.</DialogDescription>
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
            <Select value={form.watch('tagId')} onValueChange={(value) => form.setValue('tagId', value)}>
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
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Hủy bỏ
            </Button>
            <Button disabled={form.formState.isSubmitting} type='submit'>
              {form.formState.isSubmitting ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

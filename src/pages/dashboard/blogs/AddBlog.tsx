'use client'

import type React from 'react'
import { useState, useRef } from 'react'
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
import { BlogBodySchema, type BlogBodyType } from '@/schemaValidator/blog.schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Link
} from 'lucide-react'

interface AddBlogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (post: Omit<BlogPost, 'id'>) => void
}

export function AddBlog({ open, onOpenChange, onSubmit }: AddBlogProps) {
  const { mutate: addBlog, isPending: isAddingBlog } = useAddBlogMutation()
  const { data: tags } = useListTagQuery()
  const editorRef = useRef<HTMLDivElement>(null)

  const form = useForm<BlogBodyType>({
    resolver: zodResolver(BlogBodySchema),
    defaultValues: {
      title: '',
      content: '',
      tagId: ''
    }
  })

  // Hàm thực thi lệnh định dạng văn bản
  const execCommand = (command: string, value = '') => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    if (editorRef.current) {
      form.setValue('content', editorRef.current.innerHTML, { shouldValidate: true })
    }
  }

  // Xử lý thay đổi nội dung trình soạn thảo
  const handleContentChange = () => {
    if (editorRef.current) {
      form.setValue('content', editorRef.current.innerHTML, { shouldValidate: true })
    }
  }

  const handleSubmit = (data: BlogBodyType) => {
    addBlog(data, {
      onSuccess: (newBlog) => {
        // Gọi onSubmit để thông báo cho BlogPage
        const blogPost: Omit<BlogPost, 'id'> = {
          title: data.title,
          content: data.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: '', // Giả định userId được cung cấp từ server hoặc context
          tagId: data.tagId,
          tag: tags?.data?.find((tag) => tag.id === data.tagId) ?? { id: data.tagId, name: 'Unknown' }
        }
        onSubmit(blogPost)

        toast.success('Bài viết blog đã được thêm thành công')
        form.reset()
        if (editorRef.current) {
          editorRef.current.innerHTML = ''
        }
        onOpenChange(false)
      },
      onError: (error) => {
        toast.error('Có lỗi xảy ra khi thêm bài viết: ' + error.message)
      }
    })
  }

  const handleFormError = () => {
    const errors = Object.values(form.formState.errors)
      .map((error) => error?.message)
      .filter((message): message is string => Boolean(message))
    if (errors.length > 0) {
      toast.error('Vui lòng kiểm tra lại biểu mẫu: ' + errors.join(', '))
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Thêm bài viết blog mới</DialogTitle>
            <DialogDescription>Tạo một bài viết blog mới bằng cách điền vào biểu mẫu bên dưới.</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit, handleFormError)} className='grid gap-4 py-4'>
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

            {/* Trình soạn thảo văn bản phong phú */}
            <div className='grid gap-2'>
              <Label htmlFor='content'>Nội dung bài viết *</Label>
              <div
                className={`border rounded-md overflow-hidden ${form.formState.errors.content ? 'border-red-500' : ''}`}
              >
                <div className='flex flex-wrap items-center gap-0.5 p-1 border-b bg-muted/50'>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('bold')}>
                    <Bold className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('italic')}>
                    <Italic className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('underline')}>
                    <Underline className='h-4 w-4' />
                  </Button>
                  <div className='h-6 w-px bg-border mx-1' />
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => execCommand('insertUnorderedList')}
                  >
                    <List className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => execCommand('insertOrderedList')}
                  >
                    <ListOrdered className='h-4 w-4' />
                  </Button>
                  <div className='h-6 w-px bg-border mx-1' />
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('justifyLeft')}>
                    <AlignLeft className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => execCommand('justifyCenter')}
                  >
                    <AlignCenter className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('justifyRight')}>
                    <AlignRight className='h-4 w-4' />
                  </Button>
                  <div className='h-6 w-px bg-border mx-1' />
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => execCommand('formatBlock', '<h1>')}
                  >
                    <Heading1 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => execCommand('formatBlock', '<h2>')}
                  >
                    <Heading2 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => {
                      const url = prompt('Nhập URL liên kết:')
                      if (url) execCommand('createLink', url)
                    }}
                  >
                    <Link className='h-4 w-4' />
                  </Button>
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  className='min-h-[200px] p-3 focus:outline-none'
                  onInput={handleContentChange}
                  data-placeholder='Nhập nội dung bài viết...'
                  dangerouslySetInnerHTML={{ __html: form.watch('content') || '' }}
                />
              </div>
              <style>
                {`
                  div[contentEditable]:empty::before {
                    content: attr(data-placeholder);
                    color: #a0a0a0;
                    font-style: italic;
                  }
                `}
              </style>
              {form.formState.errors.content && (
                <p className='text-sm text-red-500'>{form.formState.errors.content.message}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='tagId'>Tag *</Label>
              <Select onValueChange={(value) => form.setValue('tagId', value, { shouldValidate: true })}>
                <SelectTrigger className={form.formState.errors.tagId ? 'border-red-500' : ''}>
                  <SelectValue placeholder='Chọn một tag' />
                </SelectTrigger>
                <SelectContent>
                  {tags?.data?.length ? (
                    tags.data.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className='p-2 text-sm text-muted-foreground'>Không có tag nào</div>
                  )}
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
              <Button type='submit' disabled={form.formState.isSubmitting || isAddingBlog}>
                {form.formState.isSubmitting || isAddingBlog ? 'Đang xử lý...' : 'Thêm bài viết'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

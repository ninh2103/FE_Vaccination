import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  status: 'Published' | 'Draft'
  publishDate: string | null
  readTime: string
  featured: boolean
  image: string | null
}

interface AddBlogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (post: Omit<BlogPost, 'id'>) => void
}

export const AddBlog: React.FC<AddBlogProps> = ({ open, onOpenChange, onSubmit }) => {
  const [newImage, setNewImage] = useState<File | null>(null)
  const [newContent, setNewContent] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file =
      e.type === 'change'
        ? (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0]
        : (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setNewImage(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPost: Omit<BlogPost, 'id'> = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      excerpt: formData.get('excerpt')?.toString() || '',
      content: newContent || '<p>Write your content here...</p>',
      author: 'ADMIN',
      category: formData.get('category')?.toString() || '',
      tags:
        formData
          .get('tags')
          ?.toString()
          .split(',')
          .map((tag) => tag.trim()) || [],
      status: 'Draft',
      publishDate: null,
      readTime: '5 min',
      featured: formData.get('featured') === 'true',
      image: newImage ? URL.createObjectURL(newImage) : null
    }
    onSubmit(newPost)
    setNewImage(null)
    setNewContent('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>Create a new blog post to publish on your website.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Title</Label>
              <Input id='title' name='title' placeholder='Enter blog post title' required />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='slug'>Slug</Label>
                <Input id='slug' name='slug' placeholder='Enter URL slug' required />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Select name='category' required>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Vaccine Science'>Vaccine Science</SelectItem>
                    <SelectItem value='Influenza'>Influenza</SelectItem>
                    <SelectItem value='Travel'>Travel</SelectItem>
                    <SelectItem value='Pediatric'>Pediatric</SelectItem>
                    <SelectItem value='Geriatric'>Geriatric</SelectItem>
                    <SelectItem value='COVID-19'>COVID-19</SelectItem>
                    <SelectItem value='Respiratory Health'>Respiratory Health</SelectItem>
                    <SelectItem value='Preventive Care'>Preventive Care</SelectItem>
                    <SelectItem value='Cancer Prevention'>Cancer Prevention</SelectItem>
                    <SelectItem value='Maternal Health'>Maternal Health</SelectItem>
                    <SelectItem value='Global Health'>Global Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='excerpt'>Excerpt</Label>
              <Textarea id='excerpt' name='excerpt' placeholder='Enter a brief summary' rows={2} required />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='content'>Content</Label>
              <Textarea
                id='content'
                name='content'
                className='border border-gray-300 p-2 min-h-[200px] rounded-md focus:outline-none'
                placeholder='Write your content here...'
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Featured Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                onDrop={handleImageChange}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  const input = document.getElementById('new-image-input')
                  if (input) input.click()
                }}
              >
                {newImage ? (
                  <img
                    src={URL.createObjectURL(newImage) || '/placeholder.svg'}
                    alt='Featured'
                    className='max-h-32 mx-auto'
                  />
                ) : (
                  <p className='text-muted-foreground'>Drag and drop an image here or click to select</p>
                )}
                <Input
                  id='new-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='tags'>Tags (comma separated)</Label>
              <Input id='tags' name='tags' placeholder='e.g., Vaccination, Health' required />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='featured'>Featured</Label>
                <Select name='featured' defaultValue='false'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select featured status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='false'>No</SelectItem>
                    <SelectItem value='true'>Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit'>Save Draft</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

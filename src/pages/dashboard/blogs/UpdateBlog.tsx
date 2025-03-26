import React, { useState, useEffect } from 'react'
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

interface UpdateBlogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (post: BlogPost) => void
  post: BlogPost | null
}

export const UpdateBlog: React.FC<UpdateBlogProps> = ({ open, onOpenChange, onSubmit, post }) => {
  const [updatedImage, setUpdatedImage] = useState<File | null>(null)
  const [updatedContent, setUpdatedContent] = useState('')
  const [formData, setFormData] = useState<Partial<BlogPost>>({})

  useEffect(() => {
    if (post) {
      setFormData(post)
      setUpdatedContent(post.content)
    }
  }, [post])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file =
      e.type === 'change'
        ? (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0]
        : (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setUpdatedImage(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!post) return

    const updatedPost: BlogPost = {
      ...post,
      ...formData,
      content: updatedContent,
      image: updatedImage ? URL.createObjectURL(updatedImage) : post.image,
      tags: formData.tags || post.tags
    }

    onSubmit(updatedPost)
    setUpdatedImage(null)
  }

  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Update Blog Post</DialogTitle>
          <DialogDescription>Update the blog post details and content.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder='Enter blog post title'
                required
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='slug'>Slug</Label>
                <Input
                  id='slug'
                  name='slug'
                  value={formData.slug || ''}
                  onChange={handleInputChange}
                  placeholder='Enter URL slug'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Select
                  name='category'
                  value={formData.category || ''}
                  onValueChange={(value) => handleSelectChange('category', value)}
                  required
                >
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
              <Textarea
                id='excerpt'
                name='excerpt'
                value={formData.excerpt || ''}
                onChange={handleInputChange}
                placeholder='Enter a brief summary'
                rows={2}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='content'>Content</Label>
              <Textarea
                id='content'
                name='content'
                className='border border-gray-300 p-2 min-h-[200px] rounded-md focus:outline-none'
                placeholder='Write your content here...'
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Featured Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                onDrop={handleImageChange}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  const input = document.getElementById('update-image-input')
                  if (input) input.click()
                }}
              >
                {updatedImage ? (
                  <img
                    src={URL.createObjectURL(updatedImage) || '/placeholder.svg'}
                    alt='Featured'
                    className='max-h-32 mx-auto'
                  />
                ) : post.image ? (
                  <img src={post.image} alt='Featured' className='max-h-32 mx-auto' />
                ) : (
                  <p className='text-muted-foreground'>Drag and drop an image here or click to select</p>
                )}
                <Input
                  id='update-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='tags'>Tags (comma separated)</Label>
              <Input
                id='tags'
                name='tags'
                value={formData.tags?.join(', ') || ''}
                onChange={(e) =>
                  handleSelectChange(
                    'tags',
                    e.target.value.split(',').map((tag) => tag.trim())
                  )
                }
                placeholder='e.g., Vaccination, Health'
                required
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='status'>Status</Label>
                <Select
                  name='status'
                  value={formData.status || ''}
                  onValueChange={(value) => handleSelectChange('status', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Draft'>Draft</SelectItem>
                    <SelectItem value='Published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='featured'>Featured</Label>
                <Select
                  name='featured'
                  value={formData.featured?.toString() || 'false'}
                  onValueChange={(value) => handleSelectChange('featured', value)}
                >
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
            <Button type='submit'>Update Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

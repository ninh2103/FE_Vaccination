'use client'

import { useState } from 'react'
import { Plus, MoreHorizontal, Edit, Trash, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Sample data with 12 blog posts, including image URLs
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Vaccine Safety',
    slug: 'understanding-vaccine-safety',
    excerpt: 'A detailed look at how vaccines are tested and monitored for safety.',
    content:
      "<p style='font-family: Times New Roman; font-size: 16px; line-height: 1.6;'>Vaccines undergo rigorous testing before approval...</p>",
    author: 'ADMIN',
    category: 'Vaccine Science',
    tags: ['Vaccine', 'Safety', 'Health'],
    status: 'Published',
    publishDate: '2025-03-01',
    readTime: '6 min',
    featured: true,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 2,
    title: 'Flu Season Preparedness',
    slug: 'flu-season-preparedness',
    excerpt: 'Tips to stay healthy during flu season.',
    content:
      "<p style='font-family: Arial; font-size: 18px; font-style: italic; line-height: 1.6;'>Getting vaccinated is your best defense...</p>",
    author: 'ADMIN',
    category: 'Influenza',
    tags: ['Flu', 'Vaccination', 'Prevention'],
    status: 'Published',
    publishDate: '2025-02-20',
    readTime: '4 min',
    featured: false,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 3,
    title: 'Travel Health Essentials',
    slug: 'travel-health-essentials',
    excerpt: 'What you need to know before traveling abroad.',
    content:
      "<p style='font-family: Times New Roman; font-size: 14px; letter-spacing: 0.5px; line-height: 1.5;'>Check vaccination requirements for your destination...</p>",
    author: 'ADMIN',
    category: 'Travel',
    tags: ['Travel', 'Vaccination', 'Health'],
    status: 'Draft',
    publishDate: null,
    readTime: '5 min',
    featured: false,
    image: null
  },
  {
    id: 4,
    title: 'Childhood Immunization Guide',
    slug: 'childhood-immunization-guide',
    excerpt: 'A parent’s guide to childhood vaccines.',
    content:
      "<p style='font-family: Arial; font-size: 16px; font-weight: bold; line-height: 1.6;'>Immunizations protect kids from serious diseases...</p>",
    author: 'ADMIN',
    category: 'Pediatric',
    tags: ['Children', 'Vaccination', 'Guide'],
    status: 'Published',
    publishDate: '2025-01-15',
    readTime: '7 min',
    featured: true,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 5,
    title: 'Senior Vaccination Tips',
    slug: 'senior-vaccination-tips',
    excerpt: 'Why seniors need specific vaccines.',
    content:
      "<p style='font-family: Times New Roman; font-size: 15px; line-height: 1.8;'>Older adults are more vulnerable to infections...</p>",
    author: 'ADMIN',
    category: 'Geriatric',
    tags: ['Seniors', 'Vaccination', 'Health'],
    status: 'Draft',
    publishDate: null,
    readTime: '5 min',
    featured: false,
    image: null
  },
  {
    id: 6,
    title: 'COVID-19 Vaccine Updates',
    slug: 'covid-19-vaccine-updates',
    excerpt: 'Latest information on COVID-19 vaccination efforts.',
    content:
      "<p style='font-family: Arial; font-size: 16px; line-height: 1.6;'>New variants and booster shots are being monitored...</p>",
    author: 'ADMIN',
    category: 'COVID-19',
    tags: ['COVID-19', 'Vaccination', 'Updates'],
    status: 'Published',
    publishDate: '2025-02-10',
    readTime: '6 min',
    featured: true,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 7,
    title: 'Pneumococcal Vaccine Benefits',
    slug: 'pneumococcal-vaccine-benefits',
    excerpt: 'How the pneumococcal vaccine prevents pneumonia.',
    content:
      "<p style='font-family: Times New Roman; font-size: 14px; line-height: 1.5;'>This vaccine is crucial for at-risk groups...</p>",
    author: 'ADMIN',
    category: 'Respiratory Health',
    tags: ['Pneumonia', 'Vaccination', 'Health'],
    status: 'Published',
    publishDate: '2025-01-25',
    readTime: '5 min',
    featured: false,
    image: null
  },
  {
    id: 8,
    title: 'Tetanus Shot Guidelines',
    slug: 'tetanus-shot-guidelines',
    excerpt: 'When and why you need a tetanus booster.',
    content:
      "<p style='font-family: Arial; font-size: 16px; font-weight: bold; line-height: 1.6;'>Stay protected with regular boosters...</p>",
    author: 'ADMIN',
    category: 'Preventive Care',
    tags: ['Tetanus', 'Vaccination', 'Safety'],
    status: 'Draft',
    publishDate: null,
    readTime: '4 min',
    featured: false,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 9,
    title: 'HPV Vaccine Awareness',
    slug: 'hpv-vaccine-awareness',
    excerpt: 'Learn how the HPV vaccine prevents cancer.',
    content:
      "<p style='font-family: Times New Roman; font-size: 15px; line-height: 1.8;'>Targeted for adolescents to reduce cancer risk...</p>",
    author: 'ADMIN',
    category: 'Cancer Prevention',
    tags: ['HPV', 'Vaccination', 'Cancer'],
    status: 'Published',
    publishDate: '2025-02-05',
    readTime: '6 min',
    featured: true,
    image: null
  },
  {
    id: 10,
    title: 'Vaccination During Pregnancy',
    slug: 'vaccination-during-pregnancy',
    excerpt: 'Guidelines for safe vaccinations during pregnancy.',
    content:
      "<p style='font-family: Arial; font-size: 16px; font-style: italic; line-height: 1.6;'>Protect both mother and baby with these shots...</p>",
    author: 'ADMIN',
    category: 'Maternal Health',
    tags: ['Pregnancy', 'Vaccination', 'Health'],
    status: 'Draft',
    publishDate: null,
    readTime: '7 min',
    featured: false,
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 11,
    title: 'Seasonal Flu Myths',
    slug: 'seasonal-flu-myths',
    excerpt: 'Debunking common myths about flu vaccines.',
    content:
      "<p style='font-family: Times New Roman; font-size: 14px; letter-spacing: 0.5px; line-height: 1.5;'>Get the facts to stay informed...</p>",
    author: 'ADMIN',
    category: 'Influenza',
    tags: ['Flu', 'Myths', 'Vaccination'],
    status: 'Published',
    publishDate: '2025-01-20',
    readTime: '5 min',
    featured: false,
    image: null
  },
  {
    id: 12,
    title: 'Global Vaccination Trends',
    slug: 'global-vaccination-trends',
    excerpt: 'An overview of worldwide vaccination efforts.',
    content:
      "<p style='font-family: Arial; font-size: 16px; line-height: 1.6;'>Countries are collaborating to improve coverage...</p>",
    author: 'ADMIN',
    category: 'Global Health',
    tags: ['Global', 'Vaccination', 'Trends'],
    status: 'Published',
    publishDate: '2025-03-05',
    readTime: '8 min',
    featured: true,
    image: '/placeholder.svg?height=200&width=300'
  }
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openOverviewDialog, setOpenOverviewDialog] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [editImage, setEditImage] = useState<File | null>(null)
  const [currentTab, setCurrentTab] = useState('all')
  const [newContent, setNewContent] = useState('')
  const [editContent, setEditContent] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (currentTab === 'all') return matchesSearch
    if (currentTab === 'published') return matchesSearch && post.status === 'Published'
    if (currentTab === 'drafts') return matchesSearch && post.status === 'Draft'
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className='bg-green-500 text-white hover:bg-green-600'>Published</Badge>
      case 'Draft':
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800 border-yellow-300'>
            Draft
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    isEdit: boolean
  ) => {
    e.preventDefault()
    const file =
      e.type === 'change'
        ? (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0]
        : (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      // eslint-disable-next-line no-unused-expressions
      isEdit ? setEditImage(file) : setNewImage(file)
    }
  }

  const applyContentStyle = (style: string, value?: string, isEdit: boolean = false) => {
    const contentInput = document.getElementById(isEdit ? 'edit-content' : 'content') as HTMLDivElement
    if (contentInput) {
      if (style === 'fontSize') {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const selectedText = range.toString()

          if (selectedText) {
            const span = document.createElement('span')
            span.style.fontSize = `${value}px`
            span.innerText = selectedText

            range.deleteContents()
            range.insertNode(span)

            const updatedContent = contentInput.innerHTML
            isEdit ? setEditContent(updatedContent) : setNewContent(updatedContent)

            selection.removeAllRanges()
            const newRange = document.createRange()
            newRange.setStartAfter(span)
            newRange.setEndAfter(span)
            selection.addRange(newRange)
          } else {
            contentInput.style.fontSize = `${value}px`
            const updatedContent = contentInput.innerHTML
            isEdit ? setEditContent(updatedContent) : setNewContent(updatedContent)
          }
        }
      } else {
        document.execCommand(style, false, value)
        contentInput.focus()
        const updatedContent = contentInput.innerHTML
        isEdit ? setEditContent(updatedContent) : setNewContent(updatedContent)
      }
    }
  }

  return (
    <div className='flex flex-col gap-6 p-6 bg-gray-50 min-h-screen relative'>
      <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Blog Management
        </h1>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button
              size='sm'
              className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
            >
              <Plus className='mr-2 h-4 w-4' />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-semibold text-gray-900'>Create New Blog Post</DialogTitle>
              <DialogDescription className='text-gray-600'>
                Create a new blog post to publish on your website.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='title' className='text-sm font-medium text-gray-700'>
                  Title
                </Label>
                <Input id='title' placeholder='Enter blog post title' className='border-gray-300' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='slug' className='text-sm font-medium text-gray-700'>
                    Slug
                  </Label>
                  <Input id='slug' placeholder='Enter URL slug' className='border-gray-300' />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='category' className='text-sm font-medium text-gray-700'>
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className='border-gray-300'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='vaccine-science'>Vaccine Science</SelectItem>
                      <SelectItem value='influenza'>Influenza</SelectItem>
                      <SelectItem value='travel'>Travel</SelectItem>
                      <SelectItem value='pediatric'>Pediatric</SelectItem>
                      <SelectItem value='geriatric'>Geriatric</SelectItem>
                      <SelectItem value='covid-19'>COVID-19</SelectItem>
                      <SelectItem value='respiratory-health'>Respiratory Health</SelectItem>
                      <SelectItem value='preventive-care'>Preventive Care</SelectItem>
                      <SelectItem value='cancer-prevention'>Cancer Prevention</SelectItem>
                      <SelectItem value='maternal-health'>Maternal Health</SelectItem>
                      <SelectItem value='global-health'>Global Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='excerpt' className='text-sm font-medium text-gray-700'>
                  Excerpt
                </Label>
                <Textarea id='excerpt' placeholder='Enter a brief summary' rows={2} className='border-gray-300' />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='content' className='text-sm font-medium text-gray-700'>
                  Content
                </Label>
                <div className='flex flex-wrap gap-2 mb-2 bg-white p-2 border border-gray-300 rounded-md'>
                  <Select onValueChange={(value) => applyContentStyle('fontName', value, false)}>
                    <SelectTrigger className='w-[120px] border-gray-300'>
                      <SelectValue placeholder='Font' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
                      <SelectItem value='Arial'>Arial</SelectItem>
                      <SelectItem value='Verdana'>Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => applyContentStyle('fontSize', value, false)}>
                    <SelectTrigger className='w-[80px] border-gray-300'>
                      <SelectValue placeholder='Size' />
                    </SelectTrigger>
                    <SelectContent className='max-h-[200px] overflow-y-auto'>
                      <SelectItem value='8'>8pt</SelectItem>
                      <SelectItem value='10'>10pt</SelectItem>
                      <SelectItem value='12'>12pt</SelectItem>
                      <SelectItem value='14'>14pt</SelectItem>
                      <SelectItem value='16'>16pt</SelectItem>
                      <SelectItem value='18'>18pt</SelectItem>
                      <SelectItem value='20'>20pt</SelectItem>
                      <SelectItem value='22'>22pt</SelectItem>
                      <SelectItem value='24'>24pt</SelectItem>
                      <SelectItem value='26'>26pt</SelectItem>
                      <SelectItem value='28'>28pt</SelectItem>
                      <SelectItem value='32'>32pt</SelectItem>
                      <SelectItem value='36'>36pt</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('bold', undefined, false)}
                    className='text-gray-600'
                  >
                    <b>B</b>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('italic', undefined, false)}
                    className='text-gray-600'
                  >
                    <i>I</i>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('underline', undefined, false)}
                    className='text-gray-600'
                  >
                    <u>U</u>
                  </Button>
                  <Select onValueChange={(value) => applyContentStyle('foreColor', value, false)}>
                    <SelectTrigger className='w-[80px] border-gray-300'>
                      <SelectValue placeholder='Color' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='#000000'>Black</SelectItem>
                      <SelectItem value='#FF0000'>Red</SelectItem>
                      <SelectItem value='#00FF00'>Green</SelectItem>
                      <SelectItem value='#0000FF'>Blue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('justifyLeft', undefined, false)}
                    className='text-gray-600'
                  >
                    <span>Left</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('justifyCenter', undefined, false)}
                    className='text-gray-600'
                  >
                    <span>Center</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('justifyRight', undefined, false)}
                    className='text-gray-600'
                  >
                    <span>Right</span>
                  </Button>
                </div>
                <div
                  id='content'
                  contentEditable
                  className='border border-gray-300 p-2 min-h-[200px] rounded-md focus:outline-none'
                  placeholder='Write your content here...'
                  onInput={(e) => setNewContent(e.currentTarget.innerHTML)}
                />
              </div>
              <div className='grid gap-2'>
                <Label>Featured Image</Label>
                <div
                  className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                  onDrop={(e) => handleImageChange(e, false)}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('new-image-input')?.click()}
                >
                  {newImage ? (
                    <img src={URL.createObjectURL(newImage)} alt='Featured' className='max-h-32 mx-auto' />
                  ) : (
                    <p className='text-gray-500'>Drag and drop an image here or click to select</p>
                  )}
                  <input
                    id='new-image-input'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleImageChange(e, false)}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='tags' className='text-sm font-medium text-gray-700'>
                  Tags (comma separated)
                </Label>
                <Input id='tags' placeholder='e.g., Vaccination, Health' className='border-gray-300' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='status' className='text-sm font-medium text-gray-700'>
                    Status
                  </Label>
                  <Select defaultValue='draft'>
                    <SelectTrigger className='border-gray-300'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='featured' className='text-sm font-medium text-gray-700'>
                    Featured
                  </Label>
                  <Select defaultValue='false'>
                    <SelectTrigger className='border-gray-300'>
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
              <Button
                variant='outline'
                onClick={() => setOpenAddDialog(false)}
                className='border-gray-300 text-gray-600'
              >
                Cancel
              </Button>
              <Button onClick={() => setOpenAddDialog(false)} className='bg-blue-600 text-white hover:bg-blue-700'>
                Save Draft
              </Button>
              <Button
                onClick={() => setOpenAddDialog(false)}
                className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold w-full sm:w-auto text-white'
              >
                Publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6'>
        <Tabs defaultValue='all' onValueChange={setCurrentTab} className='bg-white rounded-lg shadow-sm'>
          <TabsList className='grid w-full max-w-md grid-cols-3 border-b border-gray-200'>
            <TabsTrigger value='all' className='data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600'>
              All Posts
            </TabsTrigger>
            <TabsTrigger
              value='published'
              className='data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600'
            >
              Published
            </TabsTrigger>
            <TabsTrigger value='drafts' className='data-[state=active]:bg-gray-100 data-[state=active]:text-blue-600'>
              Drafts
            </TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='p-4 border border-gray-200 rounded-lg'>
            <Card className='border-none shadow-none'>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader className='bg-gray-100'>
                    <TableRow>
                      <TableHead className='w-[60px] text-gray-700'>No.</TableHead>
                      <TableHead className='text-gray-700'>Title</TableHead>
                      <TableHead className='text-gray-700'>Author</TableHead>
                      <TableHead className='text-gray-700'>Category</TableHead>
                      <TableHead className='text-gray-700'>Status</TableHead>
                      <TableHead className='text-gray-700'>Published</TableHead>
                      <TableHead className='text-gray-700'>Featured</TableHead>
                      <TableHead className='w-[80px] text-gray-700'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPosts.map((post, index) => (
                      <TableRow key={post.id} className='hover:bg-gray-50 transition-colors'>
                        <TableCell className='font-medium text-gray-600'>
                          {(currentPage - 1) * postsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className='font-medium text-gray-800'>{post.title}</div>
                          <div className='text-sm text-gray-500 truncate max-w-[300px]'>{post.excerpt}</div>
                        </TableCell>
                        <TableCell className='text-gray-600'>{post.author}</TableCell>
                        <TableCell className='text-gray-600'>{post.category}</TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell className='text-gray-600'>{post.publishDate || '—'}</TableCell>
                        <TableCell className='text-gray-600'>{post.featured ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon' className='text-gray-600'>
                                <MoreHorizontal className='h-4 w-4' />
                                <span className='sr-only'>Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='bg-white border-gray-200'>
                              <DropdownMenuLabel className='text-gray-700'>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className='bg-gray-200' />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenOverviewDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Eye className='mr-2 h-4 w-4 text-gray-600' />
                                View Overview
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setEditImage(null)
                                  setEditContent(post.content)
                                  setOpenEditDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Edit className='mr-2 h-4 w-4 text-gray-600' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className='text-red-600 hover:bg-red-50'
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenDeleteDialog(true)
                                }}
                              >
                                <Trash className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='published' className='p-4 border border-gray-200 rounded-lg'>
            <Card className='border-none shadow-none'>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader className='bg-gray-100'>
                    <TableRow>
                      <TableHead className='w-[60px] text-gray-700'>No.</TableHead>
                      <TableHead className='text-gray-700'>Title</TableHead>
                      <TableHead className='text-gray-700'>Author</TableHead>
                      <TableHead className='text-gray-700'>Category</TableHead>
                      <TableHead className='text-gray-700'>Published</TableHead>
                      <TableHead className='text-gray-700'>Featured</TableHead>
                      <TableHead className='w-[80px] text-gray-700'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPosts.map((post, index) => (
                      <TableRow key={post.id} className='hover:bg-gray-50 transition-colors'>
                        <TableCell className='font-medium text-gray-600'>
                          {(currentPage - 1) * postsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className='font-medium text-gray-800'>{post.title}</div>
                          <div className='text-sm text-gray-500 truncate max-w-[300px]'>{post.excerpt}</div>
                        </TableCell>
                        <TableCell className='text-gray-600'>{post.author}</TableCell>
                        <TableCell className='text-gray-600'>{post.category}</TableCell>
                        <TableCell className='text-gray-600'>{post.publishDate}</TableCell>
                        <TableCell className='text-gray-600'>{post.featured ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon' className='text-gray-600'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='bg-white border-gray-200'>
                              <DropdownMenuLabel className='text-gray-700'>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className='bg-gray-200' />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenOverviewDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Eye className='mr-2 h-4 w-4 text-gray-600' />
                                View Overview
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setEditImage(null)
                                  setEditContent(post.content)
                                  setOpenEditDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Edit className='mr-2 h-4 w-4 text-gray-600' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className='text-red-600 hover:bg-red-50'
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenDeleteDialog(true)
                                }}
                              >
                                <Trash className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='drafts' className='p-4 border border-gray-200 rounded-lg'>
            <Card className='border-none shadow-none'>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader className='bg-gray-100'>
                    <TableRow>
                      <TableHead className='w-[60px] text-gray-700'>No.</TableHead>
                      <TableHead className='text-gray-700'>Title</TableHead>
                      <TableHead className='text-gray-700'>Author</TableHead>
                      <TableHead className='text-gray-700'>Category</TableHead>
                      <TableHead className='text-gray-700'>Last Updated</TableHead>
                      <TableHead className='w-[80px] text-gray-700'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPosts.map((post, index) => (
                      <TableRow key={post.id} className='hover:bg-gray-50 transition-colors'>
                        <TableCell className='font-medium text-gray-600'>
                          {(currentPage - 1) * postsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className='font-medium text-gray-800'>{post.title}</div>
                          <div className='text-sm text-gray-500 truncate max-w-[300px]'>{post.excerpt}</div>
                        </TableCell>
                        <TableCell className='text-gray-600'>{post.author}</TableCell>
                        <TableCell className='text-gray-600'>{post.category}</TableCell>
                        <TableCell className='text-gray-600'>—</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon' className='text-gray-600'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='bg-white border-gray-200'>
                              <DropdownMenuLabel className='text-gray-700'>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className='bg-gray-200' />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenOverviewDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Eye className='mr-2 h-4 w-4 text-gray-600' />
                                View Overview
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPost(post)
                                  setEditImage(null)
                                  setEditContent(post.content)
                                  setOpenEditDialog(true)
                                }}
                                className='text-gray-700 hover:bg-gray-100'
                              >
                                <Edit className='mr-2 h-4 w-4 text-gray-600' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className='text-red-600 hover:bg-red-50'
                                onClick={() => {
                                  setSelectedPost(post)
                                  setOpenDeleteDialog(true)
                                }}
                              >
                                <Trash className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className='fixed bottom-6 right-6 flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          className='border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <Dialog open={openOverviewDialog} onOpenChange={setOpenOverviewDialog}>
        <DialogContent className='sm:max-w-[700px] bg-white'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-semibold text-gray-900'>{selectedPost?.title}</DialogTitle>
            <DialogDescription className='text-gray-600'>Overview of the selected blog post.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Featured Image</Label>
              <div className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center'>
                {selectedPost?.image ? (
                  <img src={selectedPost.image} alt='Featured' className='max-h-32 mx-auto' />
                ) : (
                  <p className='text-gray-500'>No image uploaded</p>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Excerpt</Label>
              <p className='text-gray-600'>{selectedPost?.excerpt}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Author</Label>
              <p className='text-gray-600'>{selectedPost?.author}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Category</Label>
              <p className='text-gray-600'>{selectedPost?.category}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Tags</Label>
              <p className='text-gray-600'>{selectedPost?.tags.join(', ')}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Status</Label>
              <p className='text-gray-600'>{getStatusBadge(selectedPost?.status)}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Published Date</Label>
              <p className='text-gray-600'>{selectedPost?.publishDate || '—'}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Featured</Label>
              <p className='text-gray-600'>{selectedPost?.featured ? 'Yes' : 'No'}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-sm font-medium text-gray-700'>Content</Label>
              <div className='text-gray-600' dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpenOverviewDialog(false)}
              className='border-gray-300 text-gray-600 hover:bg-gray-100'
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-semibold text-gray-900'>Edit Blog Post</DialogTitle>
            <DialogDescription className='text-gray-600'>Modify the details of your blog post.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-title' className='text-sm font-medium text-gray-700'>
                Title
              </Label>
              <Input id='edit-title' defaultValue={selectedPost?.title} className='border-gray-300' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-slug' className='text-sm font-medium text-gray-700'>
                  Slug
                </Label>
                <Input id='edit-slug' defaultValue={selectedPost?.slug} className='border-gray-300' />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-category' className='text-sm font-medium text-gray-700'>
                  Category
                </Label>
                <Select defaultValue={selectedPost?.category.toLowerCase()}>
                  <SelectTrigger className='border-gray-300'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='vaccine-science'>Vaccine Science</SelectItem>
                    <SelectItem value='influenza'>Influenza</SelectItem>
                    <SelectItem value='travel'>Travel</SelectItem>
                    <SelectItem value='pediatric'>Pediatric</SelectItem>
                    <SelectItem value='geriatric'>Geriatric</SelectItem>
                    <SelectItem value='covid-19'>COVID-19</SelectItem>
                    <SelectItem value='respiratory-health'>Respiratory Health</SelectItem>
                    <SelectItem value='preventive-care'>Preventive Care</SelectItem>
                    <SelectItem value='cancer-prevention'>Cancer Prevention</SelectItem>
                    <SelectItem value='maternal-health'>Maternal Health</SelectItem>
                    <SelectItem value='global-health'>Global Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-excerpt' className='text-sm font-medium text-gray-700'>
                Excerpt
              </Label>
              <Textarea id='edit-excerpt' defaultValue={selectedPost?.excerpt} rows={2} className='border-gray-300' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-content' className='text-sm font-medium text-gray-700'>
                Content
              </Label>
              <div className='flex flex-wrap gap-2 mb-2 bg-white p-2 border border-gray-300 rounded-md'>
                <Select onValueChange={(value) => applyContentStyle('fontName', value, true)}>
                  <SelectTrigger className='w-[120px] border-gray-300'>
                    <SelectValue placeholder='Font' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
                    <SelectItem value='Arial'>Arial</SelectItem>
                    <SelectItem value='Verdana'>Verdana</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => applyContentStyle('fontSize', value, true)}>
                  <SelectTrigger className='w-[80px] border-gray-300'>
                    <SelectValue placeholder='Size' />
                  </SelectTrigger>
                  <SelectContent className='max-h-[200px] overflow-y-auto'>
                    <SelectItem value='8'>8pt</SelectItem>
                    <SelectItem value='10'>10pt</SelectItem>
                    <SelectItem value='12'>12pt</SelectItem>
                    <SelectItem value='14'>14pt</SelectItem>
                    <SelectItem value='16'>16pt</SelectItem>
                    <SelectItem value='18'>18pt</SelectItem>
                    <SelectItem value='20'>20pt</SelectItem>
                    <SelectItem value='22'>22pt</SelectItem>
                    <SelectItem value='24'>24pt</SelectItem>
                    <SelectItem value='26'>26pt</SelectItem>
                    <SelectItem value='28'>28pt</SelectItem>
                    <SelectItem value='32'>32pt</SelectItem>
                    <SelectItem value='36'>36pt</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('bold', undefined, true)}
                  className='text-gray-600'
                >
                  <b>B</b>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('italic', undefined, true)}
                  className='text-gray-600'
                >
                  <i>I</i>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('underline', undefined, true)}
                  className='text-gray-600'
                >
                  <u>U</u>
                </Button>
                <Select onValueChange={(value) => applyContentStyle('foreColor', value, true)}>
                  <SelectTrigger className='w-[80px] border-gray-300'>
                    <SelectValue placeholder='Color' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='#000000'>Black</SelectItem>
                    <SelectItem value='##FF0000'>Red</SelectItem>
                    <SelectItem value='#00FF00'>Green</SelectItem>
                    <SelectItem value='#0000FF'>Blue</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('justifyLeft', undefined, true)}
                  className='text-gray-600'
                >
                  <span>Left</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('justifyCenter', undefined, true)}
                  className='text-gray-600'
                >
                  <span>Center</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => applyContentStyle('justifyRight', undefined, true)}
                  className='text-gray-600'
                >
                  <span>Right</span>
                </Button>
              </div>
              <div
                id='edit-content'
                contentEditable
                className='border border-gray-300 p-2 min-h-[200px] rounded-md focus:outline-none'
                placeholder='Write your content here...'
                dangerouslySetInnerHTML={{ __html: editContent || '' }}
                onInput={(e) => setEditContent(e.currentTarget.innerHTML)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Featured Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                onDrop={(e) => handleImageChange(e, true)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('edit-image-input')?.click()}
              >
                {editImage ? (
                  <img src={URL.createObjectURL(editImage)} alt='Featured' className='max-h-32 mx-auto' />
                ) : selectedPost?.image ? (
                  <img src={selectedPost.image} alt='Featured' className='max-h-32 mx-auto' />
                ) : (
                  <p className='text-gray-500'>Drag and drop an image here or click to select</p>
                )}
                <input
                  id='edit-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleImageChange(e, true)}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-tags' className='text-sm font-medium text-gray-700'>
                Tags (comma separated)
              </Label>
              <Input id='edit-tags' defaultValue={selectedPost?.tags.join(', ')} className='border-gray-300' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-status' className='text-sm font-medium text-gray-700'>
                  Status
                </Label>
                <Select defaultValue={selectedPost?.status.toLowerCase()}>
                  <SelectTrigger className='border-gray-300'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-featured' className='text-sm font-medium text-gray-700'>
                  Featured
                </Label>
                <Select defaultValue={selectedPost?.featured.toString()}>
                  <SelectTrigger className='border-gray-300'>
                    <SelectValue />
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
            <Button
              variant='outline'
              onClick={() => setOpenEditDialog(false)}
              className='border-gray-300 text-gray-600 hover:bg-gray-100'
            >
              Cancel
            </Button>
            <Button onClick={() => setOpenEditDialog(false)} className='bg-blue-600 text-white hover:bg-blue-700'>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px] bg-white'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-semibold text-gray-900'>Delete Blog Post</DialogTitle>
            <DialogDescription className='text-gray-600'>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedPost && (
              <p className='text-sm font-medium text-gray-700'>
                You are about to delete: <span className='font-bold text-gray-900'>{selectedPost.title}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpenDeleteDialog(false)}
              className='border-gray-300 text-gray-600 hover:bg-gray-100'
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={() => setOpenDeleteDialog(false)}
              className='bg-red-600 text-white hover:bg-red-700'
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

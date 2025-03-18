'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react'
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
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Định nghĩa interface cho BlogPost
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

// Constants
const ROWS_PER_PAGE = 10

// Initial data
const initialBlogPosts: BlogPost[] = [
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
    excerpt: "A parent's guide to childhood vaccines.",
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

// Utility functions
const getStatusBadge = (status: string) =>
  status === 'Published' ? (
    <Badge className='bg-green-500 hover:bg-green-600'>Published</Badge>
  ) : (
    <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
      Draft
    </Badge>
  )

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openOverviewDialog, setOpenOverviewDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [editImage, setEditImage] = useState<File | null>(null)
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'drafts'>('all')
  const [newContent, setNewContent] = useState('')
  const [editContent, setEditContent] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    featured: { yes: false, no: false },
    category: ''
  })

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesTab =
        currentTab === 'all' ||
        (currentTab === 'published' && post.status === 'Published') ||
        (currentTab === 'drafts' && post.status === 'Draft')

      const matchesFeatured =
        (!filters.featured.yes && !filters.featured.no) ||
        (filters.featured.yes && post.featured) ||
        (filters.featured.no && !post.featured)

      const matchesCategory = !filters.category || post.category.toLowerCase() === filters.category.toLowerCase()

      return matchesSearch && matchesTab && matchesFeatured && matchesCategory
    })
  }, [blogPosts, searchTerm, currentTab, filters])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ROWS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Event handlers

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
      if (isEdit) {
        setEditImage(file)
      } else {
        setNewImage(file)
      }
    }
  }
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPosts)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Blog Posts')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'blog-posts.xlsx')
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setBlogPosts([...initialBlogPosts])
      setSearchTerm('')
      setFilters({
        featured: { yes: false, no: false },
        category: ''
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  const handleClearFilters = () => {
    setFilters({
      featured: { yes: false, no: false },
      category: ''
    })
    setCurrentPage(1)
  }

  const handleSaveDraft = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPost: BlogPost = {
      id: blogPosts.length + 1,
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
      readTime: '5 min', // Giá trị mặc định
      featured: formData.get('featured') === 'true',
      image: newImage ? URL.createObjectURL(newImage) : null
    }
    setBlogPosts([...blogPosts, newPost])
    setOpenAddDialog(false)
    setNewImage(null)
    setNewContent('')
  }

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPost: BlogPost = {
      id: blogPosts.length + 1,
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
      status: 'Published',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '5 min', // Giá trị mặc định
      featured: formData.get('featured') === 'true',
      image: newImage ? URL.createObjectURL(newImage) : null
    }
    setBlogPosts([...blogPosts, newPost])
    setOpenAddDialog(false)
    setNewImage(null)
    setNewContent('')
  }

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPost) return
    const formData = new FormData(e.currentTarget)
    const updatedPost: BlogPost = {
      ...selectedPost,
      title: formData.get('edit-title')?.toString() || selectedPost.title,
      slug: formData.get('edit-slug')?.toString() || selectedPost.slug,
      excerpt: formData.get('edit-excerpt')?.toString() || selectedPost.excerpt,
      content: editContent || selectedPost.content,
      category: formData.get('edit-category')?.toString() || selectedPost.category,
      tags:
        formData
          .get('edit-tags')
          ?.toString()
          .split(',')
          .map((tag) => tag.trim()) || selectedPost.tags,
      status: (formData.get('edit-status')?.toString() as 'Published' | 'Draft') || selectedPost.status,
      publishDate:
        formData.get('edit-status') === 'published' && !selectedPost.publishDate
          ? new Date().toISOString().split('T')[0]
          : formData.get('edit-status') === 'draft'
            ? null
            : selectedPost.publishDate,
      featured: formData.get('edit-featured') === 'true',
      image: editImage ? URL.createObjectURL(editImage) : selectedPost.image
    }
    setBlogPosts(blogPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
    setOpenEditDialog(false)
    setEditImage(null)
    setEditContent('')
  }

  const handleDeletePost = () => {
    if (selectedPost) {
      setBlogPosts(blogPosts.filter((post) => post.id !== selectedPost.id))
    }
    setOpenDeleteDialog(false)
    setSelectedPost(null)
  }

  // Render
  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Blog
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Refresh
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>Create a new blog post to publish on your website.</DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => handleSaveDraft(e)}>
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
                      onDrop={(e) => handleImageChange(e, false)}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => document.getElementById('new-image-input')?.click()}
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
                    <Label htmlFor='tags'>Tags (comma separated)</Label>
                    <Input id='tags' name='tags' placeholder='e.g., Vaccination, Health' required />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='status'>Status</Label>
                      <Select name='status' defaultValue='draft'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='draft'>Draft</SelectItem>
                          <SelectItem value='published'>Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type='submit'>Save Draft</Button>
                  <Button
                    type='button'
                    onClick={(e) =>
                      handlePublish({ ...e, currentTarget: e.currentTarget.form } as React.FormEvent<HTMLFormElement>)
                    }
                  >
                    Publish
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Input
            placeholder='Search by title, excerpt, category or tags...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className='w-full max-w-sm'
            type='search'
          />
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Filter className='mr-2 h-4 w-4' />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[300px] p-4'>
                <DropdownMenuLabel className='font-semibold'>Filters</DropdownMenuLabel>
                <p className='text-sm text-muted-foreground mb-4'>Filter blog posts by featured status and category.</p>
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Featured Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.featured.yes}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        featured: { ...prev.featured, yes: checked }
                      }))
                    }
                  >
                    Featured
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.featured.no}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        featured: { ...prev.featured, no: checked }
                      }))
                    }
                  >
                    Not Featured
                  </DropdownMenuCheckboxItem>
                </div>
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Category</DropdownMenuLabel>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className='mt-2'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=''>All Categories</SelectItem>
                      <SelectItem value='vaccine science'>Vaccine Science</SelectItem>
                      <SelectItem value='influenza'>Influenza</SelectItem>
                      <SelectItem value='travel'>Travel</SelectItem>
                      <SelectItem value='pediatric'>Pediatric</SelectItem>
                      <SelectItem value='geriatric'>Geriatric</SelectItem>
                      <SelectItem value='covid-19'>COVID-19</SelectItem>
                      <SelectItem value='respiratory health'>Respiratory Health</SelectItem>
                      <SelectItem value='preventive care'>Preventive Care</SelectItem>
                      <SelectItem value='cancer prevention'>Cancer Prevention</SelectItem>
                      <SelectItem value='maternal health'>Maternal Health</SelectItem>
                      <SelectItem value='global health'>Global Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and Table */}
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as 'all' | 'published' | 'drafts')}
          className='w-full'
        >
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>All Posts</TabsTrigger>
            <TabsTrigger value='published'>Published</TabsTrigger>
            <TabsTrigger value='drafts'>Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedPosts.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No blog posts found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPosts.map((post, index) => (
                        <TableRow key={post.id} className='cursor-pointer hover:bg-muted/50'>
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='font-medium'>{post.title}</div>
                            <div className='text-sm text-muted-foreground truncate max-w-[300px]'>{post.excerpt}</div>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{getStatusBadge(post.status)}</TableCell>
                          <TableCell>{post.publishDate || '—'}</TableCell>
                          <TableCell>{post.featured ? 'Yes' : 'No'}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setOpenOverviewDialog(true)
                                  }}
                                >
                                  <Eye className='mr-2 h-4 w-4' />
                                  View Overview
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setEditImage(null)
                                    setEditContent(post.content)
                                    setOpenEditDialog(true)
                                  }}
                                >
                                  <Edit className='mr-2 h-4 w-4' />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className='text-red-600'
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='published' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedPosts.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No published posts found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPosts.map((post, index) => (
                        <TableRow key={post.id} className='cursor-pointer hover:bg-muted/50'>
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='font-medium'>{post.title}</div>
                            <div className='text-sm text-muted-foreground truncate max-w-[300px]'>{post.excerpt}</div>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.publishDate}</TableCell>
                          <TableCell>{post.featured ? 'Yes' : 'No'}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setOpenOverviewDialog(true)
                                  }}
                                >
                                  <Eye className='mr-2 h-4 w-4' />
                                  View Overview
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setEditImage(null)
                                    setEditContent(post.content)
                                    setOpenEditDialog(true)
                                  }}
                                >
                                  <Edit className='mr-2 h-4 w-4' />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className='text-red-600'
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='drafts' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedPosts.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No draft posts found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPosts.map((post, index) => (
                        <TableRow key={post.id} className='cursor-pointer hover:bg-muted/50'>
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='font-medium'>{post.title}</div>
                            <div className='text-sm text-muted-foreground truncate max-w-[300px]'>{post.excerpt}</div>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>—</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setOpenOverviewDialog(true)
                                  }}
                                >
                                  <Eye className='mr-2 h-4 w-4' />
                                  View Overview
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPost(post)
                                    setEditImage(null)
                                    setEditContent(post.content)
                                    setOpenEditDialog(true)
                                  }}
                                >
                                  <Edit className='mr-2 h-4 w-4' />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className='text-red-600'
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {paginatedPosts.length > 0 && (
          <div className='mb-[2rem] fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm'>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>

      {/* Overview Dialog */}
      <Dialog open={openOverviewDialog} onOpenChange={setOpenOverviewDialog}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>Overview of the selected blog post.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label>Featured Image</Label>
              <div className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center'>
                {selectedPost?.image ? (
                  <img src={selectedPost.image || '/placeholder.svg'} alt='Featured' className='max-h-32 mx-auto' />
                ) : (
                  <p className='text-muted-foreground'>No image uploaded</p>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Excerpt</Label>
              <p>{selectedPost?.excerpt}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Author</Label>
              <p>{selectedPost?.author}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Category</Label>
              <p>{selectedPost?.category}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Tags</Label>
              <p>{selectedPost?.tags.join(', ')}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Status</Label>
              <div>{selectedPost ? getStatusBadge(selectedPost.status) : '—'}</div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Published Date</Label>
              <p>{selectedPost?.publishDate || '—'}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Featured</Label>
              <p>{selectedPost?.featured ? 'Yes' : 'No'}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Content</Label>
              <div dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenOverviewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Modify the details of your blog post.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveChanges}>
            <div className='grid gap-4 py-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-title'>Title</Label>
                <Input id='edit-title' name='edit-title' defaultValue={selectedPost?.title} required />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-slug'>Slug</Label>
                  <Input id='edit-slug' name='edit-slug' defaultValue={selectedPost?.slug} required />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-category'>Category</Label>
                  <Select name='edit-category' defaultValue={selectedPost?.category.toLowerCase()} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='vaccine science'>Vaccine Science</SelectItem>
                      <SelectItem value='influenza'>Influenza</SelectItem>
                      <SelectItem value='travel'>Travel</SelectItem>
                      <SelectItem value='pediatric'>Pediatric</SelectItem>
                      <SelectItem value='geriatric'>Geriatric</SelectItem>
                      <SelectItem value='covid-19'>COVID-19</SelectItem>
                      <SelectItem value='respiratory health'>Respiratory Health</SelectItem>
                      <SelectItem value='preventive care'>Preventive Care</SelectItem>
                      <SelectItem value='cancer prevention'>Cancer Prevention</SelectItem>
                      <SelectItem value='maternal health'>Maternal Health</SelectItem>
                      <SelectItem value='global health'>Global Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-excerpt'>Excerpt</Label>
                <Textarea
                  id='edit-excerpt'
                  name='edit-excerpt'
                  defaultValue={selectedPost?.excerpt}
                  rows={2}
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-content'>Content</Label>
                <Textarea
                  id='edit-content'
                  name='edit-content'
                  className='border border-gray-300 p-2 min-h-[200px] rounded-md focus:outline-none'
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
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
                    <img
                      src={URL.createObjectURL(editImage) || '/placeholder.svg'}
                      alt='Featured'
                      className='max-h-32 mx-auto'
                    />
                  ) : selectedPost?.image ? (
                    <img src={selectedPost.image || '/placeholder.svg'} alt='Featured' className='max-h-32 mx-auto' />
                  ) : (
                    <p className='text-muted-foreground'>Drag and drop an image here or click to select</p>
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
                <Label htmlFor='edit-tags'>Tags (comma separated)</Label>
                <Input id='edit-tags' name='edit-tags' defaultValue={selectedPost?.tags.join(', ')} required />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-status'>Status</Label>
                  <Select name='edit-status' defaultValue={selectedPost?.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-featured'>Featured</Label>
                  <Select name='edit-featured' defaultValue={selectedPost?.featured.toString()}>
                    <SelectTrigger>
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
              <Button variant='outline' onClick={() => setOpenEditDialog(false)}>
                Cancel
              </Button>
              <Button type='submit'>Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedPost && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedPost.title}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import { useState, useMemo, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, MoreHorizontal, Edit, Trash, Eye, ChevronLeft, ChevronRight, RefreshCw, Filter, Download, Search, AlertCircle } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Sample data with 12 blog posts, including image URLs
const initialBlogPosts = [
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

// Hằng số phân trang
const ROWS_PER_PAGE = 10

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openOverviewDialog, setOpenOverviewDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newImage, setNewImage] = useState(null)
  const [editImage, setEditImage] = useState(null)
  const [currentTab, setCurrentTab] = useState('all')
  const [newContent, setNewContent] = useState('')
  const [editContent, setEditContent] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    featured: { yes: false, no: false },
    category: ''
  })

  // Hàm lọc dữ liệu
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

      const matchesCategory =
        !filters.category || post.category.toLowerCase() === filters.category.toLowerCase()

      return matchesSearch && matchesTab && matchesFeatured && matchesCategory
    })
  }, [blogPosts, searchTerm, currentTab, filters])

  // Phân trang
  const totalPages = Math.ceil(filteredPosts.length / ROWS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  // Đặt lại trang nếu vượt quá tổng số trang
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Hàm hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    return status === 'Published' ? (
      <Badge className='bg-green-500 hover:bg-green-600'>Published</Badge>
    ) : (
      <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
        Draft
      </Badge>
    )
  }

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (
    e,
    isEdit
  ) => {
    e.preventDefault()
    const file =
      e.type === 'change'
        ? e.target.files?.[0]
        : e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      isEdit ? setEditImage(file) : setNewImage(file)
    }
  }

  // Xử lý áp dụng kiểu cho nội dung
  const applyContentStyle = (style, value, isEdit = false) => {
    const contentInput = document.getElementById(isEdit ? 'edit-content' : 'content')
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

  // Xuất dữ liệu ra Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPosts)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Blog Posts')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'blog-posts.xlsx')
  }

  // Xử lý làm mới dữ liệu với hiệu ứng loading
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

  // Xử lý xóa bộ lọc
  const handleClearFilters = () => {
    setFilters({
      featured: { yes: false, no: false },
      category: ''
    })
    setCurrentPage(1)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Tiêu đề và nút hành động */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>Blog </h1>
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
              <Button size='sm' className='h-9 '>
                <Plus className='mr-2 h-4 w-4' />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Create a new blog post to publish on your website.
                </DialogDescription>
              </DialogHeader>
              <form>
                <div className='grid gap-4 py-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title' placeholder='Enter blog post title' />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='slug'>Slug</Label>
                      <Input id='slug' placeholder='Enter URL slug' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='category'>Category</Label>
                      <Select>
                        <SelectTrigger>
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
                    <Label htmlFor='excerpt'>Excerpt</Label>
                    <Textarea id='excerpt' placeholder='Enter a brief summary' rows={2} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='content'>Content</Label>
                    <div className='flex flex-wrap gap-2 mb-2 bg-white p-2 border border-gray-300 rounded-md'>
                      <Select onValueChange={(value) => applyContentStyle('fontName', value, false)}>
                        <SelectTrigger className='w-[120px]'>
                          <SelectValue placeholder='Font' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
                          <SelectItem value='Arial'>Arial</SelectItem>
                          <SelectItem value='Verdana'>Verdana</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={(value) => applyContentStyle('fontSize', value, false)}>
                        <SelectTrigger className='w-[80px]'>
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
                      >
                        <b>B</b>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => applyContentStyle('italic', undefined, false)}
                      >
                        <i>I</i>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => applyContentStyle('underline', undefined, false)}
                      >
                        <u>U</u>
                      </Button>
                      <Select onValueChange={(value) => applyContentStyle('foreColor', value, false)}>
                        <SelectTrigger className='w-[80px]'>
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
                      >
                        <span>Left</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => applyContentStyle('justifyCenter', undefined, false)}
                      >
                        <span>Center</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => applyContentStyle('justifyRight', undefined, false)}
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
                        <img src={URL.createObjectURL(newImage) || "/placeholder.svg"} alt='Featured' className='max-h-32 mx-auto' />
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
                    <Input id='tags' placeholder='e.g., Vaccination, Health' />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='status'>Status</Label>
                      <Select defaultValue='draft'>
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
                      <Select defaultValue='false'>
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
                  <Button onClick={() => setOpenAddDialog(false)}>
                    Save Draft
                  </Button>
                  <Button  onClick={() => setOpenAddDialog(false)}>
                    Publish
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tìm kiếm và bộ lọc */}
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
                <p className='text-sm text-muted-foreground mb-4'>
                  Filter blog posts by featured status and category.
                </p>

                {/* Bộ lọc trạng thái featured */}
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

                {/* Bộ lọc theo danh mục */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Category</DropdownMenuLabel>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
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

                {/* Nút xóa bộ lọc */}
                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs và Bảng dữ liệu */}
        <Tabs defaultValue='all' onValueChange={setCurrentTab} className='w-full'>
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

        {/* Phân trang cố định */}
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

      {/* Dialog xem tổng quan */}
      <Dialog open={openOverviewDialog} onOpenChange={setOpenOverviewDialog}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Overview of the selected blog post.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label>Featured Image</Label>
              <div className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center'>
                {selectedPost?.image ? (
                  <img src={selectedPost.image || "/placeholder.svg"} alt='Featured' className='max-h-32 mx-auto' />
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
              <div>{getStatusBadge(selectedPost?.status)}</div>
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

      {/* Dialog chỉnh sửa */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Modify the details of your blog post.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className='grid gap-4 py-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-title'>Title</Label>
                <Input id='edit-title' defaultValue={selectedPost?.title} />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-slug'>Slug</Label>
                  <Input id='edit-slug' defaultValue={selectedPost?.slug} />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-category'>Category</Label>
                  <Select defaultValue={selectedPost?.category.toLowerCase()}>
                    <SelectTrigger>
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
                <Label htmlFor='edit-excerpt'>Excerpt</Label>
                <Textarea id='edit-excerpt' defaultValue={selectedPost?.excerpt} rows={2} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-content'>Content</Label>
                <div className='flex flex-wrap gap-2 mb-2 bg-white p-2 border border-gray-300 rounded-md'>
                  <Select onValueChange={(value) => applyContentStyle('fontName', value, true)}>
                    <SelectTrigger className='w-[120px]'>
                      <SelectValue placeholder='Font' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
                      <SelectItem value='Arial'>Arial</SelectItem>
                      <SelectItem value='Verdana'>Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => applyContentStyle('fontSize', value, true)}>
                    <SelectTrigger className='w-[80px]'>
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
                  >
                    <b>B</b>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('italic', undefined, true)}
                  >
                    <i>I</i>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('underline', undefined, true)}
                  >
                    <u>U</u>
                  </Button>
                  <Select onValueChange={(value) => applyContentStyle('foreColor', value, true)}>
                    <SelectTrigger className='w-[80px]'>
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
                    onClick={() => applyContentStyle('justifyLeft', undefined, true)}
                  >
                    <span>Left</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('justifyCenter', undefined, true)}
                  >
                    <span>Center</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => applyContentStyle('justifyRight', undefined, true)}
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
                    <img src={URL.createObjectURL(editImage) || "/placeholder.svg"} alt='Featured' className='max-h-32 mx-auto' />
                  ) : selectedPost?.image ? (
                    <img src={selectedPost.image || "/placeholder.svg"} alt='Featured' className='max-h-32 mx-auto' />
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
                <Input id='edit-tags' defaultValue={selectedPost?.tags.join(', ')} />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='edit-status'>Status</Label>
                  <Select defaultValue={selectedPost?.status.toLowerCase()}>
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
                  <Select defaultValue={selectedPost?.featured.toString()}>
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
              <Button onClick={() => setOpenEditDialog(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog xóa */}
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
            <Button variant='destructive' onClick={() => setOpenDeleteDialog(false)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

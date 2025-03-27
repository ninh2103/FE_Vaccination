import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Download, RefreshCw } from 'lucide-react'
import { BlogTable } from './BlogTable'
import { AddBlog } from './AddBlog'
import { UpdateBlog } from './UpdateBlog'
import * as XLSX from 'xlsx'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    },
    {
      id: 1,
      title: 'Understanding COVID-19 Vaccines',
      slug: 'understanding-covid-19-vaccines',
      excerpt: 'A comprehensive guide to COVID-19 vaccines and their effectiveness.',
      content: '<p>Detailed content about COVID-19 vaccines...</p>',
      author: 'Dr. Sarah Johnson',
      category: 'COVID-19',
      tags: ['Vaccination', 'COVID-19', 'Public Health'],
      status: 'Published',
      publishDate: '2024-03-15',
      readTime: '5 min',
      featured: true,
      image: null
    }
    // Add more sample posts as needed
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddPost = (newPost: Omit<BlogPost, 'id'>) => {
    const post: BlogPost = {
      ...newPost,
      id: posts.length + 1
    }
    setPosts((prev) => [...prev, post])
    setIsAddDialogOpen(false)
  }

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
    setIsUpdateDialogOpen(false)
    setSelectedPost(null)
  }

  const handleDeletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  const handleViewPost = (id: number) => {
    // TODO: Implement view functionality
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsUpdateDialogOpen(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleExportExcel = () => {
    setIsExporting(true)
    setTimeout(() => {
      const exportData = posts.map((post) => ({
        Title: post.title,
        Category: post.category,
        Author: post.author,
        Status: post.status,
        'Publish Date': post.publishDate || 'Not published',
        Tags: post.tags.join(', '),
        Featured: post.featured ? 'Yes' : 'No'
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Blog Posts')
      XLSX.writeFile(wb, 'blog_posts.xlsx')
      setIsExporting(false)
    }, 1000)
  }

  const handleRefresh = () => {
    // TODO: Implement refresh functionality (e.g., fetch from API)
    setCurrentPage(1)
    setSearchQuery('')
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredPosts.length / rowsPerPage)

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Blogs</h1>
          <p className='text-muted-foreground'>Manage and monitor blogs in your system.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExportExcel} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Refresh
          </Button>
          <Button size='sm' onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Blog
          </Button>
        </div>
      </div>

      <div className='mb-6 py-6'>
        <div className='relative w-64'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search posts...' value={searchQuery} onChange={handleSearch} className='pl-8' />
        </div>
      </div>

      <BlogTable
        posts={filteredPosts}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onView={handleViewPost}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />

      {totalPages > 1 && (
        <div className='flex justify-center gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className='flex items-center px-4'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <AddBlog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddPost} />

      <UpdateBlog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onSubmit={handleUpdatePost}
        post={selectedPost}
      />
    </div>
  )
}

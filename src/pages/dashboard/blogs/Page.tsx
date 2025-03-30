import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Download, RefreshCw } from 'lucide-react'
import { BlogTable, type BlogPost } from './BlogTable'
import { AddBlog } from './AddBlog'
import { UpdateBlog } from './UpdateBlog'
import * as XLSX from 'xlsx'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useDeleteBlogMutation, useListBlogQuery } from '@/queries/useBlog'
import { toast } from 'sonner'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'

export const BlogPage: React.FC = () => {
  const { refetch } = useListBlogQuery()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const { data: blogs, isLoading: isLoadingBlogs } = useListBlogQuery()
  const { mutate: deleteBlog } = useDeleteBlogMutation()

  useEffect(() => {
    if (blogs?.data) {
      const transformedPosts = blogs.data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        userId: blog.userId,
        tagId: blog.tagId
      }))
      setPosts(transformedPosts)
    }
  }, [blogs])

  const handleAddPost = (newPost: Omit<BlogPost, 'id'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString()
    }
    setPosts((prev) => [...prev, post])
    setIsAddDialogOpen(false)
  }

  const handleDeletePost = (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (post) {
      setSelectedPost(post)
      setOpenDeleteDialog(true)
    }
  }

  const handleConfirmDelete = () => {
    if (!selectedPost) return
    deleteBlog(selectedPost.id, {
      onSuccess: () => {
        setPosts(posts.filter((post) => post.id !== selectedPost.id))
        setOpenDeleteDialog(false)
        setSelectedPost(null)
        toast.success('Blog post has been deleted successfully.')
      }
    })
  }

  const handleViewPost = (id: string) => {
    const post = blogs?.data.find((blog) => blog.id === id)
    if (post) {
      setSelectedPost(post)
      setIsUpdateDialogOpen(true)
    }
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
        Content: post.content,
        'Created At': new Date(post.createdAt).toLocaleDateString(),
        'Updated At': new Date(post.updatedAt).toLocaleDateString(),
        'User ID': post.userId,
        'Tag ID': post.tagId
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Blog Posts')
      XLSX.writeFile(wb, 'blog_posts.xlsx')
      setIsExporting(false)
      toast.success('Blog posts have been exported to Excel successfully.')
    }, 1000)
  }

  const handleRefresh = () => {
    refetch()
    setCurrentPage(1)
    setSearchQuery('')
    toast.success('Data has been refreshed.')
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoadingBlogs}>
            {isLoadingBlogs ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
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
        isLoading={isLoadingBlogs}
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

      <UpdateBlog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen} id={selectedPost?.id ?? ''} />

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedPost && (
              <div className='flex items-center gap-4'>
                <div>
                  <p className='font-medium'>{selectedPost.title}</p>
                  <p className='text-sm text-muted-foreground'>{selectedPost.content}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isLoadingBlogs}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={isLoadingBlogs}>
              {isLoadingBlogs ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoadingBlogs ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

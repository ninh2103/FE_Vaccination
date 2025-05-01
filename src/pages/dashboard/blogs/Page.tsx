'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Download, RefreshCw, X, Loader2, Calendar, Tag } from 'lucide-react'
import { BlogTable, type BlogPost } from './BlogTable'
import { AddBlog } from './AddBlog'
import { UpdateBlog } from './UpdateBlog'
import * as XLSX from 'xlsx'
import { useDeleteBlogMutation, useListBlogQuery } from '@/queries/useBlog'
import { useListTagQuery } from '@/queries/useTag'
import { toast } from 'sonner'
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [isExporting, setIsExporting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { data: tags } = useListTagQuery()
  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    refetch
  } = useListBlogQuery({
    page: currentPage,
    items_per_page: rowsPerPage,
    search: searchQuery
  })

  const { mutate: deleteBlog } = useDeleteBlogMutation()

  useEffect(() => {
    if (blogs?.data) {
      let filteredPosts = blogs.data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        userId: blog.userId,
        tagId: blog.tagId,
        tag: blog.tag
      }))

      if (selectedTag !== 'all') {
        filteredPosts = filteredPosts.filter((post) => post.tagId === selectedTag)
      }

      setPosts(filteredPosts)
    }
  }, [blogs, selectedTag])

  const handleAddPost = (newPost: Omit<BlogPost, 'id'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString()
    }
    setPosts((prev) => [post, ...prev])
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
    if (!selectedPost) {
      setOpenDeleteDialog(false)
      return
    }
    deleteBlog(selectedPost.id, {
      onSuccess: () => {
        setPosts(posts.filter((post) => post.id !== selectedPost.id))
        setOpenDeleteDialog(false)
        setSelectedPost(null)
        toast.success('Bài viết đã được xóa thành công')
      },
      onError: () => {
        toast.error('Có lỗi xảy ra khi xóa bài viết')
      }
    })
  }

  const handleViewPost = (id: string) => {
    const post = blogs?.data?.find((blog) => blog.id === id)
    if (post) {
      setSelectedPost({
        ...post
      })
    }
    setIsViewDialogOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsUpdateDialogOpen(true)
  }

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
    setIsUpdateDialogOpen(false)
    setSelectedPost(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    setCurrentPage(1)
  }

  const handleExportExcel = () => {
    if (posts.length === 0) {
      toast.error('Không có bài viết nào để xuất')
      return
    }

    setIsExporting(true)
    setTimeout(() => {
      try {
        const exportData = posts.map((post, index) => ({
          STT: index + 1,
          'Tiêu đề': post.title,
          'Nội dung': post.content.replace(/<[^>]*>/g, ''),
          Tag: post.tag.name,
          'Ngày tạo': new Date(post.createdAt).toLocaleDateString(),
          'Ngày cập nhật': new Date(post.updatedAt).toLocaleDateString()
        }))

        const worksheet = XLSX.utils.json_to_sheet([])

        XLSX.utils.sheet_add_aoa(worksheet, [['CÔNG TY CỔ PHẦN BLOG']], { origin: 'A1' })
        XLSX.utils.sheet_add_aoa(worksheet, [['Địa chỉ: 123 Đường Blog, Quận Blog, TP Blog']], {
          origin: 'A2'
        })

        XLSX.utils.sheet_add_aoa(worksheet, [['BÁO CÁO BÀI VIẾT BLOG']], { origin: 'A4' })
        const currentDate = new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
        XLSX.utils.sheet_add_aoa(worksheet, [[`Ngày: ${currentDate}`]], { origin: 'A5' })

        const header = ['STT', 'Tiêu đề', 'Nội dung', 'Tag', 'Ngày tạo', 'Ngày cập nhật']
        XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A7' })
        XLSX.utils.sheet_add_json(worksheet, exportData, { origin: 'A8', skipHeader: true })

        worksheet['!cols'] = [{ wch: 5 }, { wch: 40 }, { wch: 60 }, { wch: 20 }, { wch: 15 }, { wch: 15 }]

        worksheet['A1'].s = {
          font: { bold: true, sz: 14 },
          alignment: { horizontal: 'left' }
        }
        worksheet['A2'].s = {
          font: { bold: false, sz: 12 },
          alignment: { horizontal: 'left' }
        }
        worksheet['A4'].s = {
          font: { bold: true, sz: 14 },
          alignment: { horizontal: 'left' }
        }
        worksheet['A5'].s = {
          font: { bold: false, sz: 12 },
          alignment: { horizontal: 'left' }
        }

        header.forEach((_, index) => {
          const cell = XLSX.utils.encode_cell({ r: 6, c: index })
          worksheet[cell].s = {
            font: { bold: true, sz: 12 },
            alignment: { horizontal: 'center' },
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          }
        })

        exportData.forEach((_, rowIndex) => {
          header.forEach((__, colIndex) => {
            const cell = XLSX.utils.encode_cell({ r: rowIndex + 7, c: colIndex })
            if (worksheet[cell]) {
              worksheet[cell].s = {
                font: { sz: 12 },
                alignment: {
                  horizontal: colIndex === 0 || colIndex === 4 || colIndex === 5 ? 'center' : 'left',
                  vertical: 'center',
                  wrapText: true
                },
                border: {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
              }
            }
          })
        })

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Blog Posts')
        XLSX.writeFile(workbook, 'blog_posts.xlsx')
        toast.success('Tất cả đã được xuất ra Excel thành công.')
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xuất Excel')
      } finally {
        setIsExporting(false)
      }
    }, 1000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchQuery('')
      setSelectedTag('all')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Dữ liệu đã được cập nhật.')
    })
  }

  const totalPages = Math.ceil((blogs?.total ?? 0) / rowsPerPage)
  const totalItems = blogs?.total ?? 0
  const startIndex = (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems)

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Blogs
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi blog trong hệ thống của bạn.</p>
        </div>
      </div>

      <div className='mb-6 py-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm theo tiêu đề...'
              value={searchQuery}
              onChange={handleSearch}
              className='w-full pl-8 pr-8'
              type='search'
            />
            {searchQuery && (
              <Button
                variant='ghost'
                size='icon'
                className='absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7'
                onClick={clearSearch}
              >
                <X className='h-4 w-4' />
              </Button>
            )}
            <style>
              {`
                input[type="search"]::-webkit-search-cancel-button {
                  -webkit-appearance: none;
                  display: none;
                }
              `}
            </style>
          </div>
          <Select value={selectedTag} onValueChange={handleTagChange}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Lọc theo tag' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả tag</SelectItem>
              {tags?.data?.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExportExcel} disabled={isExporting}>
            {isExporting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
            Xuất ra Excel
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Cập nhật
          </Button>
          <Button size='sm' onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Thêm blog
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <BlogTable
          posts={posts}
          onView={handleViewPost}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          isLoading={isLoadingBlogs}
        />

        {totalPages > 1 && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {startIndex} đến {endIndex} của {totalItems} bài viết
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trang trước
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className='min-w-[2.5rem]'
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      <AddBlog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddPost} />

      {selectedPost && (
        <UpdateBlog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          blog={selectedPost}
          onSubmit={handleUpdatePost}
        />
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedPost && (
          <DialogContent className='sm:max-w-[700px] max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='text-2xl'>{selectedPost.title}</DialogTitle>
              <DialogDescription className='flex items-center gap-4 mt-2'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Tag className='h-4 w-4 text-muted-foreground' />
                  <Badge variant='outline'>{selectedPost.tag.name}</Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className='py-4'>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }}
              />
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setIsViewDialogOpen(false)}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className='sm:max-w-[425px]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa blog</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='py-4'>
            {selectedPost && (
              <div className='flex items-center gap-4'>
                <div>
                  <p className='font-medium'>{selectedPost.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {selectedPost.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                </div>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)} disabled={isLoadingBlogs}>
              Hủy bỏ
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isLoadingBlogs}>
              {isLoadingBlogs ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              {isLoadingBlogs ? 'Đang xóa...' : 'Xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

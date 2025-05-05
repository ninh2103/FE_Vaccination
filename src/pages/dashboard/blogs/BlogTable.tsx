'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export interface BlogPost {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  userId: string
  tagId: string
  tag: {
    id: string
    name: string
  }
}

interface BlogTableProps {
  posts: BlogPost[]
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

const POSTS_PER_PAGE = 10

export function BlogTable({ posts, onEdit, onDelete, isLoading }: BlogTableProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardContent className='p-0'>
          {posts.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>Không tìm thấy bài viết.</div>
          ) : (
            <>
              <Table className='text-sm'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='px-1 w-[30px] text-center'>STT</TableHead>
                    <TableHead className='px-2 w-[150px]'>Tiêu đề</TableHead>
                    <TableHead className='px-2 w-[300px]'>Nội dung</TableHead>
                    <TableHead className='px-2 w-[100px]'>Tag</TableHead>
                    <TableHead className='px-2 w-[120px] whitespace-nowrap'>Ngày tạo</TableHead>
                    <TableHead className='px-2 w-[120px] whitespace-nowrap'>Ngày cập nhật</TableHead>
                    <TableHead className='px-2 w-[120px] text-center'>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.map((post, index) => (
                    <TableRow key={post.id} className='hover:bg-muted/50 text-sm'>
                      <TableCell className='px-1 text-center'>
                        {(currentPage - 1) * POSTS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell
                        className='px-2 max-w-[150px] font-semibold text-black truncate hover:underline cursor-pointer'
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </TableCell>
                      <TableCell className='px-2 max-w-[300px] truncate'>
                        {post.content || 'Không có nội dung'}
                      </TableCell>
                      <TableCell className='px-2'>{post.tag?.name || 'N/A'}</TableCell>
                      <TableCell className='px-2'>
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell className='px-2'>
                        {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell className='px-2 text-center space-x-2'>
  <Button
    variant='ghost'
    size='icon'
    onClick={() => onEdit(post)}
  >
    <Edit className='h-4 w-4' />
  </Button>
  <Button
    variant='ghost'
    size='icon'
    onClick={() => onDelete(post.id)}
  >
    <Trash className='h-4 w-4 text-red-500' />
  </Button>
</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table> 
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog chi tiết bài viết */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className='overflow-y-auto max-h-[80vh] sm:max-w-[600px] w-full'>
          <DialogHeader>
            <DialogTitle>Chi tiết bài viết</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className='space-y-2 text-sm'>
              <p><strong>Tiêu đề:</strong> {selectedPost.title}</p>
              <p><strong>Nội dung:</strong> {selectedPost.content}</p>
              <p><strong>Tag:</strong> {selectedPost.tag?.name}</p>
              <p><strong>Ngày tạo:</strong> {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}</p>
              <p><strong>Ngày cập nhật:</strong> {new Date(selectedPost.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

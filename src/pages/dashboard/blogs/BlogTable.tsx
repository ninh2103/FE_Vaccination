'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

export function BlogTable({ posts, onEdit, onDelete, isLoading }: BlogTableProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

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
            <div className='overflow-y-auto max-h-[400px]'>
              {' '}
              {/* Đảm bảo bảng có thể cuộn theo chiều dọc */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Tag</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Ngày cập nhật</TableHead>
                    <TableHead className='text-center'>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post, index) => (
                    <TableRow key={post.id} className='whitespace-nowrap'>
                      <TableCell className='max-w-[50px] truncate'>{index + 1}</TableCell>

                      {/* Tiêu đề bài viết, khi click sẽ hiển thị chi tiết */}
                      <TableCell
                        className='px-2 truncate whitespace-nowrap max-w-[120px] font-semibold text-black hover:underline cursor-pointer'
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </TableCell>

                      <TableCell className='max-w-[300px] truncate'>{post.content}</TableCell>
                      <TableCell className='max-w-[150px] truncate'>{post.tag.name}</TableCell>
                      <TableCell className='max-w-[140px] truncate'>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='max-w-[140px] truncate'>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </TableCell>

                      {/* Nút hành động: Sửa và Xoá */}
                      <TableCell className='text-center sticky top-0 bg-white z-10'>
                        {' '}
                        {/* Dùng sticky để các nút luôn hiển thị */}
                        <div className='flex justify-center gap-2'>
                          <Button variant='outline' size='sm' onClick={() => onEdit(post)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Sửa
                          </Button>
                          <Button variant='destructive' size='sm' onClick={() => onDelete(post.id)}>
                            <Trash className='mr-2 h-4 w-4' />
                            Xoá
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog chi tiết bài viết */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className='overflow-y-auto max-h-[80vh] sm:max-w-[600px] w-full'>
            <DialogHeader>
              <DialogTitle>Chi tiết bài viết</DialogTitle>
            </DialogHeader>
            <div className='flex-1 overflow-y-auto'>
              <p>
                <strong>Tiêu đề:</strong> {selectedPost.title}
              </p>
              <p>
                <strong>Nội dung:</strong> {selectedPost.content}
              </p>
              <p>
                <strong>Tag:</strong> {selectedPost.tag.name}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}
              </p>
              <p>
                <strong>Ngày cập nhật:</strong> {new Date(selectedPost.updatedAt).toLocaleString()}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

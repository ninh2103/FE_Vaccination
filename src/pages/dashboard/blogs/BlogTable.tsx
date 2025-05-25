import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import parse from 'html-react-parser'

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
  onView: (id: string) => void
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export function BlogTable({ posts, onView, onEdit, onDelete, isLoading }: BlogTableProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }

  return (
    <Card>
      <CardContent className='p-0'>
        {posts.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>Không tìm thấy bài viết.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px] text-center'>STT</TableHead>
                <TableHead className='text-left'>Tiêu đề</TableHead>
                <TableHead className='text-left '>Nội dung</TableHead>
                <TableHead className='text-left '>Tag</TableHead>
                <TableHead className='text-center '>Ngày tạo</TableHead>
                <TableHead className='text-center '>Ngày cập nhật</TableHead>
                <TableHead className='text-center w-[100px]'>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow
                  key={post.id}
                  className='cursor-pointer hover:bg-muted/50 transition'
                  onClick={() => onView(post.id)}
                >
                  <TableCell className='text-center font-semibold'>{index + 1}</TableCell>
                  <TableCell className='text-left font-medium'>{post.title}</TableCell>
                  <TableCell className='text-left'>
                    <div className='line-clamp-2 text-sm text-muted-foreground max-w-[280px]'>
                      {parse(post.content)}
                    </div>
                  </TableCell>
                  <TableCell className='text-left'>{post.tag.name}</TableCell>
                  <TableCell className='text-center text-sm'>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className='text-center text-sm'>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className='text-center'>
                    <div className='flex justify-center items-center gap-2' onClick={(e) => e.stopPropagation()}>
                      <Button variant='ghost' size='icon' onClick={() => onEdit(post)}>
                        <Edit className='h-4 w-4 text-primary' />
                      </Button>
                      <Button variant='ghost' size='icon' onClick={() => onDelete(post.id)}>
                        <Trash className='h-4 w-4 text-red-500' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, Edit, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell className='font-medium'>{post.title}</TableCell>
                <TableCell>{post.content.substring(0, 100)}...</TableCell>
                <TableCell>{post.tag.name}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => onView(post.id)}>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onEdit(post)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onDelete(post.id)}>
                      <Trash className='h-4 w-4 text-destructive text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

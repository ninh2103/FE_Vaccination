import React from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Eye, Edit, Trash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'

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

interface BlogTableProps {
  posts: BlogPost[]
  currentPage: number
  rowsPerPage: number
  onView: (id: number) => void
  onEdit: (post: BlogPost) => void
  onDelete: (id: number) => void
}

export function BlogTable({ posts, currentPage, rowsPerPage, onView, onEdit, onDelete }: BlogTableProps) {
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const getStatusBadge = (status: 'Published' | 'Draft') => {
    return status === 'Published' ? (
      <Badge variant='default'>Published</Badge>
    ) : (
      <Badge variant='secondary'>Draft</Badge>
    )
  }

  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className='font-medium'>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{getStatusBadge(post.status)}</TableCell>
                <TableCell>{post.publishDate || 'Not published'}</TableCell>
                <TableCell>
                  <div className='flex flex-wrap gap-1'>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant='outline'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{post.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => onView(post.id)}>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onEdit(post)}>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => onDelete(post.id)}>
                      <Trash className='h-4 w-4 text-destructive' />
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

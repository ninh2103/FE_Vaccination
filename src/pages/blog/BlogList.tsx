import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface BlogPost {
  id: string
  title: string
  tag: {
    id: string
    name: string
  }
  createdAt: string
}

const ITEMS_PER_PAGE = 10

const BlogList: React.FC = () => {
  const location = useLocation()
  const currentPostId = location.pathname.split('/').pop()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // This would typically come from an API
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Vắc xin COVID-19: Những điều cần biết về các loại vắc xin phổ biến',
      tag: { id: '101', name: 'COVID-19' },
      createdAt: '2024-03-20T12:00:00Z'
    },
    {
      id: '2',
      title: 'Lịch tiêm chủng cho trẻ sơ sinh và trẻ nhỏ',
      tag: { id: '102', name: 'Pediatrics' },
      createdAt: '2024-03-19T09:30:00Z'
    },
    {
      id: '3',
      title: 'Vắc xin cúm mùa: Tại sao nên tiêm phòng hàng năm?',
      tag: { id: '103', name: 'Flu' },
      createdAt: '2024-03-18T15:45:00Z'
    },
    {
      id: '4',
      title: 'Tác dụng phụ sau tiêm vắc xin: Những điều cần lưu ý',
      tag: { id: '104', name: 'Safety' },
      createdAt: '2024-03-17T11:20:00Z'
    },
    {
      id: '5',
      title: 'Vắc xin HPV: Bảo vệ sức khỏe cho thanh thiếu niên',
      tag: { id: '105', name: 'HPV' },
      createdAt: '2024-03-16T14:15:00Z'
    },
    {
      id: '6',
      title: 'Tiêm phòng cho phụ nữ mang thai: Những vắc xin cần thiết',
      tag: { id: '106', name: 'Pregnancy' },
      createdAt: '2024-03-15T16:30:00Z'
    },
    {
      id: '7',
      title: 'Vắc xin viêm gan B: Tầm quan trọng và lịch tiêm phòng',
      tag: { id: '107', name: 'Hepatitis' },
      createdAt: '2024-03-14T10:00:00Z'
    },
    {
      id: '8',
      title: 'Tiêm phòng cho người cao tuổi: Những vắc xin cần thiết',
      tag: { id: '108', name: 'Elderly' },
      createdAt: '2024-03-13T13:45:00Z'
    },
    {
      id: '9',
      title: 'Vắc xin bạch hầu - ho gà - uốn ván: Bảo vệ toàn diện',
      tag: { id: '109', name: 'DPT' },
      createdAt: '2024-03-12T09:15:00Z'
    },
    {
      id: '10',
      title: 'Tiêm phòng trước khi đi du lịch: Hướng dẫn chi tiết',
      tag: { id: '110', name: 'Travel' },
      createdAt: '2024-03-11T11:30:00Z'
    }
  ]

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className='w-80 border-r h-screen overflow-y-auto flex flex-col scrollbar-hide'>
      <div className='p-4 sticky top-0 bg-background border-b z-10'>
        <h1 className='text-xl font-bold mb-4'>Blog Posts</h1>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search posts...' value={searchQuery} onChange={handleSearch} className='pl-8' />
        </div>
      </div>
      <div className='flex-1 divide-y divide-border overflow-y-auto scrollbar-hide'>
        {currentPosts.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>No posts found matching your search.</div>
        ) : (
          currentPosts.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className={cn('block transition-colors hover:bg-accent/50', currentPostId === post.id && 'bg-accent')}
            >
              <Card className='border-0 shadow-none hover:shadow-none rounded-none'>
                <CardHeader className='p-4 pb-2'>
                  <CardTitle className='text-base line-clamp-2'>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className='p-4 pt-0'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='default' className='text-xs'>
                      {post.tag.name}
                    </Badge>
                    <span className='text-xs text-muted-foreground'>{format(new Date(post.createdAt), 'MMM d')}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
      {filteredPosts.length > 0 && (
        <div className='p-4 border-t bg-background sticky bottom-0'>
          <div className='flex items-center justify-between'>
            <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeft className='h-4 w-4 mr-2' />
              Previous
            </Button>
            <span className='text-sm text-muted-foreground'>
              Page {currentPage} of {totalPages}
            </span>
            <Button variant='outline' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
              <ChevronRight className='h-4 w-4 ml-2' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList

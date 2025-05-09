import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useListBlogQuery } from '@/queries/useBlog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ITEMS_PER_PAGE = 6

const BlogList: React.FC = () => {
  const location = useLocation()
  const currentPostId = location.pathname.split('/').pop()
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: blogs,
    isLoading,
    error
  } = useListBlogQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE
  })

  const blogPosts = blogs?.data || []
  const totalItems = blogs?.total || 0
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className='w-96 border-r border-border/50 h-screen flex flex-col scrollbar-hide mt-12 bg-background/95 backdrop-blur-sm'>
      <div className='p-6 bg-background/80 backdrop-blur-sm border-b border-border/50 z-10 sticky top-0'>
        <h1 className='text-2xl font-bold mb-2 text-foreground text-center tracking-tight'>Danh sách bài viết</h1>
        <p className='text-sm text-muted-foreground text-center'>Khám phá các bài viết mới nhất</p>
      </div>
      <div className='flex-1 overflow-y-auto divide-y divide-border/50 *:scrollbar-hide'>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <LoadingSpinner className='h-8 w-8' />
          </div>
        ) : error ? (
          <div className='p-4 text-center text-destructive'>Lỗi tải bài viết. Vui lòng thử lại.</div>
        ) : blogPosts.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>Không có bài viết nào.</div>
        ) : (
          blogPosts.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className={cn(
                'block transition-all duration-200 hover:bg-accent/30',
                currentPostId === post.id && 'bg-accent/50'
              )}
            >
              <Card className='border-0 shadow-none hover:shadow-sm rounded-none transition-all duration-200'>
                <CardHeader className='p-5 pb-2'>
                  <CardTitle className='text-base font-semibold line-clamp-2 tracking-tight'>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className='p-5 pt-2'>
                  <div className='flex items-center gap-3'>
                    <Badge variant='secondary' className='text-xs px-2.5 py-1 font-medium'>
                      {post.tag?.name}
                    </Badge>
                    <span className='text-xs text-muted-foreground font-medium'>
                      {post.createdAt ? format(new Date(post.createdAt), 'MMM d') : 'No date'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
      {!isLoading && !error && blogPosts.length > 0 && (
        <div className='p-5 border-t bg-background/80 backdrop-blur-sm border-t-border/50 sticky bottom-0 pb-16'>
          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              size='sm'
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='hover:bg-accent transition-colors'
            >
              <ChevronLeft className='h-4 w-4 mr-2' />
              Trang trước
            </Button>
            <span className='text-sm font-medium text-muted-foreground'>
              {currentPage}/{totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='hover:bg-accent transition-colors'
            >
              Trang tiếp
              <ChevronRight className='h-4 w-4 ml-2' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList

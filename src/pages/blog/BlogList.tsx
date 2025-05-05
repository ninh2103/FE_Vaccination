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

const ITEMS_PER_PAGE = 10

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
    <div className='w-80 border-r border-green-500 h-screen overflow-y-auto flex flex-col scrollbar-hide'>
      <div className='p-4 sticky top-0 dark:bg-gray-900/80  bg-background border-b dark:border-green-500 z-10 '>
        <h1 className='text-xl font-bold mb-4 dark:text-green-500 text-center'>Danh sách bài viết</h1>
      </div>
      <div className='flex-1 divide-y divide-border dark:bg-gray-900/80 dark:divide-green-500 *:dark:* overflow-y-auto scrollbar-hide'>
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
              className={cn('block transition-colors hover:bg-accent/50', currentPostId === post.id && 'bg-accent')}
            >
              <Card className='border-0 shadow-none  dark:bg-gray-900/80 hover:shadow-none rounded-none dark:border-green-500'>
                <CardHeader className='p-4 pb-2'>
                  <CardTitle className='text-base line-clamp-2'>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className='p-4 pt-0'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='default' className='text-xs dark:bg-green-500 dark:text-white'>
                      {post.tag?.name}
                    </Badge>
                    <span className='text-xs text-muted-foreground'>
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
        <div className='p-4 border-t dark:bg-gray-900/80 bg-background border-t-green-500 sticky bottom-0'>
          <div className='flex items-center justify-between dark:text-green-500'>
            <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeft className='h-4 w-4 mr-2 dark:text-green-500 dark:hover:text-green-500' />
              Trang trước
            </Button>
            <span className='text-sm text-muted-foreground'>
              {currentPage}/{totalPages}
            </span>
            <Button variant='outline' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
              Trang tiếp
              <ChevronRight className='h-4 w-4 ml-2 dark:text-green-500 dark:hover:text-green-500' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList

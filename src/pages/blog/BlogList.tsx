import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useListBlogQuery } from '@/queries/useBlog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const ITEMS_PER_PAGE = 10
const SEARCH_DEBOUNCE = 500

const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 px-1">$1</mark>')
      }}
    />
  )
}

const BlogList: React.FC = () => {
  const location = useLocation()
  const currentPostId = location.pathname.split('/').pop()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const {
    data: blogResponse,
    isLoading,
    error
  } = useListBlogQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: debouncedSearch
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1)
    }, SEARCH_DEBOUNCE)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const blogPosts = blogResponse?.data || []
  const totalItems = blogResponse?.total || 0
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='w-80 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto flex flex-col scrollbar-hide'>
      {/* Header */}
      <div className='p-4 sticky top-0 dark:bg-gray-900/80 bg-background border-b dark:border-gray-700 z-10'>
        <h1 className='text-xl font-bold mb-4 dark:text-white'>Các bài viết blog</h1>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm...'
            value={searchQuery}
            onChange={handleSearch}
            className='pl-8'
            aria-label='Tìm kiếm bài viết'
          />
        </div>
      </div>

      {/* Blog content */}
      <div className='flex-1 divide-y divide-border dark:bg-gray-900/80 dark:divide-gray-700 *:dark:* overflow-y-auto scrollbar-hide'>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <LoadingSpinner className='h-8 w-8' />
          </div>
        ) : error ? (
          <div className='p-4 text-center text-destructive'>Lỗi khi tải bài viết. Vui lòng thử lại.</div>
        ) : blogPosts.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>
            {debouncedSearch ? 'Không tìm thấy bài viết phù hợp với tìm kiếm.' : 'Không có bài viết nào.'}
          </div>
        ) : (
          blogPosts.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className={cn(
                'block transition-colors hover:bg-accent/50',
                String(currentPostId) === String(post.id) && 'bg-accent'
              )}
            >
              <Card className='border-0 shadow-none dark:bg-gray-900/80 hover:shadow-none rounded-none dark:border-gray-700'>
                <CardHeader className='p-4 pb-2'>
                  <CardTitle className='text-base  truncate'>{highlightText(post.title, debouncedSearch)}</CardTitle>
                </CardHeader>
                <CardContent className='p-4 pt-0'>
                  <div className='flex items-center gap-2'>
                    {post.tag?.name && (
                      <Badge variant='default' className='text-xs dark:bg-gray-600 dark:text-white'>
                        {post.tag.name}
                      </Badge>
                    )}
                    <span className='text-xs text-muted-foreground'>
                      {post.createdAt ? format(new Date(post.createdAt), 'dd/MM/yyyy') : 'Chưa có ngày'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && blogPosts.length > 0 && (
        <div className='p-4 border-t dark:bg-gray-900/80 bg-background border-t-gray-200 dark:border-t-gray-700 sticky bottom-0'>
          <div className='flex items-center justify-between dark:text-white'>
            <Button
              variant='outline'
              size='sm'
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label='Trang trước'
            >
              <ChevronLeft className='h-4 w-4 mr-2' />
              Trang trước
            </Button>
            <span className='text-sm text-muted-foreground'>
              Trang {currentPage} của {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label='Trang tiếp theo'
            >
              Tiếp theo
              <ChevronRight className='h-4 w-4 ml-2' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList

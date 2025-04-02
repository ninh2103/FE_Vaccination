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
const SEARCH_DEBOUNCE = 500 // 500ms delay

const BlogList: React.FC = () => {
  const location = useLocation()
  const currentPostId = location.pathname.split('/').pop()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const {
    data: blogs,
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
      setCurrentPage(1) // Reset to first page when searching
    }, SEARCH_DEBOUNCE)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const blogPosts = blogs?.data || []
  const totalItems = blogs?.total || 0
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
    <div className='w-80 border-r h-screen overflow-y-auto flex flex-col scrollbar-hide'>
      <div className='p-4 sticky top-0 bg-background border-b z-10'>
        <h1 className='text-xl font-bold mb-4'>Blog Posts</h1>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search posts...' value={searchQuery} onChange={handleSearch} className='pl-8' />
        </div>
      </div>
      <div className='flex-1 divide-y divide-border overflow-y-auto scrollbar-hide'>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <LoadingSpinner className='h-8 w-8' />
          </div>
        ) : error ? (
          <div className='p-4 text-center text-destructive'>Error loading blog posts. Please try again.</div>
        ) : blogPosts.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>
            {debouncedSearch ? 'No posts found matching your search.' : 'No blog posts available.'}
          </div>
        ) : (
          blogPosts.map((post) => (
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

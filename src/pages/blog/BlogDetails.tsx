import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Calendar, User } from 'lucide-react'
import { useGetBlogByIdQuery, useListBlogQuery } from '@/queries/useBlog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: blog, isLoading: isLoadingBlog } = useGetBlogByIdQuery(id as string)
  const { data: blogs, isLoading: isLoadingList } = useListBlogQuery({ page: 1, items_per_page: 1 })

  const blogPost = id ? blog : blog || blogs?.data?.[0]
  const isLoading = id ? isLoadingBlog : isLoadingBlog || isLoadingList

  if (isLoading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='flex items-center justify-center text-muted-foreground'>
            <LoadingSpinner className='mr-2 h-10 w-10' />
          </div>
        </div>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='text-center text-muted-foreground'>No blog post found.</div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 h-screen overflow-y-auto scrollbar-hide'>
      <div className='max-w-4xl mx-auto py-8 px-6'>
        <Card className='shadow-lg'>
          <CardContent className='p-8'>
            <div className='mb-8'>
              <h1 className='text-4xl font-bold mb-6 leading-tight'>{blogPost.title}</h1>
              <div className='flex flex-wrap items-center gap-4 mb-6'>
                <Badge variant='default' className='text-sm px-3 py-1'>
                  {blogPost.tag?.name}
                </Badge>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  {blogPost.createdAt ? format(new Date(blogPost.createdAt), 'MMMM d, yyyy') : 'No date'}
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <User className='h-4 w-4' />
                  {blogPost.user?.name || 'Anonymous'}
                </div>
              </div>
              <div className='h-px bg-border' />
            </div>

            <div
              className='prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-6'
              dangerouslySetInnerHTML={{ __html: blogPost.content || '' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BlogDetails

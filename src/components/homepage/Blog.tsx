import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { path } from '@/core/constants/path'
import { useListBlogQuery } from '@/queries/useBlog'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Blog() {
  const { data: posts } = useListBlogQuery()
  const displayedPosts = posts?.data.slice(0, 4) || []

  return (
    <div className='mx-auto max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl'>
      <h2 className='text-balance text-3xl font-bold xl:text-center'>Latest Blog Posts</h2>
      <div className='pt-6 lg:pt-8'>
        <div className='relative'>
          <Carousel>
            <CarouselContent className='m-0 space-x-4 lg:space-x-6'>
              {displayedPosts.map((post) => {
                return (
                  <CarouselItem key={post.id} className='p-0 sm:basis-1/2 md:basis-1/3 xl:basis-1/4'>
                    <Link to={`${path.blog}/${post.id}`}>
                      <figure className='flex h-full flex-col  dark:border-green-500 rounded-lg shadow-lg p-8 border-2 border-green-500'>
                        <div className='flex flex-col h-full'>
                          <div className='flex items-center justify-between mb-4'>
                            <span className='text-sm dark:text-white'>
                              {format(new Date(post.createdAt), 'MMM d, yyyy')}
                            </span>
                            <span className='px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full'>
                              {post.tag.name}
                            </span>
                          </div>
                          <div className='flex-grow'>
                            <h3 className='text-xl font-semibold dark:text-white mb-2 line-clamp-2'>{post.title}</h3>
                            <blockquote className='text-balance text-[14px] leading-[23px] text-neutral-600 dark:text-neutral-400 sm:text-[15px] sm:leading-normal md:leading-[26px] lg:text-[16px] line-clamp-3'>
                              {post.content}
                            </blockquote>
                          </div>
                          <div className='mt-8'>
                            <figcaption className='flex items-center gap-2.5'>
                              <div className='size-6 shrink-0 rounded-full bg-blue-100 flex items-center justify-center'>
                                <span className='text-xs font-medium text-blue-600'>{post.user.name.charAt(0)}</span>
                              </div>
                              <p className='text-[13px] font-medium dark:text-neutral-300 xl:text-[14px]'>
                                By {post.user.name}
                              </p>
                            </figcaption>
                          </div>
                        </div>
                      </figure>
                    </Link>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <Link to={path.blog} className='text-green-600 hover:text-green-700 flex items-center gap-2'>
          View All Posts <ArrowRightIcon className='w-4 h-4' />
        </Link>
      </div>
    </div>
  )
}

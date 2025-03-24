import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

// Interface for blog post
interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  publishDate: string | null
  tags: string[]
  image: string | null
}

// Sample blog data
const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'HOW LONG DOES IS TAKE TO RECOVER FROM DENUE FEVER?',
    slug: 'khoi-sot-xuat-huyet-bao-lau-thi-duoc-tam',
    excerpt: 'How long does it take to recover from dengue fever before you can take a bath? Notes you need to know',
    publishDate: '2024-03-25',
    tags: ['Health', 'Fever', 'Medical'],
    image: 'https://vnvc.vn/wp-content/uploads/2025/02/khoi-sot-xuat-huyet-bao-lau-thi-duoc-tam.jpg'
  },
  {
    id: 2,
    title: 'HPV – HIGH-RISK SILENT VIRUS AND PREVENTION METHODS',
    slug: 'hpv-viruss',
    excerpt: 'HPV – A Silently Dangerous Virus and How to Effectively Prevent It',
    publishDate: '2024-03-22',
    tags: ['HPV', 'Virus', 'Prevention'],
    image: 'https://vnvc.vn/wp-content/uploads/2024/11/vnvc-co-du-vac-xin-hpv.jpg'
  },
  {
    id: 3,
    title: '10 REASONS YOU SHOULD CHOOSE VAX-BOX TO VACCINATE',
    slug: 'ly-do-chon-vaxbox',
    excerpt: 'Vax-Box vaccination and medical service center provides the best care',
    publishDate: '2024-03-20',
    tags: ['Vaccination', 'Service', 'Healthcare'],
    image:
      'https://bizweb.dktcdn.net/100/524/140/files/464821244-3966396143604819-6230181539781010370-n.jpg?v=1730080483781'
  },
  {
    id: 4,
    title: 'DOES MEASLES VACCINE CAUSE MORE FEVER?',
    slug: 'tiem-vacxin-soi',
    excerpt: 'Measles vaccine: Does measles vaccination have measles?',
    publishDate: '2024-03-18',
    tags: ['Vaccine', 'Measles', 'Side Effects'],
    image: 'https://vnvc.vn/wp-content/uploads/2024/12/kham-sang-loc-truoc-tiem-1.jpg'
  },
  {
    id: 5,
    title: 'DOES MEASLES VACCINE CAUSE MORE FEVER?',
    slug: 'tiem-vacxin-soi',
    excerpt: 'Measles vaccine: Does measles vaccination have measles?',
    publishDate: '2024-03-18',
    tags: ['Vaccine', 'Measles', 'Side Effects'],
    image: 'https://vnvc.vn/wp-content/uploads/2024/12/kham-sang-loc-truoc-tiem-1.jpg'
  },
  {
    id: 6,
    title: 'DOES MEASLES VACCINE CAUSE MORE FEVER?',
    slug: 'tiem-vacxin-soi',
    excerpt: 'Measles vaccine: Does measles vaccination have measles?',
    publishDate: '2024-03-18',
    tags: ['Vaccine', 'Measles', 'Side Effects'],
    image: 'https://vnvc.vn/wp-content/uploads/2024/12/kham-sang-loc-truoc-tiem-1.jpg'
  },
  {
    id: 7,
    title: 'DOES MEASLES VACCINE CAUSE MORE FEVER?',
    slug: 'tiem-vacxin-soi',
    excerpt: 'Measles vaccine: Does measles vaccination have measles?',
    publishDate: '2024-03-18',
    tags: ['Vaccine', 'Measles', 'Side Effects'],
    image: 'https://vnvc.vn/wp-content/uploads/2024/12/kham-sang-loc-truoc-tiem-1.jpg'
  }
]

export default function BlogList() {
  const [blogs] = useState<BlogPost[]>(initialBlogs)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / postsPerPage)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost)

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`)
  }

  // Function to generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = []

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      if (currentPage > 3) {
        // Add ellipsis if current page is away from start
        pageNumbers.push('ellipsis')
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (currentPage < totalPages - 2) {
        // Add ellipsis if current page is away from end
        pageNumbers.push('ellipsis')
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>Our Blog</h1>
        <p className='mt-4 text-lg text-gray-500'>Expert Articles on Vaccination & Health</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {currentPosts.map((blog) => (
          <Card
            key={blog.id}
            className='overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'
            onClick={() => handleBlogClick(blog.slug)}
          >
            {blog.image && (
              <div className='h-48 overflow-hidden'>
                <img src={blog.image} alt={blog.title} className='w-full h-full object-cover' />
              </div>
            )}
            <CardContent className='p-6'>
              <div className='flex items-center text-sm text-gray-500 mb-2'>
                <CalendarIcon className='mr-1 h-4 w-4' />
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              <h2 className='text-xl font-bold mb-2 line-clamp-2'>{blog.title}</h2>
              <p className='text-gray-600 mb-4 line-clamp-3'>{blog.excerpt}</p>
              <div className='flex flex-wrap gap-2'>
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant='outline' className='bg-blue-50 text-blue-700 border-blue-200'>
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button
                variant='link'
                className='mt-4 p-0'
                onClick={(e) => {
                  e.stopPropagation()
                  handleBlogClick(blog.slug)
                }}
              >
                Read more
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-12'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(Number(pageNumber))}
                      className='cursor-pointer'
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

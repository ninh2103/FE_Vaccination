import { blogService } from '@/core/services/blog.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BlogBodyType } from '@/schemaValidator/blog.schema'

interface ListBlogQuery {
  page?: number
  items_per_page?: number
  search?: string
  tagId?: string
}

export const useListBlogQuery = (query: ListBlogQuery = {}) => {
  return useQuery({
    queryKey: ['blog-list', query],
    queryFn: () => blogService.getBlogs(query)
  })
}

export const useAddBlogMutation = () => {
  return useMutation({
    mutationFn: (body: BlogBodyType) => blogService.addBlog(body)
  })
}

export const useUpdateBlogMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: BlogBodyType }) => blogService.updateBlog(id, body)
  })
}

export const useDeleteBlogMutation = () => {
  return useMutation({
    mutationFn: (id: string) => blogService.deleteBlog(id)
  })
}

export const useGetBlogByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['blog-by-id', id],
    queryFn: () => blogService.getBlogById(id)
  })
}

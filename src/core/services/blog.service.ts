import axiosClient from '@/core/services/axios-client'
import { BlogBodyType, BlogResponseType, CreateResponseBlogType } from '@/schemaValidator/blog.schema'

interface ListBlogQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const API_BLOG_URL = '/api/blog'

export const blogService = {
  getBlogs(query: ListBlogQuery): Promise<BlogResponseType> {
    return axiosClient.get(API_BLOG_URL, { params: query })
  },
  addBlog(body: BlogBodyType): Promise<CreateResponseBlogType> {
    return axiosClient.post(API_BLOG_URL, body)
  },
  updateBlog(id: string, body: BlogBodyType): Promise<BlogResponseType> {
    return axiosClient.put(`${API_BLOG_URL}/${id}`, body)
  },
  deleteBlog(id: string): Promise<BlogResponseType> {
    return axiosClient.delete(`${API_BLOG_URL}/${id}`)
  },
  getBlogById(id: string): Promise<CreateResponseBlogType> {
    return axiosClient.get(`${API_BLOG_URL}/${id}`)
  }
}

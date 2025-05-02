import axiosClient from '@/core/services/axios-client'
import {
  CategoryBodyType,
  CategoryResListType,
  CategoryType,
  UpdateCategoryBodyType,
  CategoryResDetailType
} from '@/schemaValidator/category.schema'

const API_CATEGORY_URL = '/api/category-vaccine'
interface ListCategoryQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const categoryApi = {
  getCategories(query: ListCategoryQuery): Promise<CategoryResListType> {
    return axiosClient.get(API_CATEGORY_URL, { params: query })
  },
  createCategory(params: CategoryBodyType): Promise<CategoryType> {
    return axiosClient.post(API_CATEGORY_URL, params)
  },
  updateCategory(id: string, params: UpdateCategoryBodyType): Promise<CategoryType> {
    return axiosClient.put(`${API_CATEGORY_URL}/${id}`, params)
  },
  deleteCategory(id: string) {
    return axiosClient.delete(`${API_CATEGORY_URL}/${id}`)
  },
  getCategoryById(id: string): Promise<CategoryResDetailType> {
    return axiosClient.get(`${API_CATEGORY_URL}/${id}`)
  }
}

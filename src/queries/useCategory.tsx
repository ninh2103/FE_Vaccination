import { useMutation, useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/core/services/category.service'
import { CategoryBodyType, UpdateCategoryBodyType } from '@/schemaValidator/category.schema'

interface ListCategoryQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListCategoryQuery = (query: ListCategoryQuery = {}) => {
  return useQuery({
    queryKey: ['category-list', query],
    queryFn: () => categoryApi.getCategories(query)
  })
}

export const useAddCategoryMutation = () => {
  return useMutation({
    mutationFn: (body: CategoryBodyType) => categoryApi.createCategory(body)
  })
}

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateCategoryBodyType }) => categoryApi.updateCategory(id, body)
  })
}

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id)
  })
}

export const useGetCategoryByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['category-by-id', id],
    queryFn: () => categoryApi.getCategoryById(id)
  })
}

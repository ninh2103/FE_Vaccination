import { useMutation, useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/core/services/category.service'
import { CategoryBodyType, UpdateCategoryBodyType } from '@/schemaValidator/category.schema'
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CategoryBodyType) => categoryApi.createCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-list'] })
    }
  })
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateCategoryBodyType }) => categoryApi.updateCategory(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-list'] })
    }
  })
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-list'] })
    }
  })
}

export const useGetCategoryByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['category-by-id', id],
    queryFn: () => categoryApi.getCategoryById(id)
  })
}

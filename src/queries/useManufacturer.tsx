import manufacturerService from '@/core/services/manufacturer.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { useQueryClient } from '@tanstack/react-query'
interface ListManufacturerQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListManufacturerQuery = (query: ListManufacturerQuery = {}) => {
  return useQuery({
    queryKey: ['manufacturer-list', query],
    queryFn: () => manufacturerService.list(query)
  })
}
export const useCreateManufacturerQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: manufacturerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-list'] })
    }
  })
}
export const useUpdateManufacturerQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ManufacturerBodyType }) => manufacturerService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-list'] })
    }
  })
}
export const useDeleteManufacturerQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: manufacturerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-list'] })
    }
  })
}

export const useDetailManufacturerQuery = (id: string) => {
  return useQuery({
    queryKey: ['manufacturer-detail', id],
    queryFn: () => manufacturerService.detail(id)
  })
}

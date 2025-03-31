import manufacturerService from '@/core/services/manufacturer.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'

export const useListManufacturerQuery = () => {
  return useQuery({
    queryKey: ['manufacturer-list'],
    queryFn: () => manufacturerService.list({})
  })
}
export const useCreateManufacturerQuery = () => {
  return useMutation({
    mutationFn: manufacturerService.create
  })
}
export const useUpdateManufacturerQuery = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ManufacturerBodyType }) => manufacturerService.update(id, body)
  })
}
export const useDeleteManufacturerQuery = () => {
  return useMutation({
    mutationFn: manufacturerService.delete
  })
}

export const useDetailManufacturerQuery = (id: string) => {
  return useQuery({
    queryKey: ['manufacturer-detail', id],
    queryFn: () => manufacturerService.detail(id)
  })
}

import { useMutation, useQuery } from '@tanstack/react-query'
import supplierService from '@/core/services/supplier.service'
import { SupplierBodyType } from '@/schemaValidator/supplier.schema'
import { useQueryClient } from '@tanstack/react-query'

interface ListSupplierQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListSupplierQuery = (query: ListSupplierQuery = {}) => {
  return useQuery({
    queryKey: ['supplier-list', query],
    queryFn: () => supplierService.list(query)
  })
}

export const useCreateSupplierQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: supplierService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-list'] })
    }
  })
}
export const useUpdateSupplierQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: SupplierBodyType }) => supplierService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-list'] })
    }
  })
}
export const useDeleteSupplierQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: supplierService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-list'] })
    }
  })
}

export const useDetailSupplierQuery = (id: string) => {
  return useQuery({
    queryKey: ['supplier-detail', id],
    queryFn: () => supplierService.detail(id)
  })
}

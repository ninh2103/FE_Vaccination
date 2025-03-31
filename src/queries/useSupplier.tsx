import { useMutation, useQuery } from '@tanstack/react-query'
import supplierService from '@/core/services/supplier.service'
import { SupplierBodyType } from '@/schemaValidator/supplier.schema'

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
  return useMutation({
    mutationFn: supplierService.create
  })
}
export const useUpdateSupplierQuery = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: SupplierBodyType }) => supplierService.update(id, body)
  })
}
export const useDeleteSupplierQuery = () => {
  return useMutation({
    mutationFn: supplierService.delete
  })
}

export const useDetailSupplierQuery = (id: string) => {
  return useQuery({
    queryKey: ['supplier-detail', id],
    queryFn: () => supplierService.detail(id)
  })
}

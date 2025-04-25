import { vaccinationService } from '@/core/services/vaccination.service'
import { VaccineCreateBodyType, VaccineUpdateBodyType } from '@/schemaValidator/vaccination.schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

interface ListVaccinationQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListVaccinationQuery = (query: ListVaccinationQuery = {}) => {
  return useQuery({
    queryKey: ['vaccination-list', query],
    queryFn: () => vaccinationService.list(query)
  })
}

export const useCreateVaccinationQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: VaccineCreateBodyType) => vaccinationService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccination-list'] })
    }
  })
}

export const useUpdateVaccinationQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: VaccineUpdateBodyType }) => vaccinationService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccination-list'] })
    }
  })
}

export const useDeleteVaccinationQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => vaccinationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccination-list'] })
    }
  })
}

export const useGetVaccinationByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['vaccination-detail', id],
    queryFn: () => vaccinationService.detail(id),
    enabled: !!id
  })
}

export const useInventoryVaccinationQuery = () => {
  return useQuery({
    queryKey: ['vaccination-inventory'],
    queryFn: () => vaccinationService.inventory()
  })
}

export const useUploadImageVaccinationQuery = () => {
  return useMutation({
    mutationFn: (formData: FormData) => vaccinationService.uploadImage(formData)
  })
}

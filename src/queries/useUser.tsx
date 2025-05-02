import { userApi } from '@/core/services/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

interface ListUserQuery {
  page?: number
  items_per_page?: number
  search?: string
}
export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: userApi.getMe
  })
}
export const useUpdateMeQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-profile'] })
    }
  })
}
export const useListUserQuery = (query: ListUserQuery = {}) => {
  return useQuery({
    queryKey: ['user-list', query],
    queryFn: () => userApi.list(query)
  })
}
export const useDetailUserQuery = (id: string) => {
  return useQuery({
    queryKey: ['user-detail', id],
    queryFn: () => userApi.detail(id),
    enabled: !!id
  })
}
export const useDeleteUserQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    }
  })
}
export const useCreateUserQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    }
  })
}
export const useUploadAvatarQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-profile'] })
    }
  })
}
export const useCountUserQuery = () => {
  return useQuery({
    queryKey: ['user-count'],
    queryFn: userApi.count
  })
}

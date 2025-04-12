import { userApi } from '@/core/services/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  return useMutation({
    mutationFn: userApi.updateMe
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
  return useMutation({
    mutationFn: userApi.delete
  })
}
export const useCreateUserQuery = () => {
  return useMutation({
    mutationFn: userApi.create
  })
}
export const useUploadAvatarQuery = () => {
  return useMutation({
    mutationFn: userApi.uploadAvatar
  })
}
export const useCountUserQuery = () => {
  return useQuery({
    queryKey: ['user-count'],
    queryFn: userApi.count
  })
}

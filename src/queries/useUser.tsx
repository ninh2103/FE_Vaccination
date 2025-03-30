import { userApi } from '@/core/services/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'

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
export const useListUserQuery = () => {
  return useQuery({
    queryKey: ['user-list'],
    queryFn: () => userApi.list({})
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

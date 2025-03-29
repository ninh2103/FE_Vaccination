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

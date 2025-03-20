import { authApi } from '@/core/services/auth.service'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login
  })
}
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register
  })
}
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail
  })
}

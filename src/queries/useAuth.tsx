import { authApi } from '@/core/services/auth.service'
import { ResetPassword } from '@/models/interface/auth.interface'
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
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword
  })
}
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ({ params, token }: { params: ResetPassword; token: string }) => authApi.resetPassword(params, token)
  })
}
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.changePassword
  })
}

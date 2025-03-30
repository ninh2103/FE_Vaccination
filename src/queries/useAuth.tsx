import { authApi } from '@/core/services/auth.service'
import { userApi } from '@/core/services/user.service'
import { ResetPassword } from '@/models/interface/auth.interface'
import { UpdateRoleBodyType } from '@/schemaValidator/user.schema'
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
export const useUpdateRoleMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateRoleBodyType }) => userApi.updateRole(id, body)
  })
}

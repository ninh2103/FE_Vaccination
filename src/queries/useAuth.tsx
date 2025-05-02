import { authApi } from '@/core/services/auth.service'
import { userApi } from '@/core/services/user.service'
import { ResetPassword } from '@/models/interface/auth.interface'
import { LogoutBodyType } from '@/schemaValidator/auth.schema'
import { UpdateRoleBodyType } from '@/schemaValidator/user.schema'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateRoleBodyType }) => userApi.updateRole(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    }
  })
}
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: ({ params }: { params: LogoutBodyType }) => authApi.logout(params)
  })
}
export const useResendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: authApi.resendVerificationEmail
  })
}

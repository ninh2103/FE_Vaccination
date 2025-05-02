import axiosClient from '@/core/services/axios-client'
import {
  Account,
  ChangePassword,
  ForgotPassword,
  Login,
  LoginResponse,
  RegisterReponse,
  ResetPassword,
  VerifyEmail
} from '@/models/interface/auth.interface'
import { LogoutBodyType, RefreshTokenBodyType } from '@/schemaValidator/auth.schema'

const API_LOGIN_URL = '/api/auth/login'
const API_REGISTER_URL = '/api/auth/register'
const API_VERIFY_EMAIL_URL = '/api/auth/verify-email'
const API_FORGOT_PPASSWORD_URL = '/api/auth/forgot-password'
const API_RESEND_VERIFICATION_EMAIL_URL = '/api/auth/resend-verification-email'
const API_RESET_PPASSWORD_URL = '/api/auth/reset-password'
const API_CHANGE_PASSWORD_URL = '/api/auth/change-password'
const API_LOGOUT_URL = '/api/auth/logout'
const API_REFRESH_TOKEN_URL = '/api/auth/refresh-token'

export const authApi = {
  login(params: Login): Promise<LoginResponse> {
    return axiosClient.post(API_LOGIN_URL, params)
  },
  register(params: Account): Promise<RegisterReponse> {
    return axiosClient.post(API_REGISTER_URL, params)
  },
  verifyEmail(params: VerifyEmail) {
    return axiosClient.post(API_VERIFY_EMAIL_URL, params)
  },
  forgotPassword(params: ForgotPassword) {
    return axiosClient.post(API_FORGOT_PPASSWORD_URL, params)
  },
  resendVerificationEmail(params: ForgotPassword) {
    return axiosClient.post(API_RESEND_VERIFICATION_EMAIL_URL, params)
  },
  resetPassword(params: ResetPassword, token: string) {
    return axiosClient.put(API_RESET_PPASSWORD_URL, params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  changePassword(params: ChangePassword) {
    return axiosClient.put(API_CHANGE_PASSWORD_URL, params)
  },
  logout(params: LogoutBodyType) {
    return axiosClient.post(API_LOGOUT_URL, params)
  },
  refreshToken(params: RefreshTokenBodyType) {
    return axiosClient.post(API_REFRESH_TOKEN_URL, params)
  }
}

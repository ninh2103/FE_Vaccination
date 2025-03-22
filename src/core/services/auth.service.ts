import axiosClient from '@/core/services/axios-client'
import {
  Account,
  ForgotPassword,
  Login,
  LoginResponse,
  RegisterReponse,
  ResetPassword,
  VerifyEmail
} from '@/models/interface/auth.interface'

const API_LOGIN_URL = '/api/auth/login'
const API_REGISTER_URL = '/api/auth/register'
const API_VERIFY_EMAIL_URL = '/api/auth/verify-email'
const API_FORGOT_PPASSWORD_URL = '/api/auth/forgot-password'
const API_RESET_PPASSWORD_URL = '/api/auth/reset-password'

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
  resetPassword(params: ResetPassword, token: string) {
    return axiosClient.put(API_RESET_PPASSWORD_URL, params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

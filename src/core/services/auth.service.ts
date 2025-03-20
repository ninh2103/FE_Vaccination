import axiosClient from '@/core/services/axios-client'
import { Account, Login, LoginResponse, RegisterReponse, VerifyEmail } from '@/models/interface/auth.interface'

const API_LOGIN_URL = '/api/auth/login'
const API_REGISTER_URL = '/api/auth/register'
const API_VERIFY_EMAIL_URL = '/api/auth/verify-email'

export const authApi = {
  login(params: Login): Promise<LoginResponse> {
    return axiosClient.post(API_LOGIN_URL, params)
  },
  register(params: Account): Promise<RegisterReponse> {
    return axiosClient.post(API_REGISTER_URL, params)
  },
  verifyEmail(params: VerifyEmail) {
    return axiosClient.post(API_VERIFY_EMAIL_URL, params)
  }
}

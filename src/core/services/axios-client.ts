import config from '@/configs'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS
} from '@/core/shared/storage'
import axios, { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromLS()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== HttpStatusCode.Unauthorized || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const refreshToken = getRefreshTokenFromLS()

      if (!refreshToken) {
        removeAccessTokenFromLS()
        removeRefreshTokenFromLS()
        return Promise.reject(error)
      }

      const response = await axios.post(`${config.baseUrl}/api/auth/refresh-token`, {
        refresh_token: refreshToken
      })

      if (response.status === HttpStatusCode.Created) {
        const { access_token } = response.data
        setAccessTokenToLS(access_token)
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return axiosClient(originalRequest)
      }
    } catch (refreshError) {
      removeAccessTokenFromLS()
      removeRefreshTokenFromLS()
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
      window.location.href = '/login'
      return Promise.reject(refreshError)
    }

    return Promise.reject(error)
  }
)

export default axiosClient

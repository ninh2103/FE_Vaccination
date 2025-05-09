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

    // If the error is not 401 or we've already retried, reject
    if (error.response?.status !== HttpStatusCode.Unauthorized || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const refreshToken = getRefreshTokenFromLS()

      // If no refresh token exists, clear tokens and redirect to login
      if (!refreshToken) {
        removeAccessTokenFromLS()
        removeRefreshTokenFromLS()
        // Don't redirect here, let the component handle it
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
      // If refresh token fails, clear all tokens
      removeAccessTokenFromLS()
      removeRefreshTokenFromLS()
      toast.error('Your session has expired. Please login again.')
      // Don't redirect here, let the component handle it
      return Promise.reject(refreshError)
    }

    return Promise.reject(error)
  }
)

export default axiosClient

import config from '@/configs'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  removeAccessTokenFromLS
} from '@/core/shared/storage'

import axios, { HttpStatusCode } from 'axios'

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
    if (error.response && error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshTokenFromLS()
        const response = await axios.post(`${config.baseUrl}/auth/refresh-token`, {
          refresh_token: refreshToken
        })

        if (response.status === HttpStatusCode.Ok) {
          const { access_token, refresh_token } = response.data
          setAccessTokenToLS(access_token)
          setRefreshTokenToLS(refresh_token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        removeAccessTokenFromLS()
        return Promise.reject(refreshError)
      }
    } else if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
      removeAccessTokenFromLS()
    }
    return Promise.reject(error)
  }
)

export default axiosClient

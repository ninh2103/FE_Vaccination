import axiosClient from '@/core/services/axios-client'
import {
  UpdateMeBodyType,
  UpdateRoleBodyType,
  UserResponseListType,
  UserResponseType
} from '@/schemaValidator/user.schema'

interface ListUserQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const API_GET_ME = '/api/user/me'
const API_UPDATE_ME = '/api/user/me'
const API_LIST = '/api/user'

export const userApi = {
  getMe(): Promise<UserResponseType> {
    return axiosClient.get(API_GET_ME)
  },
  updateMe(body: UpdateMeBodyType): Promise<UserResponseType> {
    return axiosClient.put(API_UPDATE_ME, body)
  },
  list(query: ListUserQuery): Promise<UserResponseListType> {
    return axiosClient.get(API_LIST, { params: query })
  },
  detail(id: string): Promise<UserResponseType> {
    return axiosClient.get(`${API_LIST}/${id}`)
  },
  updateRole(id: string, body: UpdateRoleBodyType): Promise<UserResponseType> {
    return axiosClient.put(`${API_LIST}/${id}/role`, body)
  },
  delete(id: string): Promise<UserResponseType> {
    return axiosClient.delete(`${API_LIST}/${id}`)
  }
}

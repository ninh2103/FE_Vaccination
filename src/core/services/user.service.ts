import axiosClient from '@/core/services/axios-client'
import { RegisterBodyType } from '@/schemaValidator/auth.schema'
import {
  CountUserResponseType,
  UpdateMeBodyType,
  UpdateRoleBodyType,
  UploadAvatarBodyType,
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
const API_CREATE = '/api/auth/register/admin'
const API_UPLOAD_AVATAR = '/api/user/upload-avatar'
const API_COUNT = '/api/user/count-user'

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
  },
  create(body: RegisterBodyType): Promise<UserResponseType> {
    return axiosClient.post(API_CREATE, body)
  },
  uploadAvatar(body: UploadAvatarBodyType): Promise<UserResponseType> {
    const formData = new FormData()
    formData.append('file', body.avatar)

    return axiosClient
      .post<UserResponseType>(API_UPLOAD_AVATAR, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => response.data)
  },
  count(): Promise<CountUserResponseType> {
    return axiosClient.get(API_COUNT)
  }
}

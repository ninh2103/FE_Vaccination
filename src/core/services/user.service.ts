import axiosClient from '@/core/services/axios-client'
import { UpdateMeBodyType, UserResponseType } from '@/schemaValidator/user.schema'

const API_GET_ME = '/api/user/me'
const API_UPDATE_ME = '/api/user/me'

export const userApi = {
  getMe(): Promise<UserResponseType> {
    return axiosClient.get(API_GET_ME)
  },
  updateMe(body: UpdateMeBodyType): Promise<UserResponseType> {
    return axiosClient.put(API_UPDATE_ME, body)
  }
}

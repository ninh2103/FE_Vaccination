import axiosClient from '@/core/services/axios-client'
import { RoleResponseType } from '@/schemaValidator/role.schema'

const API_ROLE_URL = '/api/role'

export const roleApi = {
  list(): Promise<RoleResponseType> {
    return axiosClient.get(API_ROLE_URL)
  }
}

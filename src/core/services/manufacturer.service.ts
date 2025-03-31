import axiosClient from '@/core/services/axios-client'
import { ManufacturerBodyType, ManufacturerResponseType, ManufacturerType } from '@/schemaValidator/manufacturer.schema'
const API_MANUFACTURER_URL = '/api/manufacturers'

interface ListManufacturerQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const manufacturerService = {
  list(query: ListManufacturerQuery): Promise<ManufacturerResponseType> {
    return axiosClient.get(API_MANUFACTURER_URL, { params: query })
  },
  create(body: ManufacturerBodyType): Promise<ManufacturerType> {
    return axiosClient.post(API_MANUFACTURER_URL, body)
  },
  update(id: string, body: ManufacturerBodyType): Promise<ManufacturerType> {
    return axiosClient.put(`${API_MANUFACTURER_URL}/${id}`, body)
  },
  delete(id: string) {
    return axiosClient.delete(`${API_MANUFACTURER_URL}/${id}`)
  },
  detail(id: string): Promise<ManufacturerType> {
    return axiosClient.get(`${API_MANUFACTURER_URL}/${id}`)
  }
}

export default manufacturerService

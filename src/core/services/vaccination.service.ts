import axiosClient from '@/core/services/axios-client'
import {
  VaccineCreateBodyType,
  VaccineResponseType,
  VaccineType,
  VaccineUpdateBodyType
} from '@/schemaValidator/vaccination.schema'

const API_VACCINATION = '/api/vaccinations'
interface ListVaccinationQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const vaccinationService = {
  list(query: ListVaccinationQuery): Promise<VaccineResponseType> {
    return axiosClient.get(API_VACCINATION, { params: query })
  },
  create(body: VaccineCreateBodyType): Promise<VaccineType> {
    return axiosClient.post(API_VACCINATION, body)
  },
  update(id: string, body: VaccineUpdateBodyType): Promise<VaccineType> {
    return axiosClient.put(`${API_VACCINATION}/${id}`, body)
  },
  delete(id: string): Promise<VaccineType> {
    return axiosClient.delete(`${API_VACCINATION}/${id}`)
  },
  detail(id: string): Promise<VaccineType> {
    return axiosClient.get(`${API_VACCINATION}/${id}`)
  }
}

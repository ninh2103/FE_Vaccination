import axiosClient from '@/core/services/axios-client'
import { SupplierBodyType, SupplierResponseType, SupplierType } from '@/schemaValidator/supplier.schema'

const API_SUPPLIER_URL = '/api/supplier'

interface ListSupplierQuery {
  page?: number
  items_per_page?: number
  search?: string
}
const supplierService = {
  list(query: ListSupplierQuery): Promise<SupplierResponseType> {
    return axiosClient.get(API_SUPPLIER_URL, { params: query })
  },
  create(body: SupplierBodyType): Promise<SupplierType> {
    return axiosClient.post(API_SUPPLIER_URL, body)
  },
  update(id: string, body: SupplierBodyType): Promise<SupplierType> {
    return axiosClient.put(`${API_SUPPLIER_URL}/${id}`, body)
  },
  delete(id: string) {
    return axiosClient.delete(`${API_SUPPLIER_URL}/${id}`)
  },
  detail(id: string): Promise<SupplierType> {
    return axiosClient.get(`${API_SUPPLIER_URL}/${id}`)
  }
}

export default supplierService

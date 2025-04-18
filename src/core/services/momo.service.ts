import axiosClient from '@/core/services/axios-client'
import {
  CreatePaymentBodyType,
  HandlePaymentIPNBodyType,
  MomoResponseType,
  PaymentResponseType,
  PaymentHistoryResponseType,
  CheckPaymentStatusResponseType,
  PaymentListResponseType
} from '@/schemaValidator/momo.schema'

const API_MOMO_URL = '/api/momo/payment'
const API_MOMO_USER = '/api/momo/user'
const API_MOMO_IPN_URL = '/api/momo/ipn'
const API_MOMO_STATUS_URL = '/api/momo/payment/status'
const API_MOMO_COUNT_URL = '/api/momo/count-payment-success'

interface ListPaymentQuery {
  page?: number
  items_per_page?: number
  search?: string
}
interface CheckPaymentStatusQuery {
  orderId: string
  requestId: string
}

const momoService = {
  createPayment(body: CreatePaymentBodyType): Promise<MomoResponseType> {
    return axiosClient.post(API_MOMO_URL, body)
  },
  handlePaymentIPN(body: HandlePaymentIPNBodyType) {
    return axiosClient.post(API_MOMO_IPN_URL, body)
  },
  listPayment(query: ListPaymentQuery): Promise<PaymentListResponseType> {
    return axiosClient.get(API_MOMO_URL, { params: query })
  },
  listUserPayment(): Promise<PaymentHistoryResponseType> {
    return axiosClient.get(API_MOMO_USER)
  },
  detailPayment(id: string): Promise<PaymentResponseType> {
    return axiosClient.get(`${API_MOMO_URL}/${id}`)
  },
  countPayment(): Promise<CheckPaymentStatusResponseType> {
    return axiosClient.get(API_MOMO_COUNT_URL)
  },
  checkPaymentStatus(query: CheckPaymentStatusQuery) {
    return axiosClient.get(`${API_MOMO_STATUS_URL}`, { params: query })
  }
}

export default momoService

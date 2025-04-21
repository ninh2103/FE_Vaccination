import momoService from '@/core/services/momo.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreatePaymentBodyType,
  HandlePaymentIPNBodyType,
  UpdateStatusPaymentBodyType
} from '@/schemaValidator/momo.schema'

interface CheckPaymentStatusQuery {
  orderId: string
  requestId: string
}

interface ListPaymentQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useCreatePaymentMutation = () => {
  return useMutation({
    mutationFn: (body: CreatePaymentBodyType) => momoService.createPayment(body)
  })
}

export const useHandlePaymentIPNMutation = () => {
  return useMutation({
    mutationFn: (body: HandlePaymentIPNBodyType) => momoService.handlePaymentIPN(body)
  })
}

export const useCountPaymentSuccessQuery = () => {
  return useQuery({
    queryKey: ['countPaymentSuccess'],
    queryFn: () => momoService.countPayment()
  })
}
export const useCheckPaymentStatusQuery = (query: CheckPaymentStatusQuery) => {
  return useQuery({
    queryKey: ['checkPaymentStatus', query],
    queryFn: () => momoService.checkPaymentStatus(query)
  })
}

export const useListUserPaymentQuery = () => {
  return useQuery({
    queryKey: ['listUserPayment'],
    queryFn: () => momoService.listUserPayment()
  })
}

export const useDetailPaymentQuery = (id: string) => {
  return useQuery({
    queryKey: ['detailPayment', id],
    queryFn: () => momoService.detailPayment(id)
  })
}

export const useListPaymentQuery = (query: ListPaymentQuery) => {
  return useQuery({
    queryKey: ['listPayment', query],
    queryFn: () => momoService.listPayment(query)
  })
}

export const useUpdateStatusPaymentMutation = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateStatusPaymentBodyType }) =>
      momoService.updateStatusPayment(id, body)
  })
}

export const useDeletePaymentMutation = () => {
  return useMutation({
    mutationFn: (id: string) => momoService.deletePayment(id)
  })
}

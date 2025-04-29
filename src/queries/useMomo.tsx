import momoService from '@/core/services/momo.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreatePaymentBodyType,
  HandlePaymentIPNBodyType,
  UpdateStatusPaymentBodyType
} from '@/schemaValidator/momo.schema'
import { useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreatePaymentBodyType) => momoService.createPayment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-list'] })
    }
  })
}

export const useHandlePaymentIPNMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: HandlePaymentIPNBodyType) => momoService.handlePaymentIPN(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-list'] })
    }
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateStatusPaymentBodyType }) =>
      momoService.updateStatusPayment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listPayment'] })
    }
  })
}

export const useDeletePaymentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => momoService.deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-list'] })
    }
  })
}

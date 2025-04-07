import { z } from 'zod'

export const CreatePaymentBody = z.object({
  bookingId: z.string().min(1, 'Mã đơn hàng không được để trống')
})
export type CreatePaymentBodyType = z.TypeOf<typeof CreatePaymentBody>

export const HandlePaymentIPNBody = z.object({
  partnerCode: z.string(),
  orderId: z.string(),
  requestId: z.string(),
  amount: z.number(),
  orderInfo: z.string(),
  orderType: z.string(),
  transId: z.number(),
  resultCode: z.number(),
  message: z.string(),
  payType: z.string(),
  responseTime: z.number(),
  extraData: z.string(),
  signature: z.string()
})

export type HandlePaymentIPNBodyType = z.infer<typeof HandlePaymentIPNBody>

export const MomoResponse = z.object({
  paymentUrl: z.object({
    partnerCode: z.literal('MOMO'),
    orderId: z.string(),
    totalAmount: z.number(),
    requestId: z.string(),
    paymentUrl: z.string().url()
  })
})

export type MomoResponseType = z.infer<typeof MomoResponse>

export const paymentResponseSchema = z.object({
  id: z.string(),
  bookingId: z.string().nullable(),
  userId: z.string(),
  amount: z.number(),
  paymentMethod: z.enum(['CREDIT_CARD', 'MOMO', 'BANK_TRANSFER']).optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']).optional(),
  appointmentDate: z.string().datetime().nullable(),
  orderId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export type PaymentResponseType = z.infer<typeof paymentResponseSchema>

export const paymentListSchema = z.object({
  data: z.array(paymentResponseSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type PaymentListResponseType = z.infer<typeof paymentListSchema>

export const paymentHistorySchema = z.object({
  paymentId: z.string(),
  bookingId: z.string(),
  totalAmount: z.number(),
  createdAt: z.string().datetime(),
  status: z.enum(['COMPLETED', 'PENDING', 'FAILED']).optional(),
  paymentMethod: z.enum(['CREDIT_CARD', 'MOMO', 'BANK_TRANSFER']).optional()
})

export const paymentHistoryResponseSchema = z.object({
  data: z.array(paymentHistorySchema),
  total: z.number()
})

export type PaymentHistoryResponseType = z.infer<typeof paymentHistoryResponseSchema>

export const checkPaymentStatusResponseSchema = z.object({
  data: z.object({
    total: z.number()
  })
})

export type CheckPaymentStatusResponseType = z.infer<typeof checkPaymentStatusResponseSchema>

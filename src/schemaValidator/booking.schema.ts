import { UserSchema } from '@/schemaValidator/blog.schema'
import { z } from 'zod'

export const BookingSchema = z.object({
  id: z.string().uuid(),
  vaccinationId: z.string().uuid(),
  userId: z.string().uuid(),
  vaccinationQuantity: z.number().int().positive(),
  vaccinationPrice: z.number().int().positive(),
  totalAmount: z.number().int().positive(),
  createdAt: z.string().datetime(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'SUCCESS', 'WAITING_PAYMENT']),
  vaccinationDate: z.string().datetime(),
  confirmationTime: z.string().datetime(),
  appointmentDate: z.string().datetime(),
  user: UserSchema
})

export const BookingResponseSchema = z.object({
  data: z.array(BookingSchema),
  total: z.number().int().nonnegative(),
  currentPage: z.number().int().positive(),
  itemsPerPage: z.number().int().positive()
})

export type BookingResponseType = z.infer<typeof BookingResponseSchema>

export const BookingBodySchema = (remainingQuantity: number) =>
  z.object({
    vaccinationId: z.string().uuid(),
    appointmentDate: z
      .string()
      .datetime()
      .refine(
        (date) => {
          const appointmentDate = new Date(date)
          const hours = appointmentDate.getHours()
          const minutes = appointmentDate.getMinutes()
          const timeInMinutes = hours * 60 + minutes

          // Check if time is between 8:00 AM (480 minutes) and 5:00 PM (1020 minutes)
          return timeInMinutes >= 480 && timeInMinutes <= 1020
        },
        {
          message: 'Giờ hẹn phải từ 8:00 AM đến 5:00 PM'
        }
      )
      .refine(
        (date) => {
          const appointmentDate = new Date(date)
          const now = new Date()

          // Nếu là hôm nay thì không được đặt giờ đã qua
          const isSameDay =
            appointmentDate.getDate() === now.getDate() &&
            appointmentDate.getMonth() === now.getMonth() &&
            appointmentDate.getFullYear() === now.getFullYear()

          if (isSameDay) {
            return appointmentDate.getTime() > now.getTime()
          }

          // Còn nếu là ngày khác thì chỉ cần không ở quá khứ
          return appointmentDate > new Date(now.setHours(0, 0, 0, 0))
        },
        {
          message: 'Ngày hẹn phải từ thời gian hiện tại trở về sau'
        }
      )
      .refine(
        (date) => {
          const appointmentDate = new Date(date)
          const minutes = appointmentDate.getMinutes()
          // Only allow times at :00 or :30
          return minutes === 0 || minutes === 30
        },
        {
          message: 'Giờ hẹn phải là 00:00 hoặc 00:30'
        }
      ),

    vaccinationQuantity: z
      .number({ invalid_type_error: 'Vui lòng nhập số lượng hợp lệ' })
      .int('Số lượng liều phải là số nguyên')
      .min(1, 'Số lượng liều tối thiểu là 1')
      .max(remainingQuantity, `Số lượng liều tối đa là ${remainingQuantity}`)
  })

export type BookingBodyType = z.infer<ReturnType<typeof BookingBodySchema>>

export const BookingDetailResponseSchema = z.object({
  id: z.string().uuid(),
  vaccinationId: z.string().uuid(),
  userId: z.string().uuid(),
  vaccinationQuantity: z.number().int().positive(),
  vaccinationPrice: z.number().int().positive(),
  totalAmount: z.number().int().positive(),
  createdAt: z.string().datetime(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'SUCCESS', 'WAITING_PAYMENT']),
  vaccinationDate: z.string().datetime(),
  confirmationTime: z.string().datetime(),
  appointmentDate: z.string().datetime()
})

export type BookingDetailResponseType = z.infer<typeof BookingDetailResponseSchema>

export const BookingConfirmBodySchema = z.object({
  bookingId: z.string().uuid()
})

export type BookingConfirmBodyType = z.infer<typeof BookingConfirmBodySchema>

export const BookingConfirmResponseSchema = z.object({
  message: z.string()
})

export type BookingConfirmResponseType = z.infer<typeof BookingConfirmResponseSchema>

export const BookingCreateBodySchema = z.object({
  vaccinationId: z.string().min(1, 'Vaccination không hợp lệ'),
  appointmentDate: z.coerce.date({
    required_error: 'Ngày hẹn là bắt buộc',
    invalid_type_error: 'Ngày hẹn phải là ngày hợp lệ'
  }),
  vaccinationQuantity: z
    .number({ invalid_type_error: 'Số lượng liều tối thiểu là 1' })
    .int('Số lượng liều tối thiểu là 1')
    .positive('Số lượng liều tối thiểu là 1'),
  userId: z.string().min(1, 'Người dùng không hợp lệ')
})

export type BookingCreateBodyType = z.infer<typeof BookingCreateBodySchema>

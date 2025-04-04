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
  appointmentDate: z.string().datetime()
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
      .refine((date) => {
        const appointmentDate = new Date(date)
        const hours = appointmentDate.getHours()
        const minutes = appointmentDate.getMinutes()
        const timeInMinutes = hours * 60 + minutes

        // Check if time is between 8:00 AM (480 minutes) and 5:00 PM (1020 minutes)
        return timeInMinutes >= 480 && timeInMinutes <= 1020
      }, 'Appointment time must be between 8:00 AM and 5:00 PM')
      .refine((date) => {
        const appointmentDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return appointmentDate >= today
      }, 'Appointment date cannot be in the past')
      .refine((date) => {
        const appointmentDate = new Date(date)
        const minutes = appointmentDate.getMinutes()
        // Only allow times at :00 or :30
        return minutes === 0 || minutes === 30
      }, 'Appointment time must be at :00 or :30'),
    vaccinationQuantity: z
      .number({ invalid_type_error: 'Please enter a valid number' })
      .int('Number of doses must be an integer')
      .min(1, 'Minimum dose is 1')
      .max(remainingQuantity, `Maximum available doses: ${remainingQuantity}`)
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

import { UserResponseSchema } from '@/schemaValidator/user.schema'
import { z } from 'zod'

const RoleSchema = z.object({
  id: z.string(),
  name: z.string()
})

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url(),
  role: RoleSchema
})

const VaccinationSchema = z.object({
  id: z.string(),
  userId: z.string().nullable(),
  vaccineName: z.string(),
  image: z.string().url(),
  location: z.string(),
  description: z.string(),
  price: z.number(),
  batchNumber: z.string(),
  certificate: z.string().nullable(),
  createdAt: z.string(), // ISO date
  updatedAt: z.string(),
  remainingQuantity: z.number(),
  expirationDate: z.string(),
  manufacturerId: z.string().nullable(),
  supplierId: z.string(),
  sideEffect: z.string().nullable()
})

const AppointmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vaccinationId: z.string(),
  appointmentDate: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']),
  createdAt: z.string(),
  updatedAt: z.string(),
  vaccination: VaccinationSchema,
  user: UserSchema
})

export const AppointmentListResponseSchema = z.object({
  data: z.array(AppointmentSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type AppointmentListResponseType = z.infer<typeof AppointmentListResponseSchema>

export const AppointmentDailyResponseSchema = z.object({
  data: z.object({
    date: z.string(),
    total: z.number(),
    appointments: z.array(AppointmentSchema)
  })
})

export type AppointmentDailyResponseType = z.infer<typeof AppointmentDailyResponseSchema>

export const AppointmentDetailSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vaccinationId: z.string(),
  appointmentDate: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']).or(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserResponseSchema,
  vaccination: VaccinationSchema
})

export type AppointmentDetailType = z.infer<typeof AppointmentDetailSchema>

export const AppointmentUpdateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vaccinationId: z.string(),
  appointmentDate: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']).or(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  vaccination: VaccinationSchema
})

export type AppointmentUpdateType = z.infer<typeof AppointmentUpdateSchema>

export const AppointmentUpdateBodySchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']).or(z.string())
})

export type AppointmentUpdateBodyType = z.infer<typeof AppointmentUpdateBodySchema>

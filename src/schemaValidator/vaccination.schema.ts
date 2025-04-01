import { z } from 'zod'

const VaccineSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  vaccineName: z.string(),
  image: z.string().url(),
  location: z.string(),
  description: z.string(),
  price: z.number(),
  batchNumber: z.string(),
  certificate: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  remainingQuantity: z.number(),
  expirationDate: z.string().datetime(),
  manufacturerId: z.string().uuid().nullable(),
  supplierId: z.string().uuid(),
  sideEffect: z.string().nullable()
})

export type VaccineType = z.infer<typeof VaccineSchema>

const VaccineResponseSchema = z.object({
  data: z.array(VaccineSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type VaccineResponseType = z.infer<typeof VaccineResponseSchema>

const VaccineCreateBodySchema = z.object({
  vaccineName: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  location: z.string(),
  expirationDate: z.string().datetime(),
  manufacturerId: z.string(),
  supplierId: z.string()
})

export type VaccineCreateBodyType = z.infer<typeof VaccineCreateBodySchema>

const VaccineUpdateBodySchema = z.object({
  vaccineName: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  location: z.string(),
  batchNumber: z.string(),
  certificate: z.string(),
  remainingQuantity: z.number().nonnegative(),
  expirationDate: z.string().datetime(),
  manufacturerId: z.string(),
  supplierId: z.string(),
  sideEffect: z.string()
})

export type VaccineUpdateBodyType = z.infer<typeof VaccineUpdateBodySchema>

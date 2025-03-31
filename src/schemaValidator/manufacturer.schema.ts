import { z } from 'zod'

const ManufacturerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  country: z.string(),
  contactInfo: z.string()
})

export type ManufacturerType = z.infer<typeof ManufacturerSchema>
const ManufacturerResponseSchema = z.object({
  data: z.array(ManufacturerSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type ManufacturerResponseType = z.infer<typeof ManufacturerResponseSchema>

export const ManufacturerBody = z.object({
  name: z.string().min(1, 'Name is required'),
  country: z.string().min(1, 'Country is required'),
  contactInfo: z.string().min(1, 'Contact info is required')
})

export type ManufacturerBodyType = z.infer<typeof ManufacturerBody>

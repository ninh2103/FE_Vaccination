import { z } from 'zod'

const SupplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  contactInfo: z.string()
})

export type SupplierType = z.infer<typeof SupplierSchema>

const SupplierResponseSchema = z.object({
  data: z.array(SupplierSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type SupplierResponseType = z.infer<typeof SupplierResponseSchema>

export const SupplierBody = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  contactInfo: z.string().min(1, 'Contact info is required')
})

export type SupplierBodyType = z.infer<typeof SupplierBody>

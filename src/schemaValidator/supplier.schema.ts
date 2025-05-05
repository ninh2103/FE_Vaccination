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
  name: z
    .string()
    .min(1, 'Tên không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Tên không được chỉ chứa khoảng trắng'
    }),
  address: z
    .string()
    .min(1, 'Địa chỉ không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Địa chỉ không được chỉ chứa khoảng trắng'
    }),
  contactInfo: z
    .string()
    .min(1, 'Thông tin liên hệ không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Thông tin liên hệ không được chỉ chứa khoảng trắng'
    })
})

export type SupplierBodyType = z.infer<typeof SupplierBody>

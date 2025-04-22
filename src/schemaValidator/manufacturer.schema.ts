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
  name: z
    .string()
    .min(1, 'Tên không được để trống')
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái')
    .refine((value) => value.trim().length > 0, {
      message: 'Tên không được chỉ chứa khoảng trắng'
    }),
  country: z
    .string()
    .min(1, 'Quốc gia không được để trống')
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Quốc gia chỉ được chứa chữ cái')
    .refine((value) => value.trim().length > 0, {
      message: 'Quốc gia không được chỉ chứa khoảng trắng'
    }),
  contactInfo: z.string().min(1, 'Thông tin liên hệ là bắt buộc').refine((value) => value.trim().length > 0, {
    message: 'Thông tin liên hệ không được chỉ chứa khoảng trắng'
  })
})

export type ManufacturerBodyType = z.infer<typeof ManufacturerBody>

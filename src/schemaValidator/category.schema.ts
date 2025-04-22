import { z } from 'zod'
import { VaccineSchema } from './vaccination.schema'

export const CategoryBodySchema = z.object({
  name: z
  .string()
  .min(1, 'Tên không được để trống')
  .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái')
  .refine((value) => value.trim().length > 0, {
    message: 'Tên không được chỉ chứa khoảng trắng'
  }),
  description: z.string().min(1, 'Mô tả không được để trống').refine((value) => value.trim().length > 0, {
    message: 'Mô tả không được chỉ chứa khoảng trắng'
  }),
})

export type CategoryBodyType = z.infer<typeof CategoryBodySchema>

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1)
})
export type CategoryType = z.infer<typeof CategorySchema>

const CategoryResListSchema = z.object({
  data: z.array(CategorySchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type CategoryResListType = z.infer<typeof CategoryResListSchema>

export const UpdateCategoryBodySchema = z.object({
  name: z
  .string()
  .min(1, 'Tên không được để trống')
  .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái')
  .refine((value) => value.trim().length > 0, {
    message: 'Tên không được chỉ chứa khoảng trắng'
  }),
  description: z.string().min(1, 'Mô tả không được để trống').refine((value) => value.trim().length > 0, {
    message: 'Mô tả không được chỉ chứa khoảng trắng'
  }),
})

export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>

export const CategoryResDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  vaccines: z.array(VaccineSchema)
})

export type CategoryResDetailType = z.infer<typeof CategoryResDetailSchema>

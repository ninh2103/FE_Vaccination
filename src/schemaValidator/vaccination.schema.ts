import { z } from 'zod'

export const CategoryVaccinationSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

export const VaccineSchema = z.object({
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
  expirationDate: z.coerce.date({
    required_error: 'Expiration date is required',
    invalid_type_error: 'Expiration date must be a valid date'
  }),
  manufacturerId: z.string().uuid().nullable(),
  supplierId: z.string().uuid(),
  categoryVaccinationId: z.string().uuid(),
  CategoryVaccination: CategoryVaccinationSchema,
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

export const VaccineCreateBodySchema = z.object({
  vaccineName: z
    .string()
    .min(1, 'Tên vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Tên vaccine không được chỉ chứa khoảng trắng'
    }),
  image: z.string().min(1, 'Ảnh vaccine không được để trống'),
  description: z
    .string()
    .min(1, 'Mô tả vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Mô tả vaccine không được chỉ chứa khoảng trắng'
    }),
  price: z.coerce
    .number({
      required_error: 'Giá vaccine không được để trống',
      invalid_type_error: 'Giá vaccine phải là số'
    })
    .gt(0, 'Giá vaccine phải lớn hơn 0'),
  expirationDate: z.coerce
    .date({
      invalid_type_error: 'Ngày hạn sử dụng vaccine phải là ngày hợp lệ'
    })
    .refine((value) => value >= new Date(), {
      message: 'Ngày hạn sử dụng vaccine phải là ngày hiện tại trở lên'
    }),
  manufacturerId: z.string().min(1, 'Nhà sản xuất vaccine không được để trống'),
  supplierId: z.string().min(1, 'Nhà cung cấp vaccine không được để trống'),
  categoryVaccinationId: z.string().min(1, 'Danh mục vaccine không được để trống'),
  batchNumber: z
    .string()
    .min(1, 'Số lô vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Số lô vaccine không được chỉ chứa khoảng trắng'
    }),
  remainingQuantity: z.coerce
    .number({
      required_error: 'Số lượng vaccine không được để trống',
      invalid_type_error: 'Số lượng vaccine phải là số'
    })
    .gt(0, 'Số lượng vaccine phải lớn hơn 0'),
  sideEffect: z
    .string()
    .min(1, 'Tác dụng phụ vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Tác dụng phụ vaccine không được chỉ chứa khoảng trắng'
    }),
  certificate: z
    .string()
    .min(1, 'Chứng chỉ vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Chứng chỉ vaccine không được chỉ chứa khoảng trắng'
    })
})

export type VaccineCreateBodyType = z.infer<typeof VaccineCreateBodySchema>

export const VaccineUpdateBodySchema = z.object({
  vaccineName: z
    .string()
    .min(1, 'Tên vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Tên vaccine không được chỉ chứa khoảng trắng'
    }),
  image: z.string().min(1, 'Ảnh vaccine không được để trống'),
  description: z
    .string()
    .min(1, 'Mô tả vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Mô tả vaccine không được chỉ chứa khoảng trắng'
    }),
  price: z.coerce
    .number({
      required_error: 'Giá vaccine không được để trống',
      invalid_type_error: 'Giá vaccine phải là số'
    })
    .gt(0, 'Giá vaccine phải lớn hơn 0'),
  expirationDate: z.coerce
    .date({
      invalid_type_error: 'Ngày hạn sử dụng vaccine phải là ngày hợp lệ'
    })
    .refine((value) => value >= new Date(), {
      message: 'Ngày hạn sử dụng vaccine phải là ngày hiện tại trở lên'
    }),
  manufacturerId: z.string().min(1, 'Nhà sản xuất vaccine không được để trống'),
  supplierId: z.string().min(1, 'Nhà cung cấp vaccine không được để trống'),
  categoryVaccinationId: z.string().min(1, 'Danh mục vaccine không được để trống'),
  batchNumber: z
    .string()
    .min(1, 'Số lô vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Số lô vaccine không được chỉ chứa khoảng trắng'
    }),
  remainingQuantity: z.coerce
    .number({
      required_error: 'Số lượng vaccine không được để trống',
      invalid_type_error: 'Số lượng vaccine phải là số'
    })
    .gt(0, 'Số lượng vaccine phải lớn hơn 0'),
  sideEffect: z
    .string()
    .min(1, 'Tác dụng phụ vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Tác dụng phụ vaccine không được chỉ chứa khoảng trắng'
    }),
  certificate: z
    .string()
    .min(1, 'Chứng chỉ vaccine không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Chứng chỉ vaccine không được chỉ chứa khoảng trắng'
    })
})

export type VaccineUpdateBodyType = z.infer<typeof VaccineUpdateBodySchema>

const VaccineInventoryResponseSchema = z.object({
  data: z.array(
    z.object({
      vaccinationId: z.string().uuid(),
      nameVaccine: z.string(),
      totalQuantity: z.number()
    })
  )
})

export type VaccineInventoryResponseType = z.infer<typeof VaccineInventoryResponseSchema>

export const VaccineUploadImageBodySchema = z.object({
  image: z.instanceof(File, { message: 'Image is required' })
})

export type VaccineUploadImageBodyType = z.TypeOf<typeof VaccineUploadImageBodySchema>

export const VaccineUploadImageResponseSchema = z.object({
  imageUrl: z.string()
})

export type VaccineUploadImageResponseType = z.infer<typeof VaccineUploadImageResponseSchema>

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
  vaccineName: z.string().min(1, 'Vaccine name is required'),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  location: z.string().min(1, 'Location is required'),
  expirationDate: z.coerce.date({
    required_error: 'Expiration date is required',
    invalid_type_error: 'Expiration date must be a valid date'
  }),
  manufacturerId: z.string().min(1, 'Manufacturer is required'),
  supplierId: z.string().min(1, 'Supplier is required'),
  categoryVaccinationId: z.string().min(1, 'Category is required')
})

export type VaccineCreateBodyType = z.infer<typeof VaccineCreateBodySchema>

export const VaccineUpdateBodySchema = z.object({
  vaccineName: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  location: z.string(),
  batchNumber: z.string(),
  certificate: z.string(),
  remainingQuantity: z.number().nonnegative(),
  expirationDate: z.coerce.date({
    required_error: 'Expiration date is required',
    invalid_type_error: 'Expiration date must be a valid date'
  }),
  manufacturerId: z.string(),
  supplierId: z.string(),
  sideEffect: z.string(),
  categoryVaccinationId: z.string()
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

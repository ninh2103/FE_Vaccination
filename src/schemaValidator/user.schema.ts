import { z } from 'zod'

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z
    .string({ message: 'Số điện thoại là bắt buộc' })
    .min(10, 'Số điện thoại là bắt buộc và phải có 10 số')
    .max(10, 'Số điện thoại là bắt buộc và phải có 10 số')
    .regex(/^\d{10}$/, { message: 'Số điện thoại phải là số' })
    .refine((value) => value.trim().length > 0, {
      message: 'Số điện thoại không được chỉ chứa khoảng trắng'
    })
    .nullable(),
  address: z.string().nullable(),
  avatar: z.string().nullable(),
  name: z.string(),
  date_of_birth: z.string().nullable(),
  country: z.string().nullable(),
  createAt: z.string(),
  updateAt: z.string(),
  verificationCode: z.string().nullable(),
  verificationCodeExpiresAt: z.string().nullable(),
  isVerified: z.boolean(),
  role: z.object({
    name: z.enum(['USER', 'ADMIN', 'EMPLOYEE', 'DOCTOR'])
  })
})

export type UserResponseType = z.infer<typeof UserResponseSchema>

export const UpdateMeBody = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Tên là bắt buộc' })
      .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái')
      .refine((value) => value.trim().length > 0, {
        message: 'Tên không được chỉ chứa khoảng trắng'
      }),
    address: z
      .string()
      .min(1, { message: 'Địa chỉ là bắt buộc' })
      .refine((value) => value.trim().length > 0, {
        message: 'Địa chỉ không được chỉ chứa khoảng trắng'
      })
      .optional(),
    phone: z
      .string({ message: 'Số điện thoại là bắt buộc' })
      .min(10, 'Số điện thoại là bắt buộc và phải có 10 số')
      .max(10, 'Số điện thoại là bắt buộc và phải có 10 số')
      .regex(/^\d{10}$/, { message: 'Số điện thoại phải là số' })
      .refine((value) => value.trim().length > 0, {
        message: 'Số điện thoại không được chỉ chứa khoảng trắng'
      })
      .optional(),
    country: z
      .string({ required_error: 'Tên thành phố là bắt buộc' })
      .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tên thành phố chỉ được chứa chữ cái')
      .refine((value) => value.trim().length > 0, {
        message: 'Tên thành phố không được chỉ chứa khoảng trắng'
      }),
    date_of_birth: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true
          const inputDate = new Date(value)
          const today = new Date()
          inputDate.setHours(0, 0, 0, 0)
          today.setHours(0, 0, 0, 0)
          return inputDate <= today
        },
        {
          message: 'Ngày sinh không được lớn hơn ngày hiện tại'
        }
      ),
    role: z.string({ required_error: 'Vai trò là bắt buộc' }).optional(),
    avatar: z.string().optional(),
    email: z.string().email({ message: 'Email không hợp lệ' }).optional()
  })
  .strict()

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>

export const UserResponseListSchema = z.object({
  data: z.array(UserResponseSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type UserResponseListType = z.infer<typeof UserResponseListSchema>

export const UpdateRoleBody = z.object({
  roleId: z.string({ required_error: 'Vai trò là bắt buộc' })
})

export type UpdateRoleBodyType = z.TypeOf<typeof UpdateRoleBody>

export const UploadAvatarBody = z.object({
  avatar: z.instanceof(File, { message: 'Ảnh đại diện là bắt buộc' })
})

export type UploadAvatarBodyType = z.TypeOf<typeof UploadAvatarBody>

export const CountUserResponse = z.object({
  data: z.object({
    total: z.number()
  })
})

export type CountUserResponseType = z.TypeOf<typeof CountUserResponse>

export const UserBody = z.object({
  fullName: z.string({ required_error: 'Họ và tên là bắt buộc' }),
  date_of_birth: z.string({ required_error: 'Ngày sinh là bắt buộc' }),
  gender: z.string({ required_error: 'Giới tính là bắt buộc' }),
  phone: z.string({ required_error: 'Số điện thoại là bắt buộc' }),
  email: z.string({ required_error: 'Email là bắt buộc' }),
  relationship: z.string({ required_error: 'Mối quan hệ là bắt buộc' }),
  address: z.string({ required_error: 'Địa chỉ là bắt buộc' })
})

export type UserBodyType = z.TypeOf<typeof UserBody>

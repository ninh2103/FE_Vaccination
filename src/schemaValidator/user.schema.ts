import { z } from 'zod'

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
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
    name: z.string().min(2),
    address: z.string().optional(),
    phone: z.string().optional(),
    country: z.string({ required_error: 'Country is required' }),
    date_of_birth: z.string().optional(),
    role: z.string({ required_error: 'Role is required' }).optional(),
    avatar: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional()
  })
  .strict()

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>

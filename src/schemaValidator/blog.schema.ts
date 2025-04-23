import { z } from 'zod'

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().nullable(),
  role: RoleSchema
})

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

const BlogSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string().uuid(),
  tagId: z.string().uuid(),
  user: UserSchema,
  tag: TagSchema
})

const BlogResponseSchema = z.object({
  data: z.array(BlogSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type BlogResponseType = z.infer<typeof BlogResponseSchema>

export const CreateResponseBlogSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string().uuid(),
  tagId: z.string().uuid(),
  user: UserSchema,
  tag: TagSchema
})

export type CreateResponseBlogType = z.infer<typeof CreateResponseBlogSchema>

export const BlogBodySchema = z.object({
  title: z
    .string()
    .min(1, 'Tiêu đề không được để trống')
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, 'Tiêu đề chỉ được chứa chữ cái')
    .refine((value) => value.trim().length > 0, {
      message: 'Tiêu đề không được chỉ chứa khoảng trắng'
    }),
  content: z
    .string()
    .min(1, 'Nội dung không được để trống')
    .refine((value) => value.trim().length > 0, {
      message: 'Nội dung không được chỉ chứa khoảng trắng'
    }),
  tagId: z.string().min(1, 'Tag không được để trống')
})

export type BlogBodyType = z.infer<typeof BlogBodySchema>

import { z } from 'zod'

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})
export type RoleResType = z.infer<typeof RoleSchema>

export const RoleResponseSchema = z.object({
  data: z.array(RoleSchema),
  total: z.number().int()
})

export type RoleResponseType = z.infer<typeof RoleResponseSchema>

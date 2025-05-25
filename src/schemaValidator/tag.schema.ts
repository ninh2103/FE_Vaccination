import { z } from 'zod'

const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

const TagResponseSchema = z.object({
  data: z.array(TagSchema),
  total: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number()
})

export type TagResponseType = z.infer<typeof TagResponseSchema>

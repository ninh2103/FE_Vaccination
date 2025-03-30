import { tagService } from '@/core/services/tag.service'
import { useQuery } from '@tanstack/react-query'

export const useListTagQuery = () => {
  return useQuery({
    queryKey: ['tag-list'],
    queryFn: () => tagService.listTags({})
  })
}

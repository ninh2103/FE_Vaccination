import { roleApi } from '@/core/services/role.service'
import { useQuery } from '@tanstack/react-query'

export const useRoleListQuery = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => roleApi.list()
  })
}

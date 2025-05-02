import { appointmentService } from '@/core/services/appointment.service'
import { AppointmentUpdateBodyType } from '@/schemaValidator/appointment.schema'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'

interface ListAppointmentQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListAppointmentQuery = (query: ListAppointmentQuery = {}) => {
  return useQuery({
    queryKey: ['appointment-list', query],
    queryFn: () => appointmentService.getAppointments(query)
  })
}
export const useListAppointmentDailyQuery = (search: string) => {
  return useQuery({
    queryKey: ['appointment-list-daily', search],
    queryFn: () => appointmentService.getAppointmentsDaily(search)
  })
}

export const useGetAppointmentByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['appointment-detail', id],
    queryFn: () => appointmentService.getAppointmentsById(id)
  })
}

export const useUpdateAppointmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AppointmentUpdateBodyType }) =>
      appointmentService.updateAppointment(id, data),
    onSuccess: () => {
      ;['appointment-list', 'appointment-list-daily'].forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    }
  })
}

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => appointmentService.deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointment-list'] })
    }
  })
}

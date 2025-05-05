import bookingService from '@/core/services/booking.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BookingBodyType, BookingConfirmBodyType, BookingCreateBodyType } from '@/schemaValidator/booking.schema'
import { useQueryClient } from '@tanstack/react-query'

// Định nghĩa kiểu dữ liệu cho cập nhật đơn hàng
interface BookingUpdateBodyType {
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'SUCCESS' | 'WAITING_PAYMENT'
  appointmentDate?: string
}

interface ListBookingQuery {
  page?: number
  items_per_page?: number
  search?: string
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELED'
}

export const useListBookingQuery = (query: ListBookingQuery = {}) => {
  return useQuery({
    queryKey: ['booking-list', query],
    queryFn: () => bookingService.list(query)
  })
}

export const useCreateBookingQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: BookingBodyType) => bookingService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-list'] })
    }
  })
}

export const useDetailBookingQuery = (id: string) => {
  return useQuery({
    queryKey: ['booking-detail', id],
    queryFn: () => bookingService.detail(id)
  })
}

export const useConfirmBookingQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: BookingConfirmBodyType) => bookingService.confirmBooking(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-list'] })
    }
  })
}

export const useCreateBookingAdminQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: BookingCreateBodyType) => bookingService.createBooking(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-list'] })
    }
  })
}

export const useDeleteBookingQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => bookingService.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-list'] })
    }
  })
}

export const useUpdateBookingAdminQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookingUpdateBodyType }) =>
      bookingService.updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-list'] })
    }
  })
}
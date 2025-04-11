import bookingService from '@/core/services/booking.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BookingBodyType, BookingConfirmBodyType } from '@/schemaValidator/booking.schema'

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
  return useMutation({
    mutationFn: (body: BookingBodyType) => bookingService.create(body)
  })
}

export const useDetailBookingQuery = (id: string) => {
  return useQuery({
    queryKey: ['booking-detail', id],
    queryFn: () => bookingService.detail(id)
  })
}

export const useConfirmBookingQuery = () => {
  return useMutation({
    mutationFn: (body: BookingConfirmBodyType) => bookingService.confirmBooking(body)
  })
}

import bookingService from '@/core/services/booking.service'
import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { BookingBodyType, BookingResponseType } from '@/schemaValidator/booking.schema'
import { InfiniteData } from '@tanstack/react-query'

interface ListBookingQuery {
  page?: number
  items_per_page?: number
  search?: string
}

export const useListBookingQuery = (query: ListBookingQuery = {}) => {
  return useInfiniteQuery<
    BookingResponseType,
    Error,
    InfiniteData<BookingResponseType>,
    (string | ListBookingQuery)[],
    number
  >({
    queryKey: ['booking-list', query],
    queryFn: ({ pageParam = 1 }) => bookingService.list({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { currentPage, itemsPerPage, total } = lastPage
      const totalPages = Math.ceil(total / itemsPerPage)
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    initialPageParam: 1
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

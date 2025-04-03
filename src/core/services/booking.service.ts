import axiosClient from '@/core/services/axios-client'
import { BookingBodyType, BookingDetailResponseType, BookingResponseType } from '@/schemaValidator/booking.schema'

const API_BOOKING_URL = '/api/bookings'

interface ListBookingQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const bookingService = {
  list(query: ListBookingQuery): Promise<BookingResponseType> {
    return axiosClient.get(API_BOOKING_URL, { params: query })
  },
  create(body: BookingBodyType): Promise<BookingDetailResponseType> {
    return axiosClient.post(`${API_BOOKING_URL}/vacination`, body)
  },
  detail(id: string): Promise<BookingDetailResponseType> {
    return axiosClient.get(`${API_BOOKING_URL}/${id}`)
  }
}

export default bookingService

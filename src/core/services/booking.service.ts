import axiosClient from '@/core/services/axios-client'
import {
  BookingBodyType,
  BookingConfirmBodyType,
  BookingConfirmResponseType,
  BookingCreateBodyType,
  BookingDetailResponseType,
  BookingResponseType
} from '@/schemaValidator/booking.schema'

const API_BOOKING_URL = '/api/bookings'
const API_BOOKING_CONFIRM_URL = '/api/bookings/confirm'
const API_BOOKING_CREATE_URL = '/api/bookings/admin'

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
  },
  confirmBooking(body: BookingConfirmBodyType): Promise<BookingConfirmResponseType> {
    return axiosClient.post(`${API_BOOKING_CONFIRM_URL}`, body)
  },
  createBooking(body: BookingCreateBodyType): Promise<BookingDetailResponseType> {
    return axiosClient.post(API_BOOKING_CREATE_URL, body)
  },
  deleteBooking(id: string) {
    return axiosClient.delete(`${API_BOOKING_URL}/${id}`)
  }
}

export default bookingService

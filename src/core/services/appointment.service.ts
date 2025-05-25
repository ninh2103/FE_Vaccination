import axiosClient from '@/core/services/axios-client'
import {
  AppointmentDailyResponseType,
  AppointmentDetailType,
  AppointmentListResponseType,
  AppointmentUpdateBodyType,
  AppointmentUpdateType
} from '@/schemaValidator/appointment.schema'

interface ListAppointmentQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const API_APPOINTMENT_URL = '/api/appointments'

export const appointmentService = {
  getAppointments(query: ListAppointmentQuery): Promise<AppointmentListResponseType> {
    return axiosClient.get(API_APPOINTMENT_URL, { params: query })
  },
  getAppointmentsDaily(search: string): Promise<AppointmentDailyResponseType> {
    return axiosClient.get(`${API_APPOINTMENT_URL}/daily`, { params: { search } })
  },
  getAppointmentsById(id: string): Promise<AppointmentDetailType> {
    return axiosClient.get(`${API_APPOINTMENT_URL}/${id}`)
  },
  updateAppointment(id: string, data: AppointmentUpdateBodyType): Promise<AppointmentUpdateType> {
    return axiosClient.put(`${API_APPOINTMENT_URL}/${id}`, data)
  },
  deleteAppointment(id: string): Promise<void> {
    return axiosClient.delete(`${API_APPOINTMENT_URL}/${id}`)
  }
}

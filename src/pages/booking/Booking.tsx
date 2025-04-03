import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useGetVaccinationByIdQuery } from '@/queries/useVaccination'
import { useSearchParams } from 'react-router-dom'
import { useCreateBookingQuery } from '@/queries/useBooking'
import { getUserFromLocalStorage } from '@/core/shared/storage'
import { useDetailUserQuery } from '@/queries/useUser'
import { BookingBodySchema, BookingBodyType } from '@/schemaValidator/booking.schema'
import { toast } from 'sonner'
import { formatVND, handleErrorApi } from '@/core/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CheckOutPagePageMain = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const user = getUserFromLocalStorage()
  const { data: vaccineDetail, refetch: refetchVaccine } = useGetVaccinationByIdQuery(id as string)
  const { mutate: createBooking } = useCreateBookingQuery()
  const { data: userDetail } = useDetailUserQuery(user?.id as string)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const form = useForm<BookingBodyType>({
    resolver: zodResolver(BookingBodySchema(vaccineDetail?.remainingQuantity || 0)),
    defaultValues: {
      appointmentDate: '',
      vaccinationQuantity: 1,
      vaccinationId: id as string
    }
  })

  useEffect(() => {
    if (userDetail) {
      const today = new Date()
      setSelectedDate(today.toISOString().split('T')[0])
      setSelectedTime('08:00')
    }
  }, [userDetail])

  useEffect(() => {
    if (selectedDate && selectedTime) {
      // Create a proper ISO 8601 datetime string
      const [hours, minutes] = selectedTime.split(':')
      const date = new Date(selectedDate)
      date.setHours(parseInt(hours, 10))
      date.setMinutes(parseInt(minutes, 10))
      date.setSeconds(0)
      date.setMilliseconds(0)

      const isoDateTime = date.toISOString()
      form.setValue('appointmentDate', isoDateTime)
    }
  }, [selectedDate, selectedTime, form])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':')
    const minutesNum = parseInt(minutes, 10)

    // Round to nearest 30 minutes
    const roundedMinutes = Math.round(minutesNum / 30) * 30
    const newTime = `${hours.padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`

    setSelectedTime(newTime)
  }

  const handleSubmit = (body: BookingBodyType) => {
    createBooking(body, {
      onSuccess: () => {
        refetchVaccine()
        toast.success('Booking created successfully')
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: form.setError,
          duration: 5000
        })
        toast.error(error.message || 'Booking failed')
      }
    })
  }

  return (
    <div className='container mx-auto px-4 py-8 lg:py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Form Section */}
        <div className='lg:col-span-2'>
          <Card className='dark:bg-gray-900'>
            <CardContent className='p-6 space-y-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Booking Information</h2>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='appointmentDate'>Appointment Date</Label>
                    <Input
                      id='appointmentDate'
                      type='date'
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                        form.formState.errors.appointmentDate ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='appointmentTime'>Appointment Time</Label>
                    <Input
                      id='appointmentTime'
                      type='time'
                      value={selectedTime}
                      onChange={handleTimeChange}
                      step='1800'
                      className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                        form.formState.errors.appointmentDate ? 'border-red-500' : ''
                      }`}
                    />
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Available times: 8:00 AM - 5:00 PM (30-minute intervals)
                    </p>
                  </div>
                </div>
                {form.formState.errors.appointmentDate && (
                  <p className='text-sm text-red-500'>{form.formState.errors.appointmentDate.message}</p>
                )}

                <div className='space-y-2'>
                  <Label htmlFor='vaccinationQuantity'>Number of Doses</Label>
                  <Input
                    id='vaccinationQuantity'
                    type='number'
                    {...form.register('vaccinationQuantity', { valueAsNumber: true })}
                    className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                      form.formState.errors.vaccinationQuantity ? 'border-red-500' : ''
                    }`}
                  />
                  {form.formState.errors.vaccinationQuantity && (
                    <p className='text-sm text-red-500'>{form.formState.errors.vaccinationQuantity.message}</p>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:text-blue-400 text-white'
                >
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section */}
        <div className='lg:col-span-1'>
          <Card className='dark:bg-gray-900 sticky top-8'>
            <CardContent className='p-6 space-y-6'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Booking Summary</h3>
                <div className='rounded-lg overflow-hidden'>
                  <img
                    alt={vaccineDetail?.vaccineName}
                    className='w-full h-48 object-cover'
                    src={vaccineDetail?.image}
                  />
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 dark:text-white'>{vaccineDetail?.vaccineName}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>{vaccineDetail?.description}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>Location: {vaccineDetail?.location}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Available Quantity: {vaccineDetail?.remainingQuantity}
                  </p>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-300'>Price per Dose</span>
                    <span className='text-xl font-semibold text-gray-900 dark:text-white'>
                      {formatVND(vaccineDetail?.price || 0)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-gray-600 dark:text-gray-300'>Total Amount</span>
                    <span className='text-xl font-semibold text-gray-900 dark:text-white'>
                      {formatVND(vaccineDetail?.price || 0 * (form.watch('vaccinationQuantity') || 1))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPagePageMain

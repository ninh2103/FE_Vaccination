import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useGetVaccinationByIdQuery } from '@/queries/useVaccination'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useConfirmBookingQuery, useCreateBookingQuery } from '@/queries/useBooking'
import { getUserFromLocalStorage } from '@/core/shared/storage'
import { useDetailUserQuery } from '@/queries/useUser'
import { BookingBodySchema, BookingBodyType } from '@/schemaValidator/booking.schema'
import { toast } from 'sonner'
import { formatVND, handleErrorApi } from '@/core/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreatePaymentMutation } from '@/queries/useMomo'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Banknote, CreditCard, HandCoins, ArrowLeft } from 'lucide-react'
import { path } from '@/core/constants/path'
import { UserBody, UserBodyType } from '@/schemaValidator/user.schema'

const CheckOutPagePageMain = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const user = getUserFromLocalStorage()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'MOMO' | 'CASH'>('MOMO')
  const { data: vaccineDetail, refetch: refetchVaccine } = useGetVaccinationByIdQuery(id as string)
  const { mutate: createBooking } = useCreateBookingQuery()
  const { data: userDetail } = useDetailUserQuery(user?.id as string)
  const { mutate: createPayment } = useCreatePaymentMutation()
  const { mutate: confirmBooking } = useConfirmBookingQuery()
  const form = useForm<BookingBodyType>({
    resolver: zodResolver(BookingBodySchema(vaccineDetail?.remainingQuantity || 0)),
    defaultValues: {
      appointmentDate: '',
      vaccinationQuantity: 1,
      vaccinationId: id as string
    }
  })

  const formUser = useForm<UserBodyType>({
    resolver: zodResolver(UserBody),
    defaultValues: {
      fullName: '',
      date_of_birth: '',
      gender: '',
      phone: '',
      email: '',
      relationship: '',
      address: ''
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
      onSuccess: (response) => {
        refetchVaccine()
        toast.success('Đặt lịch hẹn thành công')

        if (paymentMethod === 'MOMO') {
          createPayment(
            { bookingId: response.id },
            {
              onSuccess: (paymentResponse) => {
                window.location.href = paymentResponse.paymentUrl.paymentUrl
              },
              onError: (error) => {
                handleErrorApi({
                  error: error,
                  setError: form.setError,
                  duration: 5000
                })
                toast.error(error.message || 'Thanh toán thất bại')
              }
            }
          )
        } else {
          confirmBooking(
            { bookingId: response.id },
            {
              onSuccess: (data) => {
                toast.success(data.message)
                navigate(path.list)
              },
              onError: (error) => {
                handleErrorApi({
                  error: error,
                  setError: form.setError,
                  duration: 5000
                })
                toast.error(error.message || 'Đặt lịch hẹn thất bại')
              }
            }
          )
        }
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: form.setError,
          duration: 5000
        })
        toast.error(error.message || 'Đặt lịch hẹn thất bại')
      }
    })
  }
  return (
    <div className='container mx-auto px-4 py-8 lg:py-12 mt-12'>
      <Button
        variant='ghost'
        className='mb-4 hover:bg-blue-50 transition-colors duration-200 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className='w-4 h-4' />
        Quay lại trang chi tiết vắc xin
      </Button>
      <div className='grid grid-cols-1 lg:grid-cols-3  gap-8'>
        {/* Main Form Section */}
        <div className='lg:col-span-2'>
          <Card className='dark:bg-gray-900 h-full'>
            <CardContent className='p-6 space-y-6'>
              {/* 👉 THÔNG TIN NGƯỜI TIÊM TÁCH KHỎI FORM */}
              <div className='space-y-4'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Thông Tin Người Tiêm</h2>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <Label>
                      Họ và tên <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      value={formUser.watch('fullName')}
                      {...formUser.register('fullName')}
                      placeholder='Họ và tên'
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                    />
                  </div>
                  <div>
                    <Label>
                      Mối quan hệ <span className='text-red-500'>*</span>
                    </Label>
                    <select
                      value={formUser.watch('relationship')}
                      {...formUser.register('relationship')}
                      className='w-full border border-green-500 focus:border-green-400 focus:ring-green-400 dark:bg-gray-800 px-3 py-2  rounded-md'
                    >
                      <option value=''>Chọn mối quan hệ</option>
                      <option value='parent'>Cha/Mẹ</option>
                      <option value='child'>Con</option>
                      <option value='sibling'>Anh/Chị/Em</option>
                      <option value='other'>Khác</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Ngày sinh <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      type='date'
                      value={formUser.watch('date_of_birth')}
                      {...formUser.register('date_of_birth')}
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                    />
                  </div>
                  <div>
                    <Label>
                      Giới tính <span className='text-red-500'>*</span>
                    </Label>
                    <div className='flex items-center gap-4 mt-2'>
                      <label className='flex items-center gap-2 text-gray-900 dark:text-white'>
                        <input
                          type='radio'
                          value='male'
                          {...formUser.register('gender')}
                          checked={formUser.watch('gender') === 'male'}
                        />
                        Nam
                      </label>
                      <label className='flex items-center gap-2 text-gray-900 dark:text-white'>
                        <input
                          type='radio'
                          value='female'
                          {...formUser.register('gender')}
                          checked={formUser.watch('gender') === 'female'}
                        />
                        Nữ
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label>
                      Số điện thoại <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      type='tel'
                      value={formUser.watch('phone')}
                      {...formUser.register('phone')}
                      placeholder='Số điện thoại'
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                    />
                    {formUser.formState.errors.phone && (
                      <p className='text-red-500 text-sm'>{formUser.formState.errors.phone.message}</p>
                    )}
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      Nếu người được tiêm chưa có SĐT, vui lòng điền SĐT của cha/mẹ hoặc người giám hộ.
                    </p>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      type='email'
                      value={formUser.watch('email')}
                      {...formUser.register('email')}
                      placeholder='Email'
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <Label>
                      Địa chỉ <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      value={formUser.watch('address')}
                      {...formUser.register('address')}
                      placeholder='Số nhà, tên đường (Theo hộ khẩu/CMND)'
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                    />
                  </div>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'> Chọn Thời Gian Mong Muốn Tiêm </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='appointmentDate'>Ngày đặt lịch hẹn</Label>
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
                    {form.formState.errors.appointmentDate && (
                      <p className='text-sm text-red-500'>{form.formState.errors.appointmentDate.message}</p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='appointmentTime'>Giờ hẹn tiêm</Label>
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
                      Giờ hẹn tiêm: 8:00 - 17:00 (Không nghỉ trưa)
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='vaccinationQuantity'>Số liều vắc xin</Label>
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
                </div>

                <div className='space-y-4'>
                  <div className='pt-4 flex items-center space-x-2 border-t border-green-500 dark:border-green-700'>
                    <Banknote className='w-6 h-6 text-gray-900 dark:text-white' />
                    <Label className='text-gray-900 dark:text-white text-lg font-bold'>Phương thức thanh toán</Label>
                  </div>
                  <RadioGroup
                    defaultValue='MOMO'
                    value={paymentMethod}
                    onValueChange={(value: 'MOMO' | 'CASH') => setPaymentMethod(value)}
                    className='flex flex-col space-y-2'
                  >
                    <div className='flex items-center justify-between border border-green-500 dark:border-green-700 rounded-md p-4'>
                      <div className='flex items-center space-x-2'>
                        <CreditCard className='w-6 h-6 text-gray-900 dark:text-white' />
                        <Label className='text-gray-900 dark:text-white text-lg font-semibold' htmlFor='momo'>
                          Thanh toán qua Momo
                        </Label>
                      </div>
                      <RadioGroupItem
                        className='w-6 h-6 border-green-500 dark:border-green-700 data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-700 rounded-full [&>span]:hidden'
                        value='MOMO'
                        id='momo'
                      />
                    </div>

                    <div className='flex items-center justify-between border border-green-500 dark:border-green-700 rounded-md p-4'>
                      <div className='flex items-center space-x-2'>
                        <HandCoins className='w-6 h-6 text-gray-900 dark:text-white' />
                        <Label className='text-gray-900 dark:text-white text-lg font-semibold' htmlFor='cash'>
                          Thanh toán tiền mặt
                        </Label>
                      </div>
                      <RadioGroupItem
                        className='w-6 h-6 border-green-500 dark:border-green-700 data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-700 rounded-full [&>span]:hidden'
                        value='CASH'
                        id='cash'
                      />
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:text-blue-400 text-white'
                >
                  Xác nhận đặt mua vắc xin
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar Section */}
        <div className='lg:col-span-1'>
          <Card className='dark:bg-gray-900 sticky top-8'>
            <CardContent className='p-6 space-y-4'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Thông tin vắc xin</h3>
                <div className='rounded-lg overflow-hidden'>
                  <img
                    alt={vaccineDetail?.vaccineName}
                    className=' cursor-pointer  w-full h-60 object-cover transition-transform duration-300 hover:scale-105'
                    src={vaccineDetail?.image}
                  />
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 dark:text-white'>{vaccineDetail?.vaccineName}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{vaccineDetail?.description}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Số liệu pháp còn lại: {vaccineDetail?.remainingQuantity}
                  </p>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-300'>Giá tiền</span>
                    <span className='text-xl font-semibold text-gray-900 dark:text-white'>
                      {formatVND(vaccineDetail?.price || 0)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-gray-600 dark:text-gray-300'>Tổng số tiền</span>
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

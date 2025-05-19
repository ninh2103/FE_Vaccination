import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useListUserQuery } from '@/queries/useUser'
import { useCreateBookingAdminQuery } from '@/queries/useBooking'
import { BookingCreateBodySchema, BookingCreateBodyType } from '@/schemaValidator/booking.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { Select, SelectItem, SelectContent, SelectTrigger } from '@/components/ui/select'
import { useGetCategoryByIdQuery, useListCategoryQuery } from '@/queries/useCategory'

interface Booking {
  id: string
  vaccinationId: string
  userId: string
  vaccinationQuantity: number
  vaccinationPrice: number
  totalAmount: number
  createdAt: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED'
  vaccinationDate: string
  confirmationTime: string
  appointmentDate: string
}

interface AddOrderProps {
  onAdd: (booking: Booking) => void
  onCancel: () => void
}

export function AddOrder({ onAdd, onCancel }: AddOrderProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedVaccineId, setSelectedVaccineId] = useState('')
  const [selectedVaccine, setSelectedVaccine] = useState<any>(null)

  const { data: users } = useListUserQuery({})
  const userOptions = users?.data
    .filter((user) => user.role.name === 'USER')
    .map((user) => ({
      label: user.name,
      value: user.id
    }))

  const { data: categories } = useListCategoryQuery()
  const categoryOptions = categories?.data.map((category) => ({
    label: category.name,
    value: category.id
  }))

  const { data: categoryDetail } = useGetCategoryByIdQuery(selectedCategoryId)
  const vaccineOptions =
    categoryDetail?.vaccines?.map((vaccine) => ({
      label: vaccine.vaccineName,
      value: vaccine.id,
      remainingQuantity: vaccine.remainingQuantity
    })) || []

  const { mutate: createBookingAdmin } = useCreateBookingAdminQuery()

  const form = useForm<BookingCreateBodyType>({
    resolver: zodResolver(BookingCreateBodySchema),
    defaultValues: {
      vaccinationId: '',
      userId: '',
      appointmentDate: new Date()
    }
  })

  const handleSubmit = (data: BookingCreateBodyType) => {
    if (selectedVaccine?.remainingQuantity === 0) {
      toast.error('Vacxin này đã hết hàng')
      return
    }

    createBookingAdmin(data, {
      onSuccess: () => {
        toast.success('Đã tạo đơn hàng thành công')
        form.reset()
        onAdd(data as unknown as Booking)
        onCancel()
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
      }
    })
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value)
    setSelectedVaccineId('')
    setSelectedVaccine(null)
    form.setValue('vaccinationId', '')
  }

  const handleVaccineChange = (value: string) => {
    setSelectedVaccineId(value)
    const selected = vaccineOptions.find((v) => v.value === value)
    setSelectedVaccine(selected)
    form.setValue('vaccinationId', value)
  }

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Thêm đơn hàng mới</DialogTitle>
        <DialogDescription>Tạo đơn hàng mới.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='categoryId'>Danh mục *</Label>
          <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400`}>
              {categoryOptions?.find((option) => option.value === selectedCategoryId)?.label || 'Chọn danh mục'}
            </SelectTrigger>
            <SelectContent>
              {categoryOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategoryId && (
          <div className='flex flex-col gap-2'>
            <Label htmlFor='vaccinationId'>Vacxin *</Label>
            <Select value={selectedVaccineId} onValueChange={handleVaccineChange}>
              <SelectTrigger
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.vaccinationId ? 'border-red-500' : ''
                }`}
              >
                {vaccineOptions?.find((option) => option.value === selectedVaccineId)?.label || 'Chọn Vacxin'}
              </SelectTrigger>
              <SelectContent>
                {vaccineOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.remainingQuantity === 0}>
                    {option.label}{' '}
                    {option.remainingQuantity === 0 ? '(Hết hàng)' : `(${option.remainingQuantity} còn lại)`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.vaccinationId && (
              <p className='text-red-500 text-sm'>{form.formState.errors.vaccinationId.message}</p>
            )}
          </div>
        )}

        <div className='flex flex-col gap-2'>
          <Label htmlFor='userId'>Người dùng *</Label>
          <Select value={form.watch('userId')} onValueChange={(value) => form.setValue('userId', value)}>
            <SelectTrigger
              className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                form.formState.errors.userId ? 'border-red-500' : ''
              }`}
            >
              {userOptions?.find((option) => option.value === form.watch('userId'))?.label || 'Chọn Người dùng'}
            </SelectTrigger>
            <SelectContent>
              {userOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.userId && (
            <p className='text-red-500 text-sm'>{form.formState.errors.userId.message}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='appointment-date'>Ngày hẹn *</Label>
            <Input
              id='appointment-date'
              type='date'
              min={today.toISOString().split('T')[0]}
              value={form.watch('appointmentDate') ? format(form.watch('appointmentDate'), 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-').map(Number)
                const now = new Date()
                const combinedDate = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds())
                form.setValue('appointmentDate', combinedDate)
              }}
            />
            {form.formState.errors.appointmentDate && (
              <p className='text-red-500 text-sm'>{form.formState.errors.appointmentDate.message}</p>
            )}
            <p className='text-xs text-muted-foreground'>Chỉ cho phép ngày từ hôm nay trở đi để đặt lịch.</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button
          onClick={form.handleSubmit(handleSubmit)}
          disabled={!selectedVaccineId || selectedVaccine?.remainingQuantity === 0}
        >
          Tạo đơn hàng
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

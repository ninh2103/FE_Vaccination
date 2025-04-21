import { useState } from 'react'
import { format, addDays } from 'date-fns'
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
  const vaccineOptions = categoryDetail?.vaccines?.map((vaccine) => ({
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
      vaccinationQuantity: 1,
      appointmentDate: new Date()
    }
  })

  const handleSubmit = (data: BookingCreateBodyType) => {
    if (selectedVaccine?.remainingQuantity === 0) {
      toast.error('This vaccine is out of stock')
      return
    }
    if (data.vaccinationQuantity > selectedVaccine?.remainingQuantity) {
      toast.error(`Maximum available quantity is ${selectedVaccine?.remainingQuantity}`)
      return
    }
    createBookingAdmin(data, {
      onSuccess: () => {
        toast.success('Booking created successfully')
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
    const selected = vaccineOptions.find(v => v.value === value)
    setSelectedVaccine(selected)
    form.setValue('vaccinationId', value)
  }

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value)
    if (selectedVaccine?.remainingQuantity === 0) {
      toast.error('This vaccine is out of stock')
      return
    }
    if (quantity > selectedVaccine?.remainingQuantity) {
      toast.error(`Maximum available quantity is ${selectedVaccine?.remainingQuantity}`)
      return
    }
    form.setValue('vaccinationQuantity', quantity)
  }

  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  return (
    <DialogContent className='sm:max-w-[550px]'>
      <DialogHeader>
        <DialogTitle>Add New Booking</DialogTitle>
        <DialogDescription>Create a new vaccination booking.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='categoryId'>Category</Label>
          <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger
              className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400`}
            >
              {categoryOptions?.find((option) => option.value === selectedCategoryId)?.label || 'Select Category'}
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
            <Label htmlFor='vaccinationId'>Vaccine</Label>
            <Select value={selectedVaccineId} onValueChange={handleVaccineChange}>
              <SelectTrigger
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.vaccinationId ? 'border-red-500' : ''
                }`}
              >
                {vaccineOptions?.find((option) => option.value === selectedVaccineId)?.label || 'Select Vaccine'}
              </SelectTrigger>
              <SelectContent>
                {vaccineOptions?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    disabled={option.remainingQuantity === 0}
                  >
                    {option.label} {option.remainingQuantity === 0 ? '(Out of Stock)' : `(${option.remainingQuantity} available)`}
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
          <Label htmlFor='userId'>User</Label>
          <Select value={form.watch('userId')} onValueChange={(value) => form.setValue('userId', value)}>
            <SelectTrigger
              className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                form.formState.errors.userId ? 'border-red-500' : ''
              }`}
            >
              {userOptions?.find((option) => option.value === form.watch('userId'))?.label || 'Select User'}
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
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              id='quantity'
              type='number'
              min={1}
              max={selectedVaccine?.remainingQuantity}
              value={form.watch('vaccinationQuantity')}
              onChange={(e) => handleQuantityChange(e.target.value)}
              disabled={!selectedVaccineId || selectedVaccine?.remainingQuantity === 0}
            />
            {form.formState.errors.vaccinationQuantity && (
              <p className='text-red-500 text-sm'>{form.formState.errors.vaccinationQuantity.message}</p>
            )}
            {selectedVaccine && (
              <p className='text-xs text-muted-foreground'>
                Available: {selectedVaccine.remainingQuantity} doses
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='appointment-date'>Appointment Date</Label>
            <Input
              id='appointment-date'
              type='date'
              min={tomorrow}
              value={
                form.watch('appointmentDate')
                  ? format(form.watch('appointmentDate'), 'yyyy-MM-dd')
                  : ''
              }
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-').map(Number)
                const now = new Date()
                const combinedDate = new Date(
                  year,
                  month - 1,
                  day,
                  now.getHours(),
                  now.getMinutes(),
                  now.getSeconds()
                )
                form.setValue('appointmentDate', combinedDate)
              }}
            />
            {form.formState.errors.appointmentDate && (
              <p className='text-red-500 text-sm'>{form.formState.errors.appointmentDate.message}</p>
            )}
            <p className='text-xs text-muted-foreground'>
              Only future dates are allowed for booking.
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={form.handleSubmit(handleSubmit)}
          disabled={!selectedVaccineId || selectedVaccine?.remainingQuantity === 0}
        >
          Create Booking
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

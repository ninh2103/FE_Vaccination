import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { VaccineType, VaccineUpdateBodySchema, VaccineUpdateBodyType } from '@/schemaValidator/vaccination.schema'
import { format } from 'date-fns'
import {
  useUpdateVaccinationQuery,
  useUploadImageVaccinationQuery,
  useGetVaccinationByIdQuery
} from '@/queries/useVaccination'
import { useListCategoryQuery } from '@/queries/useCategory'
import { useListManufacturerQuery } from '@/queries/useManufacturer'
import { useListSupplierQuery } from '@/queries/useSupplier'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'
interface UpdateVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedVaccine: VaccineType | null
}

export default function UpdateVaccine({ open, onOpenChange, selectedVaccine }: UpdateVaccineProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const { mutate: updateVaccine } = useUpdateVaccinationQuery()
  const { mutateAsync: uploadImage } = useUploadImageVaccinationQuery()
  const { data: categoryVaccinationData } = useListCategoryQuery()
  const { data: manufacturerData } = useListManufacturerQuery()
  const { data: supplierData } = useListSupplierQuery()
  const { data: vaccineData } = useGetVaccinationByIdQuery(selectedVaccine?.id || '')

  const form = useForm<VaccineUpdateBodyType>({
    resolver: zodResolver(VaccineUpdateBodySchema),
    defaultValues: {
      vaccineName: vaccineData?.vaccineName,
      description: vaccineData?.description,
      price: vaccineData?.price ?? 0,
      image: vaccineData?.image,
      manufacturerId: vaccineData?.manufacturerId ?? undefined,
      supplierId: vaccineData?.supplierId ?? undefined,
      batchNumber: vaccineData?.batchNumber ?? undefined,
      certificate: vaccineData?.certificate ?? undefined,
      remainingQuantity: vaccineData?.remainingQuantity ?? 0,
      expirationDate: vaccineData?.expirationDate ?? undefined,
      sideEffect: vaccineData?.sideEffect ?? undefined,
      categoryVaccinationId: vaccineData?.categoryVaccinationId ?? undefined
    }
  })
  const image = form.watch('image')
  const previewImageFromFile = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return image
  }, [file, image])

  useEffect(() => {
    if (vaccineData) {
      const {
        vaccineName,
        image,
        description,
        price,
        batchNumber,
        certificate,
        remainingQuantity,
        expirationDate,
        manufacturerId,
        supplierId,
        sideEffect,
        categoryVaccinationId
      } = vaccineData
      form.reset({
        vaccineName,
        image: image ?? undefined,
        price,
        description,
        batchNumber,
        certificate: certificate ?? undefined,
        remainingQuantity,
        expirationDate,
        manufacturerId: manufacturerId ?? undefined,
        supplierId: supplierId ?? undefined,
        sideEffect: sideEffect ?? undefined,
        categoryVaccinationId: categoryVaccinationId ?? undefined
      })
    }
  }, [vaccineData, form])

  const onSubmit = async (values: VaccineUpdateBodyType) => {
    let body: VaccineUpdateBodyType & { id: string } = {
      id: selectedVaccine?.id as string,
      ...values
    }
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const uploadResult = await uploadImage(formData)
        const imageUrl = uploadResult.imageUrl
        body = {
          ...body,
          image: imageUrl
        }
      }
      await updateVaccine({ id: selectedVaccine?.id as string, body })
      toast.success('Cập nhật vaccine thành công')
      setIsLoading(false)
      onOpenChange(false)
    } catch (error) {
      handleErrorApi({
        error: error as any,
        setError: form.setError,
        duration: 3000
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Cập nhật vaccine</DialogTitle>
          <DialogDescription>Cập nhật thông tin cho vaccine đã chọn.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4 max-h-[80vh] overflow-y-auto'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='vaccineName'>Tên vaccine *</Label>
              <Input
                id='vaccineName'
                {...form.register('vaccineName')}
                placeholder='e.g., Vaccine COVID-19'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.vaccineName ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.vaccineName && (
                <p className='text-red-500 text-sm'>{form.formState.errors.vaccineName.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='price'>Giá (VND) *</Label>
              <Input
                id='price'
                type='number'
                {...form.register('price', { valueAsNumber: true })}
                placeholder='e.g., 500000'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.price ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.price && (
                <p className='text-red-500 text-sm'>{form.formState.errors.price.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='expirationDate'>Ngày hạn sử dụng *</Label>
              <Input
                id='expirationDate'
                type='date'
                value={form.watch('expirationDate') ? format(form.watch('expirationDate'), 'yyyy-MM-dd') : ''}
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
                  form.setValue('expirationDate', combinedDate)
                }}
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.expirationDate ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.expirationDate && (
                <p className='text-red-500 text-sm'>{form.formState.errors.expirationDate.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='categoryVaccinationId'>Danh mục vaccine *</Label>
              <Select
                value={form.watch('categoryVaccinationId')}
                onValueChange={(value) => form.setValue('categoryVaccinationId', value)}
              >
                <SelectTrigger
                  className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                    form.formState.errors.categoryVaccinationId ? 'border-red-500' : ''
                  }`}
                >
                  {categoryVaccinationData?.data.find((category) => category.id === form.watch('categoryVaccinationId'))
                    ?.name || 'Select Category Vaccination'}
                </SelectTrigger>
                <SelectContent>
                  {categoryVaccinationData?.data.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.categoryVaccinationId && (
                <p className='text-red-500 text-sm'>{form.formState.errors.categoryVaccinationId.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='manufacturerId'>Nhà sản xuất vaccine *</Label>
              <Select
                value={form.watch('manufacturerId')}
                onValueChange={(value) => form.setValue('manufacturerId', value)}
              >
                <SelectTrigger
                  className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                    form.formState.errors.manufacturerId ? 'border-red-500' : ''
                  }`}
                >
                  {manufacturerData?.data.find((manufacturer) => manufacturer.id === form.watch('manufacturerId'))
                    ?.name || 'Select Manufacturer'}
                </SelectTrigger>
                <SelectContent>
                  {manufacturerData?.data.map((manufacturer) => (
                    <SelectItem key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.manufacturerId && (
                <p className='text-red-500 text-sm'>{form.formState.errors.manufacturerId.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='supplierId'>Nhà cung cấp vaccine *</Label>
              <Select value={form.watch('supplierId')} onValueChange={(value) => form.setValue('supplierId', value)}>
                <SelectTrigger
                  className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                    form.formState.errors.supplierId ? 'border-red-500' : ''
                  }`}
                >
                  {supplierData?.data.find((supplier) => supplier.id === form.watch('supplierId'))?.name ||
                    'Select Supplier'}
                </SelectTrigger>
                <SelectContent>
                  {supplierData?.data.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.supplierId && (
                <p className='text-red-500 text-sm'>{form.formState.errors.supplierId.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='certificate'>Chứng chỉ vaccine *</Label>
              <Input
                id='certificate'
                {...form.register('certificate')}
                placeholder='e.g., Chứng chỉ'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.certificate ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.certificate && (
                <p className='text-red-500 text-sm'>{form.formState.errors.certificate.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='batchNumber'>Số lô vaccine *</Label>
              <Input
                id='batchNumber'
                {...form.register('batchNumber')}
                placeholder='e.g., Số lô'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.batchNumber ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.batchNumber && (
                <p className='text-red-500 text-sm'>{form.formState.errors.batchNumber.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='remainingQuantity'>Số lượng vaccine *</Label>
              <Input
                id='remainingQuantity'
                type='number'
                {...form.register('remainingQuantity', { valueAsNumber: true })}
                placeholder='e.g., 500000'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.price ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.remainingQuantity && (
                <p className='text-red-500 text-sm'>{form.formState.errors.remainingQuantity.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='sideEffect'>Tác dụng phụ *</Label>
              <Input
                id='sideEffect'
                {...form.register('sideEffect')}
                placeholder='e.g., Tác dụng phụ'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.sideEffect ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.sideEffect && (
                <p className='text-red-500 text-sm'>{form.formState.errors.sideEffect.message}</p>
              )}
            </div>
          </div>

          <div className='flex gap-2 items-start justify-start'>
            <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
              <AvatarImage src={previewImageFromFile || ''} />
              <AvatarFallback className='rounded-none'>{previewImageFromFile || 'Ảnh'}</AvatarFallback>
            </Avatar>
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setFile(file)
                  form.setValue('image', 'uploaded', { shouldValidate: true })
                }
              }}
              className='hidden'
            />
            <button
              className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
              type='button'
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    setFile(file)
                    form.setValue('image', 'uploaded', { shouldValidate: true })
                  }
                }
                input.click()
              }}
            >
              <Upload className='h-4 w-4 text-muted-foreground' />
              <span className='sr-only'>Upload</span>
            </button>
          </div>
          {form.formState.errors.image && <p className='text-red-500 text-sm'>{form.formState.errors.image.message}</p>}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Mô tả *</Label>
            <Textarea
              id='description'
              {...form.register('description')}
              placeholder='e.g., Mô tả vaccine'
              className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                form.formState.errors.description ? 'border-red-500' : ''
              }`}
            />
            {form.formState.errors.description && (
              <p className='text-red-500 text-sm'>{form.formState.errors.description.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy bỏ
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật vaccine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

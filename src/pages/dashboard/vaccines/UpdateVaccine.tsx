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
      price: vaccineData?.price,
      image: vaccineData?.image,
      manufacturerId: vaccineData?.manufacturerId ?? undefined,
      supplierId: vaccineData?.supplierId ?? undefined,
      location: vaccineData?.location ?? undefined,
      batchNumber: vaccineData?.batchNumber ?? undefined,
      certificate: vaccineData?.certificate ?? undefined,
      remainingQuantity: vaccineData?.remainingQuantity ?? undefined,
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
        location,
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
        location,
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
      toast.success('Vaccine updated successfully')
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
          <DialogTitle>Edit Vaccine</DialogTitle>
          <DialogDescription>Update the details for the selected vaccine.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4 max-h-[80vh] overflow-y-auto'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='vaccineName'>Vaccine Name *</Label>
              <Input
                id='vaccineName'
                {...form.register('vaccineName')}
                placeholder='e.g., COVID-19 Vaccine'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.vaccineName ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.vaccineName && (
                <p className='text-red-500 text-sm'>{form.formState.errors.vaccineName.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='price'>Price (VND)</Label>
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
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                {...form.register('location')}
                placeholder='Enter location'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.location ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.location && (
                <p className='text-red-500 text-sm'>{form.formState.errors.location.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='categoryVaccinationId'>Category Vaccine</Label>
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
              <Label htmlFor='manufacturerId'>Manufacturer Vaccine</Label>
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
              <Label htmlFor='supplierId'>Supplier Vaccine</Label>
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
              <Label htmlFor='certificate'>Certificate</Label>
              <Input
                id='certificate'
                {...form.register('certificate')}
                placeholder='e.g., Certificate'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.certificate ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.certificate && (
                <p className='text-red-500 text-sm'>{form.formState.errors.certificate.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='batchNumber'>Batch Number</Label>
              <Input
                id='batchNumber'
                {...form.register('batchNumber')}
                placeholder='e.g., Batch Number'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.batchNumber ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.batchNumber && (
                <p className='text-red-500 text-sm'>{form.formState.errors.batchNumber.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='remainingQuantity'>Remaining Quantity</Label>
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
              <Label htmlFor='sideEffect'>Side Effect</Label>
              <Input
                id='sideEffect'
                {...form.register('sideEffect')}
                placeholder='Enter side effect'
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.sideEffect ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.sideEffect && (
                <p className='text-red-500 text-sm'>{form.formState.errors.sideEffect.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='expirationDate'>Expiration Date</Label>
              <Input
                id='expirationDate'
                type='date'
                value={form.watch('expirationDate') ? format(form.watch('expirationDate'), 'yyyy-MM-dd') : ''}
                onChange={(e) => form.setValue('expirationDate', new Date(e.target.value))}
                className={`dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 ${
                  form.formState.errors.expirationDate ? 'border-red-500' : ''
                }`}
              />
              {form.formState.errors.expirationDate && (
                <p className='text-red-500 text-sm'>{form.formState.errors.expirationDate.message}</p>
              )}
            </div>
          </div>

          <div className='flex gap-2 items-start justify-start'>
            <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
              <AvatarImage src={previewImageFromFile || ''} />
              <AvatarFallback className='rounded-none'>{previewImageFromFile || 'Image'}</AvatarFallback>
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
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              {...form.register('description')}
              placeholder='Enter vaccine description'
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
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Updating...' : 'Update Vaccine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

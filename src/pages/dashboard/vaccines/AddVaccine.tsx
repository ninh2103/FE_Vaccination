import { useState } from 'react'
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
import { VaccineCreateBodySchema, VaccineCreateBodyType } from '@/schemaValidator/vaccination.schema'
import { useCreateVaccinationQuery, useUploadImageVaccinationQuery } from '@/queries/useVaccination'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { useListCategoryQuery } from '@/queries/useCategory'
import { useListManufacturerQuery } from '@/queries/useManufacturer'
import { useListSupplierQuery } from '@/queries/useSupplier'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'
import { format } from 'date-fns'
interface AddVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddVaccine({ open, onOpenChange }: AddVaccineProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { mutate: createVaccination, isPending: isCreating } = useCreateVaccinationQuery()
  const { mutateAsync: uploadImage } = useUploadImageVaccinationQuery()
  const { data: categoryVaccinationData } = useListCategoryQuery()
  const { data: manufacturerData } = useListManufacturerQuery()
  const { data: supplierData } = useListSupplierQuery()

  const form = useForm<VaccineCreateBodyType>({
    resolver: zodResolver(VaccineCreateBodySchema),
    defaultValues: {
      vaccineName: '',
      image: '',
      description: '',
      price: undefined,
      location: '',
      expirationDate: undefined,
      manufacturerId: '',
      supplierId: '',
      categoryVaccinationId: ''
    }
  })
  const onSubmit = async (values: VaccineCreateBodyType) => {
    let body = values
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const uploadResult = await uploadImage(formData)
        const imageUrl = uploadResult.imageUrl
        body = {
          ...values,
          image: imageUrl
        }
      }
      await createVaccination(body)
      toast.success('Vaccine created successfully')
      onOpenChange(false)
      form.reset()
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
          <DialogTitle>Add New Vaccine</DialogTitle>
          <DialogDescription>Enter the details for the new vaccine below.</DialogDescription>
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
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='space-y-2'>
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
              <AvatarImage src={previewImage || ''} />
              <AvatarFallback className='rounded-none'>{previewImage || 'Image'}</AvatarFallback>
            </Avatar>
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setFile(file)
                  setPreviewImage(URL.createObjectURL(file))
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
                    setPreviewImage(URL.createObjectURL(file))
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
            <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isCreating}>
              Cancel
            </Button>
            <Button type='submit' disabled={isCreating}>
              {isCreating ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isCreating ? 'Saving...' : 'Save Vaccine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

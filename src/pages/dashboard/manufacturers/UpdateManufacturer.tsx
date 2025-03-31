import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Manufacturer } from './ManufacturerTable'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { ManufacturerBody, ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { useDetailManufacturerQuery, useUpdateManufacturerQuery } from '@/queries/useManufacturer'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
interface UpdateManufacturerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (manufacturer: Manufacturer) => void
  manufacturer: Manufacturer | null
}

export const UpdateManufacturer = ({
  open,
  onOpenChange,
  manufacturer
}: UpdateManufacturerProps): React.ReactElement => {
  const form = useForm<Omit<Manufacturer, 'id'>>({
    resolver: zodResolver(ManufacturerBody),
    defaultValues: {
      name: '',
      country: '',
      contactInfo: ''
    }
  })
  const { data: manufacturerDetail } = useDetailManufacturerQuery(manufacturer?.id ?? '')
  const { mutate: updateManufacturer } = useUpdateManufacturerQuery()

  useEffect(() => {
    if (manufacturerDetail) {
      form.reset({
        name: manufacturerDetail.name,
        country: manufacturerDetail.country,
        contactInfo: manufacturerDetail.contactInfo
      })
    }
  }, [manufacturerDetail, form])

  const handleFormSubmit = (data: ManufacturerBodyType) => {
    if (manufacturerDetail) {
      updateManufacturer(
        {
          id: manufacturerDetail.id,
          body: data
        },
        {
          onSuccess: () => {
            onOpenChange(false)
            toast.success('Manufacturer updated successfully')
          },
          onError: (error) => {
            handleErrorApi({ error, setError: form.setError, duration: 3000 })
          }
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Manufacturer</DialogTitle>
          <DialogDescription>Update the manufacturer details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' {...form.register('name')} />
            {form.formState.errors.name && (
              <p className='text-sm text-destructive'>{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='country'>Country</Label>
            <Input id='country' {...form.register('country')} />
            {form.formState.errors.country && (
              <p className='text-sm text-destructive'>{form.formState.errors.country.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='contactInfo'>Contact Info</Label>
            <Input id='contactInfo' {...form.register('contactInfo')} />
            {form.formState.errors.contactInfo && (
              <p className='text-sm text-destructive'>{form.formState.errors.contactInfo.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type='submit'>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

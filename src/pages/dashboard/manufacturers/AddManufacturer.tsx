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
import { useCreateManufacturerQuery } from '@/queries/useManufacturer'
import { ManufacturerBody, ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { handleErrorApi } from '@/core/lib/utils'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
interface AddManufacturerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (manufacturer: Omit<Manufacturer, 'id'>) => void
}

export function AddManufacturer({ open, onOpenChange }: AddManufacturerProps) {
  const { mutate: createManufacturer, isPending } = useCreateManufacturerQuery()
  const form = useForm<Omit<Manufacturer, 'id'>>({
    resolver: zodResolver(ManufacturerBody),
    defaultValues: {
      name: '',
      country: '',
      contactInfo: ''
    }
  })

  const handleFormSubmit = (data: ManufacturerBodyType) => {
    createManufacturer(data, {
      onSuccess: () => {
        onOpenChange(false)
        toast.success('Manufacturer created successfully')
        form.reset()
      },
      onError: (error) => {
        handleErrorApi({ error, setError: form.setError, duration: 3000 })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm nhà sản xuất</DialogTitle>
          <DialogDescription>Thêm mới một nhà sản xuất dưới đây.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Tên nhà sản xuất *</Label>
            <Input
              id='name'
              {...form.register('name')}
              className={form.formState.errors.name ? 'border-red-500' : ''}
            />
            {form.formState.errors.name && <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='country'>Quốc gia *</Label>
            <Input
              id='country'
              {...form.register('country')}
              className={form.formState.errors.country ? 'border-red-500' : ''}
            />
            {form.formState.errors.country && (
              <p className='text-sm text-red-500'>{form.formState.errors.country.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='contactInfo'>Thông tin liên hệ *</Label>
            <Input
              id='contactInfo'
              {...form.register('contactInfo')}
              className={form.formState.errors.contactInfo ? 'border-red-500' : ''}
            />
            {form.formState.errors.contactInfo && (
              <p className='text-sm text-red-500'>{form.formState.errors.contactInfo.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? <Loader2 className='animate-spin' /> : 'Thêm'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

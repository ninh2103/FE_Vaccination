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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Manufacturer, ManufacturerBody, ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { useDetailManufacturerQuery, useUpdateManufacturerQuery } from '@/queries/useManufacturer'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { RefreshCw } from 'lucide-react'

interface UpdateManufacturerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ManufacturerBodyType) => void // Sửa kiểu của onSubmit
  manufacturer: Manufacturer | null
}

export const UpdateManufacturer = ({
  open,
  onOpenChange,
  onSubmit,
  manufacturer
}: UpdateManufacturerProps): React.ReactElement => {
  const form = useForm<ManufacturerBodyType>({
    resolver: zodResolver(ManufacturerBody),
    defaultValues: {
      name: '',
      country: '',
      contactInfo: ''
    }
  })
  const { data: manufacturerDetail } = useDetailManufacturerQuery(manufacturer?.id ?? '')
  const { mutate: updateManufacturer, isPending } = useUpdateManufacturerQuery()

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
            onSubmit(data) // Gọi onSubmit với dữ liệu từ form
            toast.success('Nhà sản xuất đã được cập nhật thành công.')
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
          <DialogTitle>Cập nhật nhà sản xuất</DialogTitle>
          <DialogDescription>Cập nhật thông tin nhà sản xuất dưới đây.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>
              Tên nhà sản xuất <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              {...form.register('name')}
              className={form.formState.errors.name ? 'border-red-500' : ''}
            />
            {form.formState.errors.name && (
              <p className='text-sm text-destructive text-red-500'>{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='country'>
              Quốc gia <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='country'
              {...form.register('country')}
              className={form.formState.errors.country ? 'border-red-500' : ''}
            />
            {form.formState.errors.country && (
              <p className='text-sm text-destructive text-red-500'>{form.formState.errors.country.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='contactInfo'>
              Số điện thoại <span className='text-red-500'>*</span>
            </Label>
            <Input id='contactInfo' {...form.register('contactInfo')} />
            {form.formState.errors.contactInfo && (
              <p className='text-sm text-destructive text-red-500'>{form.formState.errors.contactInfo.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <>
                  <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                  Đang cập nhật...
                </>
              ) : (
                'Cập nhật'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
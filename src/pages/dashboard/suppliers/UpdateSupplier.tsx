import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Supplier } from './types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SupplierBody, SupplierBodyType } from '@/schemaValidator/supplier.schema'
import { useDetailSupplierQuery, useUpdateSupplierQuery } from '@/queries/useSupplier'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'

interface UpdateSupplierProps {
  supplier: Supplier
  onUpdate: (supplier: Supplier) => void
  onCancel: () => void
}

export function UpdateSupplier({ supplier, onUpdate, onCancel }: UpdateSupplierProps) {
  const { data: supplierDetail } = useDetailSupplierQuery(supplier?.id || '')
  const { mutate: updateSupplier, isPending } = useUpdateSupplierQuery()
  const form = useForm<SupplierBodyType>({
    resolver: zodResolver(SupplierBody),
    defaultValues: {
      name: supplierDetail?.name || '',
      address: supplierDetail?.address || '',
      contactInfo: supplierDetail?.contactInfo || ''
    }
  })

  useEffect(() => {
    if (supplier) {
      form.reset({
        name: supplier.name,
        address: supplier.address,
        contactInfo: supplier.contactInfo
      })
    }
  }, [supplier, form])

  const handleSubmit = (data: SupplierBodyType) => {
    if (!supplier?.id) return

    updateSupplier(
      { id: supplier.id, body: data },
      {
        onSuccess: (response) => {
          onUpdate(response)
          toast.success('Nhà cung cấp đã được cập nhật thành công')
        },
        onError: (error) => {
          handleErrorApi({ error, setError: form.setError, duration: 3000 })
        }
      }
    )
  }

  if (!supplier) {
    return null
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
      <DialogHeader>
        <DialogTitle>Cập nhật nhà cung cấp</DialogTitle>
        <DialogDescription>Cập nhật thông tin nhà cung cấp trong hệ thống.</DialogDescription>
      </DialogHeader>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>
            Tên nhà cung cấp <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='name'
            {...form.register('name')}
            placeholder='Nhập tên nhà cung cấp'
            className={form.formState.errors.name ? 'border-red-500' : ''}
          />
          {form.formState.errors.name && (
            <p className='text-red-500 text-sm text-red-500'>{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='address'>
            Địa chỉ <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            id='address'
            {...form.register('address')}
            placeholder='Nhập địa chỉ nhà cung cấp'
            className={form.formState.errors.address ? 'border-red-500' : ''}
          />
          {form.formState.errors.address && (
            <p className='text-red-500 text-sm text-red-500'>{form.formState.errors.address.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contactInfo'>
            Thông tin liên hệ <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='contactInfo'
            {...form.register('contactInfo')}
            placeholder='Nhập thông tin liên hệ'
            className={form.formState.errors.contactInfo ? 'border-red-500' : ''}
          />
          {form.formState.errors.contactInfo && (
            <p className='text-red-500 text-sm text-red-500'>{form.formState.errors.contactInfo.message}</p>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button type='button' variant='outline' onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Đang cập nhật...' : 'Cập nhật'}
        </Button>
      </DialogFooter>
    </form>
  )
}

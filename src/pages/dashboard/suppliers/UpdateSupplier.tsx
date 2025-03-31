import { useState, useEffect } from 'react'
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
  const { data: supplierDetail } = useDetailSupplierQuery(supplier.id)
  const { mutate: updateSupplier, isPending } = useUpdateSupplierQuery()
  const form = useForm<SupplierBodyType>({
    resolver: zodResolver(SupplierBody),
    defaultValues: {
      name: supplierDetail?.name,
      address: supplierDetail?.address,
      contactInfo: supplierDetail?.contactInfo
    }
  })

  useEffect(() => {
    form.reset({
      name: supplier.name,
      address: supplier.address,
      contactInfo: supplier.contactInfo
    })
  }, [supplier, form])

  const handleSubmit = (data: SupplierBodyType) => {
    updateSupplier(
      { id: supplier.id, body: data },
      {
        onSuccess: () => {
          onUpdate({ ...supplier, ...data })
          toast.success('Supplier updated successfully')
        },
        onError: (error) => {
          handleErrorApi({ error, setError: form.setError, duration: 3000 })
        }
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
      <DialogHeader>
        <DialogTitle>Update Supplier</DialogTitle>
        <DialogDescription>Update the supplier details in the system.</DialogDescription>
      </DialogHeader>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...form.register('name')} placeholder='Enter supplier name' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='address'>Address</Label>
          <Textarea id='address' {...form.register('address')} placeholder='Enter supplier address' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contactInfo'>Contact Info</Label>
          <Input id='contactInfo' {...form.register('contactInfo')} placeholder='Enter contact information' required />
        </div>
      </div>

      <DialogFooter>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Supplier'}
        </Button>
      </DialogFooter>
    </form>
  )
}

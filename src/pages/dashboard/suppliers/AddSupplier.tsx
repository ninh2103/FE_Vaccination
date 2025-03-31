import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Supplier } from './types'
import { useCreateSupplierQuery } from '@/queries/useSupplier'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SupplierBody, SupplierBodyType } from '@/schemaValidator/supplier.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'

interface AddSupplierProps {
  onAdd: (supplier: Supplier) => void
  onCancel: () => void
}

export function AddSupplier({ onAdd, onCancel }: AddSupplierProps) {
  const { mutate: createSupplier, isPending } = useCreateSupplierQuery()

  const form = useForm<Omit<Supplier, 'id'>>({
    resolver: zodResolver(SupplierBody),
    defaultValues: {
      name: '',
      address: '',
      contactInfo: ''
    }
  })

  const handleFormSubmit = (data: SupplierBodyType) => {
    createSupplier(data, {
      onSuccess: () => {
        onCancel()
        toast.success('Supplier created successfully')
        form.reset()
      },
      onError: (error) => {
        handleErrorApi({ error, setError: form.setError, duration: 3000 })
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-4'>
      <DialogHeader>
        <DialogTitle>Add New Supplier</DialogTitle>
        <DialogDescription>Fill in the details to add a new supplier to the system.</DialogDescription>
      </DialogHeader>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            {...form.register('name')}
            placeholder='Enter supplier name'
            className={form.formState.errors.name ? 'border-red-500' : ''}
          />
          {form.formState.errors.name && <p className='text-red-500 text-sm'>{form.formState.errors.name.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='address'>Address</Label>
          <Textarea
            id='address'
            {...form.register('address')}
            placeholder='Enter supplier address'
            className={form.formState.errors.address ? 'border-red-500' : ''}
          />
          {form.formState.errors.address && (
            <p className='text-red-500 text-sm'>{form.formState.errors.address.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contactInfo'>Contact Info</Label>
          <Input
            id='contactInfo'
            {...form.register('contactInfo')}
            placeholder='Enter contact information'
            className={form.formState.errors.contactInfo ? 'border-red-500' : ''}
          />
          {form.formState.errors.contactInfo && (
            <p className='text-red-500 text-sm'>{form.formState.errors.contactInfo.message}</p>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Supplier'}
        </Button>
      </DialogFooter>
    </form>
  )
}

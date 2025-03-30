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
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { RegisterBody } from '@/schemaValidator/auth.schema'
import { useForm } from 'react-hook-form'
import { RegisterBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '@/queries/useAuth'
import { handleErrorApi } from '@/core/lib/utils'
import { toast } from 'sonner'

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading: boolean
}

export function AddUserDialog({ open, onOpenChange, isLoading }: AddUserDialogProps) {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  })

  const registerMutation = useRegisterMutation()

  const onSubmit = (data: RegisterBodyType) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    registerMutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
        toast.success('User has been added successfully.')
      },
      onError: (error: Error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the details of the new user to add to the system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                {...form.register('name')}
                placeholder='Enter full name'
                className={form.formState.errors.name ? 'border-red-500' : ''}
              />
              {form.formState.errors.name && (
                <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                {...form.register('email')}
                placeholder='Enter email address'
                className={form.formState.errors.email ? 'border-red-500' : ''}
              />
              {form.formState.errors.email && (
                <p className='text-sm text-red-500'>{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              {...form.register('phone')}
              placeholder='Enter phone number'
              className={form.formState.errors.phone ? 'border-red-500' : ''}
            />
            {form.formState.errors.phone && (
              <p className='text-sm text-red-500'>{form.formState.errors.phone.message}</p>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...form.register('password')}
                placeholder='Enter password'
                className={form.formState.errors.password ? 'border-red-500' : ''}
              />
              {form.formState.errors.password && (
                <p className='text-sm text-red-500'>{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                {...form.register('confirmPassword')}
                placeholder='Confirm password'
                className={form.formState.errors.confirmPassword ? 'border-red-500' : ''}
              />
              {form.formState.errors.confirmPassword && (
                <p className='text-sm text-red-500'>{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading || registerMutation.isPending}>
              {isLoading || registerMutation.isPending ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading || registerMutation.isPending ? 'Saving...' : 'Save User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

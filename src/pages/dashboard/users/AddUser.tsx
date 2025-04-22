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
import { handleErrorApi } from '@/core/lib/utils'
import { toast } from 'sonner'
import { useCreateUserQuery } from '@/queries/useUser'

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

  const { mutate: createUser, isPending: isCreating } = useCreateUserQuery()

  const onSubmit = (data: RegisterBodyType) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Mật khẩu không khớp'
      })
      return
    }

    createUser(data, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
        toast.success('Người dùng đã được thêm thành công.')
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
          <DialogTitle>Thêm người dùng mới</DialogTitle>
          <DialogDescription>Nhập thông tin của người dùng mới để thêm vào hệ thống.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Họ và tên *</Label>
              <Input
                id='name'
                {...form.register('name')}
                placeholder='Nhập họ và tên'
                className={form.formState.errors.name ? 'border-red-500' : ''}
              />
              {form.formState.errors.name && (
                <p className='text-sm text-red-500'>{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email *</Label>
              <Input
                id='email'
                type='email'
                {...form.register('email')}
                placeholder='Nhập địa chỉ email'
                className={form.formState.errors.email ? 'border-red-500' : ''}
              />
              {form.formState.errors.email && (
                <p className='text-sm text-red-500'>{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='phone'>Số điện thoại *</Label>
            <Input
              id='phone'
              {...form.register('phone')}
              placeholder='Nhập số điện thoại'
              className={form.formState.errors.phone ? 'border-red-500' : ''}
            />
            {form.formState.errors.phone && (
              <p className='text-sm text-red-500'>{form.formState.errors.phone.message}</p>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Mật khẩu *</Label>
              <Input
                id='password'
                type='password'
                {...form.register('password')}
                placeholder='Nhập mật khẩu'
                className={form.formState.errors.password ? 'border-red-500' : ''}
              />
              {form.formState.errors.password && (
                <p className='text-sm text-red-500'>{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='confirmPassword'>Xác nhận mật khẩu *</Label>
              <Input
                id='confirmPassword'
                type='password'
                {...form.register('confirmPassword')}
                placeholder='Xác nhận mật khẩu'
                className={form.formState.errors.confirmPassword ? 'border-red-500' : ''}
              />
              {form.formState.errors.confirmPassword && (
                <p className='text-sm text-red-500'>{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy bỏ
            </Button>
            <Button type='submit' disabled={isLoading || isCreating}>
              {isLoading || isCreating ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading || isCreating ? 'Đang lưu...' : 'Lưu người dùng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

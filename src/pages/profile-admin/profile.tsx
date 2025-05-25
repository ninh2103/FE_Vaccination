import { handleErrorApi } from '@/core/lib/utils'
import { useGetMeQuery, useUpdateMeQuery, useUploadAvatarQuery } from '@/queries/useUser'
import { UpdateMeBody, UploadAvatarBodyType } from '@/schemaValidator/user.schema'
import { UpdateMeBodyType } from '@/schemaValidator/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'

export default function ProfilePage() {
  const { data: me } = useGetMeQuery()
  const { mutate: updateMe } = useUpdateMeQuery()
  const { mutate: uploadAvatar } = useUploadAvatarQuery()

  const formUpdate = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: '',
      address: '',
      date_of_birth: '',
      country: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (me) {
      const { name, phone, address, date_of_birth, country } = me
      formUpdate.setValue('name', name || '')
      formUpdate.setValue('address', address || '')
      formUpdate.setValue('date_of_birth', date_of_birth || '')
      formUpdate.setValue('country', country || '')
      formUpdate.setValue('phone', phone || '')
    }
  }, [me, formUpdate])

  const handleUpdateMe = (body: UpdateMeBodyType) => {
    updateMe(body, {
      onSuccess: () => {
        toast.success('Cập nhật tài khoản thành công!')
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: formUpdate.setError
        })
      }
    })
  }

  const handleUploadAvatar = (body: UploadAvatarBodyType) => {
    uploadAvatar(body, {
      onSuccess: () => {
        toast.success('Tải lên ảnh đại diện thành công!')
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: formUpdate.setError
        })
      }
    })
  }

  return (
    <div className='container mx-auto max-w-4xl space-y-6 p-4'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Hồ sơ cá nhân</h1>
        <p className='text-muted-foreground'>Quản lý thông tin tài khoản và hồ sơ cá nhân.</p>
      </div>

      <div className='grid gap-6'>
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin hồ sơ</CardTitle>
            <CardDescription>Cập nhật thông tin cá nhân và ảnh đại diện.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex gap-2 items-start justify-start'>
              <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                <AvatarImage src={me?.avatar || ''} />
                <AvatarFallback className='rounded-none'>{me?.name || 'Avatar'}</AvatarFallback>
              </Avatar>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleUploadAvatar({ avatar: file })
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
                      handleUploadAvatar({ avatar: file })
                    }
                  }
                  input.click()
                }}
              >
                <Upload className='h-4 w-4 text-muted-foreground' />
                <span className='sr-only'>Upload</span>
              </button>
            </div>
            <div className=' space-y-1'>
              <Label htmlFor='name'>Họ và tên</Label>
              <Input
                id='name'
                {...formUpdate.register('name')}
                placeholder='Nhập họ và tên'
                className={formUpdate.formState.errors.name ? 'border-red-500' : ''}
              />
              {formUpdate.formState.errors.name && (
                <p className='text-red-500 text-sm'>{formUpdate.formState.errors.name.message}</p>
              )}
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-1'>
                <Label htmlFor='phone'>Số điện thoại</Label>
                <Input
                  id='phone'
                  {...formUpdate.register('phone')}
                  placeholder='Nhập số điện thoại'
                  className={formUpdate.formState.errors.phone ? 'border-red-500' : ''}
                />
                {formUpdate.formState.errors.phone && (
                  <p className='text-red-500 text-sm'>{formUpdate.formState.errors.phone.message}</p>
                )}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='date_of_birth'>Ngày sinh</Label>
                <Input
                  id='date_of_birth'
                  type='date'
                  {...formUpdate.register('date_of_birth')}
                  className={formUpdate.formState.errors.date_of_birth ? 'border-red-500' : ''}
                />
                {formUpdate.formState.errors.date_of_birth && (
                  <p className='text-red-500 text-sm'>{formUpdate.formState.errors.date_of_birth.message}</p>
                )}
              </div>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='address'>Địa chỉ</Label>
              <Input
                id='address'
                {...formUpdate.register('address')}
                placeholder='Nhập địa chỉ'
                className={formUpdate.formState.errors.address ? 'border-red-500' : ''}
              />
              {formUpdate.formState.errors.address && (
                <p className='text-red-500 text-sm'>{formUpdate.formState.errors.address.message}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='country'>Thành phố</Label>
              <Input
                id='country'
                {...formUpdate.register('country')}
                placeholder='Nhập thành phố'
                className={formUpdate.formState.errors.country ? 'border-red-500' : ''}
              />
              {formUpdate.formState.errors.country && (
                <p className='text-red-500 text-sm'>{formUpdate.formState.errors.country.message}</p>
              )}
            </div>

            <Button
              variant={'outline'}
              className='dark:!bg-green-600 hover:dark:!bg-green-700 transition-colors duration-200'
              onClick={formUpdate.handleSubmit(handleUpdateMe)}
            >
              Lưu thay đổi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

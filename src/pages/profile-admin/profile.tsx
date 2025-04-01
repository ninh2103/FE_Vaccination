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
        toast.success('Update Account Success!')
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
        toast.success('Upload Avatar Success!')
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
        <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
        <p className='text-muted-foreground'>Manage your account settings and profile information.</p>
      </div>

      <div className='grid gap-6'>
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and profile picture.</CardDescription>
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
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                {...formUpdate.register('name')}
                placeholder='Enter your full name'
                className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-1'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  {...formUpdate.register('phone')}
                  placeholder='Enter your phone number'
                  className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='date_of_birth'>Date of Birth</Label>
                <Input
                  id='date_of_birth'
                  type='date'
                  {...formUpdate.register('date_of_birth')}
                  className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                />
              </div>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                {...formUpdate.register('address')}
                placeholder='Enter your address'
                className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='country'>Country</Label>
              <Input
                id='country'
                {...formUpdate.register('country')}
                placeholder='Enter your country'
                className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
              />
            </div>

            <Button
              variant={'outline'}
              className='dark:!bg-green-600 hover:dark:!bg-green-700 transition-colors duration-200'
              onClick={formUpdate.handleSubmit(handleUpdateMe)}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Lock, Eye, EyeOff, TicketCheck, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordBody, ChangePasswordBodyType } from '@/schemaValidator/auth.schema'
import { useChangePasswordMutation } from '@/queries/useAuth'
import { toast } from 'sonner'
import { formatVND, handleErrorApi } from '@/core/lib/utils'
import { useGetMeQuery, useUpdateMeQuery, useUploadAvatarQuery } from '@/queries/useUser'
import { UpdateMeBody, UpdateMeBodyType, UploadAvatarBodyType } from '@/schemaValidator/user.schema'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { path } from '@/core/constants/path'
import { useNavigate } from 'react-router-dom'
import { useListUserPaymentQuery } from '@/queries/useMomo'
import { format } from 'date-fns'

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  const changePasswordMutation = useChangePasswordMutation()
  const updateMeMutation = useUpdateMeQuery()
  const getMeQuery = useGetMeQuery()
  const uploadAvatarMutation = useUploadAvatarQuery()
  const { data: paymentList, refetch } = useListUserPaymentQuery()

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      current_password: '',
      password: '',
      confirm_password: ''
    }
  })

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !hasMore) {
      refetch()
    }
  }

  useEffect(() => {
    if (paymentList) {
      setHasMore(paymentList.data.length < Math.ceil(paymentList.total / 10))
    }
  }, [paymentList])

  useEffect(() => {
    if (getMeQuery.data) {
      const { name, phone, address, date_of_birth, country } = getMeQuery.data
      formUpdate.setValue('name', name || '')
      formUpdate.setValue('address', address || '')
      formUpdate.setValue('date_of_birth', date_of_birth || '')
      formUpdate.setValue('country', country || '')
      formUpdate.setValue('phone', phone || '')
    }
  }, [getMeQuery.data, formUpdate])

  const handleChangePassword = (body: ChangePasswordBodyType) => {
    if (body.password !== body.confirm_password) {
      form.setError('confirm_password', {
        type: 'manual',
        message: 'Mật khẩu không khớp'
      })
      return
    }
    changePasswordMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Đổi mật khẩu thành công!')
        form.reset()
      },
      onError: (error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
      }
    })
  }

  const handleUpdateMe = (body: UpdateMeBodyType) => {
    updateMeMutation.mutate(body, {
      onSuccess: () => {
        getMeQuery.refetch()
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
    uploadAvatarMutation.mutate(body, {
      onSuccess: () => {
        getMeQuery.refetch()
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500'
      case 'COMPLETED':
        return 'bg-green-500'
      case 'FAILED':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className='min-h-screen w-full dark:bg-gray-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500'>
          Quản lý tài khoản
        </h1>

        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 dark:bg-gray-800 rounded-lg mb-6'>
            <TabsTrigger
              value='account'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <User className='w-5 h-5 mr-2' />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger
              value='password'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <Lock className='w-5 h-5 mr-2' />
              Đổi mật khẩu
            </TabsTrigger>
            <TabsTrigger
              value='cart'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <TicketCheck className='w-5 h-5 mr-2' />
              Danh sách đặt hàng
            </TabsTrigger>
          </TabsList>

          <TabsContent value='account'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Thông tin tài khoản</CardTitle>
                <CardDescription className='text-gray-400'>Chỉnh sửa thông tin cá nhân ở đây.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center gap-6'>
                  <div className='flex gap-2 items-start justify-start'>
                    <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                      <AvatarImage src={getMeQuery.data?.avatar || ''} />
                      <AvatarFallback className='rounded-none'>{getMeQuery.data?.name || 'Avatar'}</AvatarFallback>
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
                      <span className='sr-only'>Tải lên</span>
                    </button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='name' className='dark:text-green-300'>
                    Tên
                  </Label>
                  <Input
                    id='name'
                    {...formUpdate.register('name')}
                    className='dark:bg-gray-800 border-gray-300 focus:ring-gray-400  pr-10'
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

                <div className='space-y-2'>
                  <Label htmlFor='country' className='dark:text-green-300'>
                    Thành Phố
                  </Label>
                  <Input
                    id='country'
                    {...formUpdate.register('country')}
                    className='dark:bg-gray-800 border-gray-300 focus:ring-gray-400  pr-10'
                  />
                  {formUpdate.formState.errors.country && (
                    <p className='text-red-500 text-sm '>{formUpdate.formState.errors.country.message}</p>
                  )}
                </div>

                <Button
                  onClick={formUpdate.handleSubmit(handleUpdateMe)}
                  variant={'secondary'}
                  className='w-full dark:bg-green-600 hover:bg-gray-300  transition-colors duration-200 bg-black text-white'
                >
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='password'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Thay đổi mật khẩu</CardTitle>
                <CardDescription className='text-gray-400'>
                  Cập nhật mật khẩu để bảo mật tài khoản của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password' className='dark:text-green-300'>
                    Mật khẩu hiện tại <span className='text-red-500'>*</span>
                  </Label>
                  <div className='relative'>
                    <Input
                      id='current-password'
                      {...form.register('current_password')}
                      type={showPassword ? 'text' : 'password'}
                      className='dark:bg-gray-800 border-gray-300 focus:ring-gray-400 pr-10'
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className={`absolute right-0 top-0 h-full px-3 py-2 hover:dark:bg-transparent ${
                        form.formState.errors.current_password ? 'border-red-500' : ''
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4 dark:text-green-400' />
                      ) : (
                        <Eye className='h-4 w-4 dark:text-green-400' />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.current_password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.current_password.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='new-password' className='dark:text-green-300'>
                    Mật khẩu mới <span className='text-red-500'>*</span>
                  </Label>
                  <div className='relative'>
                    <Input
                      {...form.register('password')}
                      id='new-password'
                      type={showNewPassword ? 'text' : 'password'}
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-400 ${
                        form.formState.errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className={`absolute right-0 top-0 h-full px-3 py-2 hover:dark:bg-transparent ${
                        form.formState.errors.password ? 'border-red-500' : ''
                      }`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className='h-4 w-4 dark:text-green-400' />
                      ) : (
                        <Eye className='h-4 w-4 dark:text-green-400' />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.password.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirm-password' className='dark:text-green-300'>
                    Xác nhận mật khẩu mới <span className='text-red-500'>*</span>
                  </Label>
                  <div className='relative'>
                    <Input
                      {...form.register('confirm_password')}
                      id='confirm-password'
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`dark:bg-gray-800 border-gray-300 focus:ring-gray-400 ${
                        form.formState.errors.confirm_password ? 'border-red-500' : ''
                      }`}
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className={`absolute right-0 top-0 h-full px-3 py-2 hover:dark:bg-transparent ${
                        form.formState.errors.confirm_password ? 'border-red-500' : ''
                      }`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4 dark:text-green-400' />
                      ) : (
                        <Eye className='h-4 w-4 dark:text-green-400' />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.confirm_password && (
                    <p className='text-red-500 text-sm'>{form.formState.errors.confirm_password.message}</p>
                  )}
                </div>

                <Button
                  onClick={form.handleSubmit(handleChangePassword)}
                  variant={'secondary'}
                  className='w-full dark:bg-green-600 hover:bg-gray-300 transition-colors duration-200 bg-black text-white'
                >
                  Cập nhật mật khẩu
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='cart'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Danh sách đặt hàng của bạn</CardTitle>
                <CardDescription className='dark:text-gray-400'>
                  Xem và quản lý lịch hẹn tiêm chủng của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='max-h-[600px] overflow-y-auto space-y-4 pr-4' onScroll={handleScroll}>
                  {paymentList?.data.map((payment) => (
                    <div
                      key={payment.paymentId}
                      className='p-4 rounded-lg border border-gray-700 dark:bg-gray-800 hover:bg-gray-750 transition-colors duration-200'
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <h3 className='text-lg font-semibold dark:text-green-400'>
                            Mã đơn hàng: #{payment.bookingId.slice(0, 8)}
                          </h3>
                          <p className='text-sm text-gray-400'>
                            Ngày tạo: {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status || '')}`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div>
                          <p className='text-sm text-gray-400'>Ngày hẹn</p>
                          <p className='dark:text-white'>{format(new Date(payment.appointmentDate), 'dd/MM/yyyy')}</p>
                        </div>
                        <div>
                          <p className='text-sm text-gray-400'>Ngày tiêm</p>
                          <p className='dark:text-white'>{format(new Date(payment.appointmentDate), 'dd/MM/yyyy')}</p>
                        </div>
                        <div>
                          <p className='text-sm text-gray-400'>Số lượng</p>
                          <p className='dark:text-white'>{payment.vaccinationQuantity} liều</p>
                        </div>
                        <div>
                          <p className='text-sm text-gray-400'>Tổng tiền</p>
                          <p className='dark:text-white'>{formatVND(payment.totalAmount)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!hasMore && (paymentList?.data?.length ?? 0) > 0 && (
                    <div className='text-center py-4 text-gray-400'>Hết đơn hàng</div>
                  )}
                  {(paymentList?.data?.length ?? 0) === 0 && (
                    <div className='text-center py-8'>
                      <TicketCheck className='w-16 h-16 mx-auto dark:text-green-400 mb-4' />
                      <p className='text-xl font-semibold mb-2 dark:text-green-300'>Danh sách đơn hàng trống</p>
                      <p className='text-gray-400 mb-4'>Bạn chưa đặt lịch tiêm chủng nào.</p>
                      <Button
                        onClick={() => navigate(path.list)}
                        variant={'outline'}
                        className='dark:bg-green-600 hover:bg-gray-300  transition-colors duration-200 bg-black text-white '
                      >
                        Đặt lịch tiêm chủng
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

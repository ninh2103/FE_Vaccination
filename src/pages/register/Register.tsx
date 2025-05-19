import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { RegisterBody, RegisterBodyType } from '@/schemaValidator/auth.schema'
import { useRegisterMutation } from '@/queries/useAuth'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function FormRegister() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const { mutate: registerMutation, isPending } = useRegisterMutation()

  const handleSubmit = (body: RegisterBodyType) => {
    if (body.password !== body.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Mật khẩu không khớp'
      })
      return
    }

    registerMutation(body, {
      onSuccess: () => {
        form.reset()
        toast.success('Vào email lấy mã OTP xác thực tài khoản !')
        localStorage.setItem('email', body.email)
        navigate('/verify-email')
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
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none z-0'>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 rounded-full bg-blue-500 opacity-50'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-blue-400 to-green-500 dark:text-transparent dark:bg-clip-text'>
            Tạo tài khoản Vax-Bot
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Tham gia cộng đồng tiêm chủng ngay hôm nay!
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className='space-y-4'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Họ và tên</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Nhập họ và tên của bạn'
                        className='dark:bg-gray-700 border-gray-600'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='Nhập email của bạn'
                        className='dark:bg-gray-700 border-gray-600'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Mật khẩu</Label>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Tạo mật khẩu'
                          className='pr-10 dark:bg-gray-700 border-gray-600'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='confirmPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Xác nhận mật khẩu</Label>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Xác nhận mật khẩu'
                          className='pr-10 dark:bg-gray-700 border-gray-600'
                        />
                        <button
                          type='button'
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='phone'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Số điện thoại</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type='phone'
                        placeholder='Nhập số điện thoại của bạn'
                        className='dark:bg-gray-700 border-gray-600'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600'
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
                {isPending ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </Button>
              <div className='text-sm text-center text-gray-400'>
                Đã có tài khoản?{' '}
                <Link to={path.login} className='text-green-400 hover:text-green-300'>
                  Đăng nhập
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

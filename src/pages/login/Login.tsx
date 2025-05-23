import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useLoginMutation } from '@/queries/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginBody, LoginBodyType } from '@/schemaValidator/auth.schema'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { toast } from 'sonner'
import { LoginResponse } from '@/models/interface/auth.interface'
import { handleErrorApi } from '@/core/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: loginMutation, isPending } = useLoginMutation()
  const navigate = useNavigate()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = (body: LoginBodyType) => {
    loginMutation(body, {
      onSuccess: (data: LoginResponse) => {
        const access_token = data.access_token
        const refresh_token = data.refresh_token

        if (access_token && refresh_token) {
          setAccessTokenToLS(access_token)
          setRefreshTokenToLS(refresh_token)
          setUserToLS({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            isVerified: data.user.isVerified
          })

          toast.success('Đăng nhập thành công!')

          const userRole = data.user.role
          if (userRole === 'ADMIN' || userRole === 'EMPLOYEE' || userRole === 'DOCTOR') {
            navigate(path.admin.dashboard)
          } else {
            navigate(path.home)
          }
        }
      },
      onError: (error: Error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
      }
    })
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

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

      <div className="fixed inset-0 dark:bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>

      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r dark:from-blue-400 dark:to-green-500 dark:text-transparent bg-clip-text'>
            Chào mừng trở lại Vax-Bot
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Nhập thông tin để truy cập tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-4'>
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='email'>Email</Label>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        <Input
                          {...field}
                          id='email'
                          placeholder='Nhập email của bạn'
                          type='email'
                          className='pl-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
                        />
                      </div>
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
                    <Label htmlFor='password'>Mật khẩu</Label>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        <Input
                          {...field}
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Nhập mật khẩu của bạn'
                          className='pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400'
                        />
                        <button
                          type='button'
                          onClick={togglePasswordVisibility}
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
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600'
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
                {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            variant='secondary'
            className='w-full  items-center bg-gradient-to-r dark:bg-gray-700 border-gray-600 placeholder-gray-400  hover:from-blue-600 hover:to-green-600'
          >
            Đăng nhập với Google
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Không có tài khoản?{' '}
            <Link to={path.register} className='text-green-400 hover:text-green-300'>
              Đăng ký
            </Link>
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <Link to={path.forgotPassword} className='text-sm text-center text-green-400 hover:text-green-300'>
              Quên mật khẩu?
            </Link>
            <Link to={path.reSendVerifyEmail} className='text-sm text-center text-green-400 hover:text-green-300'>
              Gửi lại email xác thực!
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Key, Lock } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { path } from '@/core/constants/path'
import { useResetPasswordMutation } from '@/queries/useAuth'
import { ResetPasswordBody, ResetPasswordBodyType } from '@/schemaValidator/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
import { setAccessTokenToLS } from '@/core/shared/storage'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('access_token')
  setAccessTokenToLS(token as string)

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const resetPaswordMutation = useResetPasswordMutation()
  const form = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(ResetPasswordBody),
    defaultValues: {
      newPassword: '',
      confirm_password: ''
    }
  })

  const handleSubmit = async (body: ResetPasswordBodyType) => {
    if (!token) {
      toast.error('Invalid or missing reset token.')
      return
    }
    if (resetPaswordMutation.isPending) return

    if (body.newPassword !== body.confirm_password) {
      form.setError('confirm_password', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    resetPaswordMutation.mutate(
      { params: body, token: token },
      {
        onSuccess: () => {
          toast.success('Password reset successfully.')
          navigate(path.login)
        },
        onError: (error: Error) => {
          handleErrorApi({ error })
        }
      }
    )
  }

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

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
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 dark:bg-[url('/bg-pattern.svg')] opacity-5 z-0"></div>

      {/* Reset Password Form */}
      <Card className='w-full max-w-md z-10 dark:bg-gray-800 border-gray-700'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Key className='h-12 w-12 text-green-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center dark:bg-gradient-to-r from-green-400 to-green-500 dark:text-transparent dark:bg-clip-text'>
            Reset Your Password
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='newPassword'
                type={showNewPassword ? 'text' : 'password'}
                placeholder='Enter your new password'
                {...form.register('newPassword')}
                className={`pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 ${form.formState.errors.newPassword ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={toggleNewPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.confirm_password && (
              <p className='text-red-500 text-sm'>{form.formState.errors.confirm_password.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your new password'
                {...form.register('confirm_password')}
                className={`pl-10 pr-10 dark:bg-gray-700 border-gray-600 placeholder-gray-400 `}
              />

              <button
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {form.formState.errors.confirm_password && (
              <p className='text-red-500 text-sm'>{form.formState.errors.confirm_password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600'
          >
            Reset Password
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Remember your password?{' '}
            <Link to={path.login} className='text-green-400 hover:text-green-300'>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

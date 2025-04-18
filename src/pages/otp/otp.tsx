import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { motion } from 'framer-motion'
import { useVerifyEmailMutation } from '@/queries/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VerifyEmailBody, VerifyEmailBodyType } from '@/schemaValidator/auth.schema'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { handleErrorApi } from '@/core/lib/utils'
import { path } from '@/core/constants/path'
import { Button } from '@/components/ui/button'

export function OTPInput() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email') || ''

  const form = useForm<VerifyEmailBodyType>({
    resolver: zodResolver(VerifyEmailBody),
    defaultValues: {
      email,
      verificationCode: ''
    }
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = form

  const verifyEmailMutation = useVerifyEmailMutation()

  const handleVerify = (body: VerifyEmailBodyType) => {
    verifyEmailMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Xác thực tài khoản thành công ! Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ.')
        localStorage.removeItem('email')
        navigate(path.login)
      },
      onError: (error) => handleErrorApi({ error, setError: form.setError })
    })
  }

  const otpValue = watch('verificationCode')

  return (
    <div className='min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background Animation */}
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

      <form onSubmit={handleSubmit(handleVerify)} className='flex flex-col items-center space-y-4 z-10 dark:text-white'>
        <InputOTP maxLength={6} value={otpValue} onChange={(value) => setValue('verificationCode', value)}>
          <InputOTPGroup>
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {errors.verificationCode && <p className='text-red-500 text-sm'>{errors.verificationCode.message}</p>}

        <div className='text-lg dark:text-white'>
          {otpValue === '' ? 'Nhập mã OTP đã gửi vào email.' : `Bạn đã nhập: ${otpValue}`}
        </div>

        <Button type='submit' className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
          Xác thực OTP
        </Button>
      </form>
    </div>
  )
}

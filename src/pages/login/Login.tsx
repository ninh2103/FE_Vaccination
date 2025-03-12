import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

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
            Welcome back to Vax-Box
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-4'>
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
                          placeholder='Enter your email'
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
                    <Label htmlFor='password'>Password</Label>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        <Input
                          {...field}
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
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
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            variant='secondary'
            className='w-full  items-center bg-gradient-to-r dark:bg-gray-700 border-gray-600 placeholder-gray-400  hover:from-blue-600 hover:to-green-600'
          >
            Sign in with Google
          </Button>
          <div className='text-sm text-center text-gray-400'>
            Don't have an account?{' '}
            <Link to={path.register} className='text-green-400 hover:text-green-300'>
              Sign up
            </Link>
          </div>
          <Link to={path.forgotPassword} className='text-sm text-center text-green-400 hover:text-green-300'>
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

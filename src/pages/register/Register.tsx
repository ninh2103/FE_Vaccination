import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { RegisterSchema } from '@/core/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '@/core/constants/path'

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

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
            Create your Vax-Box account
          </CardTitle>
          <CardDescription className='text-gray-400 text-center'>Join our community of learners today</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form className='space-y-4'>
            <CardContent className='space-y-4'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Full Name</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter your full name'
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
                        placeholder='Enter your email'
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
                    <Label>Password</Label>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Create a password'
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
                    <Label>Confirm Password</Label>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Confirm your password'
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
            </CardContent>
            <CardFooter className='flex flex-col space-y-4'>
              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600'
              >
                Create Account
              </Button>
              <div className='text-sm text-center text-gray-400'>
                Already have an account?{' '}
                <Link to={path.login} className='text-green-400 hover:text-green-300'>
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Lock, Eye, EyeOff, TicketCheck } from 'lucide-react'

export default function Profile() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('0123456789')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen w-full dark:bg-gray-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500'>
          Account Management
        </h1>

        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 dark:bg-gray-800 rounded-lg mb-6'>
            <TabsTrigger
              value='account'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <User className='w-5 h-5 mr-2' />
              Account
            </TabsTrigger>
            <TabsTrigger
              value='password'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <Lock className='w-5 h-5 mr-2' />
              Change Password
            </TabsTrigger>
            <TabsTrigger
              value='cart'
              className='dark:text-white data-[state=active]:dark:bg-green-600 transition-all duration-200'
            >
              <TicketCheck className='w-5 h-5 mr-2' />
              Booked Lists
            </TabsTrigger>
          </TabsList>

          <TabsContent value='account'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Account Information</CardTitle>
                <CardDescription className='text-gray-400'>Edit your personal information here.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='name' className='dark:text-green-300'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone' className='dark:text-green-300'>
                    Number Phone
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Số điện thoại'
                    className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                  />
                </div>

                <Button
                  variant={'secondary'}
                  className='w-full dark:bg-green-600 hover:dark:bg-green-700 transition-colors duration-200'
                >
                  Save changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='password'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Change Password</CardTitle>
                <CardDescription className='text-gray-400'>
                  Update your password to secure your account.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password' className='dark:text-green-300'>
                    Current Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='current-password'
                      type={showPassword ? 'text' : 'password'}
                      className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400 pr-10'
                    />
                    <Button
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:dark:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4 dark:text-green-400' />
                      ) : (
                        <Eye className='h-4 w-4 dark:text-green-400' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='new-password' className='dark:text-green-300'>
                    New Password
                  </Label>
                  <Input
                    id='new-password'
                    type='password'
                    className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirm-password' className='dark:text-green-300'>
                    Confirm the new password
                  </Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    className='dark:bg-gray-800 border-green-500 focus:border-green-400 focus:ring-green-400'
                  />
                </div>

                <Button
                  variant={'secondary'}
                  className='w-full dark:bg-green-600 hover:dark:bg-green-700 transition-colors duration-200'
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='cart'>
            <Card className='dark:bg-gray-900 border-gray-700 shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl dark:text-green-400'>Your Booked Lists</CardTitle>
                <CardDescription className='text-gray-400'>View and manage.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-center py-8'>
                  <TicketCheck className='w-16 h-16 mx-auto dark:text-green-400 mb-4' />
                  <p className='text-xl font-semibold mb-2 dark:text-green-300'>Boked List Empty</p>
                  <p className='text-gray-400 mb-4'>You haven't added any products to your booked lists.</p>
                  <Button
                    variant={'outline'}
                    className='dark:bg-green-600 hover:dark:bg-green-700 transition-colors duration-200'
                  >
                    Continue booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

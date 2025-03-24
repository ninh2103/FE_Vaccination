import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const CheckOutPagePageMain = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insurance: '',
    medicalHistory: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='container mx-auto px-4 py-8 lg:py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Form Section */}
        <div className='lg:col-span-2'>
          <Card className='dark:bg-gray-900'>
            <CardContent className='p-6 space-y-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Personal Information</h2>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                    <Input
                      id='dateOfBirth'
                      name='dateOfBirth'
                      type='date'
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Gender</Label>
                    <RadioGroup
                      name='gender'
                      value={formData.gender}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                      className='flex gap-4'
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='male' id='male' />
                        <Label htmlFor='male'>Male</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='female' id='female' />
                        <Label htmlFor='female'>Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Input
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='dark:bg-gray-800 dark:border-gray-700'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>State</Label>
                    <Input
                      id='state'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='zipCode'>ZIP Code</Label>
                    <Input
                      id='zipCode'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className='dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='insurance'>Insurance Provider</Label>
                  <Select
                    value={formData.insurance}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, insurance: value }))}
                  >
                    <SelectTrigger className='dark:bg-gray-800 dark:border-gray-700'>
                      <SelectValue placeholder='Select insurance provider' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='bluecross'>Blue Cross Blue Shield</SelectItem>
                      <SelectItem value='aetna'>Aetna</SelectItem>
                      <SelectItem value='united'>United Healthcare</SelectItem>
                      <SelectItem value='cigna'>Cigna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='medicalHistory'>Medical History</Label>
                  <Textarea
                    id='medicalHistory'
                    name='medicalHistory'
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    placeholder='Please list any relevant medical conditions or allergies'
                    className='dark:bg-gray-800 dark:border-gray-700'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:text-blue-400 text-white'
                >
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section */}
        <div className='lg:col-span-1'>
          <Card className='dark:bg-gray-900 sticky top-8'>
            <CardContent className='p-6 space-y-6'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Booking Summary</h3>
                <div className='rounded-lg overflow-hidden'>
                  <img
                    alt='Tuberculosis Vaccine'
                    className='w-full h-48 object-cover'
                    src='https://images.unsplash.com/photo-1618015359417-89be02e0089f'
                  />
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 dark:text-white'>Tuberculosis Vaccine</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    This vaccine is designed to provide effective protection against targeted diseases. Developed with
                    advanced medical research, it ensures safety, efficacy, and long-lasting immunity.
                  </p>
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-300'>Total Amount</span>
                    <span className='text-xl font-semibold text-gray-900 dark:text-white'>$29.99</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPagePageMain

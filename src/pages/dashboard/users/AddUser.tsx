import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { FileUploader } from '@/components/ui/file-uploader'
import { toast } from '@/components/ui/use-toast'
import type { User } from './UserTable'

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddUser: (user: Omit<User, 'id' | 'registeredDate' | 'lastLogin' | 'vaccinations'>) => void
  isLoading: boolean
}

export function AddUserDialog({ open, onOpenChange, onAddUser, isLoading }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Patient',
    status: 'Active',
    password: '',
    confirmPassword: ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetAvatarState = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Patient',
      status: 'Active',
      password: '',
      confirmPassword: ''
    })
    resetAvatarState()
  }

  const handleFileUpload = (file: File) => {
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' })
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' })
      return
    }

    onAddUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: avatarPreview || '/placeholder.svg',
      initials: formData.name
        .split(' ')
        .map((n) => n[0])
        .join(''),
      role: formData.role,
      status: formData.status
    })

    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the details of the new user to add to the system.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label>Profile Image</Label>
            <FileUploader onFileUpload={handleFileUpload} currentImage={avatarPreview} accept='image/*' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter full name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Enter email address'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                name='phone'
                placeholder='Enter phone number'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='role'>Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Patient'>Patient</SelectItem>
                  <SelectItem value='Doctor'>Doctor</SelectItem>
                  <SelectItem value='Nurse'>Nurse</SelectItem>
                  <SelectItem value='Admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                name='confirmPassword'
                type='password'
                placeholder='Confirm password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='status'>Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Active'>Active</SelectItem>
                <SelectItem value='Inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
            {isLoading ? 'Saving...' : 'Save User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

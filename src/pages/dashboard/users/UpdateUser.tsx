import type React from 'react'
import { useState, useEffect } from 'react'
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

interface UpdateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateUser: (user: Omit<User, 'id' | 'registeredDate' | 'lastLogin' | 'vaccinations'>) => void
  isLoading: boolean
  selectedUser: User | null
}

export function UpdateUserDialog({ open, onOpenChange, onUpdateUser, isLoading, selectedUser }: UpdateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Patient',
    status: 'Active'
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        role: selectedUser.role,
        status: selectedUser.status
      })
      setAvatarPreview(selectedUser.avatar === '/placeholder.svg' ? null : selectedUser.avatar)
    }
  }, [selectedUser])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    onUpdateUser({
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
  }

  if (!selectedUser) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label>Profile Image</Label>
            <FileUploader onFileUpload={handleFileUpload} currentImage={avatarPreview} accept='image/*' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-name'>Full Name</Label>
              <Input
                id='edit-name'
                name='name'
                placeholder='Enter full name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-email'>Email</Label>
              <Input
                id='edit-email'
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
              <Label htmlFor='edit-phone'>Phone Number</Label>
              <Input
                id='edit-phone'
                name='phone'
                placeholder='Enter phone number'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-role'>Role</Label>
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
          <div className='flex flex-col gap-2'>
            <Label htmlFor='edit-status'>Status</Label>
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
            {isLoading ? 'Updating...' : 'Update User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

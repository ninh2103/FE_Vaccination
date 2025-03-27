import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface Manufacturer {
  id: number
  name: string
  logo: string
  country: string
  address: string
  phone: string
  email: string
  website: string
  status: 'Active' | 'Inactive'
  vaccines: string[]
  contactPerson: string
  established: string
  leadTime: string
  rating: number
}

interface UpdateManufacturerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (manufacturer: Manufacturer) => void
  manufacturer: Manufacturer | null
}

const MIN_YEAR = 1800
const MAX_YEAR = new Date().getFullYear()

const isValidYear = (year: string): boolean => {
  if (!year) return true
  const num = Number.parseInt(year)
  return !Number.isNaN(num) && year.length === 4 && num >= MIN_YEAR && num <= MAX_YEAR
}

export const UpdateManufacturer: React.FC<UpdateManufacturerProps> = ({
  open,
  onOpenChange,
  onSubmit,
  manufacturer
}) => {
  if (!manufacturer) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const established = formData.get('established')?.toString() || ''

    if (established && !isValidYear(established)) {
      alert(`Please enter a valid year (between ${MIN_YEAR} and ${MAX_YEAR}).`)
      return
    }

    const updatedManufacturer: Manufacturer = {
      ...manufacturer,
      name: formData.get('name')?.toString() || '',
      country: formData.get('country')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      website: formData.get('website')?.toString() || '',
      established,
      contactPerson: formData.get('contact-person')?.toString() || '',
      status: (formData.get('status')?.toString() as 'Active' | 'Inactive') || 'Active',
      leadTime: formData.get('lead-time')?.toString() || '',
      rating: Number.parseFloat(formData.get('rating')?.toString() || '0'),
      vaccines:
        formData
          .get('vaccines')
          ?.toString()
          .split(',')
          .map((p) => p.trim()) || []
    }

    onSubmit(updatedManufacturer)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Edit Manufacturer</DialogTitle>
          <DialogDescription>Edit the manufacturer details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='name'>Manufacturer Name</Label>
                <Input id='name' name='name' defaultValue={manufacturer.name} required />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='country'>Country</Label>
                <Input id='country' name='country' defaultValue={manufacturer.country} required />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='address'>Address</Label>
              <Textarea id='address' name='address' defaultValue={manufacturer.address} required />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' name='phone' defaultValue={manufacturer.phone} required />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' defaultValue={manufacturer.email} required />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='website'>Website</Label>
                <Input id='website' name='website' defaultValue={manufacturer.website} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='established'>Established Year</Label>
                <Input
                  id='established'
                  name='established'
                  defaultValue={manufacturer.established}
                  placeholder='yyyy'
                  maxLength={4}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='contact-person'>Contact Person</Label>
                <Input id='contact-person' name='contact-person' defaultValue={manufacturer.contactPerson} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='status'>Status</Label>
                <Select name='status' defaultValue={manufacturer.status}>
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
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='lead-time'>Lead Time</Label>
                <Input id='lead-time' name='lead-time' defaultValue={manufacturer.leadTime} required />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='rating'>Rating</Label>
                <Select name='rating' defaultValue={manufacturer.rating.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select rating' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5.0'>5.0</SelectItem>
                    <SelectItem value='4.5'>4.5</SelectItem>
                    <SelectItem value='4.0'>4.0</SelectItem>
                    <SelectItem value='3.5'>3.5</SelectItem>
                    <SelectItem value='3.0'>3.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='vaccines'>Vaccines (comma separated)</Label>
              <Input id='vaccines' name='vaccines' defaultValue={manufacturer.vaccines.join(', ')} required />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit'>Update Manufacturer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

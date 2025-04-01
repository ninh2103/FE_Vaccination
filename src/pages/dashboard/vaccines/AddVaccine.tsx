import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
interface AddVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setSelectedVaccine: (vaccine: VaccineType | null) => void
}

export default function AddVaccine({ open, onOpenChange, setSelectedVaccine }: AddVaccineProps) {
  const [newVaccine, setNewVaccine] = useState<Partial<VaccineType>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = 'dataTransfer' in e ? e.dataTransfer.files[0] : e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = reader.result as string
        setNewVaccine((prev) => ({ ...prev, image: imageData }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddVaccine = () => {
    setIsLoading(true)
    const today = new Date().toISOString().split('T')[0]
    if (newVaccine.expirationDate && newVaccine.expirationDate <= today) {
      setErrorMessage('Expiration date must be later than today.')
      setIsLoading(false)
      return
    }
    if (!newVaccine.vaccineName || !newVaccine.manufacturerId || !newVaccine.supplierId) {
      setErrorMessage('Please fill in all required fields (Name, Manufacturer, Supplier).')
      setIsLoading(false)
      return
    }

    // Here you would typically call your API to create the vaccine
    // For now, we'll just close the dialog
    setNewVaccine({})
    setErrorMessage('')
    onOpenChange(false)
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Add New Vaccine</DialogTitle>
          <DialogDescription>Enter the details for the new vaccine below.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4 max-h-[80vh] overflow-y-auto'>
          {errorMessage && (
            <Alert variant='destructive'>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='vaccineName'>Vaccine Name *</Label>
              <Input
                id='vaccineName'
                value={newVaccine.vaccineName || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, vaccineName: e.target.value })}
                placeholder='e.g., COVID-19 Vaccine'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='price'>Price (VND)</Label>
              <Input
                id='price'
                type='number'
                value={newVaccine.price || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, price: Number(e.target.value) })}
                placeholder='e.g., 500000'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='manufacturerId'>Manufacturer ID *</Label>
              <Input
                id='manufacturerId'
                value={newVaccine.manufacturerId || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, manufacturerId: e.target.value })}
                placeholder='Enter manufacturer ID'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='supplierId'>Supplier ID *</Label>
              <Input
                id='supplierId'
                value={newVaccine.supplierId || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, supplierId: e.target.value })}
                placeholder='Enter supplier ID'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                value={newVaccine.location || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, location: e.target.value })}
                placeholder='Enter location'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='expirationDate'>Expiration Date</Label>
              <Input
                id='expirationDate'
                type='date'
                value={newVaccine.expirationDate || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, expirationDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Product Image</Label>
            <div
              className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-gray-400'
              onDrop={handleImageChange}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                const input = document.getElementById('image-input') as HTMLInputElement | null
                input?.click()
              }}
            >
              {newVaccine.image ? (
                <img src={newVaccine.image} alt='Vaccine' className='max-h-32 mx-auto rounded-md' />
              ) : (
                <p className='text-muted-foreground'>Drag and drop an image or click to upload</p>
              )}
              <Input id='image-input' type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={newVaccine.description || ''}
              onChange={(e) => setNewVaccine({ ...newVaccine, description: e.target.value })}
              placeholder='Enter vaccine description'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddVaccine} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
            {isLoading ? 'Saving...' : 'Save Vaccine'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { useState, useEffect } from 'react'
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

interface UpdateVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedVaccine: VaccineType | null
}

export default function UpdateVaccine({ open, onOpenChange, selectedVaccine }: UpdateVaccineProps) {
  const [editVaccine, setEditVaccine] = useState<Partial<VaccineType>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedVaccine) {
      setEditVaccine(selectedVaccine)
    }
  }, [selectedVaccine])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = 'dataTransfer' in e ? e.dataTransfer.files[0] : e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = reader.result as string
        setEditVaccine((prev) => ({ ...prev, image: imageData }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditVaccine = () => {
    setIsLoading(true)
    const today = new Date().toISOString().split('T')[0]
    if (editVaccine.expirationDate && editVaccine.expirationDate <= today) {
      setErrorMessage('Expiration date must be later than today.')
      setIsLoading(false)
      return
    }
    if (!editVaccine.vaccineName || !editVaccine.manufacturerId || !editVaccine.supplierId) {
      setErrorMessage('Please fill in all required fields (Name, Manufacturer, Supplier).')
      setIsLoading(false)
      return
    }

    // Here you would typically call your API to update the vaccine
    // For now, we'll just close the dialog
    setEditVaccine({})
    setErrorMessage('')
    onOpenChange(false)
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Edit Vaccine</DialogTitle>
          <DialogDescription>Update the details for the selected vaccine.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4 max-h-[80vh] overflow-y-auto'>
          {errorMessage && (
            <Alert variant='destructive'>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-vaccineName'>Vaccine Name *</Label>
              <Input
                id='edit-vaccineName'
                value={editVaccine.vaccineName || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, vaccineName: e.target.value })}
                placeholder='e.g., COVID-19 Vaccine'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-price'>Price (VND)</Label>
              <Input
                id='edit-price'
                type='number'
                value={editVaccine.price || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, price: Number(e.target.value) })}
                placeholder='e.g., 500000'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-manufacturerId'>Manufacturer ID *</Label>
              <Input
                id='edit-manufacturerId'
                value={editVaccine.manufacturerId || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, manufacturerId: e.target.value })}
                placeholder='Enter manufacturer ID'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-supplierId'>Supplier ID *</Label>
              <Input
                id='edit-supplierId'
                value={editVaccine.supplierId || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, supplierId: e.target.value })}
                placeholder='Enter supplier ID'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-location'>Location</Label>
              <Input
                id='edit-location'
                value={editVaccine.location || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, location: e.target.value })}
                placeholder='Enter location'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-batchNumber'>Batch Number</Label>
              <Input
                id='edit-batchNumber'
                value={editVaccine.batchNumber || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, batchNumber: e.target.value })}
                placeholder='Enter batch number'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-expirationDate'>Expiration Date</Label>
              <Input
                id='edit-expirationDate'
                type='date'
                value={editVaccine.expirationDate || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, expirationDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-remainingQuantity'>Remaining Quantity</Label>
              <Input
                id='edit-remainingQuantity'
                type='number'
                min='0'
                value={editVaccine.remainingQuantity || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, remainingQuantity: Number(e.target.value) })}
                placeholder='Enter quantity'
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') e.preventDefault()
                }}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-certificate'>Certificate</Label>
              <Input
                id='edit-certificate'
                value={editVaccine.certificate || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, certificate: e.target.value })}
                placeholder='Enter certificate'
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
                const input = document.getElementById('edit-image-input') as HTMLInputElement | null
                input?.click()
              }}
            >
              {editVaccine.image ? (
                <img src={editVaccine.image} alt='Vaccine' className='max-h-32 mx-auto rounded-md' />
              ) : (
                <p className='text-muted-foreground'>Drag and drop an image or click to upload</p>
              )}
              <Input
                id='edit-image-input'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='edit-description'>Description</Label>
            <Textarea
              id='edit-description'
              value={editVaccine.description || ''}
              onChange={(e) => setEditVaccine({ ...editVaccine, description: e.target.value })}
              placeholder='Enter vaccine description'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='edit-sideEffect'>Side Effects</Label>
            <Textarea
              id='edit-sideEffect'
              value={editVaccine.sideEffect || ''}
              onChange={(e) => setEditVaccine({ ...editVaccine, sideEffect: e.target.value })}
              placeholder='Enter side effects'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'
            onClick={handleEditVaccine}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
            {isLoading ? 'Updating...' : 'Update Vaccine'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Vaccine } from '@/pages/dashboard/vaccines/types'

interface UpdateVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedVaccine: Vaccine | null
  vaccines: Vaccine[]
  setVaccines: (vaccines: Vaccine[]) => void
}

export default function UpdateVaccine({
  open,
  onOpenChange,
  selectedVaccine,
  vaccines,
  setVaccines
}: UpdateVaccineProps) {
  const [editVaccine, setEditVaccine] = useState<Partial<Vaccine>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedVaccine) {
      setEditVaccine(selectedVaccine)
    }
  }, [selectedVaccine])

  const calculateStatus = (quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity > 10) return 'In Stock'
    if (quantity > 0) return 'Low Stock'
    return 'Out of Stock'
  }

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
    if (editVaccine.expiryDate && editVaccine.expiryDate <= today) {
      setErrorMessage('Expiry date must be later than today.')
      setIsLoading(false)
      return
    }
    if (!editVaccine.name || !editVaccine.manufacturer || editVaccine.quantity === undefined) {
      setErrorMessage('Please fill in all required fields (Name, Manufacturer, Quantity).')
      setIsLoading(false)
      return
    }

    if (selectedVaccine) {
      setTimeout(() => {
        const updatedVaccines = vaccines.map((v) =>
          v.id === selectedVaccine.id
            ? { ...v, ...editVaccine, status: calculateStatus(editVaccine.quantity || v.quantity) }
            : v
        )
        setVaccines(updatedVaccines)
        setEditVaccine({})
        setErrorMessage('')
        onOpenChange(false)
        setIsLoading(false)
      }, 1000)
    }
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
              <Label htmlFor='edit-name'>Vaccine Name *</Label>
              <Input
                id='edit-name'
                value={editVaccine.name || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, name: e.target.value })}
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
              <Label htmlFor='edit-manufacturer'>Manufacturer *</Label>
              <Input
                id='edit-manufacturer'
                value={editVaccine.manufacturer || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, manufacturer: e.target.value })}
                placeholder='e.g., BioNTech'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-country'>Country of Origin</Label>
              <Input
                id='edit-country'
                value={editVaccine.country || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, country: e.target.value })}
                placeholder='e.g., Germany'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-type'>Vaccine Type</Label>
              <Select
                value={editVaccine.type || ''}
                onValueChange={(value) => setEditVaccine({ ...editVaccine, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Adult'>Adult</SelectItem>
                  <SelectItem value='Children'>Children</SelectItem>
                  <SelectItem value='Pregnant Women'>Pregnant Women</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-quantity'>Quantity *</Label>
              <Input
                id='edit-quantity'
                type='number'
                min='0'
                value={editVaccine.quantity || ''}
                onChange={(e) =>
                  setEditVaccine({
                    ...editVaccine,
                    quantity: Number(e.target.value),
                    status: calculateStatus(Number(e.target.value))
                  })
                }
                placeholder='e.g., 15'
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') e.preventDefault()
                }}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-expiryDate'>Expiry Date</Label>
              <Input
                id='edit-expiryDate'
                type='date'
                value={editVaccine.expiryDate || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, expiryDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-doseInterval'>Dose Interval</Label>
              <Input
                id='edit-doseInterval'
                value={editVaccine.doseInterval || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, doseInterval: e.target.value })}
                placeholder='e.g., 21 days'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-target'>Target Group</Label>
              <Input
                id='edit-target'
                value={editVaccine.target || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, target: e.target.value })}
                placeholder='e.g., People over 12'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-dosage'>Dosage</Label>
              <Input
                id='edit-dosage'
                value={editVaccine.dosage || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, dosage: e.target.value })}
                placeholder='e.g., 0.3ml'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-administration'>Administration Route</Label>
              <Input
                id='edit-administration'
                value={editVaccine.administration || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, administration: e.target.value })}
                placeholder='e.g., Intramuscular'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-storage'>Storage Conditions</Label>
              <Input
                id='edit-storage'
                value={editVaccine.storage || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, storage: e.target.value })}
                placeholder='e.g., 2-8°C'
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
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-info'>Vaccine Information</Label>
              <Textarea
                id='edit-info'
                value={editVaccine.info || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, info: e.target.value })}
                placeholder='Enter vaccine information'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-contraindications'>Contraindications</Label>
              <Textarea
                id='edit-contraindications'
                value={editVaccine.contraindications || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, contraindications: e.target.value })}
                placeholder='e.g., Allergy'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='edit-sideEffects'>Side Effects</Label>
            <Textarea
              id='edit-sideEffects'
              value={editVaccine.sideEffects || ''}
              onChange={(e) => setEditVaccine({ ...editVaccine, sideEffects: e.target.value })}
              placeholder='e.g., Pain, fatigue'
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

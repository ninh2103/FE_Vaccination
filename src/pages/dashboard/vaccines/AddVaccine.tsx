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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Vaccine } from '@/pages/dashboard/vaccines/types'
interface AddVaccineProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vaccines: Vaccine[]
  setVaccines: (vaccines: Vaccine[]) => void
}

export default function AddVaccine({ open, onOpenChange, vaccines, setVaccines }: AddVaccineProps) {
  const [newVaccine, setNewVaccine] = useState<Partial<Vaccine>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
        setNewVaccine((prev) => ({ ...prev, image: imageData }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddVaccine = () => {
    setIsLoading(true)
    const today = new Date().toISOString().split('T')[0]
    if (newVaccine.expiryDate && newVaccine.expiryDate <= today) {
      setErrorMessage('Expiry date must be later than today.')
      setIsLoading(false)
      return
    }
    if (!newVaccine.name || !newVaccine.manufacturer || newVaccine.quantity === undefined) {
      setErrorMessage('Please fill in all required fields (Name, Manufacturer, Quantity).')
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const vaccineToAdd: Vaccine = {
        id: Math.max(...vaccines.map((v) => v.id)) + 1,
        name: newVaccine.name || '',
        image: newVaccine.image || '',
        info: newVaccine.info || '',
        price: newVaccine.price || 0,
        manufacturer: newVaccine.manufacturer || '',
        country: newVaccine.country || '',
        type: newVaccine.type || '',
        quantity: newVaccine.quantity || 0,
        expiryDate: newVaccine.expiryDate || '',
        doseInterval: newVaccine.doseInterval || '',
        target: newVaccine.target || '',
        dosage: newVaccine.dosage || '',
        administration: newVaccine.administration || '',
        contraindications: newVaccine.contraindications || '',
        sideEffects: newVaccine.sideEffects || '',
        storage: newVaccine.storage || '',
        status: calculateStatus(newVaccine.quantity || 0)
      }
      setVaccines([...vaccines, vaccineToAdd])
      setNewVaccine({})
      setErrorMessage('')
      onOpenChange(false)
      setIsLoading(false)
    }, 1000)
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
              <Label htmlFor='name'>Vaccine Name *</Label>
              <Input
                id='name'
                value={newVaccine.name || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
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
              <Label htmlFor='manufacturer'>Manufacturer *</Label>
              <Input
                id='manufacturer'
                value={newVaccine.manufacturer || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, manufacturer: e.target.value })}
                placeholder='e.g., BioNTech'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='country'>Country of Origin</Label>
              <Input
                id='country'
                value={newVaccine.country || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, country: e.target.value })}
                placeholder='e.g., Germany'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='type'>Vaccine Type</Label>
              <Select
                value={newVaccine.type || ''}
                onValueChange={(value) => setNewVaccine({ ...newVaccine, type: value })}
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
              <Label htmlFor='quantity'>Quantity *</Label>
              <Input
                id='quantity'
                type='number'
                min='0'
                value={newVaccine.quantity || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, quantity: Number(e.target.value) })}
                placeholder='e.g., 15'
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') e.preventDefault()
                }}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='expiryDate'>Expiry Date</Label>
              <Input
                id='expiryDate'
                type='date'
                value={newVaccine.expiryDate || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, expiryDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='doseInterval'>Dose Interval</Label>
              <Input
                id='doseInterval'
                value={newVaccine.doseInterval || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, doseInterval: e.target.value })}
                placeholder='e.g., 21 days'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='target'>Target Group</Label>
              <Input
                id='target'
                value={newVaccine.target || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, target: e.target.value })}
                placeholder='e.g., People over 12'
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='dosage'>Dosage</Label>
              <Input
                id='dosage'
                value={newVaccine.dosage || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, dosage: e.target.value })}
                placeholder='e.g., 0.3ml'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='administration'>Administration Route</Label>
              <Input
                id='administration'
                value={newVaccine.administration || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, administration: e.target.value })}
                placeholder='e.g., Intramuscular'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='storage'>Storage Conditions</Label>
              <Input
                id='storage'
                value={newVaccine.storage || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, storage: e.target.value })}
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
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='info'>Vaccine Information</Label>
              <Textarea
                id='info'
                value={newVaccine.info || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, info: e.target.value })}
                placeholder='Enter vaccine information'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='contraindications'>Contraindications</Label>
              <Textarea
                id='contraindications'
                value={newVaccine.contraindications || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, contraindications: e.target.value })}
                placeholder='e.g., Allergy'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='sideEffects'>Side Effects</Label>
            <Textarea
              id='sideEffects'
              value={newVaccine.sideEffects || ''}
              onChange={(e) => setNewVaccine({ ...newVaccine, sideEffects: e.target.value })}
              placeholder='e.g., Pain, fatigue'
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

'use client'

import { useState, useMemo } from 'react'
import { Plus, Download, Edit, Trash, AlertCircle, ChevronLeft, ChevronRight, X, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import * as XLSX from 'xlsx'

// Vaccine interface
interface Vaccine {
  id: number
  name: string
  image?: string
  info: string
  price: number
  manufacturer: string
  country: string
  type: string
  quantity: number
  expiryDate: string
  doseInterval: string
  target: string
  dosage: string
  administration: string
  contraindications: string
  sideEffects: string
  storage: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const initialVaccines: Vaccine[] = [
  {
    id: 1,
    name: 'COVID-19 Vaccine',
    info: 'COVID-19 prevention',
    price: 500000,
    manufacturer: 'BioNTech',
    country: 'Germany',
    type: 'Adult',
    quantity: 15,
    expiryDate: '2025-12-31',
    doseInterval: '21 days',
    target: 'People over 12',
    dosage: '0.3ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy',
    sideEffects: 'Pain, fatigue',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Influenza Vaccine',
    info: 'Flu prevention',
    price: 300000,
    manufacturer: 'Sanofi Pasteur',
    country: 'France',
    type: 'Children',
    quantity: 8,
    expiryDate: '2025-09-30',
    doseInterval: 'N/A',
    target: 'Children from 6 months',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Egg allergy',
    sideEffects: 'Mild fever',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 3,
    name: 'Hepatitis B Vaccine',
    info: 'Hepatitis B prevention',
    price: 200000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 0,
    expiryDate: '2025-03-15',
    doseInterval: '30 days',
    target: 'Adults',
    dosage: '1ml',
    administration: 'Intramuscular',
    contraindications: 'Yeast allergy',
    sideEffects: 'Muscle pain',
    storage: '2-8°C',
    status: 'Out of Stock'
  },
  {
    id: 4,
    name: 'Tetanus Vaccine',
    info: 'Tetanus prevention',
    price: 150000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Adult',
    quantity: 20,
    expiryDate: '2025-06-20',
    doseInterval: 'N/A',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'None',
    sideEffects: 'Soreness',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 5,
    name: 'MMR Vaccine',
    info: 'Measles, Mumps, Rubella',
    price: 400000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Children',
    quantity: 5,
    expiryDate: '2025-10-05',
    doseInterval: '28 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Subcutaneous',
    contraindications: 'Immunodeficiency',
    sideEffects: 'Rash',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 6,
    name: 'Polio Vaccine',
    info: 'Polio prevention',
    price: 250000,
    manufacturer: 'Sanofi',
    country: 'France',
    type: 'Children',
    quantity: 12,
    expiryDate: '2025-07-15',
    doseInterval: '60 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Oral',
    contraindications: 'None',
    sideEffects: 'None',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 7,
    name: 'HPV Vaccine',
    info: 'Human Papillomavirus',
    price: 600000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 3,
    expiryDate: '2025-11-30',
    doseInterval: '60 days',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy',
    sideEffects: 'Pain',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 8,
    name: 'Rotavirus Vaccine',
    info: 'Rotavirus prevention',
    price: 350000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Children',
    quantity: 0,
    expiryDate: '2025-08-25',
    doseInterval: '60 days',
    target: 'Infants',
    dosage: '2ml',
    administration: 'Oral',
    contraindications: 'Intussusception',
    sideEffects: 'Diarrhea',
    storage: '2-8°C',
    status: 'Out of Stock'
  },
  {
    id: 9,
    name: 'Pneumococcal Vaccine',
    info: 'Pneumonia prevention',
    price: 450000,
    manufacturer: 'Pfizer',
    country: 'USA',
    type: 'Adult',
    quantity: 25,
    expiryDate: '2025-12-10',
    doseInterval: 'N/A',
    target: 'Elderly',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'None',
    sideEffects: 'Swelling',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 10,
    name: 'Varicella Vaccine',
    info: 'Chickenpox prevention',
    price: 320000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Children',
    quantity: 7,
    expiryDate: '2025-09-15',
    doseInterval: '90 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Subcutaneous',
    contraindications: 'Immunodeficiency',
    sideEffects: 'Rash',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 11,
    name: 'Rabies Vaccine',
    info: 'Rabies prevention',
    price: 280000,
    manufacturer: 'Sanofi',
    country: 'France',
    type: 'Adult',
    quantity: 18,
    expiryDate: '2025-11-20',
    doseInterval: '7 days',
    target: 'Adults',
    dosage: '1ml',
    administration: 'Intramuscular',
    contraindications: 'None',
    sideEffects: 'Pain',
    storage: '2-8°C',
    status: 'In Stock'
  }
]

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>(initialVaccines)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [newVaccine, setNewVaccine] = useState<Partial<Vaccine>>({})
  const [editVaccine, setEditVaccine] = useState<Partial<Vaccine>>({})
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const ITEMS_PER_PAGE = 10

  const filteredVaccines = useMemo(() => {
    return vaccines.filter((vaccine) => {
      const matchesSearch =
        vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'All' || vaccine.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [vaccines, searchTerm, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filteredVaccines.length / ITEMS_PER_PAGE))
  const paginatedVaccines = filteredVaccines.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const calculateStatus = (quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity > 10) return 'In Stock'
    if (quantity > 0) return 'Low Stock'
    return 'Out of Stock'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className='bg-green-500 hover:bg-green-600 text-white'>In Stock</Badge>
      case 'Low Stock':
        return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white'>Low Stock</Badge>
      case 'Out of Stock':
        return <Badge className='bg-red-500 hover:bg-red-600 text-white'>Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    isEdit: boolean
  ) => {
    e.preventDefault()
    const file = 'dataTransfer' in e ? e.dataTransfer.files[0] : e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = reader.result as string
        if (isEdit) {
          setEditVaccine((prev) => ({ ...prev, image: imageData }))
        } else {
          setNewVaccine((prev) => ({ ...prev, image: imageData }))
        }
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
      setOpenAddDialog(false)
      setIsLoading(false)
    }, 1000)
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
        setOpenEditDialog(false)
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleDeleteVaccine = () => {
    setIsLoading(true)
    if (selectedVaccine) {
      setTimeout(() => {
        setVaccines(vaccines.filter((v) => v.id !== selectedVaccine.id))
        setOpenDeleteDialog(false)
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(filteredVaccines)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
      XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVaccines(initialVaccines)
      setSearchTerm('')
      setFilterStatus('All')
      setCurrentPage(1)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and Action Buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Vaccines
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Refresh
          </Button>
          <Button size='sm' onClick={() => setOpenAddDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Vaccine
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search vaccines by name, manufacturer, or type...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full'
            />
            {searchTerm && (
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value) => {
              setFilterStatus(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Statuses</SelectItem>
              <SelectItem value='In Stock'>In Stock</SelectItem>
              <SelectItem value='Low Stock'>Low Stock</SelectItem>
              <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alert */}
        {filteredVaccines.some((v) => v.status === 'Low Stock' || v.status === 'Out of Stock') && (
          <Alert variant='destructive' className='bg-red-50 border-red-200'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Stock Alert</AlertTitle>
            <AlertDescription>
              Some vaccines are low in stock or out of stock. Review inventory and consider restocking.
            </AlertDescription>
          </Alert>
        )}

        {/* Vaccine Table */}
        <Card>
          <CardContent className='p-0'>
            {paginatedVaccines.length === 0 ? (
              <div className='p-4 text-center text-muted-foreground'>No vaccines found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[60px]'>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Info</TableHead>
                    <TableHead>Price (VND)</TableHead>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='w-[80px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedVaccines.map((vaccine, index) => (
                    <TableRow
                      key={vaccine.id}
                      className='cursor-pointer hover:bg-muted/50'
                      onClick={() => {
                        setSelectedVaccine(vaccine)
                        setEditVaccine(vaccine)
                        setOpenEditDialog(true)
                      }}
                    >
                      <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                      <TableCell className='font-medium'>{vaccine.name}</TableCell>
                      <TableCell>{vaccine.info}</TableCell>
                      <TableCell>{vaccine.price.toLocaleString()}</TableCell>
                      <TableCell>{vaccine.manufacturer}</TableCell>
                      <TableCell>{vaccine.type}</TableCell>
                      <TableCell>{vaccine.quantity}</TableCell>
                      <TableCell>{vaccine.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(vaccine.status)}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedVaccine(vaccine)
                              setEditVaccine(vaccine)
                              setOpenEditDialog(true)
                            }}
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedVaccine(vaccine)
                              setOpenDeleteDialog(true)
                            }}
                          >
                            <Trash className='h-4 w-4 text-destructive' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mb-[2rem] fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='text-sm'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isLoading}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}

      {/* Add Vaccine Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className='sm:max-w-[650px]'>
          <DialogHeader>
            <DialogTitle>Add New Vaccine</DialogTitle>
            <DialogDescription>Enter the details for the new vaccine below.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4 max-h-[70vh] overflow-y-auto'>
            {errorMessage && (
              <Alert variant='destructive'>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className='grid grid-cols-2 gap-4'>
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
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Product Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-gray-400'
                onDrop={(e) => handleImageChange(e, false)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  const input = document.getElementById('new-image-input') as HTMLInputElement | null
                  input?.click()
                }}
              >
                {newVaccine.image ? (
                  <img src={newVaccine.image} alt='Vaccine' className='max-h-32 mx-auto rounded-md' />
                ) : (
                  <p className='text-muted-foreground'>Drag and drop an image or click to upload</p>
                )}
                <Input
                  id='new-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleImageChange(e, false)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='manufacturer'>Manufacturer *</Label>
                <Input
                  id='manufacturer'
                  value={newVaccine.manufacturer || ''}
                  onChange={(e) => setNewVaccine({ ...newVaccine, manufacturer: e.target.value })}
                  placeholder='e.g., BioNTech'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='country'>Country of Origin</Label>
                <Input
                  id='country'
                  value={newVaccine.country || ''}
                  onChange={(e) => setNewVaccine({ ...newVaccine, country: e.target.value })}
                  placeholder='e.g., Germany'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
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
            <div className='grid grid-cols-2 gap-4'>
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
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='info'>Vaccine Information</Label>
              <Textarea
                id='info'
                value={newVaccine.info || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, info: e.target.value })}
                placeholder='Enter vaccine information'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='target'>Target Group</Label>
                <Input
                  id='target'
                  value={newVaccine.target || ''}
                  onChange={(e) => setNewVaccine({ ...newVaccine, target: e.target.value })}
                  placeholder='e.g., People over 12'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='dosage'>Dosage</Label>
                <Input
                  id='dosage'
                  value={newVaccine.dosage || ''}
                  onChange={(e) => setNewVaccine({ ...newVaccine, dosage: e.target.value })}
                  placeholder='e.g., 0.3ml'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
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
              <Label htmlFor='contraindications'>Contraindications</Label>
              <Textarea
                id='contraindications'
                value={newVaccine.contraindications || ''}
                onChange={(e) => setNewVaccine({ ...newVaccine, contraindications: e.target.value })}
                placeholder='e.g., Allergy'
              />
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
            <Button variant='outline' onClick={() => setOpenAddDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddVaccine} disabled={isLoading}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Saving...' : 'Save Vaccine'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Vaccine Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[650px]'>
          <DialogHeader>
            <DialogTitle>Edit Vaccine</DialogTitle>
            <DialogDescription>Update the details for the selected vaccine.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4 max-h-[70vh] overflow-y-auto'>
            {errorMessage && (
              <Alert variant='destructive'>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className='grid grid-cols-2 gap-4'>
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
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Product Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-gray-400'
                onDrop={(e) => handleImageChange(e, true)}
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
                  onChange={(e) => handleImageChange(e, true)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-manufacturer'>Manufacturer *</Label>
                <Input
                  id='edit-manufacturer'
                  value={editVaccine.manufacturer || ''}
                  onChange={(e) => setEditVaccine({ ...editVaccine, manufacturer: e.target.value })}
                  placeholder='e.g., BioNTech'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-country'>Country of Origin</Label>
                <Input
                  id='edit-country'
                  value={editVaccine.country || ''}
                  onChange={(e) => setEditVaccine({ ...editVaccine, country: e.target.value })}
                  placeholder='e.g., Germany'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
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
            <div className='grid grid-cols-2 gap-4'>
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
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-info'>Vaccine Information</Label>
              <Textarea
                id='edit-info'
                value={editVaccine.info || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, info: e.target.value })}
                placeholder='Enter vaccine information'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-target'>Target Group</Label>
                <Input
                  id='edit-target'
                  value={editVaccine.target || ''}
                  onChange={(e) => setEditVaccine({ ...editVaccine, target: e.target.value })}
                  placeholder='e.g., People over 12'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-dosage'>Dosage</Label>
                <Input
                  id='edit-dosage'
                  value={editVaccine.dosage || ''}
                  onChange={(e) => setEditVaccine({ ...editVaccine, dosage: e.target.value })}
                  placeholder='e.g., 0.3ml'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
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
              <Label htmlFor='edit-contraindications'>Contraindications</Label>
              <Textarea
                id='edit-contraindications'
                value={editVaccine.contraindications || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, contraindications: e.target.value })}
                placeholder='e.g., Allergy'
              />
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
            <Button variant='outline' onClick={() => setOpenEditDialog(false)} disabled={isLoading}>
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

      {/* Delete Vaccine Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Vaccine</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vaccine? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedVaccine && (
              <div className='text-sm'>
                <p>
                  <span className='font-medium'>Name:</span> {selectedVaccine.name}
                </p>
                <p>
                  <span className='font-medium'>Manufacturer:</span> {selectedVaccine.manufacturer}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteVaccine} disabled={isLoading}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

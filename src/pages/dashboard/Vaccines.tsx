'use client'

import { useState } from 'react'
import { Plus, Download, MoreHorizontal, Edit, Trash, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

// Initial sample data (11 vaccines to test pagination)
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
  // State management
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

  const itemsPerPage = 10

  // Filter and paginate vaccines
  const filteredVaccines = vaccines.filter((vaccine) => {
    const matchesSearch =
      vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || vaccine.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredVaccines.length / itemsPerPage)
  const paginatedVaccines = filteredVaccines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Utility functions
  const calculateStatus = (quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity > 10) return 'In Stock'
    if (quantity > 0) return 'Low Stock'
    return 'Out of Stock'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className='bg-green-500 text-white'>In Stock</Badge>
      case 'Low Stock':
        return <Badge className='bg-yellow-500 text-white'>Low Stock</Badge>
      case 'Out of Stock':
        return <Badge className='bg-red-500 text-white'>Out of Stock</Badge>
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

  // CRUD operations
  const handleAddVaccine = () => {
    const today = new Date().toISOString().split('T')[0]
    if (newVaccine.expiryDate && newVaccine.expiryDate <= today) {
      setErrorMessage('Expiry date must be later than today.')
      return
    }

    const vaccineToAdd: Vaccine = {
      id: vaccines.length + 1,
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
  }

  const handleEditVaccine = () => {
    const today = new Date().toISOString().split('T')[0]
    if (editVaccine.expiryDate && editVaccine.expiryDate <= today) {
      setErrorMessage('Expiry date must be later than today.')
      return
    }

    if (selectedVaccine) {
      const updatedVaccines = vaccines.map((v) =>
        v.id === selectedVaccine.id
          ? { ...v, ...editVaccine, status: calculateStatus(editVaccine.quantity || v.quantity) }
          : v
      )
      setVaccines(updatedVaccines)
      setEditVaccine({})
      setErrorMessage('')
      setOpenEditDialog(false)
    }
  }

  const handleDeleteVaccine = () => {
    if (selectedVaccine) {
      setVaccines(vaccines.filter((v) => v.id !== selectedVaccine.id))
      setOpenDeleteDialog(false)
    }
  }

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(vaccines)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
    XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  // Pagination handlers
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className='flex flex-col gap-6 w-full max-w-[9100px] mx-auto px-4 sm:px-6 lg:px-8 relative'>
      {/* Header */}
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Vaccines
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Add Vaccine
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[650px]'>
              <DialogHeader>
                <DialogTitle>Add New Vaccine</DialogTitle>
                <DialogDescription>Enter the details of the new vaccine.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4 max-h-[70vh] overflow-y-auto'>
                {errorMessage && (
                  <Alert variant='destructive'>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Vaccine Name</Label>
                  <Input
                    id='name'
                    value={newVaccine.name || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                    placeholder='Enter vaccine name'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label>Product Image</Label>
                  <div
                    className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                    onDrop={(e) => handleImageChange(e, false)}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('new-image-input')?.click()}
                  >
                    {newVaccine.image ? (
                      <img src={newVaccine.image} alt='Vaccine' className='max-h-32 mx-auto' />
                    ) : (
                      <p className='text-gray-500'>Drag and drop an image here or click to select</p>
                    )}
                    <input
                      id='new-image-input'
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => handleImageChange(e, false)}
                    />
                  </div>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='info'>Vaccine Information</Label>
                  <Textarea
                    id='info'
                    value={newVaccine.info || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, info: e.target.value })}
                    placeholder='Enter vaccine information'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='price'>Price (VND)</Label>
                  <Input
                    id='price'
                    type='number'
                    value={newVaccine.price || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, price: Number(e.target.value) })}
                    placeholder='Enter price'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='manufacturer'>Manufacturer</Label>
                  <Input
                    id='manufacturer'
                    value={newVaccine.manufacturer || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, manufacturer: e.target.value })}
                    placeholder='Enter manufacturer'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='country'>Country of Origin</Label>
                  <Input
                    id='country'
                    value={newVaccine.country || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, country: e.target.value })}
                    placeholder='Enter country'
                  />
                </div>
                <div className='grid gap-2'>
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
                <div className='grid gap-2'>
                  <Label htmlFor='quantity'>Quantity</Label>
                  <Input
                    id='quantity'
                    type='number'
                    min='0'
                    value={newVaccine.quantity || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, quantity: Number(e.target.value) })}
                    placeholder='Enter quantity'
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') e.preventDefault()
                    }}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='expiryDate'>Expiry Date</Label>
                  <Input
                    id='expiryDate'
                    type='date'
                    value={newVaccine.expiryDate || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, expiryDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='doseInterval'>Dose Interval</Label>
                  <Input
                    id='doseInterval'
                    value={newVaccine.doseInterval || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, doseInterval: e.target.value })}
                    placeholder='e.g., 21 days'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='target'>Target Group</Label>
                  <Input
                    id='target'
                    value={newVaccine.target || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, target: e.target.value })}
                    placeholder='Enter target group'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='dosage'>Dosage</Label>
                  <Input
                    id='dosage'
                    value={newVaccine.dosage || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, dosage: e.target.value })}
                    placeholder='e.g., 0.5ml'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='administration'>Administration Route</Label>
                  <Input
                    id='administration'
                    value={newVaccine.administration || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, administration: e.target.value })}
                    placeholder='e.g., Intramuscular'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='contraindications'>Contraindications</Label>
                  <Textarea
                    id='contraindications'
                    value={newVaccine.contraindications || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, contraindications: e.target.value })}
                    placeholder='Enter contraindications'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='sideEffects'>Side Effects</Label>
                  <Textarea
                    id='sideEffects'
                    value={newVaccine.sideEffects || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, sideEffects: e.target.value })}
                    placeholder='Enter side effects'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='storage'>Storage Conditions</Label>
                  <Input
                    id='storage'
                    value={newVaccine.storage || ''}
                    onChange={(e) => setNewVaccine({ ...newVaccine, storage: e.target.value })}
                    placeholder='e.g., 2-8°C'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVaccine}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Input
            placeholder='Search vaccines...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full max-w-sm'
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All</SelectItem>
              <SelectItem value='In Stock'>In Stock</SelectItem>
              <SelectItem value='Low Stock'>Low Stock</SelectItem>
              <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alert */}
        {filteredVaccines.some((v) => v.status === 'Low Stock' || v.status === 'Out of Stock') && (
          <Alert variant='destructive' className='bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Some vaccines are low in stock or out of stock. Please check inventory and restock.
            </AlertDescription>
          </Alert>
        )}

        {/* Vaccine Table */}
        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Info</TableHead>
                  <TableHead>Price (VND)</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-[80px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVaccines.map((vaccine, index) => (
                  <TableRow key={vaccine.id} className='hover:bg-muted/50'>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className='font-medium'>{vaccine.name}</TableCell>
                    <TableCell>{vaccine.info}</TableCell>
                    <TableCell>{vaccine.price.toLocaleString()}</TableCell>
                    <TableCell>{vaccine.manufacturer}</TableCell>
                    <TableCell>{vaccine.country}</TableCell>
                    <TableCell>{vaccine.type}</TableCell>
                    <TableCell>{vaccine.quantity}</TableCell>
                    <TableCell>{vaccine.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(vaccine.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedVaccine(vaccine)
                              setEditVaccine(vaccine)
                              setOpenEditDialog(true)
                            }}
                          >
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() => {
                              setSelectedVaccine(vaccine)
                              setOpenDeleteDialog(true)
                            }}
                          >
                            <Trash className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Pagination Buttons */}
      {totalPages > 1 && (
        <div className='fixed bottom-4 right-4 flex items-center gap-4 z-10 mb-[1rem]'>
          <Button variant='outline' size='sm' onClick={goToPreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className='h-4 w-4 mr-2' />
            Previous
          </Button>
          <span className='text-sm font-medium'>
            Page {currentPage} of {totalPages}
          </span>
          <Button variant='outline' size='sm' onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className='h-4 w-4 ml-2' />
          </Button>
        </div>
      )}

      {/* Edit Vaccine Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[650px]'>
          <DialogHeader>
            <DialogTitle>Edit Vaccine</DialogTitle>
            <DialogDescription>Modify the details of the vaccine.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4 max-h-[70vh] overflow-y-auto'>
            {errorMessage && (
              <Alert variant='destructive'>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='edit-name'>Vaccine Name</Label>
              <Input
                id='edit-name'
                value={editVaccine.name || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, name: e.target.value })}
                placeholder='Enter vaccine name'
              />
            </div>
            <div className='grid gap-2'>
              <Label>Product Image</Label>
              <div
                className='border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer'
                onDrop={(e) => handleImageChange(e, true)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('edit-image-input')?.click()}
              >
                {editVaccine.image ? (
                  <img src={editVaccine.image} alt='Vaccine' className='max-h-32 mx-auto' />
                ) : (
                  <p className='text-gray-500'>Drag and drop an image here or click to select</p>
                )}
                <input
                  id='edit-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleImageChange(e, true)}
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-info'>Vaccine Information</Label>
              <Textarea
                id='edit-info'
                value={editVaccine.info || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, info: e.target.value })}
                placeholder='Enter vaccine information'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-price'>Price (VND)</Label>
              <Input
                id='edit-price'
                type='number'
                value={editVaccine.price || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, price: Number(e.target.value) })}
                placeholder='Enter price'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-manufacturer'>Manufacturer</Label>
              <Input
                id='edit-manufacturer'
                value={editVaccine.manufacturer || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, manufacturer: e.target.value })}
                placeholder='Enter manufacturer'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-country'>Country of Origin</Label>
              <Input
                id='edit-country'
                value={editVaccine.country || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, country: e.target.value })}
                placeholder='Enter country'
              />
            </div>
            <div className='grid gap-2'>
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
            <div className='grid gap-2'>
              <Label htmlFor='edit-quantity'>Quantity</Label>
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
                placeholder='Enter quantity'
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') e.preventDefault()
                }}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-expiryDate'>Expiry Date</Label>
              <Input
                id='edit-expiryDate'
                type='date'
                value={editVaccine.expiryDate || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, expiryDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-doseInterval'>Dose Interval</Label>
              <Input
                id='edit-doseInterval'
                value={editVaccine.doseInterval || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, doseInterval: e.target.value })}
                placeholder='e.g., 21 days'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-target'>Target Group</Label>
              <Input
                id='edit-target'
                value={editVaccine.target || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, target: e.target.value })}
                placeholder='Enter target group'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-dosage'>Dosage</Label>
              <Input
                id='edit-dosage'
                value={editVaccine.dosage || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, dosage: e.target.value })}
                placeholder='e.g., 0.5ml'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-administration'>Administration Route</Label>
              <Input
                id='edit-administration'
                value={editVaccine.administration || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, administration: e.target.value })}
                placeholder='e.g., Intramuscular'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-contraindications'>Contraindications</Label>
              <Textarea
                id='edit-contraindications'
                value={editVaccine.contraindications || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, contraindications: e.target.value })}
                placeholder='Enter contraindications'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-sideEffects'>Side Effects</Label>
              <Textarea
                id='edit-sideEffects'
                value={editVaccine.sideEffects || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, sideEffects: e.target.value })}
                placeholder='Enter side effects'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-storage'>Storage Conditions</Label>
              <Input
                id='edit-storage'
                value={editVaccine.storage || ''}
                onChange={(e) => setEditVaccine({ ...editVaccine, storage: e.target.value })}
                placeholder='e.g., 2-8°C'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditVaccine}>Save</Button>
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
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedVaccine.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteVaccine}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

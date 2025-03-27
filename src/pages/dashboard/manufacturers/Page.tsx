import { useState, useMemo } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Filter, Download, ChevronLeft, ChevronRight, RefreshCw, Calendar, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ManufacturerTable } from './ManufacturerTable'
import { AddManufacturer } from './AddManufacturer'
import { UpdateManufacturer } from './UpdateManufacturer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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

// Initial data
const initialManufacturers: Manufacturer[] = [
  {
    id: 1,
    name: 'BioNTech',
    logo: '/placeholder.svg',
    country: 'Germany',
    address: 'An der Goldgrube 12, 55131 Mainz, Germany',
    phone: '+49 6131 9084-0',
    email: 'info@biontech.de',
    website: 'https://biontech.de',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Dr. Ugur Sahin',
    established: '2008',
    leadTime: '4-6 days',
    rating: 4.8
  }
  // ... Add more initial manufacturers as needed
]

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(initialManufacturers)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [filters, setFilters] = useState({
    status: { active: false, inactive: false },
    establishedFrom: '',
    establishedTo: ''
  })
  const [yearRangeError, setYearRangeError] = useState('')

  // Filtered manufacturers
  const filteredManufacturers = useMemo(() => {
    setYearRangeError('')
    const fromYear = filters.establishedFrom ? Number.parseInt(filters.establishedFrom) : null
    const toYear = filters.establishedTo ? Number.parseInt(filters.establishedTo) : null

    if (fromYear && toYear && fromYear > toYear) {
      setYearRangeError("The 'From' year cannot be greater than the 'To' year.")
    }

    return manufacturers.filter((manufacturer) => {
      const matchesSearch =
        manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manufacturer.phone.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        (!filters.status.active && !filters.status.inactive) ||
        (filters.status.active && manufacturer.status === 'Active') ||
        (filters.status.inactive && manufacturer.status === 'Inactive')

      const establishedYear = manufacturer.established ? Number.parseInt(manufacturer.established) : null
      const matchesEstablished =
        (!fromYear || (establishedYear && establishedYear >= fromYear)) &&
        (!toYear || (establishedYear && establishedYear <= toYear))

      return matchesSearch && matchesStatus && matchesEstablished
    })
  }, [manufacturers, searchTerm, filters])

  // Pagination
  const ROWS_PER_PAGE = 10
  const totalPages = Math.ceil(filteredManufacturers.length / ROWS_PER_PAGE)
  const paginatedManufacturers = filteredManufacturers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  // Event handlers
  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(filteredManufacturers)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Manufacturers')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'manufacturers.xlsx')
      setIsExporting(false)
    }, 1000)
  }

  const handleAddManufacturer = (newManufacturer: Omit<Manufacturer, 'id'>) => {
    const manufacturer: Manufacturer = {
      ...newManufacturer,
      id: manufacturers.length + 1
    }
    setManufacturers([...manufacturers, manufacturer])
    setOpenAddDialog(false)
  }

  const handleUpdateManufacturer = (updatedManufacturer: Manufacturer) => {
    setManufacturers(manufacturers.map((m) => (m.id === updatedManufacturer.id ? updatedManufacturer : m)))
    setIsEditMode(false)
    setSelectedManufacturer(null)
  }

  const handleDeleteManufacturer = () => {
    if (selectedManufacturer) {
      setManufacturers(manufacturers.filter((m) => m.id !== selectedManufacturer.id))
    }
    setOpenDeleteDialog(false)
    setSelectedManufacturer(null)
  }

  const handleEditManufacturer = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer)
    setIsEditMode(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setManufacturers([...initialManufacturers])
      setSearchTerm('')
      setFilters({
        status: { active: false, inactive: false },
        establishedFrom: '',
        establishedTo: ''
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  const handleClearFilters = () => {
    setFilters({
      status: { active: false, inactive: false },
      establishedFrom: '',
      establishedTo: ''
    })
    setCurrentPage(1)
  }

  const handleYearChange = (key: 'establishedFrom' | 'establishedTo', value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 4)
    setFilters((prev) => ({ ...prev, [key]: sanitizedValue }))
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Manufacturers
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Refresh
          </Button>
          <Button size='sm' onClick={() => setOpenAddDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Manufacturer
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by name or phone...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full'
              type='search'
            />
            {searchTerm && (
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Filter className='mr-2 h-4 w-4' />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[300px] p-4'>
                <DropdownMenuLabel className='font-semibold'>Filters</DropdownMenuLabel>
                <p className='text-sm text-muted-foreground mb-4'>
                  Filter manufacturers by status and established year range.
                </p>

                {/* Status Filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status.active}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, active: checked }
                      }))
                    }
                  >
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.inactive}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, inactive: checked }
                      }))
                    }
                  >
                    Inactive
                  </DropdownMenuCheckboxItem>
                </div>

                {/* Established Year Range Filter */}
                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Established Year Range</DropdownMenuLabel>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>From</Label>
                      <div className='flex items-center'>
                        <Input
                          placeholder='yyyy'
                          value={filters.establishedFrom}
                          onChange={(e) => handleYearChange('establishedFrom', e.target.value)}
                          className='w-full'
                          maxLength={4}
                        />
                        <Calendar className='ml-2 h-4 w-4 text-muted-foreground' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>To</Label>
                      <div className='flex items-center'>
                        <Input
                          placeholder='yyyy'
                          value={filters.establishedTo}
                          onChange={(e) => handleYearChange('establishedTo', e.target.value)}
                          className='w-full'
                          maxLength={4}
                        />
                        <Calendar className='ml-2 h-4 w-4 text-muted-foreground' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year Range Error */}
                {yearRangeError && (
                  <Alert variant='destructive' className='mb-4'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>{yearRangeError}</AlertDescription>
                  </Alert>
                )}

                {/* Clear Filters Button */}
                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className='p-0'>
            {paginatedManufacturers.length === 0 ? (
              <div className='p-4 text-center text-muted-foreground'>
                No manufacturers found matching the current filters.
              </div>
            ) : (
              <ManufacturerTable
                manufacturers={paginatedManufacturers}
                currentPage={currentPage}
                rowsPerPage={ROWS_PER_PAGE}
                onEdit={handleEditManufacturer}
                onDelete={(id) => {
                  setSelectedManufacturer(manufacturers.find((m) => m.id === id) || null)
                  setOpenDeleteDialog(true)
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-4'>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className='flex items-center px-4'>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Add Manufacturer Dialog */}
      <AddManufacturer open={openAddDialog} onOpenChange={setOpenAddDialog} onSubmit={handleAddManufacturer} />

      {/* Update Manufacturer Dialog */}
      <UpdateManufacturer
        open={isEditMode}
        onOpenChange={(open) => {
          setIsEditMode(open)
          if (!open) setSelectedManufacturer(null)
        }}
        onSubmit={handleUpdateManufacturer}
        manufacturer={selectedManufacturer}
      />

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Manufacturer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this manufacturer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedManufacturer && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedManufacturer.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteManufacturer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

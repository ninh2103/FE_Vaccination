import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  Plus,
  Filter,
  Download,
  Edit,
  Trash,
  Truck,
  MapPin,
  Phone,
  Mail,
  Globe,
  RefreshCw,
  Calendar,
  AlertCircle,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
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
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Supplier } from '@/pages/dashboard/suppliers/types'
import { UpdateSupplier } from '@/pages/dashboard/suppliers/UpdateSupplier'
import { AddSupplier } from '@/pages/dashboard/suppliers/AddSupplier'

// Constants
const ROWS_PER_PAGE = 10

const getStatusBadge = (status: string) =>
  status === 'Active' ? (
    <Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
  ) : (
    <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
      Inactive
    </Badge>
  )

const getRatingBadge = (rating: number) => {
  if (rating >= 4.5) return <Badge className='bg-green-500'>{rating.toFixed(1)}</Badge>
  if (rating >= 4.0) return <Badge className='bg-blue-500'>{rating.toFixed(1)}</Badge>
  if (rating >= 3.5) {
    return (
      <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
        {rating.toFixed(1)}
      </Badge>
    )
  }
  return <Badge variant='destructive'>{rating.toFixed(1)}</Badge>
}

interface SuppliersTableProps {
  suppliers: Supplier[]
  onUpdateSuppliers: (suppliers: Supplier[]) => void
}

export function SuppliersTable({ suppliers, onUpdateSuppliers }: SuppliersTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    status: { active: false, inactive: false },
    establishedFrom: '',
    establishedTo: ''
  })
  const [yearRangeError, setYearRangeError] = useState('')

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      (!filters.status.active && !filters.status.inactive) ||
      (filters.status.active && supplier.status === 'Active') ||
      (filters.status.inactive && supplier.status === 'Inactive')

    const establishedYear = supplier.established ? Number.parseInt(supplier.established) : null
    const matchesEstablished =
      (!filters.establishedFrom || (establishedYear && establishedYear >= Number.parseInt(filters.establishedFrom))) &&
      (!filters.establishedTo || (establishedYear && establishedYear <= Number.parseInt(filters.establishedTo)))

    return matchesSearch && matchesStatus && matchesEstablished
  })

  // Pagination
  const totalPages = Math.ceil(filteredSuppliers.length / ROWS_PER_PAGE)
  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  // Event handlers
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuppliers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'suppliers.xlsx')
  }

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      onUpdateSuppliers(suppliers.filter((s) => s.id !== selectedSupplier.id))
    }
    setOpenDeleteDialog(false)
    setSelectedSupplier(null)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsEditMode(true)
    setOpenAddDialog(true)
  }

  const handleVisitWebsite = (website: string) => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
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
    <div className='grid gap-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Suppliers</h1>
          <p className='text-muted-foreground'>Manage and monitor suppliers in your system.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport}>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Refresh
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              {isEditMode ? (
                <UpdateSupplier
                  supplier={selectedSupplier!}
                  onUpdate={(updatedSupplier: Supplier) => {
                    onUpdateSuppliers(suppliers.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s)))
                    setOpenAddDialog(false)
                    setIsEditMode(false)
                    setSelectedSupplier(null)
                  }}
                  onCancel={() => {
                    setOpenAddDialog(false)
                    setIsEditMode(false)
                    setSelectedSupplier(null)
                  }}
                />
              ) : (
                <AddSupplier
                  onAdd={(newSupplier: Supplier) => {
                    onUpdateSuppliers([...suppliers, newSupplier])
                    setOpenAddDialog(false)
                  }}
                  onCancel={() => setOpenAddDialog(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input
            placeholder='Search by name...'
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
                Filter suppliers by status and established year range.
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
          {paginatedSuppliers.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>
              No suppliers found matching the current filters.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Established Year</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-[80px]'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSuppliers.map((supplier, index) => (
                  <TableRow key={supplier.id} className='cursor-pointer hover:bg-muted/50'>
                    <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                          <Truck className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <div>
                          <div className='font-medium'>{supplier.name}</div>
                          <div className='text-sm text-muted-foreground'>{supplier.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                        <span>{supplier.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1 text-sm'>
                          <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm'>
                          <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {supplier.products.map((product: string, idx: number) => (
                          <Badge key={idx} variant='outline' className='bg-primary/10 text-primary'>
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.established || 'N/A'}</TableCell>
                    <TableCell>{supplier.leadTime}</TableCell>
                    <TableCell>{getRatingBadge(supplier.rating)}</TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleVisitWebsite(supplier.website)}
                          className='h-8 w-8'
                        >
                          <Globe className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleEditSupplier(supplier)}
                          className='h-8 w-8'
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => {
                            setSelectedSupplier(supplier)
                            setOpenDeleteDialog(true)
                          }}
                          className='h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash className='h-4 w-4' />
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

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this supplier? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedSupplier && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedSupplier.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteSupplier}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import { useState, useMemo, useEffect } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Truck,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Calendar,
  AlertCircle
} from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Dữ liệu mẫu ban đầu
const initialSuppliers = [
  {
    id: 1,
    name: 'Global Vaccine Distributors',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '123 Distribution Way, Chicago, IL 60601, USA',
    phone: '+1 312-555-7890',
    email: 'info@globalvaccinedist.com',
    website: 'https://www.globalvaccinedist.com',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'Tetanus Vaccine'],
    contactPerson: 'John Smith',
    established: '1995',
    leadTime: '3-5 days',
    rating: 4.8
  },
  {
    id: 2,
    name: 'MedSupply Solutions',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '45 Medical Park, London, EC1A 1BB, UK',
    phone: '+44 20 7123 4567',
    email: 'contact@medsupplysolutions.co.uk',
    website: 'https://www.medsupplysolutions.co.uk',
    status: 'Active',
    products: ['Pneumococcal Vaccine', 'Hepatitis B Vaccine', 'MMR Vaccine'],
    contactPerson: 'Emma Johnson',
    established: '2001',
    leadTime: '5-7 days',
    rating: 4.5
  },
  {
    id: 3,
    name: 'VacciCare Logistics',
    logo: '/placeholder.svg',
    country: 'Germany',
    address: '78 Pharma Strasse, Berlin, 10115, Germany',
    phone: '+49 30 987 6543',
    email: 'info@vaccicare.de',
    website: 'https://www.vaccicare.de',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Hans Mueller',
    established: '2005',
    leadTime: '4-6 days',
    rating: 4.7
  },
  {
    id: 4,
    name: 'HealthLink Distribution',
    logo: '/placeholder.svg',
    country: 'Canada',
    address: '567 Medical Drive, Toronto, ON M5V 2H1, Canada',
    phone: '+1 416-555-1234',
    email: 'contact@healthlinkdist.ca',
    website: 'https://www.healthlinkdist.ca',
    status: 'Active',
    products: ['Influenza Vaccine', 'HPV Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Sarah Williams',
    established: '1998',
    leadTime: '2-4 days',
    rating: 4.9
  },
  {
    id: 5,
    name: 'MediVax Supply Chain',
    logo: '/placeholder.svg',
    country: 'France',
    address: '23 Rue de Santé, Paris, 75001, France',
    phone: '+33 1 23 45 67 89',
    email: 'info@medivax.fr',
    website: 'https://www.medivax.fr',
    status: 'Inactive',
    products: ['Tetanus Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Pierre Dubois',
    established: '2003',
    leadTime: '6-8 days',
    rating: 3.9
  },
  {
    id: 6,
    name: 'VaccineWorld Distributors',
    logo: '/placeholder.svg',
    country: 'Australia',
    address: '89 Health Street, Sydney, NSW 2000, Australia',
    phone: '+61 2 9876 5432',
    email: 'info@vaccineworld.com.au',
    website: 'https://www.vaccineworld.com.au',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'MMR Vaccine'],
    contactPerson: 'Michael Brown',
    established: '2010',
    leadTime: '7-10 days',
    rating: 4.2
  },
  {
    id: 7,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 8,
    name: 'VacciTech Supply',
    logo: '/placeholder.svg',
    country: 'India',
    address: '456 Health Avenue, Mumbai, 400001, India',
    phone: '+91 22 2345 6789',
    email: 'info@vaccitech.in',
    website: 'https://www.vaccitech.in',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Tetanus Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Raj Patel',
    established: '2012',
    leadTime: '4-6 days',
    rating: 4.3
  },
  {
    id: 9,
    name: 'MedExpress Distributors',
    logo: '/placeholder.svg',
    country: 'Brazil',
    address: '789 Saúde Street, São Paulo, 01310-200, Brazil',
    phone: '+55 11 3456 7890',
    email: 'contact@medexpress.br',
    website: 'https://www.medexpress.br',
    status: 'Inactive',
    products: ['Influenza Vaccine', 'HPV Vaccine'],
    contactPerson: 'Carlos Silva',
    established: '2007',
    leadTime: '8-12 days',
    rating: 3.8
  },
  {
    id: 10,
    name: 'ColdChain Vaccine Logistics',
    logo: '/placeholder.svg',
    country: 'Netherlands',
    address: '34 Vaccine Lane, Amsterdam, 1012 AB, Netherlands',
    phone: '+31 20 123 4567',
    email: 'info@coldchain.nl',
    website: 'https://www.coldchain.nl',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'MMR Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Jan de Vries',
    established: '2015',
    leadTime: '3-5 days',
    rating: 4.7
  }
]

// Hằng số phân trang
const ROWS_PER_PAGE = 10
const MIN_YEAR = 1900
const MAX_YEAR = new Date().getFullYear()

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    status: { active: false, inactive: false },
    establishedFrom: '',
    establishedTo: ''
  })
  const [yearRangeError, setYearRangeError] = useState('')

  // Hàm kiểm tra năm hợp lệ
  const isValidYear = (year) => {
    if (!year) return true // Nếu không nhập, coi là hợp lệ (bỏ qua điều kiện)
    const num = parseInt(year)
    return !isNaN(num) && year.length === 4 && num >= MIN_YEAR && num <= MAX_YEAR
  }

  // Hàm lọc dữ liệu
  const filteredSuppliers = useMemo(() => {
    setYearRangeError('') // Đặt lại thông báo lỗi

    // Kiểm tra khoảng năm hợp lệ
    const fromYear = filters.establishedFrom ? parseInt(filters.establishedFrom) : null
    const toYear = filters.establishedTo ? parseInt(filters.establishedTo) : null

    if (fromYear && toYear && fromYear > toYear) {
      setYearRangeError("The 'From' year cannot be greater than the 'To' year.")
    }

    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        (!filters.status.active && !filters.status.inactive) ||
        (filters.status.active && supplier.status === 'Active') ||
        (filters.status.inactive && supplier.status === 'Inactive')

      const establishedYear = supplier.established ? parseInt(supplier.established) : null
      const matchesEstablished =
        (!fromYear || (establishedYear && establishedYear >= fromYear)) &&
        (!toYear || (establishedYear && establishedYear <= toYear))

      return matchesSearch && matchesStatus && matchesEstablished
    })
  }, [suppliers, searchTerm, filters])

  // Phân trang
  const totalPages = Math.ceil(filteredSuppliers.length / ROWS_PER_PAGE)
  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  // Đặt lại trang nếu vượt quá tổng số trang
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Hàm hiển thị badge trạng thái
  const getStatusBadge = (status) => {
    return status === 'Active' ? (
      <Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
    ) : (
      <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
        Inactive
      </Badge>
    )
  }

  // Hàm hiển thị badge đánh giá
  const getRatingBadge = (rating) => {
    if (rating >= 4.5) return <Badge className='bg-green-500'>{rating.toFixed(1)}</Badge>
    if (rating >= 4.0) return <Badge className='bg-blue-500'>{rating.toFixed(1)}</Badge>
    if (rating >= 3.5)
      return (
        <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
          {rating.toFixed(1)}
        </Badge>
      )
    return <Badge variant='destructive'>{rating.toFixed(1)}</Badge>
  }

  // Xuất dữ liệu ra Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuppliers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'suppliers.xlsx')
  }

  // Xử lý thêm/sửa nhà cung cấp
  const handleSaveSupplier = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const established = formData.get('established')?.toString() || ''

    // Kiểm tra năm hợp lệ
    if (established && !isValidYear(established)) {
      alert(`Please enter a valid year (between ${MIN_YEAR} and ${MAX_YEAR}).`)
      return
    }

    const newSupplier = {
      id: isEditMode ? selectedSupplier.id : suppliers.length + 1,
      name: formData.get('name')?.toString() || '',
      country: formData.get('country')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      website: formData.get('website')?.toString() || '',
      established,
      contactPerson: formData.get('contact-person')?.toString() || '',
      status: formData.get('status')?.toString() || 'Active',
      leadTime: formData.get('lead-time')?.toString() || '',
      rating: parseFloat(formData.get('rating')?.toString() || '0') || 0,
      products:
        formData
          .get('products')
          ?.toString()
          .split(',')
          .map((p) => p.trim()) || [],
      logo: '/placeholder.svg'
    }

    if (isEditMode) {
      setSuppliers(suppliers.map((s) => (s.id === newSupplier.id ? newSupplier : s)))
    } else {
      setSuppliers([...suppliers, newSupplier])
    }
    setOpenAddDialog(false)
    setIsEditMode(false)
    setSelectedSupplier(null)
  }

  // Xử lý xóa nhà cung cấp
  const handleDeleteSupplier = () => {
    setSuppliers(suppliers.filter((s) => s.id !== selectedSupplier?.id))
    setOpenDeleteDialog(false)
    setSelectedSupplier(null)
  }

  // Xử lý chỉnh sửa nhà cung cấp
  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier)
    setIsEditMode(true)
    setOpenAddDialog(true)
  }

  // Xử lý mở website
  const handleVisitWebsite = (website) => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer')
    }
  }

  // Xử lý làm mới dữ liệu với hiệu ứng loading
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setSuppliers([...initialSuppliers])
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

  // Xử lý xóa bộ lọc
  const handleClearFilters = () => {
    setFilters({
      status: { active: false, inactive: false },
      establishedFrom: '',
      establishedTo: ''
    })
    setCurrentPage(1)
  }

  // Xử lý thay đổi năm trong bộ lọc
  const handleYearChange = (key, value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 4)
    setFilters((prev) => ({ ...prev, [key]: sanitizedValue }))
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Tiêu đề và nút hành động */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Suppliers
        </h1>
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
              <Button size='sm' className='h-9 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'>
                <Plus className='mr-2 h-4 w-4' />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Edit the supplier details below.' : 'Enter the details of the new supplier.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveSupplier}>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='name'>Supplier Name</Label>
                      <Input id='name' name='name' defaultValue={isEditMode ? selectedSupplier?.name : ''} required />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='country'>Country</Label>
                      <Input
                        id='country'
                        name='country'
                        defaultValue={isEditMode ? selectedSupplier?.country : ''}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='address'>Address</Label>
                    <Textarea
                      id='address'
                      name='address'
                      defaultValue={isEditMode ? selectedSupplier?.address : ''}
                      required
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input
                        id='phone'
                        name='phone'
                        defaultValue={isEditMode ? selectedSupplier?.phone : ''}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        defaultValue={isEditMode ? selectedSupplier?.email : ''}
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='website'>Website</Label>
                      <Input id='website' name='website' defaultValue={isEditMode ? selectedSupplier?.website : ''} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='established'>Established Year</Label>
                      <Input
                        id='established'
                        name='established'
                        defaultValue={isEditMode ? selectedSupplier?.established : ''}
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
                      <Input
                        id='contact-person'
                        name='contact-person'
                        defaultValue={isEditMode ? selectedSupplier?.contactPerson : ''}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='status'>Status</Label>
                      <Select name='status' defaultValue={isEditMode ? selectedSupplier?.status : 'Active'}>
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
                      <Input
                        id='lead-time'
                        name='lead-time'
                        defaultValue={isEditMode ? selectedSupplier?.leadTime : ''}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='rating'>Rating</Label>
                      <Select name='rating' defaultValue={isEditMode ? selectedSupplier?.rating.toString() : '4.5'}>
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
                    <Label htmlFor='products'>Products (comma separated)</Label>
                    <Input
                      id='products'
                      name='products'
                      defaultValue={isEditMode ? selectedSupplier?.products.join(', ') : ''}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white' type='submit'>{isEditMode ? 'Update Supplier' : 'Save Supplier'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tìm kiếm và bộ lọc */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Input
            placeholder='Search by name or phone...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className='w-full max-w-sm'
            type='search'
          />
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

                {/* Bộ lọc trạng thái */}
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

                {/* Bộ lọc theo khoảng năm thành lập */}
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

                {/* Thông báo lỗi khoảng năm */}
                {yearRangeError && (
                  <Alert variant='destructive' className='mb-4'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>{yearRangeError}</AlertDescription>
                  </Alert>
                )}

                {/* Nút xóa bộ lọc */}
                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bảng dữ liệu */}
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
                    <TableHead className='w-[80px]'></TableHead>
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
                          {supplier.products.map((product, idx) => (
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleVisitWebsite(supplier.website)}>
                              <Globe className='mr-2 h-4 w-4' />
                              Visit Website
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                              <Edit className='mr-2 h-4 w-4' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className='text-red-600'
                              onClick={() => {
                                setSelectedSupplier(supplier)
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
            )}
          </CardContent>
        </Card>

        {/* Phân trang cố định */}
        {paginatedSuppliers.length > 0 && (
          <div className='fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>

      {/* Dialog xóa */}
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

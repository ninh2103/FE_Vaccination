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
  Factory,
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
const initialManufacturers = [
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
  },
  {
    id: 2,
    name: 'Pfizer',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '235 E 42nd St, New York, NY 10017, USA',
    phone: '+1 212-733-2323',
    email: 'info@pfizer.com',
    website: 'https://www.pfizer.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Dr. Albert Bourla',
    established: '1849',
    leadTime: '3-5 days',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Moderna',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '200 Technology Square, Cambridge, MA 02139, USA',
    phone: '+1 617-714-6500',
    email: 'info@modernatx.com',
    website: 'https://www.modernatx.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Stéphane Bancel',
    established: '2010',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 4,
    name: 'AstraZeneca',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '1 Francis Crick Avenue, Cambridge Biomedical Campus, Cambridge, UK',
    phone: '+44 20 3749 5000',
    email: 'info@astrazeneca.com',
    website: 'https://www.astrazeneca.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Pascal Soriot',
    established: '1999',
    leadTime: '4-6 days',
    rating: 4.5
  },
  {
    id: 5,
    name: 'Johnson & Johnson',
    logo: '/placeholder.svg',
    country: 'United States',
    address: 'One Johnson & Johnson Plaza, New Brunswick, NJ 08933, USA',
    phone: '+1 732-524-0400',
    email: 'info@jnj.com',
    website: 'https://www.jnj.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Alex Gorsky',
    established: '1886',
    leadTime: '3-5 days',
    rating: 4.9
  },
  {
    id: 6,
    name: 'Sanofi Pasteur',
    logo: '/placeholder.svg',
    country: 'France',
    address: '14 Espace Henry Vallée, 69007 Lyon, France',
    phone: '+33 4 37 37 01 00',
    email: 'info@sanofipasteur.com',
    website: 'https://www.sanofipasteur.com',
    status: 'Active',
    vaccines: ['Influenza Vaccine', 'Polio Vaccine'],
    contactPerson: 'Thomas Triomphe',
    established: '1974',
    leadTime: '5-7 days',
    rating: 4.4
  },
  {
    id: 7,
    name: 'GlaxoSmithKline',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '980 Great West Road, Brentford, Middlesex, TW8 9GS, UK',
    phone: '+44 20 8047 5000',
    email: 'info@gsk.com',
    website: 'https://www.gsk.com',
    status: 'Active',
    vaccines: ['Tetanus Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Emma Walmsley',
    established: '2000',
    leadTime: '4-6 days',
    rating: 4.3
  },
  {
    id: 8,
    name: 'Merck',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '2000 Galloping Hill Road, Kenilworth, NJ 07033, USA',
    phone: '+1 908-740-4000',
    email: 'info@merck.com',
    website: 'https://www.merck.com',
    status: 'Active',
    vaccines: ['MMR Vaccine', 'HPV Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Robert M. Davis',
    established: '1891',
    leadTime: '3-5 days',
    rating: 4.7
  },
  {
    id: 9,
    name: 'Sinovac Biotech',
    logo: '/placeholder.svg',
    country: 'China',
    address: 'No. 39 Shangdi Xi Road, Haidian District, Beijing, China',
    phone: '+86 10 8289 0088',
    email: 'info@sinovac.com',
    website: 'http://www.sinovac.com',
    status: 'Inactive',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Yin Weidong',
    established: '1999',
    leadTime: '7-10 days',
    rating: 3.8
  },
  {
    id: 10,
    name: 'Bharat Biotech',
    logo: '/placeholder.svg',
    country: 'India',
    address: 'Genome Valley, Hyderabad, Telangana, India',
    phone: '+91 40 2348 0567',
    email: 'info@bharatbiotech.com',
    website: 'https://www.bharatbiotech.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Dr. Krishna Ella',
    established: '1996',
    leadTime: '6-8 days',
    rating: 4.2
  }
]

// Hằng số phân trang
const ROWS_PER_PAGE = 10
const MIN_YEAR = 1800
const MAX_YEAR = new Date().getFullYear()

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState(initialManufacturers)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState(null)
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
    const num = Number.parseInt(year)
    return !isNaN(num) && year.length === 4 && num >= MIN_YEAR && num <= MAX_YEAR
  }

  // Hàm lọc dữ liệu
  const filteredManufacturers = useMemo(() => {
    setYearRangeError('') // Đặt lại thông báo lỗi

    // Kiểm tra khoảng năm hợp lệ
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

  // Phân trang
  const totalPages = Math.ceil(filteredManufacturers.length / ROWS_PER_PAGE)
  const paginatedManufacturers = filteredManufacturers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

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
    const worksheet = XLSX.utils.json_to_sheet(filteredManufacturers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Manufacturers')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'manufacturers.xlsx')
  }

  // Xử lý thêm/sửa nhà sản xuất
  const handleSaveManufacturer = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const established = formData.get('established')?.toString() || ''

    // Kiểm tra năm hợp lệ
    if (established && !isValidYear(established)) {
      alert(`Please enter a valid year (between ${MIN_YEAR} and ${MAX_YEAR}).`)
      return
    }

    const newManufacturer = {
      id: isEditMode ? selectedManufacturer.id : manufacturers.length + 1,
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
      rating: Number.parseFloat(formData.get('rating')?.toString() || '0') || 0,
      vaccines:
        formData
          .get('vaccines')
          ?.toString()
          .split(',')
          .map((p) => p.trim()) || [],
      logo: '/placeholder.svg'
    }

    if (isEditMode) {
      setManufacturers(manufacturers.map((s) => (s.id === newManufacturer.id ? newManufacturer : s)))
    } else {
      setManufacturers([...manufacturers, newManufacturer])
    }
    setOpenAddDialog(false)
    setIsEditMode(false)
    setSelectedManufacturer(null)
  }

  // Xử lý xóa nhà sản xuất
  const handleDeleteManufacturer = () => {
    setManufacturers(manufacturers.filter((s) => s.id !== selectedManufacturer?.id))
    setOpenDeleteDialog(false)
    setSelectedManufacturer(null)
  }

  // Xử lý chỉnh sửa nhà sản xuất
  const handleEditManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer)
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
          Manufacturers
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
              <Button size='sm' className='h-9 '>
                <Plus className='mr-2 h-4 w-4' />
                Add Manufacturer
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Manufacturer' : 'Add New Manufacturer'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Edit the manufacturer details below.' : 'Enter the details of the new manufacturer.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveManufacturer}>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='name'>Manufacturer Name</Label>
                      <Input
                        id='name'
                        name='name'
                        defaultValue={isEditMode ? selectedManufacturer?.name : ''}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='country'>Country</Label>
                      <Input
                        id='country'
                        name='country'
                        defaultValue={isEditMode ? selectedManufacturer?.country : ''}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='address'>Address</Label>
                    <Textarea
                      id='address'
                      name='address'
                      defaultValue={isEditMode ? selectedManufacturer?.address : ''}
                      required
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input
                        id='phone'
                        name='phone'
                        defaultValue={isEditMode ? selectedManufacturer?.phone : ''}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        defaultValue={isEditMode ? selectedManufacturer?.email : ''}
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='website'>Website</Label>
                      <Input
                        id='website'
                        name='website'
                        defaultValue={isEditMode ? selectedManufacturer?.website : ''}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='established'>Established Year</Label>
                      <Input
                        id='established'
                        name='established'
                        defaultValue={isEditMode ? selectedManufacturer?.established : ''}
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
                        defaultValue={isEditMode ? selectedManufacturer?.contactPerson : ''}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='status'>Status</Label>
                      <Select name='status' defaultValue={isEditMode ? selectedManufacturer?.status : 'Active'}>
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
                        defaultValue={isEditMode ? selectedManufacturer?.leadTime : ''}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='rating'>Rating</Label>
                      <Select name='rating' defaultValue={isEditMode ? selectedManufacturer?.rating.toString() : '4.5'}>
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
                    <Input
                      id='vaccines'
                      name='vaccines'
                      defaultValue={isEditMode ? selectedManufacturer?.vaccines.join(', ') : ''}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type='submit'>{isEditMode ? 'Update Manufacturer' : 'Save Manufacturer'}</Button>
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
                  Filter manufacturers by status and established year range.
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
            {paginatedManufacturers.length === 0 ? (
              <div className='p-4 text-center text-muted-foreground'>
                No manufacturers found matching the current filters.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Vaccines</TableHead>
                    <TableHead>Established Year</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='w-[80px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedManufacturers.map((manufacturer, index) => (
                    <TableRow key={manufacturer.id} className='cursor-pointer hover:bg-muted/50'>
                      <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                            <Factory className='h-5 w-5 text-muted-foreground' />
                          </div>
                          <div>
                            <div className='font-medium'>{manufacturer.name}</div>
                            <div className='text-sm text-muted-foreground'>{manufacturer.contactPerson}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{manufacturer.country}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <div className='flex items-center gap-1 text-sm'>
                            <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                            <span>{manufacturer.phone}</span>
                          </div>
                          <div className='flex items-center gap-1 text-sm'>
                            <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                            <span>{manufacturer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1'>
                          {manufacturer.vaccines.map((vaccine, idx) => (
                            <Badge key={idx} variant='outline' className='bg-primary/10 text-primary'>
                              {vaccine}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{manufacturer.established || 'N/A'}</TableCell>
                      <TableCell>{manufacturer.leadTime}</TableCell>
                      <TableCell>{getRatingBadge(manufacturer.rating)}</TableCell>
                      <TableCell>{getStatusBadge(manufacturer.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleVisitWebsite(manufacturer.website)}>
                              <Globe className='mr-2 h-4 w-4' />
                              Visit Website
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditManufacturer(manufacturer)}>
                              <Edit className='mr-2 h-4 w-4' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className='text-red-600'
                              onClick={() => {
                                setSelectedManufacturer(manufacturer)
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
        {paginatedManufacturers.length > 0 && (
          <div className='mb-[2rem] fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md'>
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

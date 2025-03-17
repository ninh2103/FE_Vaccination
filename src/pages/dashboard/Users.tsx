'use client'

import type React from 'react'
import { useState, useCallback, useMemo } from 'react'
import {
  Plus,
  Edit,
  Trash,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  ShieldCheck,
  FilterIcon,
  X,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
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
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/use-toast'
import { FileUploader } from '@/components/ui/file-uploader'
import * as XLSX from 'xlsx'

const initialUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@example.com',
    phone: '+84 912 345 678',
    avatar: '/placeholder.svg',
    initials: 'NA',
    role: 'Patient',
    status: 'Active',
    registeredDate: '2023-01-15',
    lastLogin: '2025-03-10',
    vaccinations: 3
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    email: 'binh.tran@example.com',
    phone: '+84 913 456 789',
    avatar: '/placeholder.svg',
    initials: 'TB',
    role: 'Doctor',
    status: 'Active',
    registeredDate: '2023-02-05',
    lastLogin: '2025-03-12',
    vaccinations: 2
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    email: 'cuong.le@example.com',
    phone: '+84 914 567 890',
    avatar: '/placeholder.svg',
    initials: 'LC',
    role: 'Patient',
    status: 'Inactive',
    registeredDate: '2022-11-20',
    lastLogin: '2025-01-05',
    vaccinations: 1
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    email: 'dung.pham@example.com',
    phone: '+84 915 678 901',
    avatar: '/placeholder.svg',
    initials: 'PD',
    role: 'Nurse',
    status: 'Active',
    registeredDate: '2023-03-01',
    lastLogin: '2025-03-11',
    vaccinations: 0
  },
  {
    id: 5,
    name: 'Hoàng Văn Đức',
    email: 'duc.hoang@example.com',
    phone: '+84 916 789 012',
    avatar: '/placeholder.svg',
    initials: 'HĐ',
    role: 'Patient',
    status: 'Active',
    registeredDate: '2022-12-10',
    lastLogin: '2025-03-09',
    vaccinations: 4
  },
  {
    id: 6,
    name: 'Vũ Thị Giang',
    email: 'giang.vu@example.com',
    phone: '+84 917 890 123',
    avatar: '/placeholder.svg',
    initials: 'VG',
    role: 'Nurse',
    status: 'Active',
    registeredDate: '2023-01-25',
    lastLogin: '2025-03-08',
    vaccinations: 2
  },
  {
    id: 7,
    name: 'Đặng Văn Hải',
    email: 'hai.dang@example.com',
    phone: '+84 918 901 234',
    avatar: '/placeholder.svg',
    initials: 'ĐH',
    role: 'Patient',
    status: 'Inactive',
    registeredDate: '2022-10-15',
    lastLogin: '2024-12-20',
    vaccinations: 1
  },
  {
    id: 8,
    name: 'Bùi Thị Hương',
    email: 'huong.bui@example.com',
    phone: '+84 919 012 345',
    avatar: '/placeholder.svg',
    initials: 'BH',
    role: 'Patient',
    status: 'Active',
    registeredDate: '2023-02-18',
    lastLogin: '2025-03-07',
    vaccinations: 3
  },
  {
    id: 9,
    name: 'Phan Văn Khánh',
    email: 'khanh.phan@example.com',
    phone: '+84 920 123 456',
    avatar: '/placeholder.svg',
    initials: 'PK',
    role: 'Doctor',
    status: 'Active',
    registeredDate: '2022-11-05',
    lastLogin: '2025-03-05',
    vaccinations: 2
  },
  {
    id: 10,
    name: 'Ngô Thị Lan',
    email: 'lan.ngo@example.com',
    phone: '+84 921 234 567',
    avatar: '/placeholder.svg',
    initials: 'NL',
    role: 'Patient',
    status: 'Active',
    registeredDate: '2023-01-10',
    lastLogin: '2025-03-10',
    vaccinations: 1
  },
  {
    id: 11,
    name: 'Bác sĩ Trương Minh',
    email: 'minh.truong@example.com',
    phone: '+84 922 345 678',
    avatar: '/placeholder.svg',
    initials: 'TM',
    role: 'Doctor',
    status: 'Active',
    registeredDate: '2022-09-15',
    lastLogin: '2025-03-12',
    vaccinations: 0
  },
  {
    id: 12,
    name: 'Y tá Lý Ngọc',
    email: 'ngoc.ly@example.com',
    phone: '+84 923 456 789',
    avatar: '/placeholder.svg',
    initials: 'LN',
    role: 'Nurse',
    status: 'Active',
    registeredDate: '2022-10-01',
    lastLogin: '2025-03-11',
    vaccinations: 0
  },
  {
    id: 13,
    name: 'Quản trị Đinh Quang',
    email: 'quang.dinh@example.com',
    phone: '+84 924 567 890',
    avatar: '/placeholder.svg',
    initials: 'ĐQ',
    role: 'Admin',
    status: 'Active',
    registeredDate: '2022-01-01',
    lastLogin: '2025-03-12',
    vaccinations: 0
  },
  {
    id: 14,
    name: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@example.com',
    phone: '+84 925 678 901',
    avatar: '/placeholder.svg',
    initials: 'NM',
    role: 'Patient',
    status: 'Active',
    registeredDate: '2023-04-15',
    lastLogin: '2025-03-13',
    vaccinations: 2
  },
  
]

type User = (typeof initialUsers)[0]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Patient',
    status: 'Active',
    password: '',
    confirmPassword: '',
  })
  const [filters, setFilters] = useState({
    role: [] as string[],
    status: [] as string[],
    registeredDate: '' as string,
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const ITEMS_PER_PAGE = 10

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const resetAvatarState = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Patient',
      status: 'Active',
      password: '',
      confirmPassword: '',
    })
    resetAvatarState()
  }

  const handleFileUpload = useCallback((file: File) => {
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setAvatarPreview(reader.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleAddUser = () => {
    setIsLoading(true)
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' })
      setIsLoading(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' })
      setIsLoading(false)
      return
    }
    setTimeout(() => {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: avatarPreview || '/placeholder.svg',
        initials: formData.name
          .split(' ')
          .map((n) => n[0])
          .join(''),
        role: formData.role,
        status: formData.status,
        registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: '-',
        vaccinations: 0,
      }
      setUsers([...users, newUser])
      setOpenAddDialog(false)
      resetForm()
      setIsLoading(false)
      toast({ title: 'Success', description: 'User has been added successfully.' })
    }, 1000)
  }

  const handleEditUser = () => {
    if (!selectedUser) return
    setIsLoading(true)
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' })
      setIsLoading(false)
      return
    }
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
              status: formData.status,
              avatar: avatarPreview || user.avatar,
              initials: formData.name
                .split(' ')
                .map((n) => n[0])
                .join(''),
            }
          : user
      )
      setUsers(updatedUsers)
      setOpenEditDialog(false)
      setSelectedUser(null)
      resetForm()
      setIsLoading(false)
      toast({ title: 'Success', description: 'User has been updated successfully.' })
    }, 1000)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setIsLoading(true)
    setTimeout(() => {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setOpenDeleteDialog(false)
      setSelectedUser(null)
      setIsLoading(false)
      toast({ title: 'Success', description: 'User has been deleted successfully.' })
    }, 1000)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setUsers(initialUsers)
      setSearchTerm('')
      setFilters({ role: [], status: [], registeredDate: '' })
      setCurrentPage(1)
      setIsLoading(false)
      toast({ title: 'Success', description: 'Data has been refreshed.' })
    }, 1000)
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const data = filteredUsers.map((user) => ({
        STT: filteredUsers.indexOf(user) + 1,
        ID: user.id,
        Name: user.name,
        Email: user.email,
        Phone: user.phone,
        Role: user.role,
        Status: user.status,
        'Registered Date': user.registeredDate,
        'Last Login': user.lastLogin,
        Vaccinations: user.vaccinations,
      }))
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
      XLSX.writeFile(workbook, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`)
      setIsExporting(false)
      toast({ title: 'Export Complete', description: 'Users data has been exported to Excel successfully.' })
    }, 1500)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setFormData({ ...user, password: '', confirmPassword: '' })
    setAvatarPreview(user.avatar === '/placeholder.svg' ? null : user.avatar)
    setOpenEditDialog(true)
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setOpenDeleteDialog(true)
  }

  const toggleRoleFilter = (role: string) => {
    setFilters((prev) => ({
      ...prev,
      role: prev.role.includes(role) ? prev.role.filter((r) => r !== role) : [...prev.role, role],
    }))
  }

  const toggleStatusFilter = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status) ? prev.status.filter((s) => s !== status) : [...prev.status, status],
    }))
  }

  const clearFilters = () => {
    setFilters({ role: [], status: [], registeredDate: '' })
    setCurrentPage(1)
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRoleFilter = filters.role.length === 0 || filters.role.includes(user.role)
      const matchesStatusFilter = filters.status.length === 0 || filters.status.includes(user.status)
      const matchesDateFilter = !filters.registeredDate || user.registeredDate >= filters.registeredDate
      return matchesSearch && matchesRoleFilter && matchesStatusFilter && matchesDateFilter
    })
  }, [users, searchTerm, filters])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
      case 'Inactive':
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            Inactive
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return (
          <div className='flex items-center gap-1'>
            <ShieldAlert className='h-3.5 w-3.5 text-primary' />
            Admin
          </div>
        )
      case 'Doctor':
        return (
          <div className='flex items-center gap-1'>
            <ShieldCheck className='h-3.5 w-3.5 text-blue-500' />
            Doctor
          </div>
        )
      case 'Nurse':
        return (
          <div className='flex items-center gap-1'>
            <Shield className='h-3.5 w-3.5 text-green-500' />
            Nurse
          </div>
        )
      default:
        return <span>{role}</span>
    }
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Users
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <LoadingSpinner className='mr-2 h-4 w-4' />
            ) : (
              <Download className='mr-2 h-4 w-4' />
            )}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner className='mr-2 h-4 w-4' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            Refresh
          </Button>
          <Button
            size='sm'
            // className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'
            onClick={() => {
              resetForm()
              setOpenAddDialog(true)
            }}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add User
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search users by name, email, phone...'
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
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-9'>
                <FilterIcon className='mr-2 h-4 w-4' />
                Filter
                {(filters.role.length > 0 || filters.status.length > 0 || filters.registeredDate) && (
                  <Badge className='ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center'>
                    {filters.role.length + filters.status.length + (filters.registeredDate ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium leading-none'>Filters</h4>
                  <p className='text-sm text-muted-foreground'>
                    Filter users by role, status, and registration date.
                  </p>
                </div>
                <div className='grid gap-2'>
                  <div className='grid gap-1'>
                    <Label htmlFor='role'>Role</Label>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='role-patient'
                          checked={filters.role.includes('Patient')}
                          onCheckedChange={() => toggleRoleFilter('Patient')}
                        />
                        <label htmlFor='role-patient' className='text-sm font-medium leading-none'>
                          Patient
                        </label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='role-doctor'
                          checked={filters.role.includes('Doctor')}
                          onCheckedChange={() => toggleRoleFilter('Doctor')}
                        />
                        <label htmlFor='role-doctor' className='text-sm font-medium leading-none'>
                          Doctor
                        </label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='role-nurse'
                          checked={filters.role.includes('Nurse')}
                          onCheckedChange={() => toggleRoleFilter('Nurse')}
                        />
                        <label htmlFor='role-nurse' className='text-sm font-medium leading-none'>
                          Nurse
                        </label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='role-admin'
                          checked={filters.role.includes('Admin')}
                          onCheckedChange={() => toggleRoleFilter('Admin')}
                        />
                        <label htmlFor='role-admin' className='text-sm font-medium leading-none'>
                          Admin
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-1'>
                    <Label htmlFor='status'>Status</Label>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='status-active'
                          checked={filters.status.includes('Active')}
                          onCheckedChange={() => toggleStatusFilter('Active')}
                        />
                        <label htmlFor='status-active' className='text-sm font-medium leading-none'>
                          Active
                        </label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='status-inactive'
                          checked={filters.status.includes('Inactive')}
                          onCheckedChange={() => toggleStatusFilter('Inactive')}
                        />
                        <label htmlFor='status-inactive' className='text-sm font-medium leading-none'>
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-1'>
                    <Label htmlFor='registered-after'>Registered After</Label>
                    <Input
                      id='registered-after'
                      type='date'
                      value={filters.registeredDate}
                      onChange={(e) => setFilters({ ...filters, registeredDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className='flex justify-between'>
                  <Button variant='outline' size='sm' onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  {/* <Button size='sm' onClick={() => setFilterOpen(false)}>
                    Apply Filters
                  </Button> */}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Tabs and table */}
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>All Users</TabsTrigger>
            <TabsTrigger value='patients'>Patients</TabsTrigger>
            <TabsTrigger value='staff'>Staff</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedUsers.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>No users found.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Vaccinations</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user, index) => (
                        <TableRow
                          key={user.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => handleEditClick(user)}
                        >
                          <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
                              </Avatar>
                              <div className='font-medium'>{user.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col'>
                              <div className='flex items-center gap-1 text-sm'>
                                <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                                {user.email}
                              </div>
                              <div className='flex items-center gap-1 text-sm'>
                                <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                                {user.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.registeredDate}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>{user.vaccinations}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditClick(user)
                                }}
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteClick(user)
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
          </TabsContent>
          <TabsContent value='patients' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedUsers.filter((u) => u.role === 'Patient').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>No patients found.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Vaccinations</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers
                        .filter((user) => user.role === 'Patient')
                        .map((user, index) => (
                          <TableRow
                            key={user.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => handleEditClick(user)}
                          >
                            <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.initials}</AvatarFallback>
                                </Avatar>
                                <div className='font-medium'>{user.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex flex-col'>
                                <div className='flex items-center gap-1 text-sm'>
                                  <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                                  {user.email}
                                </div>
                                <div className='flex items-center gap-1 text-sm'>
                                  <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                                  {user.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{user.registeredDate}</TableCell>
                            <TableCell>{user.vaccinations}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(user)
                                  }}
                                >
                                  <Edit className='h-4 w-4' />
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteClick(user)
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
          </TabsContent>
          <TabsContent value='staff' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {paginatedUsers.filter((u) => ['Doctor', 'Nurse', 'Admin'].includes(u.role)).length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>No staff members found.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[60px]'>No.</TableHead>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className='w-[80px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers
                        .filter((user) => ['Doctor', 'Nurse', 'Admin'].includes(user.role))
                        .map((user, index) => (
                          <TableRow
                            key={user.id}
                            className='cursor-pointer hover:bg-muted/50'
                            onClick={() => handleEditClick(user)}
                          >
                            <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.initials}</AvatarFallback>
                                </Avatar>
                                <div className='font-medium'>{user.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex flex-col'>
                                <div className='flex items-center gap-1 text-sm'>
                                  <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                                  {user.email}
                                </div>
                                <div className='flex items-center gap-1 text-sm'>
                                  <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                                  {user.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{user.registeredDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(user)
                                  }}
                                >
                                  <Edit className='h-4 w-4' />
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteClick(user)
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
          </TabsContent>
        </Tabs>
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

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter the details of the new user to add to the system.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label>Profile Image</Label>
              <FileUploader onFileUpload={handleFileUpload} currentImage={avatarPreview} accept='image/*' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='Enter full name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter email address'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  name='phone'
                  placeholder='Enter phone number'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='role'>Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Patient'>Patient</SelectItem>
                    <SelectItem value='Doctor'>Doctor</SelectItem>
                    <SelectItem value='Nurse'>Nurse</SelectItem>
                    <SelectItem value='Admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='confirm-password'>Confirm Password</Label>
                <Input
                  id='confirm-password'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='status'>Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
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
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenAddDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              // className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'
              onClick={handleAddUser}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Saving...' : 'Save User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label>Profile Image</Label>
              <FileUploader onFileUpload={handleFileUpload} currentImage={avatarPreview} accept='image/*' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-name'>Full Name</Label>
                <Input
                  id='edit-name'
                  name='name'
                  placeholder='Enter full name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-email'>Email</Label>
                <Input
                  id='edit-email'
                  name='email'
                  type='email'
                  placeholder='Enter email address'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-phone'>Phone Number</Label>
                <Input
                  id='edit-phone'
                  name='phone'
                  placeholder='Enter phone number'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='edit-role'>Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Patient'>Patient</SelectItem>
                    <SelectItem value='Doctor'>Doctor</SelectItem>
                    <SelectItem value='Nurse'>Nurse</SelectItem>
                    <SelectItem value='Admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='edit-status'>Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
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
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenEditDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              // className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-600 hover:to-green-600 font-semibold text-white'
              onClick={handleEditUser}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedUser && (
              <div className='flex items-center gap-4'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{selectedUser.name}</p>
                  <p className='text-sm text-muted-foreground'>{selectedUser.email}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteUser} disabled={isLoading}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
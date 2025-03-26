'use client'

import { useState } from 'react'
import { Plus, Download, RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { toast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as XLSX from 'xlsx'
import { UserTable, type User } from './UserTable'
import { AddUserDialog } from './AddUser'
import { UpdateUserDialog } from './UpdateUser'

const initialUsers: User[] = [
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
  }
]

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

  const [filters, setFilters] = useState({
    role: [] as string[],
    status: [] as string[],
    registeredDate: '' as string
  })

  const handleAddUser = (userData: Omit<User, 'id' | 'registeredDate' | 'lastLogin' | 'vaccinations'>) => {
    setIsLoading(true)
    setTimeout(() => {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...userData,
        registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: '-',
        vaccinations: 0
      }
      setUsers((prev) => [...prev, newUser])
      setOpenAddDialog(false)
      setIsLoading(false)
      toast({ title: 'Success', description: 'User has been added successfully.' })
    }, 1000)
  }

  const handleUpdateUser = (userData: Omit<User, 'id' | 'registeredDate' | 'lastLogin' | 'vaccinations'>) => {
    if (!selectedUser) return
    setIsLoading(true)
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              ...userData
            }
          : user
      )
      setUsers(updatedUsers)
      setOpenEditDialog(false)
      setSelectedUser(null)
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
        Vaccinations: user.vaccinations
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
    setOpenEditDialog(true)
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setOpenDeleteDialog(true)
  }

  const filteredUsers = users.filter((user) => {
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

  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* Header Section */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Users</h1>
          <p className='text-muted-foreground'>Manage and monitor user accounts in your system.</p>
        </div>
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
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input
            placeholder='Search users by name...'
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
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Add User Dialog */}
      <AddUserDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onAddUser={handleAddUser}
        isLoading={isLoading}
      />

      {/* Edit User Dialog */}
      <UpdateUserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        selectedUser={selectedUser}
      />

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

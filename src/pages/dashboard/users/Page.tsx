import { useState, useEffect } from 'react'
import { Plus, Download, RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
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
import { useDeleteUserQuery, useListUserQuery } from '@/queries/useUser'
import { toast } from 'sonner'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)

  const { data: usersData, isLoading: isLoadingUsers } = useListUserQuery()
  const { mutate: deleteUser } = useDeleteUserQuery()

  useEffect(() => {
    if (usersData?.data) {
      const transformedUsers = usersData.data.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar || '/placeholder.svg',
        initials: user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
        role: user.role.name,
        status: user.isVerified ? 'Active' : 'Inactive',
        registeredDate: new Date(user.createAt).toISOString().split('T')[0],
        lastLogin: new Date(user.updateAt).toISOString().split('T')[0]
      }))
      setUsers(transformedUsers)
    }
  }, [usersData])

  const [filters, setFilters] = useState({
    role: [] as string[],
    status: [] as string[],
    registeredDate: '' as string
  })

  const handleDeleteUser = () => {
    if (!selectedUser) return
    deleteUser(selectedUser.id, {
      onSuccess: () => {
        setUsers(users.filter((user) => user.id !== selectedUser.id))
        setOpenDeleteDialog(false)
        setSelectedUser(null)
        toast.success('User has been deleted successfully.')
      }
    })
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilters({ role: [], status: [], registeredDate: '' })
    setCurrentPage(1)
    toast.success('Data has been refreshed.')
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
        'Last Login': user.lastLogin
      }))
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
      XLSX.writeFile(workbook, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`)
      setIsExporting(false)
      toast.success('Users data has been exported to Excel successfully.')
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
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoadingUsers}>
            {isLoadingUsers ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
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
        isLoading={isLoadingUsers}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Add User Dialog */}
      <AddUserDialog open={openAddDialog} onOpenChange={setOpenAddDialog} isLoading={isLoadingUsers} />

      {/* Edit User Dialog */}
      <UpdateUserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        isLoading={isLoadingUsers}
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
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isLoadingUsers}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteUser} disabled={isLoadingUsers}>
              {isLoadingUsers ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoadingUsers ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { useMemo } from 'react'
import { Edit, Trash, Mail, Phone, Shield, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { numberConstants } from '@/configs/consts'
import { convertDateFormat } from '@/core/lib/utils'
export type User = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  initials: string
  role: string
  status: string
  registeredDate: string
  lastLogin: string
}

interface UserTableProps {
  users: User[]
  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  isLoading: boolean
  onEditClick: (user: User) => void
  onDeleteClick: (user: User) => void
  totalItems?: number
}

const ITEMS_PER_PAGE = numberConstants.TEN

export function UserTable({
  users,
  currentPage,
  setCurrentPage,
  isLoading,
  onEditClick,
  onDeleteClick,
  totalItems = 0
}: UserTableProps) {
  const filteredUsers = useMemo(() => {
    return users
  }, [users])

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant='default'>Active</Badge>
      case 'Inactive':
        return <Badge variant='secondary'>Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <ShieldAlert className='h-3.5 w-3.5' />
            Admin
          </Badge>
        )
      case 'DOCTOR':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <ShieldCheck className='h-3.5 w-3.5' />
            Doctor
          </Badge>
        )
      case 'EMPLOYEE':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <Shield className='h-3.5 w-3.5' />
            Employee
          </Badge>
        )
      default:
        return <Badge variant='outline'>{role}</Badge>
    }
  }

  const getFilteredUsers = (tab: string) => {
    switch (tab) {
      case 'patients':
        return filteredUsers.filter((user) => user.role === 'USER')
      case 'staff':
        return filteredUsers.filter((user) => ['ADMIN', 'DOCTOR', 'EMPLOYEE'].includes(user.role))
      default:
        return filteredUsers
    }
  }

  const renderLoadingState = () => (
    <div className='flex items-center justify-center p-8'>
      <LoadingSpinner className='h-8 w-8' />
    </div>
  )

  const renderTableContent = (tab: string) => {
    if (isLoading) {
      return renderLoadingState()
    }

    const filteredUsers = getFilteredUsers(tab)
    if (filteredUsers.length === 0) {
      return <div className='p-4 text-center text-muted-foreground'>Không tìm thấy người dùng.</div>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>No.</TableHead>
            <TableHead>{tab === 'patients' ? 'Bệnh nhân' : tab === 'staff' ? 'Nhân viên' : 'Người dùng'}</TableHead>
            <TableHead>Liên hệ</TableHead>
            {tab !== 'patients' && <TableHead>Vai trò</TableHead>}
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày đăng ký</TableHead>
            {tab !== 'patients' && <TableHead>Lần đăng nhập cuối</TableHead>}
            <TableHead className='w-[80px]'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user.id} className='cursor-pointer hover:bg-muted/50' onClick={() => onEditClick(user)}>
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
              {tab !== 'patients' && <TableCell>{getRoleBadge(user.role)}</TableCell>}
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell> {convertDateFormat(user.registeredDate)}</TableCell>
              {tab !== 'patients' && <TableCell> {convertDateFormat(user.lastLogin)}</TableCell>}
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditClick(user)
                    }}
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteClick(user)
                    }}
                  >
                    <Trash className='h-4 w-4 text-destructive text-red-500' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className='grid gap-6'>
      <Tabs defaultValue='all' className='w-full'>
        <TabsList className='grid w-full max-w-md grid-cols-3'>
          <TabsTrigger value='all'>Tất cả người dùng</TabsTrigger>
          <TabsTrigger value='patients'>Bệnh nhân</TabsTrigger>
          <TabsTrigger value='staff'>Nhân viên</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='mt-4'>
          <Card>
            <CardContent className='p-0'>{renderTableContent('all')}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='patients' className='mt-4'>
          <Card>
            <CardContent className='p-0'>{renderTableContent('patients')}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='staff' className='mt-4'>
          <Card>
            <CardContent className='p-0'>{renderTableContent('staff')}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Hiển thị {startIndex} đến {endIndex} của {totalItems} bản ghi
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trang trước
            </Button>
            <div className='flex items-center gap-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(page)}
                  className='min-w-[2.5rem]'
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Trang tiếp
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

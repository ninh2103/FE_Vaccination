import { useMemo } from 'react'
import { Edit, Trash, Mail, Phone, Shield, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type User = {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  initials: string
  role: string
  status: string
  registeredDate: string
  lastLogin: string
  vaccinations: number
}

interface UserTableProps {
  users: User[]
  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  isLoading: boolean
  onEditClick: (user: User) => void
  onDeleteClick: (user: User) => void
}

const ITEMS_PER_PAGE = 10

export function UserTable({ users, currentPage, setCurrentPage, onEditClick, onDeleteClick }: UserTableProps) {
  const filteredUsers = useMemo(() => {
    return users
  }, [users])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
      case 'Admin':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <ShieldAlert className='h-3.5 w-3.5' />
            Admin
          </Badge>
        )
      case 'Doctor':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <ShieldCheck className='h-3.5 w-3.5' />
            Doctor
          </Badge>
        )
      case 'Nurse':
        return (
          <Badge variant='default' className='flex items-center gap-1'>
            <Shield className='h-3.5 w-3.5' />
            Nurse
          </Badge>
        )
      default:
        return <Badge variant='outline'>{role}</Badge>
    }
  }

  return (
    <div className='grid gap-6'>
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
                      <TableHead className='w-[80px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className='cursor-pointer hover:bg-muted/50'
                        onClick={() => onEditClick(user)}
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
                          onClick={() => onEditClick(user)}
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
                          onClick={() => onEditClick(user)}
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
  )
}

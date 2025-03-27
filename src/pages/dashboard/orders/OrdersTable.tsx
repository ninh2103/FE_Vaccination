'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { MoreHorizontal, Edit, Trash, Check, X, Calendar, Clock, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ITEMS_PER_PAGE = 10

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Order {
  id: number
  patient: Patient
  vaccine: string
  requestDate: string
  preferredDate: string
  preferredTime: string
  status: string
  notes: string
  orderCode?: string
  stt?: number
  phone?: string
}

interface OrdersTableProps {
  orders: Order[]
  onUpdateOrder: (order: Order) => void
  onDeleteOrder: (order: Order) => void
  onViewDetails: (order: Order) => void
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved':
      return <Badge className='bg-green-500 hover:bg-green-600'>Approved</Badge>
    case 'Pending':
      return (
        <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
          Pending
        </Badge>
      )
    case 'Rejected':
      return <Badge variant='destructive'>Rejected</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function OrdersTable({ orders, onUpdateOrder, onDeleteOrder, onViewDetails }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE))
  const paginatedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className='grid gap-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>No.</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Preferred Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='w-[80px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map((order, index) => (
            <TableRow key={order.id} className='cursor-pointer hover:bg-muted/50'>
              <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
              <TableCell className='font-medium'>{order.orderCode}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={order.patient.avatar} alt={order.patient.name} />
                    <AvatarFallback>{order.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium'>{order.patient.name}</div>
                    <div className='text-sm text-muted-foreground flex items-center'>
                      <Phone className='h-3 w-3 mr-1' />
                      {order.patient.phone}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{order.vaccine}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(parseISO(order.requestDate), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  {format(parseISO(order.preferredDate), 'dd/MM/yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                  {order.preferredTime}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className='h-4 w-4' />
                      <span className='sr-only'>Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewDetails(order)
                      }}
                    >
                      <Edit className='mr-2 h-4 w-4' />
                      Details
                    </DropdownMenuItem>
                    {order.status === 'Pending' && (
                      <>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateOrder({ ...order, status: 'Approved' })
                          }}
                        >
                          <Check className='mr-2 h-4 w-4 text-green-500' />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onUpdateOrder({ ...order, status: 'Rejected' })
                          }}
                        >
                          <X className='mr-2 h-4 w-4 text-red-500' />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteOrder(order)
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

'use client'

import { useState, useMemo, useCallback } from 'react'
import { format, parseISO, isBefore } from 'date-fns'
import * as XLSX from 'xlsx'
import { Filter, Download, RefreshCw, Plus, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { OrdersTable } from './OrdersTable'
import { AddOrder } from './AddOrder'
import { UpdateOrder } from './UpdateOrder'

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

const initialOrders: Order[] = [
  {
    id: 1,
    patient: {
      name: 'Nguyễn Văn An',
      avatar: '/placeholder.svg',
      initials: 'NVA',
      phone: '0901234567',
      email: 'an.nguyen@example.com'
    },
    vaccine: 'Vaccine COVID-19',
    requestDate: '2025-03-01',
    preferredDate: '2025-03-05',
    preferredTime: 'Morning',
    status: 'Pending',
    notes: 'First dose'
  }
  // ... Add more initial orders here
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    status: { approved: false, pending: false, rejected: false },
    dateRange: { from: '', to: '' }
  })

  const ordersWithOrderCode = useMemo(() => {
    return orders.map((order, index) => {
      const date = parseISO(order.requestDate)
      const dateCode = format(date, 'ddMMyy')
      const orderNum = String(index + 1).padStart(2, '0')
      return {
        ...order,
        orderCode: `ODR${dateCode}${orderNum}`,
        stt: index + 1,
        phone: order.patient.phone
      }
    })
  }, [orders])

  const filteredOrders = useMemo(() => {
    return ordersWithOrderCode.filter((order) => {
      const matchesSearch =
        order.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vaccine.toLowerCase().includes(searchTerm.toLowerCase())

      const noStatusFilter = !filters.status.approved && !filters.status.pending && !filters.status.rejected
      const matchesStatus =
        noStatusFilter ||
        (filters.status.approved && order.status === 'Approved') ||
        (filters.status.pending && order.status === 'Pending') ||
        (filters.status.rejected && order.status === 'Rejected')

      const orderDate = parseISO(order.requestDate)
      const fromDate = filters.dateRange.from ? parseISO(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? parseISO(filters.dateRange.to) : null
      const matchesDateRange =
        (!fromDate || !isBefore(orderDate, fromDate)) && (!toDate || !isBefore(toDate, orderDate))

      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [ordersWithOrderCode, searchTerm, filters])

  const handleExport = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const exportData = filteredOrders.map((order) => ({
        'Mã Order': order.orderCode,
        STT: order.stt,
        Patient: order.patient.name,
        Phone: order.patient.phone,
        Vaccine: order.vaccine,
        'Request Date': order.requestDate,
        'Preferred Date': order.preferredDate,
        'Preferred Time': order.preferredTime,
        Status: order.status,
        Notes: order.notes
      }))
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
      XLSX.writeFile(workbook, `orders_${format(new Date(), 'yyyyMMdd')}.xlsx`)
      toast({ title: 'Success', description: 'File exported successfully' })
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export file', variant: 'destructive' })
    } finally {
      setIsRefreshing(false)
    }
  }, [filteredOrders])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setOrders(initialOrders)
      setSearchTerm('')
      setFilters({
        status: { approved: false, pending: false, rejected: false },
        dateRange: { from: '', to: '' }
      })
      toast({ title: 'Refreshed', description: 'Data has been refreshed' })
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)))
    toast({
      title: 'Changes Saved',
      description: `Order status updated successfully to ${updatedOrder.status}`
    })
    setOpenUpdateDialog(false)
  }, [])

  const handleDeleteOrder = useCallback((order: Order) => {
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!selectedOrder) return
    setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id))
    toast({
      title: 'Deleted',
      description: `Order has been deleted successfully`
    })
    setOpenDeleteDialog(false)
  }, [selectedOrder])

  const handleViewDetails = useCallback((order: Order) => {
    setSelectedOrder(order)
    setOpenUpdateDialog(true)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({
      status: { approved: false, pending: false, rejected: false },
      dateRange: { from: '', to: '' }
    })
  }, [])

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and action buttons */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Orders
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Download className='mr-2 h-4 w-4' />}
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
                Add Order
              </Button>
            </DialogTrigger>
            <AddOrder
              onAdd={(newOrder: Order) => {
                setOrders((prev) => [...prev, newOrder])
                setOpenAddDialog(false)
              }}
              onCancel={() => setOpenAddDialog(false)}
            />
          </Dialog>
        </div>
      </div>

      {/* Search and filters */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by name, phone, or order ID...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
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
                <p className='text-sm text-muted-foreground mb-4'>Filter orders by status and request date range.</p>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Order Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status.approved}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, approved: checked }
                      }))
                    }
                  >
                    Approved
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.pending}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, pending: checked }
                      }))
                    }
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.rejected}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, rejected: checked }
                      }))
                    }
                  >
                    Rejected
                  </DropdownMenuCheckboxItem>
                </div>

                <div className='mb-4'>
                  <DropdownMenuLabel className='text-sm font-medium'>Request Date Range</DropdownMenuLabel>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>From</Label>
                      <Input
                        type='date'
                        value={filters.dateRange.from}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, from: e.target.value }
                          }))
                        }
                        className='w-full'
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className='text-xs text-muted-foreground'>To</Label>
                      <Input
                        type='date'
                        value={filters.dateRange.to}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, to: e.target.value }
                          }))
                        }
                        className='w-full'
                      />
                    </div>
                  </div>
                </div>

                <Button variant='outline' size='sm' onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full max-w-md grid-cols-3'>
            <TabsTrigger value='all'>All Orders</TabsTrigger>
            <TabsTrigger value='approved'>Approved</TabsTrigger>
            <TabsTrigger value='pending'>Pending/Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {filteredOrders.length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No orders found matching the current filters.
                  </div>
                ) : (
                  <OrdersTable
                    orders={filteredOrders}
                    onUpdateOrder={handleUpdateOrder}
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='approved' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {filteredOrders.filter((order) => order.status === 'Approved').length === 0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No approved orders found matching the current filters.
                  </div>
                ) : (
                  <OrdersTable
                    orders={filteredOrders.filter((order) => order.status === 'Approved')}
                    onUpdateOrder={handleUpdateOrder}
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='pending' className='mt-4'>
            <Card>
              <CardContent className='p-0'>
                {filteredOrders.filter((order) => order.status === 'Pending' || order.status === 'Rejected').length ===
                0 ? (
                  <div className='p-4 text-center text-muted-foreground'>
                    No pending or rejected orders found matching the current filters.
                  </div>
                ) : (
                  <OrdersTable
                    orders={filteredOrders.filter((order) => order.status === 'Pending' || order.status === 'Rejected')}
                    onUpdateOrder={handleUpdateOrder}
                    onDeleteOrder={handleDeleteOrder}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Order Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        {selectedOrder && (
          <UpdateOrder order={selectedOrder} onUpdate={handleUpdateOrder} onCancel={() => setOpenUpdateDialog(false)} />
        )}
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order {selectedOrder?.orderCode}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={!selectedOrder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

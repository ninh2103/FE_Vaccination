import { MoreHorizontal, Receipt, QrCode, DollarSign, Calendar, Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface Payment {
  id: string
  orderId: string
  amount: number
  userId: string
  bookingId: string | null
  appointmentDate: string | null
  createdAt: string
  updatedAt: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  paymentMethod: 'MOMO' | 'BANK_TRANSFER' | 'CREDIT_CARD'
}

interface PaymentTableProps {
  payments: Payment[]
  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  onViewDetails: (payment: Payment) => void
  onDownloadReceipt: (payment: Payment) => void
  onPrintReceipt: (payment: Payment) => void
  isLoading?: boolean
  total?: number
  itemsPerPage?: number
}

export function PaymentTable({
  payments,
  currentPage,
  setCurrentPage,
  onViewDetails,
  onDownloadReceipt,
  onPrintReceipt,
  isLoading = false,
  total = 0,
  itemsPerPage = 10
}: PaymentTableProps) {
  const getStatusBadge = (status: string) => {
    const variants: {
      [key: string]: { variant: 'default' | 'destructive' | 'outline' | 'secondary'; className?: string }
    } = {
      COMPLETED: { variant: 'default', className: 'bg-green-500 text-white' },
      PENDING: { variant: 'outline', className: 'bg-yellow-100 text-yellow-800' },
      FAILED: { variant: 'destructive', className: 'text-white' }
    }
    const { variant = 'default', className = '' } = variants[status] || {}
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  const getPaymentMethodIcon = (method: string) => {
    return method === 'MOMO' ? (
      <QrCode className='h-4 w-4 text-pink-500' />
    ) : method === 'BANK_TRANSFER' ? (
      <DollarSign className='h-4 w-4 text-green-500' />
    ) : (
      <Receipt className='h-4 w-4 text-muted-foreground' />
    )
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

  const totalPages = Math.ceil((total ?? 0) / itemsPerPage)
  const totalItems = total ?? 0
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems)

  return (
    <div className='grid gap-6'>
      <Tabs defaultValue='all' className='w-full'>
        <TabsList className='grid w-full max-w-md grid-cols-3'>
          <TabsTrigger value='all'>All Payments</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
          <TabsTrigger value='pending'>Pending/Failed</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              {isLoading ? (
                <div className='p-4 text-center'>
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                  </div>
                  <div className='flex items-center justify-center p-8'>
                    <LoadingSpinner className='h-8 w-8' />
                  </div>
                </div>
              ) : payments.length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='w-[80px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment, index) => (
                      <TableRow
                        key={payment.id}
                        className='cursor-pointer hover:bg-muted/50'
                        onClick={() => onViewDetails(payment)}
                      >
                        <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                        <TableCell className='font-medium'>#{payment.orderId.slice(0, 8)}</TableCell>
                        <TableCell>#{payment.id.slice(0, 8)}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                            {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1'>
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span>{payment.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                  onViewDetails(payment)
                                }}
                              >
                                <Receipt className='mr-2 h-4 w-4' />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDownloadReceipt(payment)
                                }}
                              >
                                <Download className='mr-2 h-4 w-4' />
                                Download Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onPrintReceipt(payment)
                                }}
                              >
                                <Printer className='mr-2 h-4 w-4' />
                                Print Receipt
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
        </TabsContent>
        <TabsContent value='completed' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              {isLoading ? (
                <div className='p-4 text-center'>
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                  </div>
                  <p className='mt-2 text-muted-foreground'>Loading payments...</p>
                </div>
              ) : payments.filter((p) => p.status === 'COMPLETED').length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No completed payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='w-[80px]'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments
                      .filter((payment) => payment.status === 'COMPLETED')
                      .map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => onViewDetails(payment)}
                        >
                          <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                          <TableCell className='font-medium'>#{payment.orderId.slice(0, 8)}</TableCell>
                          <TableCell>#{payment.id.slice(0, 8)}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              {getPaymentMethodIcon(payment.paymentMethod)}
                              <span>{payment.paymentMethod}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                    onViewDetails(payment)
                                  }}
                                >
                                  <Receipt className='mr-2 h-4 w-4' />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onDownloadReceipt(payment)
                                  }}
                                >
                                  <Download className='mr-2 h-4 w-4' />
                                  Download Receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onPrintReceipt(payment)
                                  }}
                                >
                                  <Printer className='mr-2 h-4 w-4' />
                                  Print Receipt
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
        </TabsContent>
        <TabsContent value='pending' className='mt-4'>
          <Card>
            <CardContent className='p-0'>
              {isLoading ? (
                <div className='p-4 text-center'>
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                  </div>
                  <p className='mt-2 text-muted-foreground'>Loading payments...</p>
                </div>
              ) : payments.filter((p) => p.status === 'PENDING' || p.status === 'FAILED').length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No pending or failed payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='w-[80px]'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments
                      .filter((payment) => payment.status === 'PENDING' || payment.status === 'FAILED')
                      .map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => onViewDetails(payment)}
                        >
                          <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                          <TableCell className='font-medium'>#{payment.orderId.slice(0, 8)}</TableCell>
                          <TableCell>#{payment.id.slice(0, 8)}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              {getPaymentMethodIcon(payment.paymentMethod)}
                              <span>{payment.paymentMethod}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                                    onViewDetails(payment)
                                  }}
                                >
                                  <Receipt className='mr-2 h-4 w-4' />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onDownloadReceipt(payment)
                                  }}
                                >
                                  <Download className='mr-2 h-4 w-4' />
                                  Download Receipt
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onPrintReceipt(payment)
                                  }}
                                >
                                  <Printer className='mr-2 h-4 w-4' />
                                  Print Receipt
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
        </TabsContent>
      </Tabs>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Showing {startIndex} to {endIndex} of {totalItems} entries
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
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
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useMemo } from 'react'
import { MoreHorizontal, Receipt, QrCode, DollarSign, Calendar, Phone, Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

interface Patient {
  name: string
  avatar: string
  initials: string
  phone: string
  email: string
}

interface Payment {
  id: number
  orderCode: string
  patient: Patient
  amount: number
  date: string
  time: string
  method: string
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded'
  service: string
  transactionId?: string
  refundReason?: string
}

interface PaymentTableProps {
  payments: Payment[]
  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  onViewDetails: (payment: Payment) => void
  onDownloadReceipt: (payment: Payment) => void
  onPrintReceipt: (payment: Payment) => void
  onProcessPayment?: (payment: Payment) => void
}

const ITEMS_PER_PAGE = 10

export function PaymentTable({
  payments,
  currentPage,
  setCurrentPage,
  onViewDetails,
  onDownloadReceipt,
  onPrintReceipt,
  onProcessPayment
}: PaymentTableProps) {
  const filteredPayments = useMemo(() => {
    return payments
  }, [payments])

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / ITEMS_PER_PAGE))
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusBadge = (status: string) => {
    const variants: {
      [key: string]: { variant: 'default' | 'destructive' | 'outline' | 'secondary'; className?: string }
    } = {
      Completed: { variant: 'default', className: 'bg-green-500 text-white' },
      Pending: { variant: 'outline', className: 'bg-yellow-100 text-yellow-800' },
      Failed: { variant: 'destructive', className: 'text-white' },
      Refunded: { variant: 'default', className: 'bg-blue-500 text-white' }
    }
    const { variant = 'default', className = '' } = variants[status] || {}
    return (
      <Badge variant={variant} className={className}>
        {status}
      </Badge>
    )
  }

  const getPaymentMethodIcon = (method: string) => {
    return method === 'QR Momo' ? (
      <QrCode className='h-4 w-4 text-pink-500' />
    ) : method === 'Cash' ? (
      <DollarSign className='h-4 w-4 text-green-500' />
    ) : (
      <Receipt className='h-4 w-4 text-muted-foreground' />
    )
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

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
              {paginatedPayments.length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='w-[80px]'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPayments.map((payment, index) => (
                      <TableRow
                        key={payment.id}
                        className='cursor-pointer hover:bg-muted/50'
                        onClick={() => onViewDetails(payment)}
                      >
                        <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                        <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Avatar className='h-8 w-8'>
                              <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                              <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium'>{payment.patient.name}</div>
                              <div className='text-sm text-muted-foreground flex items-center'>
                                <Phone className='h-3 w-3 mr-1' />
                                {payment.patient.phone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <div className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                            {format(new Date(payment.date), 'dd/MM/yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1'>
                            {getPaymentMethodIcon(payment.method)}
                            <span>{payment.method}</span>
                          </div>
                        </TableCell>
                        <TableCell>{payment.service}</TableCell>
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
                              {payment.status === 'Pending' && onProcessPayment && (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <QrCode className='mr-2 h-4 w-4' />
                                  Process Payment
                                </DropdownMenuItem>
                              )}
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
              {paginatedPayments.filter((p) => p.status === 'Completed').length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No completed payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead className='w-[80px]'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPayments
                      .filter((payment) => payment.status === 'Completed')
                      .map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => onViewDetails(payment)}
                        >
                          <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                          <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{payment.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {payment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(payment.date), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              {getPaymentMethodIcon(payment.method)}
                              <span>{payment.method}</span>
                            </div>
                          </TableCell>
                          <TableCell>{payment.service}</TableCell>
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
              {paginatedPayments.filter((p) => p.status === 'Pending' || p.status === 'Failed').length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>No pending or failed payments found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[60px]'>No.</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='w-[80px]'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPayments
                      .filter((payment) => payment.status === 'Pending' || payment.status === 'Failed')
                      .map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className='cursor-pointer hover:bg-muted/50'
                          onClick={() => onViewDetails(payment)}
                        >
                          <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                          <TableCell className='font-medium'>{payment.orderCode}</TableCell>
                          <TableCell>
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium'>{payment.patient.name}</div>
                                <div className='text-sm text-muted-foreground flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {payment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className='flex items-center'>
                              <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                              {format(new Date(payment.date), 'dd/MM/yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              {getPaymentMethodIcon(payment.method)}
                              <span>{payment.method}</span>
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
                                {payment.status === 'Pending' && onProcessPayment && (
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <QrCode className='mr-2 h-4 w-4' />
                                    Process Payment
                                  </DropdownMenuItem>
                                )}
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

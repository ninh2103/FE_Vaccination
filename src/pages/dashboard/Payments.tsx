"use client"

import { useState, useMemo, useEffect } from "react"
import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Receipt,
  QrCode,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Calendar,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

// Sample data using patient information from bookings
const initialPayments = [
  {
    id: 1,
    orderCode: "ODR010325-01",
    patient: {
      name: "Nguyễn Văn An",
      avatar: "/placeholder.svg",
      initials: "NVA",
      phone: "0901234567",
      email: "an.nguyen@example.com",
    },
    amount: 500000,
    date: "2025-03-01",
    time: "10:15",
    method: "QR Momo",
    status: "Completed",
    service: "COVID-19 Vaccine",
    transactionId: "MOMO123456789",
  },
  {
    id: 2,
    orderCode: "ODR020325-02",
    patient: {
      name: "Trần Thị Bình",
      avatar: "/placeholder.svg",
      initials: "TTB",
      phone: "0912345678",
      email: "binh.tran@example.com",
    },
    amount: 350000,
    date: "2025-03-02",
    time: "11:30",
    method: "Cash",
    status: "Completed",
    service: "Influenza Vaccine",
  },
  {
    id: 3,
    orderCode: "ODR030325-03",
    patient: {
      name: "Lê Văn Cường",
      avatar: "/placeholder.svg",
      initials: "LVC",
      phone: "0923456789",
      email: "cuong.le@example.com",
    },
    amount: 450000,
    date: "2025-03-03",
    time: "14:45",
    method: "QR Momo",
    status: "Pending",
    service: "Tetanus Vaccine",
    transactionId: "MOMO234567890",
  },
  {
    id: 4,
    orderCode: "ODR040325-04",
    patient: {
      name: "Phạm Thị Duyên",
      avatar: "/placeholder.svg",
      initials: "PTD",
      phone: "0934567890",
      email: "duyen.pham@example.com",
    },
    amount: 600000,
    date: "2025-03-04",
    time: "09:00",
    method: "Cash",
    status: "Completed",
    service: "Hepatitis B Vaccine",
  },
  {
    id: 5,
    orderCode: "ODR050325-05",
    patient: {
      name: "Hoàng Văn Đức",
      avatar: "/placeholder.svg",
      initials: "HVD",
      phone: "0945678901",
      email: "duc.hoang@example.com",
    },
    amount: 500000,
    date: "2025-03-05",
    time: "13:15",
    method: "QR Momo",
    status: "Completed",
    service: "COVID-19 Vaccine",
    transactionId: "MOMO345678901",
  },
  {
    id: 6,
    orderCode: "ODR060325-06",
    patient: {
      name: "Vũ Thị Giang",
      avatar: "/placeholder.svg",
      initials: "VTG",
      phone: "0956789012",
      email: "giang.vu@example.com",
    },
    amount: 400000,
    date: "2025-03-06",
    time: "15:30",
    method: "Cash",
    status: "Failed",
    service: "MMR Vaccine",
  },
  {
    id: 7,
    orderCode: "ODR070325-07",
    patient: {
      name: "Đặng Văn Hải",
      avatar: "/placeholder.svg",
      initials: "DVH",
      phone: "0967890123",
      email: "hai.dang@example.com",
    },
    amount: 550000,
    date: "2025-03-07",
    time: "10:45",
    method: "QR Momo",
    status: "Completed",
    service: "Pneumococcal Vaccine",
    transactionId: "MOMO456789012",
  },
  {
    id: 8,
    orderCode: "ODR080325-08",
    patient: {
      name: "Lý Thị Hồng",
      avatar: "/placeholder.svg",
      initials: "LTH",
      phone: "0978901234",
      email: "hong.ly@example.com",
    },
    amount: 650000,
    date: "2025-03-08",
    time: "12:00",
    method: "Cash",
    status: "Pending",
    service: "HPV Vaccine",
  },
  {
    id: 9,
    orderCode: "ODR090325-09",
    patient: {
      name: "Mai Văn Hùng",
      avatar: "/placeholder.svg",
      initials: "MVH",
      phone: "0989012345",
      email: "hung.mai@example.com",
    },
    amount: 350000,
    date: "2025-03-09",
    time: "16:15",
    method: "QR Momo",
    status: "Completed",
    service: "Varicella Vaccine",
    transactionId: "MOMO567890123",
  },
  {
    id: 10,
    orderCode: "ODR100325-10",
    patient: {
      name: "Trịnh Thị Lan",
      avatar: "/placeholder.svg",
      initials: "TTL",
      phone: "0990123456",
      email: "lan.trinh@example.com",
    },
    amount: 500000,
    date: "2025-03-10",
    time: "11:30",
    method: "Cash",
    status: "Refunded",
    service: "COVID-19 Vaccine",
    refundReason: "Service not provided",
  },
  {
    id: 11,
    orderCode: "ODR110325-11",
    patient: {
      name: "Ngô Văn Nam",
      avatar: "/placeholder.svg",
      initials: "NVN",
      phone: "0901234568",
      email: "nam.ngo@example.com",
    },
    amount: 400000,
    date: "2025-03-11",
    time: "09:45",
    method: "QR Momo",
    status: "Completed",
    service: "Measles Vaccine",
    transactionId: "MOMO678901234",
  },
  {
    id: 12,
    orderCode: "ODR120325-12",
    patient: {
      name: "Đỗ Thị Oanh",
      avatar: "/placeholder.svg",
      initials: "DTO",
      phone: "0912345679",
      email: "oanh.do@example.com",
    },
    amount: 450000,
    date: "2025-03-12",
    time: "14:00",
    method: "Cash",
    status: "Completed",
    service: "Polio Vaccine",
  },
  {
    id: 13,
    orderCode: "ODR130325-13",
    patient: {
      name: "Phan Văn Phong",
      avatar: "/placeholder.svg",
      initials: "PVP",
      phone: "0923456780",
      email: "phong.phan@example.com",
    },
    amount: 600000,
    date: "2025-03-13",
    time: "10:30",
    method: "QR Momo",
    status: "Failed",
    service: "Meningococcal Vaccine",
    transactionId: "MOMO789012345",
  },
  {
    id: 14,
    orderCode: "ODR140325-14",
    patient: {
      name: "Vũ Thị Quỳnh",
      avatar: "/placeholder.svg",
      initials: "VTQ",
      phone: "0934567891",
      email: "quynh.vu@example.com",
    },
    amount: 350000,
    date: "2025-03-14",
    time: "13:45",
    method: "Cash",
    status: "Pending",
    service: "Rubella Vaccine",
  },
  {
    id: 15,
    orderCode: "ODR150325-15",
    patient: {
      name: "Hoàng Thị Sương",
      avatar: "/placeholder.svg",
      initials: "HTS",
      phone: "0945678902",
      email: "suong.hoang@example.com",
    },
    amount: 500000,
    date: "2025-03-15",
    time: "11:15",
    method: "QR Momo",
    status: "Completed",
    service: "COVID-19 Vaccine",
    transactionId: "MOMO890123456",
  },
]

// Pagination constant
const ROWS_PER_PAGE = 10

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      completed: false,
      pending: false,
      failed: false,
      refunded: false,
    },
    method: {
      qrMomo: false,
      cash: false,
    },
    dateRange: {
      from: "",
      to: "",
    },
  })

  // Filter payments based on search term and filters
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      // Search filter
      const matchesSearch =
        payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.service.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const noStatusFilter =
        !filters.status.completed && !filters.status.pending && !filters.status.failed && !filters.status.refunded

      const matchesStatus =
        noStatusFilter ||
        (filters.status.completed && payment.status === "Completed") ||
        (filters.status.pending && payment.status === "Pending") ||
        (filters.status.failed && payment.status === "Failed") ||
        (filters.status.refunded && payment.status === "Refunded")

      // Payment method filter
      const noMethodFilter = !filters.method.qrMomo && !filters.method.cash

      const matchesMethod =
        noMethodFilter ||
        (filters.method.qrMomo && payment.method === "QR Momo") ||
        (filters.method.cash && payment.method === "Cash")

      // Date range filter
      const paymentDate = new Date(payment.date)
      const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null
      const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null

      const matchesDateRange = (!fromDate || paymentDate >= fromDate) && (!toDate || paymentDate <= toDate)

      return matchesSearch && matchesStatus && matchesMethod && matchesDateRange
    })
  }, [payments, searchTerm, filters])

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / ROWS_PER_PAGE)
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>
      case "Refunded":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "QR Momo":
        return <QrCode className="h-4 w-4 text-pink-500" />
      case "Cash":
        return <DollarSign className="h-4 w-4 text-green-500" />
      default:
        return <Receipt className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Handle export to Excel
  const handleExport = () => {
    const exportData = filteredPayments.map((payment, index) => ({
      "No.": index + 1,
      "Order ID": payment.orderCode,
      "Patient Name": payment.patient.name,
      "Phone Number": payment.patient.phone,
      Email: payment.patient.email,
      Amount: formatCurrency(payment.amount),
      Date: payment.date,
      Time: payment.time,
      "Payment Method": payment.method,
      Status: payment.status,
      Service: payment.service,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(blob, `payments_${format(new Date(), "yyyy-MM-dd")}.xlsx`)
  }

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setPayments([...initialPayments])
      setSearchTerm("")
      setFilters({
        status: {
          completed: false,
          pending: false,
          failed: false,
          refunded: false,
        },
        method: {
          qrMomo: false,
          cash: false,
        },
        dateRange: {
          from: "",
          to: "",
        },
      })
      setCurrentPage(1)
      setIsRefreshing(false)
    }, 1000)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      status: {
        completed: false,
        pending: false,
        failed: false,
        refunded: false,
      },
      method: {
        qrMomo: false,
        cash: false,
      },
      dateRange: {
        from: "",
        to: "",
      },
    })
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-6 ml-[1cm] p-4">
      {/* Title and action buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500">
          Payments
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search by name, phone, or order ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full"
              type="search"
            />
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px] p-4">
                <DropdownMenuLabel className="font-semibold">Filters</DropdownMenuLabel>
                <p className="text-sm text-muted-foreground mb-4">Filter payments by status, method, and date range.</p>

                {/* Status filter */}
                <div className="mb-4">
                  <DropdownMenuLabel className="text-sm font-medium">Payment Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status.completed}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, completed: checked },
                      }))
                    }
                  >
                    Completed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.pending}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, pending: checked },
                      }))
                    }
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.failed}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, failed: checked },
                      }))
                    }
                  >
                    Failed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status.refunded}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: { ...prev.status, refunded: checked },
                      }))
                    }
                  >
                    Refunded
                  </DropdownMenuCheckboxItem>
                </div>

                {/* Payment method filter */}
                <div className="mb-4">
                  <DropdownMenuLabel className="text-sm font-medium">Payment Method</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.method.qrMomo}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        method: { ...prev.method, qrMomo: checked },
                      }))
                    }
                  >
                    QR Momo
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.method.cash}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({
                        ...prev,
                        method: { ...prev.method, cash: checked },
                      }))
                    }
                  >
                    Cash
                  </DropdownMenuCheckboxItem>
                </div>

                {/* Date range filter */}
                <div className="mb-4">
                  <DropdownMenuLabel className="text-sm font-medium">Date Range</DropdownMenuLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">From</label>
                      <Input
                        type="date"
                        value={filters.dateRange.from}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, from: e.target.value },
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">To</label>
                      <Input
                        type="date"
                        value={filters.dateRange.to}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, to: e.target.value },
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear filters button */}
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and data table */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending/Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {paginatedPayments.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => {
                            setSelectedPayment(payment)
                            setOpenDetailsDialog(true)
                          }}
                        >
                          <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                          <TableCell className="font-medium">{payment.orderCode}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{payment.patient.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {payment.patient.phone}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {format(new Date(payment.date), "dd/MM/yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getPaymentMethodIcon(payment.method)}
                              <span>{payment.method}</span>
                            </div>
                          </TableCell>
                          <TableCell>{payment.service}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedPayment(payment)
                                    setOpenDetailsDialog(true)
                                  }}
                                >
                                  <Receipt className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Receipt
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
          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {paginatedPayments.filter((p) => p.status === "Completed").length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No completed payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments
                        .filter((payment) => payment.status === "Completed")
                        .map((payment, index) => (
                          <TableRow
                            key={payment.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className="font-medium">{payment.orderCode}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                  <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{payment.patient.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {payment.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {format(new Date(payment.date), "dd/MM/yyyy")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getPaymentMethodIcon(payment.method)}
                                <span>{payment.method}</span>
                              </div>
                            </TableCell>
                            <TableCell>{payment.service}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedPayment(payment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Receipt className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Receipt
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
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {paginatedPayments.filter((p) => p.status === "Pending" || p.status === "Failed").length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No pending or failed payments found matching the current filters.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">No.</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments
                        .filter((payment) => payment.status === "Pending" || payment.status === "Failed")
                        .map((payment, index) => (
                          <TableRow
                            key={payment.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setOpenDetailsDialog(true)
                            }}
                          >
                            <TableCell>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</TableCell>
                            <TableCell className="font-medium">{payment.orderCode}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={payment.patient.avatar} alt={payment.patient.name} />
                                  <AvatarFallback>{payment.patient.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{payment.patient.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {payment.patient.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {format(new Date(payment.date), "dd/MM/yyyy")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getPaymentMethodIcon(payment.method)}
                                <span>{payment.method}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedPayment(payment)
                                      setOpenDetailsDialog(true)
                                    }}
                                  >
                                    <Receipt className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <QrCode className="mr-2 h-4 w-4" />
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
        </Tabs>
      </div>

      {/* Fixed pagination controls */}
      {paginatedPayments.length > 0 && totalPages > 1 && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Payment details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>View complete payment information.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedPayment.patient.avatar} alt={selectedPayment.patient.name} />
                    <AvatarFallback>{selectedPayment.patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedPayment.patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPayment.patient.email}</p>
                  </div>
                </div>
                <div>{getStatusBadge(selectedPayment.status)}</div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Order ID</h4>
                    <p className="font-medium">{selectedPayment.orderCode}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Service</h4>
                    <p className="font-medium">{selectedPayment.service}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                    <p>{format(new Date(selectedPayment.date), "dd/MM/yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Time</h4>
                    <p>{selectedPayment.time}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Method</h4>
                    <div className="flex items-center gap-1">
                      {getPaymentMethodIcon(selectedPayment.method)}
                      <span>{selectedPayment.method}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                    <p className="text-xl font-bold">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                </div>

                {selectedPayment.method === "QR Momo" && selectedPayment.transactionId && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Transaction ID</h4>
                    <p>{selectedPayment.transactionId}</p>
                  </div>
                )}

                {selectedPayment.status === "Failed" && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground text-red-500">Failure Reason</h4>
                    <p className="text-red-500">Payment processing failed</p>
                  </div>
                )}

                {selectedPayment.status === "Refunded" && selectedPayment.refundReason && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground text-blue-500">Refund Reason</h4>
                    <p className="text-blue-500">{selectedPayment.refundReason}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                <p className="text-sm flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {selectedPayment.patient.phone}
                </p>
                <p className="text-sm">{selectedPayment.patient.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => setOpenDetailsDialog(false)}>
              <Receipt className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


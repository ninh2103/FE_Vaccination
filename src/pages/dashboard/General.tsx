import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'
import { Calendar, DollarSign, Download, Syringe, Users, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import * as XLSX from 'xlsx'
import { useCountUserQuery } from '@/queries/useUser'
import { useInventoryVaccinationQuery, useListVaccinationQuery } from '@/queries/useVaccination'
import { useListAppointmentQuery } from '@/queries/useAppointment'
import { useListPaymentQuery } from '@/queries/useMomo'
import { formatDate } from 'date-fns'
import { useListSupplierQuery } from '@/queries/useSupplier'
import { formatVND } from '@/core/lib/utils'
import { toast } from 'sonner'
// Adjusted sample data
const vaccinationData = [
  { month: 'Tháng 1', doses: 1200 },
  { month: 'Tháng 2', doses: 1300 },
  { month: 'Tháng 3', doses: 1400 },
  { month: 'Tháng 4', doses: 1350 },
  { month: 'Tháng 5', doses: 1250 },
  { month: 'Tháng 6', doses: 1500 },
  { month: 'Tháng 7', doses: 2000 },
  { month: 'Tháng 8', doses: 1600 },
  { month: 'Tháng 9', doses: 1450 },
  { month: 'Tháng 10', doses: 1300 },
  { month: 'Tháng 11', doses: 1550 },
  { month: 'Tháng 12', doses: 1600 }
] // Total: 17,000 doses

const appointmentData = [
  { month: 'Tháng 1', appointments: 240 },
  { month: 'Tháng 2', appointments: 260 },
  { month: 'Tháng 3', appointments: 280 },
  { month: 'Tháng 4', appointments: 270 },
  { month: 'Tháng 5', appointments: 250 },
  { month: 'Tháng 6', appointments: 300 },
  { month: 'Tháng 7', appointments: 400 },
  { month: 'Tháng 8', appointments: 320 },
  { month: 'Tháng 9', appointments: 290 },
  { month: 'Tháng 10', appointments: 260 },
  { month: 'Tháng 11', appointments: 310 },
  { month: 'Tháng 12', appointments: 320 }
] // Total: 3,400 appointments

const revenueData = [
  { month: 'Tháng 1', revenue: 600000000 },
  { month: 'Tháng 2', revenue: 650000000 },
  { month: 'Tháng 3', revenue: 700000000 },
  { month: 'Tháng 4', revenue: 675000000 },
  { month: 'Tháng 5', revenue: 625000000 },
  { month: 'Tháng 6', revenue: 750000000 },
  { month: 'Tháng 7', revenue: 1000000000 },
  { month: 'Tháng 8', revenue: 800000000 },
  { month: 'Tháng 9', revenue: 725000000 },
  { month: 'Tháng 10', revenue: 650000000 },
  { month: 'Tháng 11', revenue: 775000000 },
  { month: 'Tháng 12', revenue: 800000000 }
] // Total: 8,500,000,000 VND

const General: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { data: userCount } = useCountUserQuery()
  const { data: appointmentCount } = useListAppointmentQuery({ items_per_page: 5 })
  const { data: vaccineCount } = useListVaccinationQuery()
  const { data: vaccineInventories } = useInventoryVaccinationQuery({ items_per_page: 5 })
  const { data: supplierCount } = useListSupplierQuery({ items_per_page: 5 })
  const { data: userPaymentTotalPrice, refetch: refetchUserPaymentTotalPrice } = useListPaymentQuery({
    items_per_page: 100
  })

  const totalPrice = userPaymentTotalPrice?.data?.reduce((acc, curr) => acc + curr.amount, 0)

  const vaccineInventoriesFilter = vaccineInventories?.data.filter((vaccine) => vaccine.totalQuantity < 10)

  const downloadReport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const reportData = [
        ['Vaccination Dashboard Report'],
        ['Tháng', 'Số liều vaccine', 'Số lượng lịch hẹn', 'Tổng doanh thu (VND)'],
        ...vaccinationData.map((item, index) => [
          item.month,
          item.doses,
          appointmentData[index].appointments,
          revenueData[index].revenue
        ]),
        [
          'Tổng',
          vaccinationData.reduce((sum, item) => sum + item.doses, 0),
          appointmentData.reduce((sum, item) => sum + item.appointments, 0),
          revenueData.reduce((sum, item) => sum + item.revenue, 0)
        ]
      ]

      const ws = XLSX.utils.aoa_to_sheet(reportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo tổng quan')
      XLSX.writeFile(wb, `Báo cáo tổng quan_${new Date().toISOString().slice(0, 10)}.xlsx`)
      toast.success('Dữ liệu thông kê đã được xuất ra thành công.')
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      refetchUserPaymentTotalPrice()
      toast.success('Làm mới dữ liệu thành công .')
    }, 1000)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Thống kê tổng quan
        </h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={downloadReport} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Xuất dữ liệu
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Cập nhật
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Số liều vaccine</CardTitle>
            <Syringe className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>{vaccineCount?.total}</div>
              <div className='flex items-center text-sm text-muted-foreground'>
                <ArrowUpRight className='h-4 w-4 text-green-500' />
                <span className='text-green-500 font-medium'>+12.5%</span>
                <span className='ml-1'>từ tháng trước</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Số lượng lịch hẹn</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>{appointmentCount?.total}</div>
              <div className='flex items-center text-sm text-muted-foreground'>
                <ArrowDownRight className='h-4 w-4 text-red-500' />
                <span className='text-red-500 font-medium'>-3.1%</span>
                <span className='ml-1'>từ tuần trước</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Số lượng người dùng</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>{userCount?.data?.total || 0}</div>
              <div className='flex items-center text-sm text-muted-foreground'>
                <ArrowUpRight className='h-4 w-4 text-green-500' />
                <span className='text-green-500 font-medium'>+8.2%</span>
                <span className='ml-1'>từ tháng trước</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2xl font-bold'>{formatVND(totalPrice || 0)}</div>
              <div className='flex items-center text-sm text-muted-foreground'>
                <ArrowUpRight className='h-4 w-4 text-green-500' />
                <span className='text-green-500 font-medium'>+15.3%</span>
                <span className='ml-1'>từ tháng trước</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle>Số liều vaccine</CardTitle>
            <CardDescription>Biểu đồ thống kê số liều vaccine theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={600} height={300} data={vaccinationData} className='w-full max-w-full'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='doses' fill='#8884d8' animationDuration={1000} />
            </BarChart>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle>Số lượng lịch hẹn</CardTitle>
            <CardDescription>Biểu đồ thống kê số lượng lịch hẹn theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={300} data={appointmentData} className='w-full max-w-full'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='appointments' stroke='#82ca9d' animationDuration={1000} />
            </LineChart>
          </CardContent>
        </Card>
      </div>

      {/* Vaccine Inventory with Custom Progress Bar */}
      <div className='grid gap-6 grid-cols-1'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle>Tồn kho vaccine</CardTitle>
            <CardDescription>Biểu đồ thống kê tồn kho vaccine theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {vaccineInventoriesFilter?.map((vaccine, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <div className='font-medium'>{vaccine.nameVaccine}</div>
                    <div className='text-muted-foreground'>
                      {vaccine.totalQuantity}% ({vaccine.totalQuantity} liều)
                    </div>
                  </div>
                  <div className='w-full h-2 bg-gray-200 rounded-none'>
                    <div
                      className='h-full bg-blue-500 rounded-none transition-all duration-300'
                      style={{ width: `${vaccine.totalQuantity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle>Top Nhà cung cấp</CardTitle>
            <CardDescription>Nhà cung cấp có số liều vaccine cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhà cung cấp</TableHead>
                  <TableHead>Thông tin liên hệ</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierCount?.data?.map((supplier) => (
                  <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contactInfo}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle>Lịch hẹn gần đây</CardTitle>
            <CardDescription>Lịch hẹn gần đây nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              {appointmentCount?.data?.map((appointment) => (
                <TableBody>
                  <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                    <TableCell>#{appointment.id.slice(0, 5)}</TableCell>
                    <TableCell>{appointment.user.name}</TableCell>
                    <TableCell>{formatVND(appointment.vaccination.price)}</TableCell>
                    <TableCell>{formatDate(appointment.createdAt, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Badge className='bg-green-500 hover:bg-green-600 text-white'>Đã hoàn thành</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default General

'use client'

import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'
import { Calendar, DollarSign, Download, Syringe, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import * as XLSX from 'xlsx'

// Dữ liệu mẫu (giữ nguyên)
const vaccinationData = [
  { month: 'Jan', doses: 1200 },
  { month: 'Feb', doses: 1500 },
  { month: 'Mar', doses: 1300 },
  { month: 'Apr', doses: 1400 },
  { month: 'May', doses: 1100 },
  { month: 'Jun', doses: 1600 },
  { month: 'Jul', doses: 1700 },
  { month: 'Aug', doses: 1300 },
  { month: 'Sep', doses: 1400 },
  { month: 'Oct', doses: 1200 },
  { month: 'Nov', doses: 1500 },
  { month: 'Dec', doses: 1800 }
]

const appointmentData = [
  { month: 'Jan', appointments: 200 },
  { month: 'Feb', appointments: 300 },
  { month: 'Mar', appointments: 250 },
  { month: 'Apr', appointments: 220 },
  { month: 'May', appointments: 180 },
  { month: 'Jun', appointments: 350 },
  { month: 'Jul', appointments: 400 },
  { month: 'Aug', appointments: 300 },
  { month: 'Sep', appointments: 280 },
  { month: 'Oct', appointments: 200 },
  { month: 'Nov', appointments: 320 },
  { month: 'Dec', appointments: 450 }
]

const revenueData = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 2800 },
  { month: 'Mar', revenue: 2300 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 1900 },
  { month: 'Jun', revenue: 3000 },
  { month: 'Jul', revenue: 3200 },
  { month: 'Aug', revenue: 2400 },
  { month: 'Sep', revenue: 2600 },
  { month: 'Oct', revenue: 2100 },
  { month: 'Nov', revenue: 2900 },
  { month: 'Dec', revenue: 3500 }
]

const vaccineInventory = [
  { name: 'COVID-19 Vaccine', stock: 75, doses: 1500 },
  { name: 'Influenza Vaccine', stock: 45, doses: 900 },
  { name: 'Hepatitis B Vaccine', stock: 90, doses: 1800 },
  { name: 'Tetanus Vaccine', stock: 30, doses: 600 },
  { name: 'Pneumococcal Vaccine', stock: 60, doses: 1200 }
]

const General: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const downloadReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      const reportData = [
        ['Vaccination Dashboard Report'],
        ['Month', 'Vaccine Doses', 'Appointments', 'Revenue ($)'],
        ...vaccinationData.map((item, index) => [
          item.month,
          item.doses,
          appointmentData[index].appointments,
          revenueData[index].revenue
        ]),
        [
          'Total',
          vaccinationData.reduce((sum, item) => sum + item.doses, 0),
          appointmentData.reduce((sum, item) => sum + item.appointments, 0),
          revenueData.reduce((sum, item) => sum + item.revenue, 0)
        ]
      ]

      const ws = XLSX.utils.aoa_to_sheet(reportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Vaccination Report')
      XLSX.writeFile(wb, `Vaccination_Report_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsLoading(false)
    }, 1500)
  }

  const LoadingSpinner = () => (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='animate-spin rounded-full h-18.4 w-18.4 border-t-4.6 border-b-4.6 border-blue-500'></div>
      <span className='ml-4 text-white text-1.725xl'>Generating Report...</span>
    </div>
  )

  return (
    <div className='flex flex-col gap-6 w-full max-w-[9100px] mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Tăng max-w-7xl (4480px) lên 130% = 5824px, làm tròn thành 9100px để phù hợp màn hình lớn */}
      {isLoading && <LoadingSpinner />}

      <div className='flex items-center justify-between py-4'>
        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          General
        </h1>
        <Button variant='outline' size='sm' className='h-9' onClick={downloadReport}>
          <Download className='mr-2 h-4 w-4' />
          Download Report
        </Button>
      </div>

      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-0.92xl font-medium'>Vaccine Doses</CardTitle>
            <Syringe className='h-4.6 w-4.6 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2.3xl font-bold'>12,345</div>
              <div className='flex items-center text-0.92xl text-muted-foreground'>
                <ArrowUpRight className='h-4.6 w-4.6 text-green-500' />
                <span className='text-green-500 font-medium'>+12.5%</span>
                <span className='ml-1'>from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-0.92xl font-medium'>Appointments</CardTitle>
            <Calendar className='h-4.6 w-4.6 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2.3xl font-bold'>246</div>
              <div className='flex items-center text-0.92xl text-muted-foreground'>
                <ArrowDownRight className='h-4.6 w-4.6 text-red-500' />
                <span className='text-red-500 font-medium'>-3.1%</span>
                <span className='ml-1'>from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-0.92xl font-medium'>Registered Users</CardTitle>
            <Users className='h-4.6 w-4.6 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2.3xl font-bold'>5,678</div>
              <div className='flex items-center text-0.92xl text-muted-foreground'>
                <ArrowUpRight className='h-4.6 w-4.6 text-green-500' />
                <span className='text-green-500 font-medium'>+8.2%</span>
                <span className='ml-1'>from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-0.92xl font-medium'>Revenue</CardTitle>
            <DollarSign className='h-4.6 w-4.6 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='text-2.3xl font-bold'>$89,432</div>
              <div className='flex items-center text-0.92xl text-muted-foreground'>
                <ArrowUpRight className='h-4.6 w-4.6 text-green-500' />
                <span className='text-green-500 font-medium'>+15.3%</span>
                <span className='ml-1'>from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle className='text-1.15xl'>Vaccination Doses</CardTitle>
            <CardDescription className='text-0.92xl'>Monthly vaccine administration</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              width={897} // 690 * 1.3 (tăng thêm 30% tổng cộng)
              height={345}
              data={vaccinationData}
              className='w-full max-w-full'
            >
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
            <CardTitle className='text-1.15xl'>Appointments</CardTitle>
            <CardDescription className='text-0.92xl'>Monthly appointment trends</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              width={897} // 690 * 1.3
              height={345}
              data={appointmentData}
              className='w-full max-w-full'
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='appointments' stroke='#82ca9d' animationDuration={1000} />
            </LineChart>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md w-full lg:col-span-2'>
          <CardHeader>
            <CardTitle className='text-1.15xl'>Revenue</CardTitle>
            <CardDescription className='text-0.92xl'>Monthly revenue from vaccinations</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              width={1854} // 1426 * 1.3
              height={345}
              data={revenueData}
              className='w-full max-w-full'
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='revenue' fill='#ffc658' animationDuration={1000} />
            </BarChart>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 grid-cols-1'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle className='text-1.15xl'>Vaccine Inventory</CardTitle>
            <CardDescription className='text-0.92xl'>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {vaccineInventory.map((vaccine, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex items-center justify-between text-0.92xl'>
                    <div className='font-medium'>{vaccine.name}</div>
                    <div className='text-muted-foreground'>
                      {vaccine.stock}% ({vaccine.doses} doses)
                    </div>
                  </div>
                  <Progress value={vaccine.stock} className='h-2.3' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle className='text-1.15xl'>Top Vaccination Centers</CardTitle>
            <CardDescription className='text-0.92xl'>Centers with highest vaccination counts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-1.15xl'>Center</TableHead>
                  <TableHead className='text-1.15xl'>Doses</TableHead>
                  <TableHead className='text-1.15xl'>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>City Hospital</TableCell>
                  <TableCell className='text-1.15xl'>2,480</TableCell>
                  <TableCell className='text-1.15xl'>$15,870</TableCell>
                </TableRow>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>Health Clinic</TableCell>
                  <TableCell className='text-1.15xl'>1,950</TableCell>
                  <TableCell className='text-1.15xl'>$12,251</TableCell>
                </TableRow>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>Community Center</TableCell>
                  <TableCell className='text-1.15xl'>1,720</TableCell>
                  <TableCell className='text-1.15xl'>$10,840</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className='transition-all hover:shadow-md w-full'>
          <CardHeader>
            <CardTitle className='text-1.15xl'>Recent Appointments</CardTitle>
            <CardDescription className='text-0.92xl'>Latest scheduled vaccinations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-1.15xl'>ID</TableHead>
                  <TableHead className='text-1.15xl'>Patient</TableHead>
                  <TableHead className='text-1.15xl'>Amount</TableHead>
                  <TableHead className='text-1.15xl'>Date</TableHead>
                  <TableHead className='text-1.15xl'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>#VA1711</TableCell>
                  <TableCell className='text-1.15xl'>John Doe</TableCell>
                  <TableCell className='text-1.15xl'>$80</TableCell>
                  <TableCell className='text-1.15xl'>17 Mar 2025</TableCell>
                  <TableCell>
                    <Badge variant='default' className='bg-green-500 hover:bg-green-600 text-1.15xl'>
                      Completed
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>#VA1712</TableCell>
                  <TableCell className='text-1.15xl'>Jane Smith</TableCell>
                  <TableCell className='text-1.15xl'>$40</TableCell>
                  <TableCell className='text-1.15xl'>16 Mar 2025</TableCell>
                  <TableCell>
                    <Badge variant='outline' className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-1.15xl'>
                      Pending
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow className='cursor-pointer transition-colors hover:bg-muted/50'>
                  <TableCell className='text-1.15xl'>#VA1713</TableCell>
                  <TableCell className='text-1.15xl'>Robert Johnson</TableCell>
                  <TableCell className='text-1.15xl'>$20</TableCell>
                  <TableCell className='text-1.15xl'>15 Mar 2025</TableCell>
                  <TableCell>
                    <Badge variant='default' className='bg-green-500 hover:bg-green-600 text-1.15xl'>
                      Completed
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default General

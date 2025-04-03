import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Tag, Info, Building } from 'lucide-react'
import { path } from '@/core/constants/path'
import { useGetVaccinationByIdQuery } from '@/queries/useVaccination'

export default function VaccineDetail() {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)

  const { data: vaccineDetail, isLoading } = useGetVaccinationByIdQuery(id as string)

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (!vaccineDetail) {
    return <div className='p-8'>Vaccine not found</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const getStatusColor = (quantity: number) => {
    if (quantity > 10) return 'bg-green-100 text-green-800'
    if (quantity > 0) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusText = (quantity: number) => {
    if (quantity > 10) return 'In Stock'
    if (quantity > 0) return 'Low Stock'
    return 'Out of Stock'
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left column - Image */}
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='p-0'>
              <img
                src={vaccineDetail.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={vaccineDetail.vaccineName}
                className='w-full h-auto rounded-t-lg'
              />
              <div className='p-4'>
                <Badge className={getStatusColor(vaccineDetail.remainingQuantity)}>
                  {getStatusText(vaccineDetail.remainingQuantity)}
                </Badge>
                <div className='mt-4 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Tag className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Price:</span>
                  </div>
                  <span className='font-bold'>{formatCurrency(vaccineDetail.price)}</span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Expires:</span>
                  </div>
                  <span>{new Date(vaccineDetail.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Tag className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Quantity:</span>
                  </div>
                  <span>{vaccineDetail.remainingQuantity} doses</span>
                </div>
                <div className='mt-4'>
                  {vaccineDetail.remainingQuantity > 0 ? (
                    <Link to={`${path.booking}?id=${vaccineDetail.id}`}>
                      <Button className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'>
                        Book Appointment
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'
                    >
                      Contact
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Details */}
        <div className='md:col-span-2'>
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle className='text-2xl'>{vaccineDetail.vaccineName}</CardTitle>
              <CardDescription>{vaccineDetail.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold flex items-center'>
                    <Building className='mr-2 h-4 w-4' />
                    Location Information
                  </h3>
                  <div className='grid grid-cols-2 gap-4 mt-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-500'>Location:</span>
                      <p>{vaccineDetail.location}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-500'>Batch Number:</span>
                      <p>{vaccineDetail.batchNumber}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className='font-semibold flex items-center'>
                    <Info className='mr-2 h-4 w-4' />
                    Additional Details
                  </h3>
                  <div className='grid grid-cols-2 gap-4 mt-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-500'>Created At:</span>
                      <p>{new Date(vaccineDetail.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-500'>Last Updated:</span>
                      <p>{new Date(vaccineDetail.updatedAt).toLocaleDateString()}</p>
                    </div>
                    {vaccineDetail.certificate && (
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Certificate:</span>
                        <p>{vaccineDetail.certificate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue='side-effects' className='w-full'>
            <TabsList className='grid w-full grid-cols-1'>
              <TabsTrigger value='side-effects'>Side Effects</TabsTrigger>
            </TabsList>
            <TabsContent value='side-effects'>
              <Card>
                <CardHeader>
                  <CardTitle>Potential Side Effects</CardTitle>
                  <CardDescription>Information about potential side effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {vaccineDetail.sideEffect ? (
                      <p>{vaccineDetail.sideEffect}</p>
                    ) : (
                      <p className='text-gray-500'>No side effects information available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

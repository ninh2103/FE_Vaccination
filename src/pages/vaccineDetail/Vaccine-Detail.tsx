import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Tag, Info, Building, FingerprintIcon, ArrowLeft } from 'lucide-react'
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
    return <div className='p-8 text-center'>Không tìm thấy vaccine</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const getStatusColor = (quantity: number) => {
    if (quantity > 5) return 'bg-green-100 text-green-800'
    if (quantity > 0) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusText = (quantity: number) => {
    if (quantity > 5) return 'Còn hàng'
    if (quantity > 0) return 'Sắp hết hàng'
    return 'Hết hàng'
  }

  return (
    <div className='min-h-[calc(100vh-4rem)]'>
      <div className='container mx-auto p-6 mt-12'>
        <Link to={path.list}>
          <Button
            variant='ghost'
            className='mb-4 hover:bg-blue-50 transition-colors duration-200 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại trang danh sách vắc xin
          </Button>
        </Link>
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
                      <span className='text-sm'>Giá:</span>
                    </div>
                    <span className='font-bold'>{formatCurrency(vaccineDetail.price)}</span>
                  </div>
                  <div className='mt-2 flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Calendar className='mr-2 h-4 w-4' />
                      <span className='text-sm'>Hạn sử dụng:</span>
                    </div>
                    <span>{new Date(vaccineDetail.expirationDate).toLocaleDateString()}</span>
                  </div>
                  <div className='mt-2 flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Tag className='mr-2 h-4 w-4' />
                      <span className='text-sm'>Số lượng:</span>
                    </div>
                    <span>{vaccineDetail.remainingQuantity} liệu pháp</span>
                  </div>
                  <div className='mt-4'>
                    {vaccineDetail.remainingQuantity > 0 ? (
                      <Link to={`${path.booking}?id=${vaccineDetail.id}`}>
                        <Button className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'>
                          Đặt lịch tiêm
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'
                      >
                        Liên hệ
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
                      Thông tin địa điểm
                    </h3>
                    <div className='grid grid-cols-2 gap-4 mt-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Địa điểm:</span>
                        <p>{vaccineDetail.location || 'Việt Nam'}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Số lô:</span>
                        <p>{vaccineDetail.batchNumber}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className='font-semibold flex items-center'>
                      <Info className='mr-2 h-4 w-4' />
                      Thông tin bổ sung
                    </h3>
                    <div className='grid grid-cols-2 gap-4 mt-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Ngày tạo:</span>
                        <p>{new Date(vaccineDetail.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Ngày cập nhật:</span>
                        <p>{new Date(vaccineDetail.updatedAt).toLocaleDateString()}</p>
                      </div>
                      {vaccineDetail.certificate && (
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-gray-500'>Chứng chỉ:</span>
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
                <TabsTrigger value='side-effects'>Tác dụng phụ</TabsTrigger>
              </TabsList>
              <TabsContent value='side-effects'>
                <Card>
                  <CardHeader>
                    <CardTitle>Tác dụng phụ</CardTitle>
                    <CardDescription>Thông tin về tác dụng phụ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {vaccineDetail.sideEffect ? (
                        <p>{vaccineDetail.sideEffect}</p>
                      ) : (
                        <p className='text-gray-500'>Không có thông tin tác dụng phụ.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-12 mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4'>
              <FingerprintIcon className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Bảo vệ lâu dài</h3>
            <p className='text-sm text-gray-600'>Miễn dịch bền vững giúp phòng ngừa bệnh tật hiệu quả</p>
          </Card>
          <Card className='p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4'>
              <Building className='w-6 h-6 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Chất lượng đảm bảo</h3>
            <p className='text-sm text-gray-600'>Được sản xuất và kiểm định theo tiêu chuẩn quốc tế</p>
          </Card>
          <Card className='p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4'>
              <Info className='w-6 h-6 text-purple-600' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>An toàn tuyệt đối</h3>
            <p className='text-sm text-gray-600'>Đã được thử nghiệm và chứng minh tính an toàn</p>
          </Card>
          <Card className='p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4'>
              <Calendar className='w-6 h-6 text-orange-600' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Tiện lợi</h3>
            <p className='text-sm text-gray-600'>Lịch tiêm chủng linh hoạt, phù hợp với nhu cầu</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

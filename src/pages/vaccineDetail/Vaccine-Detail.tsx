import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag, Star, AlertCircle, Info, Phone, Building } from 'lucide-react'
import { path } from '@/core/constants/path'

// Temporarily using the interface from the dashboard/Vaccines page
// In a real application, this would be imported from a shared model file
interface Vaccine {
  id: number
  name: string
  image?: string
  info: string
  price: number
  manufacturer: string
  country: string
  type: string
  quantity: number
  expiryDate: string
  doseInterval: string
  target: string
  dosage: string
  administration: string
  contraindications: string
  sideEffects: string
  storage: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

// Mock data - in a real app, this would come from an API
const vaccines: Vaccine[] = [
  {
    id: 1,
    name: 'COVID-19 Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'COVID-19 prevention vaccine that provides protection against COVID-19 and its variants, helping to reduce the spread of the virus.',
    price: 500000,
    manufacturer: 'BioNTech',
    country: 'Germany',
    type: 'Adult',
    quantity: 15,
    expiryDate: '2025-12-31',
    doseInterval: '21 days',
    target: 'People over 12',
    dosage: '0.3ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy to vaccine components',
    sideEffects: 'Pain at injection site, fatigue, headache, muscle pain, chills, joint pain, fever',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Influenza Vaccine',
    image: 'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
    info: 'Annual vaccination to protect against influenza viruses and reduce flu-related complications.',
    price: 300000,
    manufacturer: 'Sanofi Pasteur',
    country: 'France',
    type: 'Children',
    quantity: 8,
    expiryDate: '2025-09-30',
    doseInterval: 'N/A',
    target: 'Children from 6 months',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Egg allergy',
    sideEffects: 'Mild fever, soreness at injection site',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 3,
    name: 'Hepatitis B Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'Hepatitis B prevention',
    price: 200000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 0,
    expiryDate: '2025-03-15',
    doseInterval: '30 days',
    target: 'Adults',
    dosage: '1ml',
    administration: 'Intramuscular',
    contraindications: 'Yeast allergy',
    sideEffects: 'Muscle pain',
    storage: '2-8°C',
    status: 'Out of Stock'
  },
  {
    id: 4,
    name: 'Tetanus Vaccine',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e',
    info: 'Tetanus prevention',
    price: 150000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Adult',
    quantity: 20,
    expiryDate: '2025-06-20',
    doseInterval: 'N/A',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'None',
    sideEffects: 'Soreness',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 5,
    name: 'MMR Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'Measles, Mumps, Rubella',
    price: 400000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Children',
    quantity: 5,
    expiryDate: '2025-10-05',
    doseInterval: '28 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Subcutaneous',
    contraindications: 'Immunodeficiency',
    sideEffects: 'Rash',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 6,
    name: 'Polio Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'Polio prevention',
    price: 250000,
    manufacturer: 'Sanofi',
    country: 'France',
    type: 'Children',
    quantity: 12,
    expiryDate: '2025-07-15',
    doseInterval: '60 days',
    target: 'Children',
    dosage: '0.5ml',
    administration: 'Oral',
    contraindications: 'None',
    sideEffects: 'None',
    storage: '2-8°C',
    status: 'In Stock'
  },
  {
    id: 7,
    name: 'HPV Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'Human Papillomavirus',
    price: 600000,
    manufacturer: 'Merck',
    country: 'USA',
    type: 'Adult',
    quantity: 3,
    expiryDate: '2025-11-30',
    doseInterval: '60 days',
    target: 'Adults',
    dosage: '0.5ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy',
    sideEffects: 'Pain',
    storage: '2-8°C',
    status: 'Low Stock'
  },
  {
    id: 8,
    name: 'Rotavirus Vaccine',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    info: 'Rotavirus prevention',
    price: 350000,
    manufacturer: 'GSK',
    country: 'UK',
    type: 'Children',
    quantity: 0,
    expiryDate: '2025-08-25',
    doseInterval: '60 days',
    target: 'Infants',
    dosage: '2ml',
    administration: 'Oral',
    contraindications: 'Intussusception',
    sideEffects: 'Diarrhea',
    storage: '2-8°C',
    status: 'Out of Stock'
  }
]

// Mock appointment data for the vaccine
const appointments = [
  {
    id: 1,
    patientName: 'John Doe',
    date: '2023-04-15',
    time: '10:00 AM',
    status: 'Completed'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2023-04-20',
    time: '2:30 PM',
    status: 'Scheduled'
  },
  {
    id: 3,
    patientName: 'Alice Johnson',
    date: '2023-05-10',
    time: '9:15 AM',
    status: 'Scheduled'
  }
]

// Mock side effects data for the vaccine
const sideEffects = [
  { severity: 'Common', description: 'Pain at injection site' },
  { severity: 'Common', description: 'Fatigue' },
  { severity: 'Common', description: 'Headache' },
  { severity: 'Less Common', description: 'Fever' },
  { severity: 'Rare', description: 'Allergic reaction' }
]

export default function VaccineDetail() {
  const { id } = useParams<{ id: string }>()
  const [vaccine, setVaccine] = useState<Vaccine | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      const vaccineId = parseInt(id || '1')
      const foundVaccine = vaccines.find((v) => v.id === vaccineId) || vaccines[0]
      setVaccine(foundVaccine)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (!vaccine) {
    return <div className='p-8'>Vaccine not found</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left column - Image */}
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='p-0'>
              <img
                src={vaccine.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={vaccine.name}
                className='w-full h-auto rounded-t-lg'
              />
              <div className='p-4'>
                <Badge className={getStatusColor(vaccine.status)}>{vaccine.status}</Badge>
                <div className='mt-4 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Tag className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Price:</span>
                  </div>
                  <span className='font-bold'>{formatCurrency(vaccine.price)}</span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Expires:</span>
                  </div>
                  <span>{vaccine.expiryDate}</span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Tag className='mr-2 h-4 w-4' />
                    <span className='text-sm'>Quantity:</span>
                  </div>
                  <span>{vaccine.quantity} doses</span>
                </div>
                <div className='mt-4'>
                  <Link to={`${path.booking}`}>
                    <Button className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white'>
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Details */}
        <div className='md:col-span-2'>
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle className='text-2xl'>{vaccine.name}</CardTitle>
              <CardDescription>{vaccine.info}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold flex items-center'>
                    <Building className='mr-2 h-4 w-4' />
                    Manufacturer Information
                  </h3>
                  <div className='grid grid-cols-2 gap-4 mt-2'>
                    <div>
                      <span className='text-sm text-gray-500'>Manufacturer:</span>
                      <p>{vaccine.manufacturer}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Country:</span>
                      <p>{vaccine.country}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className='font-semibold flex items-center'>
                    <Info className='mr-2 h-4 w-4' />
                    Administration Details
                  </h3>
                  <div className='grid grid-cols-2 gap-4 mt-2'>
                    <div>
                      <span className='text-sm text-gray-500'>Type:</span>
                      <p>{vaccine.type}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Target:</span>
                      <p>{vaccine.target}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Dosage:</span>
                      <p>{vaccine.dosage}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Administration:</span>
                      <p>{vaccine.administration}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Dose Interval:</span>
                      <p>{vaccine.doseInterval}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Storage:</span>
                      <p>{vaccine.storage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue='appointments' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='appointments'>Appointments</TabsTrigger>
              <TabsTrigger value='side-effects'>Side Effects</TabsTrigger>
            </TabsList>
            <TabsContent value='appointments'>
              <Card>
                <CardHeader>
                  <CardTitle>Related Appointments</CardTitle>
                  <CardDescription>View upcoming and past appointments for this vaccine</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointments.length === 0 ? (
                    <p className='text-center py-6 text-gray-500'>No appointments found</p>
                  ) : (
                    <div className='space-y-4'>
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className='flex items-center justify-between border p-4 rounded-lg'>
                          <div>
                            <p className='font-medium'>{appointment.patientName}</p>
                            <div className='flex items-center text-sm text-gray-500'>
                              <Calendar className='mr-1 h-4 w-4' />
                              {appointment.date}
                              <Clock className='ml-2 mr-1 h-4 w-4' />
                              {appointment.time}
                            </div>
                          </div>
                          <Badge variant={appointment.status === 'Completed' ? 'secondary' : 'default'}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='side-effects'>
              <Card>
                <CardHeader>
                  <CardTitle>Potential Side Effects</CardTitle>
                  <CardDescription>Information about potential side effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p>{vaccine.sideEffects}</p>
                    <div className='mt-4'>
                      <h4 className='font-medium mb-2 flex items-center'>
                        <AlertCircle className='mr-2 h-4 w-4 text-amber-500' />
                        Detailed Side Effects
                      </h4>
                      <ul className='space-y-2'>
                        {sideEffects.map((effect, index) => (
                          <li key={index} className='flex items-start'>
                            <Badge variant='outline' className='mr-2 mt-0.5'>
                              {effect.severity}
                            </Badge>
                            <span>{effect.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='mt-4'>
                      <h4 className='font-medium mb-2'>Contraindications</h4>
                      <p>{vaccine.contraindications}</p>
                    </div>
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

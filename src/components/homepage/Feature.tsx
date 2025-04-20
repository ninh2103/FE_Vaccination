import { ShieldCheckIcon, SyringeIcon, HeartPulseIcon } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/core/lib/utils'
import { FingerprintIcon } from 'lucide-react'
import { path } from '@/core/constants/path'
import { Link } from 'react-router-dom'
const featuresData = [
  {
    color: 'bg-blue-500',
    title: 'Safe & Effective',
    icon: ShieldCheckIcon,
    description: 'All vaccines go through rigorous testing to ensure they are safe and effective for public use.'
  },
  {
    color: 'bg-green-500',
    title: 'Free for Everyone',
    icon: SyringeIcon,
    description: 'Vaccines are provided at no cost in many countries to ensure everyone has access to protection.'
  },
  {
    color: 'bg-red-500',
    title: 'Protect Your Community',
    icon: HeartPulseIcon,
    description: 'Getting vaccinated helps build herd immunity, protecting those who cannot get vaccinated.'
  }
]

export default function Feature() {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {featuresData.map(({ color, title, icon: Icon, description }) => (
          <Card key={title} className='p-6'>
            <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', color)}>
              <Icon className='w-6 h-6 text-white' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
            <p className='mt-2 text-sm text-gray-500'>{description}</p>
          </Card>
        ))}
      </div>
      <div className='mt-32 flex flex-wrap items-center'>
        <div className='mx-auto -mt-8 w-full px-4 md:w-5/12'>
          <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 p-2 text-center shadow-lg'>
            <FingerprintIcon className='h-8 w-8 text-white' />
          </div>
          <h3 className='mb-3 text-2xl font-bold text-gray-900'>Vaccination Saves Lives</h3>
          <p className='mb-8 text-gray-500'>
            Vaccines protect you and your loved ones from serious diseases. Stay safe and contribute to a healthier
            future. Get vaccinated today!
          </p>
          <div>
            <Link to={path.list}>
              <Button size='lg' className=' text-white'>
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
        <div className='mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0'>
          <Card className='shadow-lg border rounded-lg'>
            <CardHeader className='relative h-56 overflow-hidden'>
              <img
                alt='Vaccination'
                src='https://images.unsplash.com/photo-1612277795421-9bc7706a4a34'
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardContent>
              <p className='text-sm dark:text-white'>Public Health</p>
              <h5 className='mb-3 mt-2 text-lg font-bold dark:text-white'>Your Health, Our Priority</h5>
              <p className='text-gray-500'>
                Immunization is the best way to protect against preventable diseases. Be responsible, get vaccinated,
                and help build a healthier world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

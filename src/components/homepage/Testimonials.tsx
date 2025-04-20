import { Baby, User, CalendarCheck, Star } from 'lucide-react'

export const vaccinationServices = [
  {
    icon: Baby,
    name: 'Child Vaccination',
    description: 'Safe and effective immunization programs for children of all ages.'
  },
  {
    icon: User,
    name: 'Adult Vaccination',
    description: 'Comprehensive vaccination services tailored for adults.'
  },
  {
    icon: CalendarCheck,
    name: 'On-Demand Vaccination',
    description: 'Flexible vaccination options based on your specific needs.'
  },
  {
    icon: Star,
    name: 'VIP Vaccination',
    description: 'Premium vaccination services with exclusive care and priority.'
  }
]

export default function VaccinationServices() {
  return (
    <div className='container mx-auto py-16 bg-gray-50 dark:bg-gray-900'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Explore Our Vaccination Services
        </h2>
        <p className='text-gray-500 dark:text-gray-400'>
          Discover a range of immunization options tailored to your needs.
        </p>
      </div>
      <div className='mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {vaccinationServices.map(({ icon: Icon, name, description }) => (
          <div
            key={name}
            className='bg-white rounded-xl shadow-xl p-6 text-center border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:-translate-y-2 transform'
          >
            <div className='flex justify-center mb-4'>
              <Icon
                className='w-16 h-16 text-blue-500 dark:text-blue-400 transition duration-300 hover:scale-105'
                strokeWidth={1.5}
              />
            </div>
            <h3 className='mt-4 text-xl font-bold text-gray-900 dark:text-white'>{name}</h3>
            <p className='text-base text-gray-600 dark:text-gray-300'>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
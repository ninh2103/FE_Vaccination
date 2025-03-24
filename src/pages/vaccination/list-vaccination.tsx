import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { path } from '@/core/constants/path'
import { cn } from '@/core/lib/utils'
import { addDays, format } from 'date-fns'
import { ArrowDownUp, CalendarIcon, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export const vaccines = [
  {
    id: 1,
    name: 'Tuberculosis Vaccine',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine to prevent tuberculosis, protecting against Mycobacterium tuberculosis.'
  },
  {
    id: 2,
    name: 'Tetanus Vaccine',
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents tetanus caused by Clostridium tetani bacteria.'
  },
  {
    id: 3,
    name: 'Hepatitis B Vaccine',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents hepatitis B and protects the liver from the HBV virus.'
  },
  {
    id: 4,
    name: 'Typhoid Vaccine',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents typhoid fever caused by Salmonella Typhi bacteria.'
  },
  {
    id: 5,
    name: 'Cholera Vaccine',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents cholera caused by Vibrio cholerae bacteria.'
  },
  {
    id: 6,
    name: 'Cholera Vaccine',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    description: 'A vaccine that prevents cholera caused by Vibrio cholerae bacteria.'
  }
]
const priceOptions = [
  { id: 'under-4usd', label: 'Price less than $4' },
  { id: '4usd-8usd', label: 'Price from $4 to $8' },
  { id: '8usd-20usd', label: 'Price from $8 to $20' },
  { id: 'above-20usd', label: 'Price more than $20' }
]

export default function ListVaccination() {
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [date, setDate] = useState<Date>()

  const handleCheckboxChange = (id: string) => {
    setSelectedPrices((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const resetFilters = () => {
    setDate(undefined)
    setSelectedPrices([])
  }

  return (
    <section className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div className='w-full max-w-7xl mx-auto px-4 md:px-8'>
        <div className='flex justify-start py-4'>
          <p className='text-lg text-center text-green-400 hover:text-green-300'>All Vaccines</p>
        </div>
        <div className='w-full md:w-auto flex flex-col justify-between sm:flex-row gap-4 items-center'>
          <div className='relative w-full sm:w-96'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 z-10' />
            <Input
              type='search'
              placeholder='Search for vaccine...'
              className='pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 relative z-0'
            />
          </div>
          <div className='flex items-center gap-2'>
            <ArrowDownUp className='text-gray-700 dark:text-gray-300' />
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort a Vaccine ' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='apple'>A to Z</SelectItem>
                  <SelectItem value='banana'>Z to A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr className='border-t border-gray-300 w-full my-4' />
        <div className='grid grid-cols-12'>
          <div className='col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto'>
            <div className=' box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm'>
              <div className='flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7'>
                <p className='font-medium text-base leading-7 text-black'>Filter Vaccine</p>
                <p
                  onClick={resetFilters}
                  className='font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-green-500'
                >
                  RESET
                </p>
              </div>
              <p className='dark:text-black font-bold pb-2'>Vaccine price</p>

              <div className='p-4 border rounded-md w-64'>
                {/* Danh sách đã chọn */}
                {selectedPrices.length > 0 && (
                  <div className='mb-4 p-2 border-b'>
                    <div className='flex justify-between items-center text-green-500 font-semibold'>
                      <span>📌 Your select</span>
                    </div>
                    <ul className='mt-2 space-y-1'>
                      {selectedPrices.map((id) => {
                        const option = priceOptions.find((opt) => opt.id === id)
                        return (
                          <li key={id} className='flex items-center justify-between text-sm dark:text-black'>
                            {option?.label}
                            <button onClick={() => handleCheckboxChange(id)} className='text-red-500 text-xs '>
                              ❌
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* Danh sách checkbox */}
                <div className='space-y-2'>
                  {priceOptions.map((option) => (
                    <div key={option.id} className='flex items-center space-x-2'>
                      <Checkbox
                        id={option.id}
                        checked={selectedPrices.includes(option.id)}
                        onCheckedChange={() => handleCheckboxChange(option.id)}
                      />
                      <label htmlFor={option.id} className='text-sm dark:text-black'>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className='my-6 h-[1px] bg-slate-300'></div>
                <h2 className='mb-3 font-bold text-text1'>When do you inject the vaccine?</h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                    >
                      <CalendarIcon />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='flex w-auto flex-col space-y-2 p-2'>
                    <Select onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        <SelectItem value='0'>Today</SelectItem>
                        <SelectItem value='1'>Tomorrow</SelectItem>
                        <SelectItem value='3'>In 3 days</SelectItem>
                        <SelectItem value='7'>In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className='rounded-md border'>
                      <Calendar mode='single' selected={date} onSelect={setDate} />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className='col-span-12 md:col-span-9'>
            <div className='dark:bg-gray-900 '>
              <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {vaccines.map((veccine) => (
                    <div key={veccine.id} className='bg-white rounded-lg shadow-lg p-8'>
                      <div className='relative overflow-hidden group'>
                        <img className='object-cover w-full h-full' src={veccine.image} alt={veccine.name} />
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <Link to={path.detail.replace(':id', String(veccine.id))}>
                            <Button
                              key={veccine.id}
                              className=' text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out font-semibold'
                            >
                              View vaccine
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 mt-4'>{veccine.name}</h3>
                      <p className='text-gray-500 text-sm mt-2'>{veccine.description}</p>
                      <div className='flex items-center justify-between mt-4'>
                        <span className='text-gray-900 font-bold text-lg'>{veccine.price}</span>
                        <Link to={path.booking}>
                          <Button className=' bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 hover:from-blue-500 hover:via-green-600 hover:to-teal-600 text-white py-2 px-4 rounded-full font-bold '>
                            Booking
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='py-4'>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href='#' />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#'>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#'>3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href='#' />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

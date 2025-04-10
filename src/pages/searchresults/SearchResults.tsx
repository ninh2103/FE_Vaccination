'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

// Simulated vaccine data
const vaccineData = [
  {
    id: 1,
    name: 'Pfizer-BioNTech COVID-19 Vaccine',
    brand: 'Pfizer',
    price: 500000,
    image: 'https://static.biospace.com/dims4/default/d02ca1d/2147483647/strip/true/crop/622x350+1+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fk1-prod-biospace.s3.us-east-2.amazonaws.com%2Fbrightspot%2Flegacy%2FBioSpace-Assets%2F6CC12F27-836B-43C9-8F96-D50F30957738.jpg',
    category: 'COVID-19',
    disease: 'COVID-19'
  },
  {
    id: 2,
    name: 'Moderna COVID-19 Vaccine',
    brand: 'Moderna',
    price: 550000,
    image: '/images/moderna-vaccine.jpg',
    category: 'COVID-19',
    disease: 'COVID-19'
  },
  {
    id: 3,
    name: 'AstraZeneca COVID-19 Vaccine',
    brand: 'AstraZeneca',
    price: 450000,
    image: '/images/astrazeneca-vaccine.jpg',
    category: 'COVID-19',
    disease: 'COVID-19'
  },
  {
    id: 4,
    name: 'Gardasil HPV Vaccine',
    brand: 'Merck',
    price: 2000000,
    image: '/images/gardasil-vaccine.jpg',
    category: 'HPV',
    disease: 'HPV'
  },
  {
    id: 5,
    name: 'Fluarix Influenza Vaccine',
    brand: 'GSK',
    price: 300000,
    image: '/images/fluarix-vaccine.jpg',
    category: 'Influenza',
    disease: 'Flu'
  },
  {
    id: 6,
    name: 'Havrix Hepatitis A Vaccine',
    brand: 'GSK',
    price: 650000,
    image: '/images/havrix-vaccine.jpg',
    category: 'Hepatitis',
    disease: 'Hepatitis A'
  },
  {
    id: 7,
    name: 'Engerix-B Hepatitis B Vaccine',
    brand: 'GSK',
    price: 550000,
    image: '/images/engerix-vaccine.jpg',
    category: 'Hep बल Hepatitis',
    disease: 'Hepatitis B'
  },
  {
    id: 8,
    name: 'Rotarix Rotavirus Vaccine',
    brand: 'GSK',
    price: 750000,
    image: '/images/rotarix-vaccine.jpg',
    category: 'Rotavirus',
    disease: 'Rotavirus'
  },
  {
    id: 9,
    name: 'Varivax Varicella Vaccine',
    brand: 'Merck',
    price: 850000,
    image: '/images/varivax-vaccine.jpg',
    category: 'Varicella',
    disease: 'Chickenpox'
  },
  {
    id: 10,
    name: 'Prevnar 13 Pneumococcal Vaccine',
    brand: 'Pfizer',
    price: 1200000,
    image: '/images/prevnar-vaccine.jpg',
    category: 'Pneumococcal',
    disease: 'Pneumococcus'
  },
  {
    id: 11,
    name: 'MMR II Vaccine',
    brand: 'Merck',
    price: 600000,
    image: '/images/mmr-vaccine.jpg',
    category: 'MMR',
    disease: 'Measles, Mumps, Rubella'
  },
  {
    id: 12,
    name: 'Typhim Vi Typhoid Vaccine',
    brand: 'Sanofi',
    price: 400000,
    image: '/images/typhim-vaccine.jpg',
    category: 'Typhoid',
    disease: 'Typhoid'
  },
  {
    id: 13,
    name: 'Adacel Tdap Vaccine',
    brand: 'Sanofi',
    price: 550000,
    image: '/images/adacel-vaccine.jpg',
    category: 'Tdap',
    disease: 'Diphtheria, Tetanus, Pertussis'
  },
  {
    id: 14,
    name: 'YF-Vax Yellow Fever Vaccine',
    brand: 'Sanofi',
    price: 950000,
    image: '/images/yf-vax-vaccine.jpg',
    category: 'Yellow Fever',
    disease: 'Yellow Fever'
  },
  {
    id: 15,
    name: 'JE-Vax Japanese Encephalitis Vaccine',
    brand: 'Sanofi',
    price: 1100000,
    image: '/images/je-vax-vaccine.jpg',
    category: 'Japanese Encephalitis',
    disease: 'Japanese Encephalitis'
  },
  {
    id: 16,
    name: 'Rabavert Rabies Vaccine',
    brand: 'GSK',
    price: 1300000,
    image: '/images/rabavert-vaccine.jpg',
    category: 'Rabies',
    disease: 'Rabies'
  },
  {
    id: 17,
    name: 'Vaxchora Cholera Vaccine',
    brand: 'Emergent',
    price: 1500000,
    image: '/images/vaxchora-vaccine.jpg',
    category: 'Cholera',
    disease: 'Cholera'
  },
  {
    id: 18,
    name: 'Ixiaro Japanese Encephalitis Vaccine',
    brand: 'Valneva',
    price: 1200000,
    image: '/images/ixiaro-vaccine.jpg',
    category: 'Japanese Encephalitis',
    disease: 'Japanese Encephalitis'
  }
]

// Define type for vaccine
interface Vaccine {
  id: number
  name: string
  brand: string
  price: number
  image: string
  category: string
  disease: string
}

// Define type for price range
interface PriceRange {
  id: number
  label: string
  min: number
  max: number
}

// Fixed price ranges
const priceRanges: PriceRange[] = [
  { id: 1, label: 'Under 500,000 VND', min: 0, max: 500000 },
  { id: 2, label: '500,000 VND - 1,000,000 VND', min: 500000, max: 1000000 },
  { id: 3, label: '1,000,000 VND - 1,500,000 VND', min: 1000000, max: 1500000 },
  { id: 4, label: 'Above 1,500,000 VND', min: 1500000, max: Number.MAX_SAFE_INTEGER }
]

export default function SearchResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || ''

  // Explicitly declare state types
  const [filteredVaccines, setFilteredVaccines] = useState<Vaccine[]>(vaccineData)
  const [displayedVaccines, setDisplayedVaccines] = useState<Vaccine[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [visibleCount, setVisibleCount] = useState(15)

  // Filter vaccines based on search query, brand, disease type, and price
  useEffect(() => {
    let results = vaccineData.filter(
      (vaccine) =>
        vaccine.name.toLowerCase().includes(query) ||
        vaccine.brand.toLowerCase().includes(query) ||
        vaccine.category.toLowerCase().includes(query) ||
        vaccine.disease.toLowerCase().includes(query)
    )

    // Filter by brand
    if (selectedBrands.length > 0) {
      results = results.filter((vaccine) => selectedBrands.includes(vaccine.brand))
    }

    // Filter by disease type
    if (selectedDiseases.length > 0) {
      results = results.filter((vaccine) => selectedDiseases.includes(vaccine.disease))
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      results = results.filter((vaccine) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          return range && vaccine.price >= range.min && vaccine.price <= range.max
        })
      })
    }

    setFilteredVaccines(results)
    setDisplayedVaccines(results.slice(0, visibleCount))
  }, [query, selectedBrands, selectedDiseases, selectedPriceRanges, visibleCount])

  // Handle brand selection
  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }, [])

  // Handle disease selection
  const handleDiseaseChange = useCallback((disease: string) => {
    setSelectedDiseases((prev) => (prev.includes(disease) ? prev.filter((d) => d !== disease) : [...prev, disease]))
  }, [])

  // Handle price range selection
  const handlePriceRangeChange = useCallback((rangeId: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    )
  }, [])

  // Handle loading more products
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 15)
  }, [])

  // Unique list of brands
  const brands = [...new Set(vaccineData.map((vaccine) => vaccine.brand))]

  // Unique list of diseases
  const diseases = [...new Set(vaccineData.map((vaccine) => vaccine.disease))]

  // Number of remaining products not yet displayed
  const remainingProducts = filteredVaccines.length - displayedVaccines.length

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Search: {query}</h1>
      <div className='flex gap-6'>
        {/* Left filter section */}
        <div className='w-1/4'>
          <Card className='mb-4'>
            <CardContent className='p-4'>
              <h2 className='text-lg font-semibold mb-4'>Brands</h2>
              {brands.map((brand) => (
                <div key={brand} className='flex items-center mb-2'>
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={`brand-${brand}`} className='ml-2 text-sm'>
                    {brand}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='mb-4'>
            <CardContent className='p-4'>
              <h2 className='text-lg font-semibold mb-4'>Disease Types</h2>
              {diseases.map((disease) => (
                <div key={disease} className='flex items-center mb-2'>
                  <Checkbox
                    id={`disease-${disease}`}
                    checked={selectedDiseases.includes(disease)}
                    onCheckedChange={() => handleDiseaseChange(disease)}
                  />
                  <label htmlFor={`disease-${disease}`} className='ml-2 text-sm'>
                    {disease}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='text-lg font-semibold mb-4'>Price Range</h2>
              {priceRanges.map((range) => (
                <div key={range.id} className='flex items-center mb-2'>
                  <Checkbox
                    id={`price-${range.id}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => handlePriceRangeChange(range.id)}
                  />
                  <label htmlFor={`price-${range.id}`} className='ml-2 text-sm'>
                    {range.label}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right vaccine list section */}
        <div className='w-3/4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {displayedVaccines.length > 0 ? (
              displayedVaccines.map((vaccine) => (
                <Card key={vaccine.id} className='hover:shadow-md transition-shadow'>
                  <CardContent className='p-4'>
                    <div className='h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-md'>
                      <img
                        src={vaccine.image || '/placeholder.svg'}
                        alt={vaccine.name}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <Badge className='mb-2'>{vaccine.disease}</Badge>
                    <h3 className='text-lg font-semibold line-clamp-2'>{vaccine.name}</h3>
                    <p className='text-sm text-gray-600'>{vaccine.brand}</p>
                    <p className='text-lg font-bold text-green-600 mt-2'>{vaccine.price.toLocaleString()} VND</p>
                    <Button className='mt-4 w-full'>View Details</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className='col-span-3 text-center text-gray-600 py-8'>No matching vaccines found</div>
            )}
          </div>

          {/* "Load more related products" button area */}
          {remainingProducts > 0 && (
            <div className='mt-8 p-4 rounded-lg text-center'>
              <Button
                onClick={handleLoadMore}
                variant='outline'
                className='px-8 py-2 text-white bg-gradient-to-r from-blue-400 via-green-500 to-teal-500'
              >
                .... Load {remainingProducts} more related products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
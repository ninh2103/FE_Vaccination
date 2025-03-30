import { useState } from 'react'
import { SuppliersTable } from './SuppliersTable'
import { Supplier } from './types'

// Initial data
const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'Global Vaccine Distributors',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '123 Distribution Way, Chicago, IL 60601, USA',
    phone: '+1 312-555-7890',
    email: 'info@globalvaccinedist.com',
    website: 'https://www.globalvaccinedist.com',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'Tetanus Vaccine'],
    contactPerson: 'John Smith',
    established: '1995',
    leadTime: '3-5 days',
    rating: 4.8
  },
  {
    id: 2,
    name: 'MedSupply Solutions',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '45 Medical Park, London, EC1A 1BB, UK',
    phone: '+44 20 7123 4567',
    email: 'contact@medsupplysolutions.co.uk',
    website: 'https://www.medsupplysolutions.co.uk',
    status: 'Active',
    products: ['Pneumococcal Vaccine', 'Hepatitis B Vaccine', 'MMR Vaccine'],
    contactPerson: 'Emma Johnson',
    established: '2001',
    leadTime: '5-7 days',
    rating: 4.5
  },
  {
    id: 3,
    name: 'VacciCare Logistics',
    logo: '/placeholder.svg',
    country: 'Germany',
    address: '78 Pharma Strasse, Berlin, 10115, Germany',
    phone: '+49 30 987 6543',
    email: 'info@vaccicare.de',
    website: 'https://www.vaccicare.de',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Hans Mueller',
    established: '2005',
    leadTime: '4-6 days',
    rating: 4.7
  },
  {
    id: 4,
    name: 'HealthLink Distribution',
    logo: '/placeholder.svg',
    country: 'Canada',
    address: '567 Medical Drive, Toronto, ON M5V 2H1, Canada',
    phone: '+1 416-555-1234',
    email: 'contact@healthlinkdist.ca',
    website: 'https://www.healthlinkdist.ca',
    status: 'Active',
    products: ['Influenza Vaccine', 'HPV Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Sarah Williams',
    established: '1998',
    leadTime: '2-4 days',
    rating: 4.9
  },
  {
    id: 5,
    name: 'MediVax Supply Chain',
    logo: '/placeholder.svg',
    country: 'France',
    address: '23 Rue de Santé, Paris, 75001, France',
    phone: '+33 1 23 45 67 89',
    email: 'info@medivax.fr',
    website: 'https://www.medivax.fr',
    status: 'Inactive',
    products: ['Tetanus Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Pierre Dubois',
    established: '2003',
    leadTime: '6-8 days',
    rating: 3.9
  },
  {
    id: 6,
    name: 'VaccineWorld Distributors',
    logo: '/placeholder.svg',
    country: 'Australia',
    address: '89 Health Street, Sydney, NSW 2000, Australia',
    phone: '+61 2 9876 5432',
    email: 'info@vaccineworld.com.au',
    website: 'https://www.vaccineworld.com.au',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'MMR Vaccine'],
    contactPerson: 'Michael Brown',
    established: '2010',
    leadTime: '7-10 days',
    rating: 4.2
  },
  {
    id: 7,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 8,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 9,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 10,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  },
  {
    id: 11,
    name: 'PharmaLogistics International',
    logo: '/placeholder.svg',
    country: 'Singapore',
    address: '12 Medical Hub, Singapore, 018956',
    phone: '+65 6123 4567',
    email: 'contact@pharmalogistics.sg',
    website: 'https://www.pharmalogistics.sg',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Pneumococcal Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Li Wei',
    established: '2008',
    leadTime: '5-7 days',
    rating: 4.6
  }
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      <SuppliersTable suppliers={suppliers} onUpdateSuppliers={setSuppliers} />
    </div>
  )
}

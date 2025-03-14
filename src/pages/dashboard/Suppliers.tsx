'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Truck,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

// Sample data
const suppliers = [
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
    name: 'VacciTech Supply',
    logo: '/placeholder.svg',
    country: 'India',
    address: '456 Health Avenue, Mumbai, 400001, India',
    phone: '+91 22 2345 6789',
    email: 'info@vaccitech.in',
    website: 'https://www.vaccitech.in',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Tetanus Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Raj Patel',
    established: '2012',
    leadTime: '4-6 days',
    rating: 4.3
  },
  {
    id: 9,
    name: 'MedExpress Distributors',
    logo: '/placeholder.svg',
    country: 'Brazil',
    address: '789 Saúde Street, São Paulo, 01310-200, Brazil',
    phone: '+55 11 3456 7890',
    email: 'contact@medexpress.br',
    website: 'https://www.medexpress.br',
    status: 'Inactive',
    products: ['Influenza Vaccine', 'HPV Vaccine'],
    contactPerson: 'Carlos Silva',
    established: '2007',
    leadTime: '8-12 days',
    rating: 3.8
  },
  {
    id: 10,
    name: 'ColdChain Vaccine Logistics',
    logo: '/placeholder.svg',
    country: 'Netherlands',
    address: '34 Vaccine Lane, Amsterdam, 1012 AB, Netherlands',
    phone: '+31 20 123 4567',
    email: 'info@coldchain.nl',
    website: 'https://www.coldchain.nl',
    status: 'Active',
    products: ['COVID-19 Vaccine', 'Influenza Vaccine', 'MMR Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Jan de Vries',
    established: '2015',
    leadTime: '3-5 days',
    rating: 4.7
  }
]

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className='bg-green-500 hover:bg-green-600'>Active</Badge>
      case 'Inactive':
        return (
          <Badge
            variant='outline'
            className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-500'
          >
            Inactive
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) {
      return <Badge className='bg-green-500 hover:bg-green-600'>{rating.toFixed(1)}</Badge>
    } else if (rating >= 4.0) {
      return <Badge className='bg-blue-500 hover:bg-blue-600'>{rating.toFixed(1)}</Badge>
    } else if (rating >= 3.5) {
      return (
        <Badge
          variant='outline'
          className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-500'
        >
          {rating.toFixed(1)}
        </Badge>
      )
    } else {
      return <Badge variant='destructive'>{rating.toFixed(1)}</Badge>
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Suppliers</h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Enter the details of the new vaccine supplier to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='name'>Supplier Name</Label>
                    <Input id='name' placeholder='Enter supplier name' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='country'>Country</Label>
                    <Input id='country' placeholder='Enter country' />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Textarea id='address' placeholder='Enter full address' rows={2} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input id='phone' placeholder='Enter phone number' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' placeholder='Enter email address' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='website'>Website</Label>
                    <Input id='website' placeholder='Enter website URL' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='established'>Established Year</Label>
                    <Input id='established' placeholder='Enter year established' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='contact-person'>Contact Person</Label>
                    <Input id='contact-person' placeholder='Enter contact person name' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='status'>Status</Label>
                    <Select defaultValue='active'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='lead-time'>Lead Time</Label>
                    <Input id='lead-time' placeholder='e.g., 3-5 days' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='rating'>Rating</Label>
                    <Select defaultValue='4.5'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select rating' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='5.0'>5.0</SelectItem>
                        <SelectItem value='4.5'>4.5</SelectItem>
                        <SelectItem value='4.0'>4.0</SelectItem>
                        <SelectItem value='3.5'>3.5</SelectItem>
                        <SelectItem value='3.0'>3.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='products'>Products (comma separated)</Label>
                  <Input id='products' placeholder='e.g., COVID-19 Vaccine, Influenza Vaccine' />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='logo'>Logo</Label>
                  <Input id='logo' type='file' />
                </div>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpenAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpenAddDialog(false)}>Save Supplier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search suppliers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full'
              type='search'
            />
            <Button variant='outline' size='icon'>
              <Search className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm'>
              <Filter className='mr-2 h-4 w-4' />
              Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-[80px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className='cursor-pointer transition-colors hover:bg-muted/50'>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                          <Truck className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <div>
                          <div className='font-medium'>{supplier.name}</div>
                          <div className='text-sm text-muted-foreground'>{supplier.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                        <span>{supplier.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1 text-sm'>
                          <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm'>
                          <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {supplier.products.map((product, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='bg-primary/10 text-primary hover:bg-primary/20'
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.leadTime}</TableCell>
                    <TableCell>{getRatingBadge(supplier.rating)}</TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Globe className='mr-2 h-4 w-4' />
                            Visit Website
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600 focus:text-red-600'
                            onClick={() => {
                              setSelectedSupplier(supplier)
                              setOpenDeleteDialog(true)
                            }}
                          >
                            <Trash className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button variant='outline' size='sm'>
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
          <Button variant='outline' size='sm'>
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this supplier? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedSupplier && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedSupplier.name}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={() => setOpenDeleteDialog(false)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

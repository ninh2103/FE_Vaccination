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
  Factory,
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
const manufacturers = [
  {
    id: 1,
    name: 'BioNTech',
    logo: '/placeholder.svg',
    country: 'Germany',
    address: 'An der Goldgrube 12, 55131 Mainz, Germany',
    phone: '+49 6131 9084-0',
    email: 'info@biontech.de',
    website: 'https://biontech.de',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Dr. Ugur Sahin',
    established: '2008'
  },
  {
    id: 2,
    name: 'Pfizer',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '235 E 42nd St, New York, NY 10017, USA',
    phone: '+1 212-733-2323',
    email: 'info@pfizer.com',
    website: 'https://www.pfizer.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine', 'Pneumococcal Vaccine'],
    contactPerson: 'Dr. Albert Bourla',
    established: '1849'
  },
  {
    id: 3,
    name: 'Moderna',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '200 Technology Square, Cambridge, MA 02139, USA',
    phone: '+1 617-714-6500',
    email: 'info@modernatx.com',
    website: 'https://www.modernatx.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Stéphane Bancel',
    established: '2010'
  },
  {
    id: 4,
    name: 'AstraZeneca',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '1 Francis Crick Avenue, Cambridge Biomedical Campus, Cambridge, UK',
    phone: '+44 20 3749 5000',
    email: 'info@astrazeneca.com',
    website: 'https://www.astrazeneca.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Pascal Soriot',
    established: '1999'
  },
  {
    id: 5,
    name: 'Johnson & Johnson',
    logo: '/placeholder.svg',
    country: 'United States',
    address: 'One Johnson & Johnson Plaza, New Brunswick, NJ 08933, USA',
    phone: '+1 732-524-0400',
    email: 'info@jnj.com',
    website: 'https://www.jnj.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Alex Gorsky',
    established: '1886'
  },
  {
    id: 6,
    name: 'Sanofi Pasteur',
    logo: '/placeholder.svg',
    country: 'France',
    address: '14 Espace Henry Vallée, 69007 Lyon, France',
    phone: '+33 4 37 37 01 00',
    email: 'info@sanofipasteur.com',
    website: 'https://www.sanofipasteur.com',
    status: 'Active',
    vaccines: ['Influenza Vaccine', 'Polio Vaccine'],
    contactPerson: 'Thomas Triomphe',
    established: '1974'
  },
  {
    id: 7,
    name: 'GlaxoSmithKline',
    logo: '/placeholder.svg',
    country: 'United Kingdom',
    address: '980 Great West Road, Brentford, Middlesex, TW8 9GS, UK',
    phone: '+44 20 8047 5000',
    email: 'info@gsk.com',
    website: 'https://www.gsk.com',
    status: 'Active',
    vaccines: ['Tetanus Vaccine', 'Varicella Vaccine'],
    contactPerson: 'Emma Walmsley',
    established: '2000'
  },
  {
    id: 8,
    name: 'Merck',
    logo: '/placeholder.svg',
    country: 'United States',
    address: '2000 Galloping Hill Road, Kenilworth, NJ 07033, USA',
    phone: '+1 908-740-4000',
    email: 'info@merck.com',
    website: 'https://www.merck.com',
    status: 'Active',
    vaccines: ['MMR Vaccine', 'HPV Vaccine', 'Hepatitis B Vaccine'],
    contactPerson: 'Robert M. Davis',
    established: '1891'
  },
  {
    id: 9,
    name: 'Sinovac Biotech',
    logo: '/placeholder.svg',
    country: 'China',
    address: 'No. 39 Shangdi Xi Road, Haidian District, Beijing, China',
    phone: '+86 10 8289 0088',
    email: 'info@sinovac.com',
    website: 'http://www.sinovac.com',
    status: 'Inactive',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Yin Weidong',
    established: '1999'
  },
  {
    id: 10,
    name: 'Bharat Biotech',
    logo: '/placeholder.svg',
    country: 'India',
    address: 'Genome Valley, Hyderabad, Telangana, India',
    phone: '+91 40 2348 0567',
    email: 'info@bharatbiotech.com',
    website: 'https://www.bharatbiotech.com',
    status: 'Active',
    vaccines: ['COVID-19 Vaccine'],
    contactPerson: 'Dr. Krishna Ella',
    established: '1996'
  }
]

export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedManufacturer, setSelectedManufacturer] = useState<any>(null)

  const filteredManufacturers = manufacturers.filter(
    (manufacturer) =>
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.vaccines.some((vaccine) => vaccine.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Manufacturers</h1>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size='sm' className='h-9'>
                <Plus className='mr-2 h-4 w-4' />
                Add Manufacturer
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[550px]'>
              <DialogHeader>
                <DialogTitle>Add New Manufacturer</DialogTitle>
                <DialogDescription>
                  Enter the details of the new vaccine manufacturer to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='name'>Manufacturer Name</Label>
                    <Input id='name' placeholder='Enter manufacturer name' />
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
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='vaccines'>Vaccines (comma separated)</Label>
                  <Input id='vaccines' placeholder='e.g., COVID-19 Vaccine, Influenza Vaccine' />
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
                <Button onClick={() => setOpenAddDialog(false)}>Save Manufacturer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search manufacturers...'
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
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vaccines</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Established</TableHead>
                  <TableHead className='w-[80px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredManufacturers.map((manufacturer) => (
                  <TableRow key={manufacturer.id} className='cursor-pointer transition-colors hover:bg-muted/50'>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                          <Factory className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <div>
                          <div className='font-medium'>{manufacturer.name}</div>
                          <div className='text-sm text-muted-foreground'>{manufacturer.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3.5 w-3.5 text-muted-foreground' />
                        <span>{manufacturer.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1 text-sm'>
                          <Phone className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{manufacturer.phone}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm'>
                          <Mail className='h-3.5 w-3.5 text-muted-foreground' />
                          <span>{manufacturer.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {manufacturer.vaccines.map((vaccine, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='bg-primary/10 text-primary hover:bg-primary/20'
                          >
                            {vaccine}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(manufacturer.status)}</TableCell>
                    <TableCell>{manufacturer.established}</TableCell>
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
                              setSelectedManufacturer(manufacturer)
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
            <DialogTitle>Delete Manufacturer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this manufacturer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedManufacturer && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{selectedManufacturer.name}</span>
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

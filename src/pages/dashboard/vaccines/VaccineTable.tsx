import { useState, useMemo } from 'react'
import { Edit, Trash, AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Vaccine } from '@/pages/dashboard/vaccines/types'

interface VaccineTableProps {
  vaccines: Vaccine[]
  setVaccines: (vaccines: Vaccine[]) => void
  setSelectedVaccine: (vaccine: Vaccine | null) => void
  setOpenEditDialog: (open: boolean) => void
  setOpenDeleteDialog: (open: boolean) => void
}

export default function VaccineTable({
  vaccines,
  setVaccines,
  setSelectedVaccine,
  setOpenEditDialog,
  setOpenDeleteDialog
}: VaccineTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const filteredVaccines = useMemo(() => {
    return vaccines.filter((vaccine) => {
      const matchesSearch =
        vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'All' || vaccine.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [vaccines, searchTerm, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filteredVaccines.length / ITEMS_PER_PAGE))
  const paginatedVaccines = filteredVaccines.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className='bg-green-500 hover:bg-green-600 text-white'>In Stock</Badge>
      case 'Low Stock':
        return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white'>Low Stock</Badge>
      case 'Out of Stock':
        return <Badge className='bg-red-500 hover:bg-red-600 text-white'>Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='grid gap-6'>
      {/* Search and Filter */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input
            placeholder='Search vaccines by name...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className='w-full'
          />
          {searchTerm && (
            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
        <Select
          value={filterStatus}
          onValueChange={(value) => {
            setFilterStatus(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All Statuses</SelectItem>
            <SelectItem value='In Stock'>In Stock</SelectItem>
            <SelectItem value='Low Stock'>Low Stock</SelectItem>
            <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alert */}
      {filteredVaccines.some((v) => v.status === 'Low Stock' || v.status === 'Out of Stock') && (
        <Alert variant='destructive' className='bg-red-50 border-red-200'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Stock Alert</AlertTitle>
          <AlertDescription>
            Some vaccines are low in stock or out of stock. Review inventory and consider restocking.
          </AlertDescription>
        </Alert>
      )}

      {/* Vaccine Table */}
      <Card>
        <CardContent className='p-0'>
          {paginatedVaccines.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>No vaccines found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>No.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Info</TableHead>
                  <TableHead>Price (VND)</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-[80px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVaccines.map((vaccine, index) => (
                  <TableRow
                    key={vaccine.id}
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => {
                      setSelectedVaccine(vaccine)
                      setOpenEditDialog(true)
                    }}
                  >
                    <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                    <TableCell>
                      {vaccine.image ? (
                        <img src={vaccine.image} alt={vaccine.name} className='w-12 h-12 object-cover rounded-md' />
                      ) : (
                        <div className='w-12 h-12 bg-muted rounded-md flex items-center justify-center'>
                          <span className='text-xs text-muted-foreground'>No image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className='font-medium'>{vaccine.name}</TableCell>
                    <TableCell>{vaccine.info}</TableCell>
                    <TableCell>{vaccine.price.toLocaleString()}</TableCell>
                    <TableCell>{vaccine.manufacturer}</TableCell>
                    <TableCell>{vaccine.type}</TableCell>
                    <TableCell>{vaccine.quantity}</TableCell>
                    <TableCell>{vaccine.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(vaccine.status)}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVaccine(vaccine)
                            setOpenEditDialog(true)
                          }}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVaccine(vaccine)
                            setOpenDeleteDialog(true)
                          }}
                        >
                          <Trash className='h-4 w-4 text-destructive' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-2'>
          <div className='flex-1 text-sm text-muted-foreground'>{filteredVaccines.length} vaccine(s) total</div>
          <div className='flex items-center space-x-6 lg:space-x-8'>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {currentPage} of {totalPages}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import {
  Edit,
  Trash,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Download,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDeleteVaccinationQuery, useListVaccinationQuery } from '@/queries/useVaccination'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import * as XLSX from 'xlsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import AddVaccine from './AddVaccine'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'

interface VaccineTableProps {
  setOpenEditDialog: (open: boolean) => void
  setSelectedVaccine: (vaccine: VaccineType | null) => void
}

export default function VaccineTable({
  setOpenEditDialog,
  setSelectedVaccine: setParentSelectedVaccine
}: VaccineTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [localSelectedVaccine, setLocalSelectedVaccine] = useState<VaccineType | null>(null)
  const ITEMS_PER_PAGE = 10

  const {
    data: vaccineData,
    isLoading,
    isError,
    refetch
  } = useListVaccinationQuery({
    page: currentPage,
    items_per_page: ITEMS_PER_PAGE,
    search: searchTerm
  })

  const { mutate: deleteVaccine, isPending: isDeletingVaccine } = useDeleteVaccinationQuery()

  const toggleDescription = (vaccineId: string) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(vaccineId)) {
        newSet.delete(vaccineId)
      } else {
        newSet.add(vaccineId)
      }
      return newSet
    })
  }

  const getStatusBadge = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge className='bg-red-500 hover:bg-red-600 text-white'>Out of Stock</Badge>
    } else if (quantity < 10) {
      return <Badge className='bg-yellow-500 hover:bg-yellow-600 text-white'>Low Stock</Badge>
    } else {
      return <Badge className='bg-green-500 hover:bg-green-600 text-white'>In Stock</Badge>
    }
  }

  if (isLoading) {
    return <div className='text-center py-4'>Loading...</div>
  }

  if (isError || !vaccineData) {
    return <div className='text-center py-4 text-red-500'>Error loading vaccines</div>
  }

  const { data: vaccines, total } = vaccineData
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(vaccines || [])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
      XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch()
    toast.success('Vaccines refreshed successfully')
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleDelete = (vaccineId: string) => {
    const vaccine = vaccines.find((v) => v.id === vaccineId)
    setLocalSelectedVaccine(vaccine || null)
    setOpenDeleteDialog(true)
  }

  const handleDeleteVaccine = () => {
    if (localSelectedVaccine) {
      deleteVaccine(localSelectedVaccine.id, {
        onSuccess: () => {
          setOpenDeleteDialog(false)
          setLocalSelectedVaccine(null)
          setParentSelectedVaccine(null)
          refetch()
          toast.success('Vaccine deleted successfully')
        },
        onError: (error) => {
          handleErrorApi({ error, setError: () => {}, duration: 3000 })
        }
      })
    }
    setOpenDeleteDialog(false)
  }

  return (
    <div className='grid gap-6'>
      {/* Search */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
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
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExport} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Export
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Refresh
          </Button>
          <Button size='sm' onClick={() => setOpenAddDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Vaccine
          </Button>
        </div>
      </div>

      {/* Add Vaccine Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vaccine</DialogTitle>
            <DialogDescription>Fill in the details to add a new vaccine to the system.</DialogDescription>
          </DialogHeader>
          <AddVaccine open={openAddDialog} onOpenChange={setOpenAddDialog} />
        </DialogContent>
      </Dialog>

      {/* Alert */}
      {vaccines.some((v) => v.remainingQuantity <= 10) && (
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
          {vaccines.length === 0 ? (
            <div className='p-4 text-center text-muted-foreground'>No vaccines found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>No.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price (VND)</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-[80px]'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccines.map((vaccine, index) => (
                  <TableRow
                    key={vaccine.id}
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => {
                      setLocalSelectedVaccine(vaccine)
                      setParentSelectedVaccine(vaccine)
                      setOpenEditDialog(true)
                    }}
                  >
                    <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                    <TableCell>
                      {vaccine.image ? (
                        <img
                          src={vaccine.image}
                          alt={vaccine.vaccineName}
                          className='w-12 h-12 object-cover rounded-md'
                        />
                      ) : (
                        <div className='w-12 h-12 bg-muted rounded-md flex items-center justify-center'>
                          <span className='text-xs text-muted-foreground'>No image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className='font-medium'>{vaccine.vaccineName}</TableCell>
                    <TableCell>
                      <div className='flex items-start gap-2'>
                        <div className='flex-1'>
                          {expandedDescriptions.has(vaccine.id) ? (
                            <div className='whitespace-pre-wrap'>{vaccine.description}</div>
                          ) : (
                            <div className='line-clamp-2'>{vaccine.description}</div>
                          )}
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6'
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleDescription(vaccine.id)
                          }}
                        >
                          {expandedDescriptions.has(vaccine.id) ? (
                            <ChevronUp className='h-4 w-4' />
                          ) : (
                            <ChevronDown className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{vaccine.price.toLocaleString()}</TableCell>
                    <TableCell>{vaccine.location}</TableCell>
                    <TableCell>{vaccine.batchNumber}</TableCell>
                    <TableCell>{vaccine.remainingQuantity}</TableCell>
                    <TableCell>{new Date(vaccine.expirationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(vaccine.remainingQuantity)}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation()
                            setLocalSelectedVaccine(vaccine)
                            setParentSelectedVaccine(vaccine)
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
                            handleDelete(vaccine.id)
                          }}
                        >
                          <Trash className='h-4 w-4 text-destructive text-red-500' />
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
          <div className='flex-1 text-sm text-muted-foreground'>{total} vaccine(s) total</div>
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
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Vaccine</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vaccine? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {localSelectedVaccine && (
              <p className='text-sm font-medium'>
                You are about to delete: <span className='font-bold'>{localSelectedVaccine.vaccineName}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button disabled={isDeletingVaccine} variant='destructive' onClick={handleDeleteVaccine}>
              {isDeletingVaccine ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

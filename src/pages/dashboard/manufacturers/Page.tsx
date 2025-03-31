import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Download, RefreshCw, X, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { ManufacturerTable } from './ManufacturerTable'
import { AddManufacturer } from './AddManufacturer'
import { UpdateManufacturer } from './UpdateManufacturer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  useListManufacturerQuery,
  useCreateManufacturerQuery,
  useUpdateManufacturerQuery,
  useDeleteManufacturerQuery
} from '@/queries/useManufacturer'
import { ManufacturerBodyType } from '@/schemaValidator/manufacturer.schema'
import { toast } from 'sonner'
import { handleErrorApi } from '@/core/lib/utils'
interface Manufacturer {
  id: string
  name: string
  country: string
  contactInfo: string
}

const ROWS_PER_PAGE = 10
export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const {
    data: manufacturersData,
    isLoading,
    refetch
  } = useListManufacturerQuery({
    page: currentPage,
    items_per_page: ROWS_PER_PAGE,
    search: searchTerm
  })
  const { mutate: createManufacturer } = useCreateManufacturerQuery()
  const { mutate: updateManufacturer } = useUpdateManufacturerQuery()
  const { mutate: deleteManufacturer } = useDeleteManufacturerQuery()

  const manufacturers = manufacturersData?.data || []

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(manufacturers)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Manufacturers')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
      saveAs(blob, 'manufacturers.xlsx')
      setIsExporting(false)
    }, 1000)
  }

  const handleAddManufacturer = (newManufacturer: ManufacturerBodyType) => {
    createManufacturer(newManufacturer, {
      onSuccess: () => {
        setOpenAddDialog(false)
        toast.success('Manufacturer added successfully')
        refetch()
      }
    })
  }

  const handleDeleteManufacturer = () => {
    if (selectedManufacturer) {
      deleteManufacturer(selectedManufacturer.id, {
        onSuccess: () => {
          setOpenDeleteDialog(false)
          setSelectedManufacturer(null)
          toast.success('Manufacturer deleted successfully')
          refetch()
        },
        onError: (error) => {
          handleErrorApi({ error, setError: () => {}, duration: 5000 })
        }
      })
    }
  }

  const handleUpdateManufacturer = (updatedManufacturer: ManufacturerBodyType) => {
    if (selectedManufacturer) {
      updateManufacturer(
        { id: selectedManufacturer.id, body: updatedManufacturer },
        {
          onSuccess: () => {
            setIsEditMode(false)
            setSelectedManufacturer(null)
            toast.success('Manufacturer updated successfully')
            refetch()
          }
        }
      )
    }
  }

  const handleEditManufacturer = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer)
    setIsEditMode(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchTerm('')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Data has been refreshed.')
    })
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
          Manufacturers
        </h1>
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
            Add Manufacturer
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              placeholder='Search by name or contact info...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full'
              type='search'
            />
            {searchTerm && (
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => setSearchTerm('')}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className='p-0'>
            {isLoading ? (
              <div className='p-8 text-center'>
                <LoadingSpinner className='mx-auto h-8 w-8' />
              </div>
            ) : manufacturers.length === 0 ? (
              <div className='flex flex-col items-center justify-center p-8 text-center'>
                <SearchX className='h-12 w-12 text-muted-foreground mb-4' />
                <p className='text-lg font-medium text-muted-foreground'>No manufacturers found</p>
                <p className='text-sm text-muted-foreground mt-2'>
                  {searchTerm ? 'Try adjusting your search terms' : 'Add a new manufacturer to get started'}
                </p>
              </div>
            ) : (
              <ManufacturerTable
                manufacturers={manufacturers}
                currentPage={currentPage}
                rowsPerPage={ROWS_PER_PAGE}
                onEdit={handleEditManufacturer}
                onDelete={(id) => {
                  setSelectedManufacturer(manufacturers.find((m) => m.id === id) || null)
                  setOpenDeleteDialog(true)
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {manufacturersData?.total && manufacturersData.total > ROWS_PER_PAGE && (
          <div className='flex justify-center gap-2 py-4'>
            <Button variant='outline' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className='flex items-center px-4'>
              Page {currentPage} of {Math.ceil(manufacturersData.total / ROWS_PER_PAGE)}
            </span>
            <Button
              variant='outline'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(manufacturersData.total / ROWS_PER_PAGE)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Add Manufacturer Dialog */}
      <AddManufacturer open={openAddDialog} onOpenChange={setOpenAddDialog} onSubmit={handleAddManufacturer} />

      {/* Update Manufacturer Dialog */}
      <UpdateManufacturer
        open={isEditMode}
        onOpenChange={(open) => {
          setIsEditMode(open)
          if (!open) setSelectedManufacturer(null)
        }}
        onSubmit={handleUpdateManufacturer}
        manufacturer={selectedManufacturer}
      />

      {/* Delete Dialog */}
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
            <Button variant='destructive' onClick={handleDeleteManufacturer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

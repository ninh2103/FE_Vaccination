import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Plus, Download, RefreshCw, Search } from 'lucide-react'
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
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Manufacturers
          </h1>
          <p className='text-muted-foreground'>Manage and monitor manufacturers in your system.</p>
        </div>
      </div>

      {/* Search */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              className='w-full'
              type='search'
            />
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
              Add Manufacturer
            </Button>
          </div>
        </div>

        {/* Table */}

        <Card>
          <CardContent className='p-0'>
            <ManufacturerTable
              isLoading={isLoading}
              manufacturers={manufacturers}
              currentPage={currentPage}
              rowsPerPage={ROWS_PER_PAGE}
              onEdit={handleEditManufacturer}
              onDelete={(id) => {
                setSelectedManufacturer(manufacturers.find((m) => m.id === id) || null)
                setOpenDeleteDialog(true)
              }}
            />
          </CardContent>
        </Card>

        {/* Pagination */}
        {manufacturersData?.total && manufacturersData.total > ROWS_PER_PAGE && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Showing {(currentPage - 1) * ROWS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ROWS_PER_PAGE, manufacturersData.total)} of {manufacturersData.total} entries
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.ceil(manufacturersData.total / ROWS_PER_PAGE) }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setCurrentPage(page)}
                      className='min-w-[2.5rem]'
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(manufacturersData.total / ROWS_PER_PAGE)))
                }
                disabled={currentPage >= Math.ceil(manufacturersData.total / ROWS_PER_PAGE)}
              >
                Next
              </Button>
            </div>
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

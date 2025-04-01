import { useState } from 'react'
import { Plus, Download, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { VaccineType } from '@/schemaValidator/vaccination.schema'
import * as XLSX from 'xlsx'
import VaccineTable from '@/pages/dashboard/vaccines/VaccineTable'
import AddVaccine from '@/pages/dashboard/vaccines/AddVaccine'
import UpdateVaccine from '@/pages/dashboard/vaccines/UpdateVaccine'
import { useListVaccinationQuery } from '@/queries/useVaccination'

export default function VaccinesPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineType | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { data: vaccines } = useListVaccinationQuery()

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(vaccines?.data || [])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
      XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and Action Buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Vaccines</h1>
          <p className='text-muted-foreground'>Manage and monitor vaccines in your system.</p>
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

      <VaccineTable setSelectedVaccine={setSelectedVaccine} setOpenEditDialog={setOpenEditDialog} />

      <AddVaccine open={openAddDialog} onOpenChange={setOpenAddDialog} setSelectedVaccine={setSelectedVaccine} />

      <UpdateVaccine open={openEditDialog} onOpenChange={setOpenEditDialog} selectedVaccine={selectedVaccine} />
    </div>
  )
}

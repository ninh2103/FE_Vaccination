'use client'

import { useState } from 'react'
import { Plus, Download, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Vaccine } from '@/pages/dashboard/vaccines/types'
import * as XLSX from 'xlsx'
import VaccineTable from '@/pages/dashboard/vaccines/VaccineTable'
import AddVaccine from '@/pages/dashboard/vaccines/AddVaccine'
import UpdateVaccine from '@/pages/dashboard/vaccines/UpdateVaccine'

const initialVaccines: Vaccine[] = [
  {
    id: 1,
    name: 'COVID-19 Vaccine',
    info: 'COVID-19 prevention',
    price: 500000,
    manufacturer: 'BioNTech',
    country: 'Germany',
    type: 'Adult',
    quantity: 15,
    expiryDate: '2025-12-31',
    doseInterval: '21 days',
    target: 'People over 12',
    dosage: '0.3ml',
    administration: 'Intramuscular',
    contraindications: 'Allergy',
    sideEffects: 'Pain, fatigue',
    storage: '2-8°C',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1625831152275-fa582de8188e'
  }
  // ... rest of the initial vaccines data
]

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>(initialVaccines)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(vaccines)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vaccines')
      XLSX.writeFile(workbook, `Vaccines_List_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setIsExporting(false)
    }, 1500)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVaccines(initialVaccines)
      setIsLoading(false)
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
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Refresh
          </Button>
          <Button size='sm' onClick={() => setOpenAddDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Vaccine
          </Button>
        </div>
      </div>

      <VaccineTable
        vaccines={vaccines}
        setVaccines={setVaccines}
        setSelectedVaccine={setSelectedVaccine}
        setOpenEditDialog={setOpenEditDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />

      <AddVaccine open={openAddDialog} onOpenChange={setOpenAddDialog} vaccines={vaccines} setVaccines={setVaccines} />

      <UpdateVaccine
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        selectedVaccine={selectedVaccine}
        vaccines={vaccines}
        setVaccines={setVaccines}
      />
    </div>
  )
}

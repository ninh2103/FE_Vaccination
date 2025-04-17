import { useState } from 'react'

import { VaccineType } from '@/schemaValidator/vaccination.schema'
import VaccineTable from '@/pages/dashboard/vaccines/VaccineTable'
import AddVaccine from '@/pages/dashboard/vaccines/AddVaccine'
import UpdateVaccine from '@/pages/dashboard/vaccines/UpdateVaccine'

export default function VaccinesPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineType | null>(null)
  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      {/* Title and Action Buttons */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Vaccines
          </h1>
          <p className='text-muted-foreground'>Manage and monitor vaccines in your system.</p>
        </div>
      </div>

      <VaccineTable setSelectedVaccine={setSelectedVaccine} setOpenEditDialog={setOpenEditDialog} />

      <AddVaccine open={openAddDialog} onOpenChange={setOpenAddDialog} />

      <UpdateVaccine open={openEditDialog} onOpenChange={setOpenEditDialog} selectedVaccine={selectedVaccine} />
    </div>
  )
}

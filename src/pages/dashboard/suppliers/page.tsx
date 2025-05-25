import { SuppliersTable } from './SuppliersTable'

export default function SuppliersPage() {
  return (
    <div className='flex flex-col gap-6  p-4'>
      <SuppliersTable onUpdateSuppliers={() => {}} />
    </div>
  )
}

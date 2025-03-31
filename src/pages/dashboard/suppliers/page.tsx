import { SuppliersTable } from './SuppliersTable'

export default function SuppliersPage() {
  return (
    <div className='flex flex-col gap-6 ml-[1cm] p-4'>
      <SuppliersTable onUpdateSuppliers={() => {}} />
    </div>
  )
}

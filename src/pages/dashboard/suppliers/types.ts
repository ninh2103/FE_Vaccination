export interface Supplier {
  id: number
  name: string
  logo: string
  country: string
  address: string
  phone: string
  email: string
  website: string
  status: 'Active' | 'Inactive'
  products: string[]
  contactPerson: string
  established: string
  leadTime: string
  rating: number
}

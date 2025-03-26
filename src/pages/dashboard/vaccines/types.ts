export interface Vaccine {
  id: number
  name: string
  image?: string
  info: string
  price: number
  manufacturer: string
  country: string
  type: string
  quantity: number
  expiryDate: string
  doseInterval: string
  target: string
  dosage: string
  administration: string
  contraindications: string
  sideEffects: string
  storage: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export type Discount = {
  amount: number
  percentage: number
}

export type Product = {
  id: number
  title: string
  srcUrl: string
  gallery?: string[]
  price: number
  description?: string
  quantity?: number
  expirationDate?: string
  manufacturer?: string
  supplier?: string
}

export type Review = {
  id: number
  user: string
  content: string
  date: string
}

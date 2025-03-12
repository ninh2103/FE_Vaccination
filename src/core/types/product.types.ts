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
}

export type Review = {
  id: number
  user: string
  content: string
  date: string
}

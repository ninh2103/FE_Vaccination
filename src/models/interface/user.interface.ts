export interface UserResponseType {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
}
export interface UserUpdateType {
  name?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  date_of_birth?: string
  country?: string
  role?: string
}

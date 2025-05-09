import { getAccessTokenFromLS, getUserFromLocalStorage } from '@/core/shared/storage'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getAccessTokenFromLS()
  const user = getUserFromLocalStorage()

  if (!token || !user || user.isVerified === false) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export const AdminRoute = ({ children, allowedRoles = ['ADMIN', 'EMPLOYEE', 'DOCTOR'] }: AdminRouteProps) => {
  const token = getAccessTokenFromLS()
  const user = getUserFromLocalStorage()

  if (!token || user?.isVerified === false) {
    return <Navigate to='/login' replace />
  }

  if (!allowedRoles.includes(user?.role || '')) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

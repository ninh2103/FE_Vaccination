import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import HomePage from '@/pages/home/HomePage'
import { useLocation, useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  return <div className="w-full">{routeElements}</div>
}

import LayoutClient from '@/app/layout/LayoutClient'
import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import Dashboard from '@/pages/dashboard/Dashboard'
import HomePage from '@/pages/home/HomePage'
import ListVaccination from '@/pages/vaccination/list-vaccination'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import BlogDetails from '@/pages/blog/BlogDetails'
import { useLocation, useRoutes } from 'react-router-dom'
import CarFeatures from '@/pages/vaccination/vaccination-detail'
import Profile from '@/pages/profile/Profile'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      {
        path: path.admin.dashboard,
        element: (
          <LayoutMain>
            <Dashboard />
          </LayoutMain>
        )
      },
      {
        path: path.list,
        element: (
          <LayoutClient>
            <ListVaccination />
          </LayoutClient>
        )
      },
      {
        path: path.detail,
        element: (
          <LayoutClient>
            <CarFeatures />
          </LayoutClient>
        )
      },
      {
        path: path.blog,
        element: (
          <LayoutClient>
            <BlogDetails />
          </LayoutClient>
        )
      },
      {
        path: path.profile,
        element: (
          <LayoutClient>
            <Profile />
          </LayoutClient>
        )
      },
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  return <div className='w-full'>{routeElements}</div>
}

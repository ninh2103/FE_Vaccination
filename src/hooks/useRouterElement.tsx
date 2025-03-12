import LayoutClient from '@/app/layout/LayoutClient'
import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import Dashboard from '@/pages/dashboard/Dashboard'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import BlogDetails from '@/pages/blog/BlogDetails'
import { useLocation, useRoutes } from 'react-router-dom'
import Profile from '@/pages/profile/Profile'
import VaccinePrices from '@/pages/pricelist/PricelistDetails'
import ServiceIntro from '@/pages/introduce/ServiceIntroduce'
import ResetPassword from '@/pages/reset-password/Reset-Password'
import ForgotPassword from '@/pages/forgot-password/Forgot-Password'
import ListVaccination from '@/pages/vaccination/list-vaccination'
import VaccineDetail from '@/pages/vaccineDetail/Vaccine-Detail'
import { OTPInput } from '@/pages/otp/otp'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.resetPassword, element: <ResetPassword /> },
      { path: path.forgotPassword, element: <ForgotPassword /> },
      { path: path.otp, element: <OTPInput /> },

      {
        path: path.admin.dashboard,
        element: (
          <LayoutMain>
            <Dashboard />
          </LayoutMain>
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
      {
        path: path.pricelist,
        element: (
          <LayoutClient>
            <VaccinePrices />
          </LayoutClient>
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
            <VaccineDetail />
          </LayoutClient>
        )
      },

      {
        path: path.introduce,
        element: <ServiceIntro />
      },
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  return <div className='w-full'>{routeElements}</div>
}

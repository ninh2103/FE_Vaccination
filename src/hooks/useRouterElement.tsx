import { useLocation, useRoutes } from 'react-router-dom'
import LayoutClient from '@/app/layout/LayoutClient'
import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import General from '@/pages/dashboard/General' // Import General thay vì Dashboard
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import BlogDetails from '@/pages/blog/BlogDetails'
import Profile from '@/pages/profile/Profile'
import VaccinePrices from '@/pages/pricelist/PricelistDetails'
import ServiceIntro from '@/pages/introduce/ServiceIntroduce'
import ResetPassword from '@/pages/reset-password/Reset-Password'
import ForgotPassword from '@/pages/forgot-password/Forgot-Password'

import { OTPInput } from '@/pages/otp/otp'
import ListVaccination from '@/pages/vaccination/list-vaccination'
import CheckOutPagePageMain from '@/pages/booking/Booking'
import BlogLayout from '@/pages/blog/BlogLayout'
import VaccineDetail from '@/pages/vaccineDetail/Vaccine-Detail'
import { BlogPage } from '@/pages/dashboard/blogs/Page'
import UsersPage from '@/pages/dashboard/users/Page'
import VaccinesPage from '@/pages/dashboard/vaccines/Page'
import PaymentsPage1 from '@/pages/dashboard/payments/Page'
import SuppliersPage from '@/pages/dashboard/suppliers/page'
import ManufacturersPage from '@/pages/dashboard/manufacturers/Page'
import OrdersPage from '@/pages/dashboard/orders/Page'
import AppointmentsPage from '@/pages/dashboard/appointments/Page'
import HistorysPage1 from '@/pages/dashboard/historys/Page'
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
        path: path.admin.dashboard, // Giả định là "/admin/dashboard"
        element: (
          <LayoutMain>
            <General /> {/* Thay Dashboard bằng General */}
          </LayoutMain>
        )
      },
      {
        path: path.admin.vaccines, // "/vaccines"
        element: (
          <LayoutMain>
            <VaccinesPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.post, // "/posts"
        element: (
          <LayoutMain>
            <BlogPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.suppliers, // "/suppliers"
        element: (
          <LayoutMain>
            <SuppliersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.manufacturers, // "/Manufacturers"
        element: (
          <LayoutMain>
            <ManufacturersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.users, // "/Users "
        element: (
          <LayoutMain>
            <UsersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.payments, // "/Payments "
        element: (
          <LayoutMain>
            <PaymentsPage1 />
          </LayoutMain>
        )
      },
      {
        path: path.admin.history, // "/History "
        element: (
          <LayoutMain>
            <HistorysPage1 />
          </LayoutMain>
        )
      },
      {
        path: path.admin.appointments, // "/Appointments "
        element: (
          <LayoutMain>
            <AppointmentsPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.order, // "/Order "
        element: (
          <LayoutMain>
            <OrdersPage />
          </LayoutMain>
        )
      },
      {
        path: path.blog,
        element: (
          <LayoutClient>
            <BlogLayout />
          </LayoutClient>
        ),
        children: [
          {
            path: ':id',
            element: <BlogDetails />
          },
          {
            path: '',
            element: <BlogDetails />
          }
        ]
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
        path: path.booking,
        element: (
          <LayoutClient>
            <CheckOutPagePageMain />
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

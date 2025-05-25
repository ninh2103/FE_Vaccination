import { useLocation, useRoutes } from 'react-router-dom'
import LayoutClient from '@/app/layout/LayoutClient'
import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import PageNotFound from '@/pages/404/PageNotFound'
import General from '@/pages/dashboard/General'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import BlogDetails from '@/pages/blog/BlogDetails'
import Profile from '@/pages/profile/Profile'
import VaccinePrices from '@/pages/pricelist/PricelistDetails'
import ServiceIntro from '@/pages/introduce/ServiceIntroduce'
import ResetPassword from '@/pages/reset-password/Reset-Password'
import ForgotPassword from '@/pages/forgot-password/Forgot-Password'
import Policy from '@/pages/Policy/Policy'
import { OTPInput } from '@/pages/otp/otp'
import ListVaccination from '@/pages/vaccination/list-vaccination'
import CheckOutPagePageMain from '@/pages/booking/Booking'
import BlogLayout from '@/pages/blog/BlogLayout'
import VaccineDetail from '@/pages/vaccineDetail/Vaccine-Detail'
import { BlogPage } from '@/pages/dashboard/blogs/Page'
import UsersPage from '@/pages/dashboard/users/Page'
import VaccinesPage from '@/pages/dashboard/vaccines/Page'
import PaymentsPage from '@/pages/dashboard/payments/Page'
import SuppliersPage from '@/pages/dashboard/suppliers/page'
import ManufacturersPage from '@/pages/dashboard/manufacturers/Page'
import OrdersPage from '@/pages/dashboard/orders/Page'
import AppointmentsPage from '@/pages/dashboard/appointments/Page'
import HistorysPage from '@/pages/dashboard/historys/Page'
import ProfilePage from '@/pages/profile-admin/profile'
import { CategoryPage } from '@/pages/dashboard/Category/Page'
import ResendVerifyEmail from '@/pages/resendEmail/resend-verify-email'
import { AdminRoute, ProtectedRoute } from '@/hooks/ProtectedRoute'
export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      {
        path: path.home,
        element: <HomePage />
      },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.resetPassword, element: <ResetPassword /> },
      { path: path.forgotPassword, element: <ForgotPassword /> },
      { path: path.reSendVerifyEmail, element: <ResendVerifyEmail /> },
      { path: path.otp, element: <OTPInput /> },

      {
        path: path.admin.dashboard,
        element: (
          <AdminRoute>
            <LayoutMain>
              <General />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.category,
        element: (
          <AdminRoute>
            <LayoutMain>
              <CategoryPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.vaccines,
        element: (
          <AdminRoute>
            <LayoutMain>
              <VaccinesPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.post,
        element: (
          <AdminRoute>
            <LayoutMain>
              <BlogPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.suppliers,
        element: (
          <AdminRoute>
            <LayoutMain>
              <SuppliersPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.manufacturers,
        element: (
          <AdminRoute>
            <LayoutMain>
              <ManufacturersPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.users,
        element: (
          <AdminRoute allowedRoles={['ADMIN']}>
            <LayoutMain>
              <UsersPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.payments,
        element: (
          <AdminRoute>
            <LayoutMain>
              <PaymentsPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.history,
        element: (
          <AdminRoute>
            <LayoutMain>
              <HistorysPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.appointments,
        element: (
          <AdminRoute>
            <LayoutMain>
              <AppointmentsPage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.admin.order,
        element: (
          <AdminRoute>
            <LayoutMain>
              <OrdersPage />
            </LayoutMain>
          </AdminRoute>
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
        path: path.admin.profile,
        element: (
          <AdminRoute>
            <LayoutMain>
              <ProfilePage />
            </LayoutMain>
          </AdminRoute>
        )
      },
      {
        path: path.profile,
        element: (
          <ProtectedRoute>
            <LayoutClient>
              <Profile />
            </LayoutClient>
          </ProtectedRoute>
        )
      },

      {
        path: path.pricelist,
        element: (
          <ProtectedRoute>
            <LayoutClient>
              <VaccinePrices />
            </LayoutClient>
          </ProtectedRoute>
        )
      },
      {
        path: path.policy,
        element: (
          <LayoutClient>
            <Policy />
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
          <ProtectedRoute>
            <LayoutClient>
              <CheckOutPagePageMain />
            </LayoutClient>
          </ProtectedRoute>
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

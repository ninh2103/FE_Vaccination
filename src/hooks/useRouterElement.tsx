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
import SearchResults from '@/pages/searchresults/SearchResults'
import ServiceDetail from '@/pages/serviceDetail/Service'

export default function useRoutesElements() {
  const location = useLocation()

  // Tính toán giá trị path trước nếu cần giá trị mặc định
  const searchPath = path.search ?? '/search'

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.resetPassword, element: <ResetPassword /> },
      { path: path.forgotPassword, element: <ForgotPassword /> },
      { path: path.otp, element: <OTPInput /> },
      { path: path.serviceDetail, element: <ServiceDetail /> },

      // Thêm route cho SearchResults
      {
        path: searchPath, // Sử dụng giá trị đã tính toán
        element: (
          <LayoutClient>
            <SearchResults />
          </LayoutClient>
        )
      },

      {
        path: path.admin.dashboard,
        element: (
          <LayoutMain>
            <General />
          </LayoutMain>
        )
      },
      {
        path: path.admin.vaccines,
        element: (
          <LayoutMain>
            <VaccinesPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.post,
        element: (
          <LayoutMain>
            <BlogPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.suppliers,
        element: (
          <LayoutMain>
            <SuppliersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.manufacturers,
        element: (
          <LayoutMain>
            <ManufacturersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.users,
        element: (
          <LayoutMain>
            <UsersPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.payments,
        element: (
          <LayoutMain>
            <PaymentsPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.history,
        element: (
          <LayoutMain>
            <HistorysPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.appointments,
        element: (
          <LayoutMain>
            <AppointmentsPage />
          </LayoutMain>
        )
      },
      {
        path: path.admin.order,
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
        path: path.admin.profile,
        element: (
          <LayoutMain>
            <ProfilePage />
          </LayoutMain>
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

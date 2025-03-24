import React from 'react'
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

import Vaccines from '@/pages/dashboard/Vaccines'
import Posts from '@/pages/dashboard/Posts'
import Suppliers from '@/pages/dashboard/Suppliers'
import Manufacturers from '@/pages/dashboard/Manufacturers'
import Users from '@/pages/dashboard/Users'
import Payments from '@/pages/dashboard/Payments'
import History from '@/pages/dashboard/History'
import Appointments from '@/pages/dashboard/Appointments'
import Order from '@/pages/dashboard/Order'
import { OTPInput } from '@/pages/otp/otp'
import VaccinesPage from '@/pages/dashboard/Vaccines'
import ListVaccination from '@/pages/vaccination/list-vaccination'
import CheckOutPagePageMain from '@/pages/booking/Booking'
import BlogList from '@/pages/blog/BlogList'
import VaccineDetail from '@/pages/vaccineDetail/Vaccine-Detail'
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
            <Vaccines />
          </LayoutMain>
        )
      },
      {
        path: path.admin.post, // "/posts"
        element: (
          <LayoutMain>
            <Posts />
          </LayoutMain>
        )
      },
      {
        path: path.admin.suppliers, // "/suppliers"
        element: (
          <LayoutMain>
            <Suppliers />
          </LayoutMain>
        )
      },
      {
        path: path.admin.manufacturers, // "/Manufacturers"
        element: (
          <LayoutMain>
            <Manufacturers />
          </LayoutMain>
        )
      },
      {
        path: path.admin.users, // "/Users "
        element: (
          <LayoutMain>
            <Users />
          </LayoutMain>
        )
      },
      {
        path: path.admin.payments, // "/Payments "
        element: (
          <LayoutMain>
            <Payments />
          </LayoutMain>
        )
      },
      {
        path: path.admin.history, // "/History "
        element: (
          <LayoutMain>
            <History />
          </LayoutMain>
        )
      },
      {
        path: path.admin.appointments, // "/Appointments "
        element: (
          <LayoutMain>
            <Appointments />
          </LayoutMain>
        )
      },
      {
        path: path.admin.order, // "/Order "
        element: (
          <LayoutMain>
            <Order />
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
        path: path.bloglist,
        element: (
          <LayoutClient>
            <BlogList />
          </LayoutClient>
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

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
import Aboutus from '@/pages/aboutus/AboutUs'
import PriceList from '@/pages/pricelist/PriceList'
import BuyVaccines from '@/pages/buyvaccine/BuyVaccines'
import VaccineDetails from '@/pages/vaccinedetail/VaccineDetails'
import VaccinRegister from '@/pages/vaccinregister/VaccinRegister'
import Contactus from '@/pages/contactus/Contactus'
import Vaccinationhistory from '@/pages/vaccinationhistory/vaccinationhistory'
export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <HomePage /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.aboutus, element: <Aboutus /> },
      { path: path.pricelist, element: <PriceList /> },
      { path: path.buyvaccines, element: <BuyVaccines /> },
      { path: path.vaccinedetail, element: <VaccineDetails /> },
      { path: path.vaccinregister, element: <VaccinRegister /> },
      { path: path.contactus, element: <Contactus /> },
      { path: path.vaccinationhistory, element: <Vaccinationhistory /> },
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
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  return <div className='w-full'>{routeElements}</div>
}

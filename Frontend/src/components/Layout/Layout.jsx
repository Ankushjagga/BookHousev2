import React from 'react'
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'

const Layout = () => {
  const location = useLocation()
  const isAdminRoutes = location.pathname.startsWith("/admin")
  return (
    <>
    {isAdminRoutes ? <AdminHeader/> : <Header/> }
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
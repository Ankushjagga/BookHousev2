import React from 'react'
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import SideMenu from '../AdminHeader/SideMenu'

const AdminLayout = () => {

  return (
    <>
    <div className='admindashboard'>
    
    <SideMenu/>
    <Outlet/>
    </div>
    </>
  )
}

export default AdminLayout
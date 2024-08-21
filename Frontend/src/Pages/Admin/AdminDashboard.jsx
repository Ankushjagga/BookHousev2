import React from 'react'
import SideMenu from '../../components/AdminHeader/SideMenu'
import "./admindashboard.css"
import Buttons from '../../components/AdminHeader/Buttons'
const AdminDashboard = () => {
  return (
    <>
    <div className='admindashboard'>
    <SideMenu/>
<Buttons/>
    </div>

    
    </>
  )
}

export default AdminDashboard
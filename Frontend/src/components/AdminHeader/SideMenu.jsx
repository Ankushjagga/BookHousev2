import React from 'react'
import { NavLink, useLocation , useNavigate } from 'react-router-dom'

import "./sidemenu.css"
const SideMenu = () => {
  const {pathname}=useLocation()

  return (
    <ul id='sidemenu'>
       <NavLink to = "/adminDashboard"  className= {(pathname === '/adminDashboard') ? 'active   lin' : 'nav-link lin'} > <li>Dashboard</li></NavLink>
        <NavLink to ="/adminUsers" className= {(pathname === '/adminUsers') ? 'active   lin' : 'nav-link lin'}><li>Users</li></NavLink>
        <NavLink to ="/adminProducts" className= {(pathname === '/adminProducts') ? 'active   lin' : 'nav-link lin'}><li>Products</li></NavLink>
        <NavLink to ="/adminMessages" className= {(pathname === '/adminMessages') ? 'active   lin' : 'nav-link lin'}><li>Messages</li></NavLink>
        <NavLink to ="/adminOrders" className= {(pathname === '/adminOrders') ? 'active   lin' : 'nav-link lin'}><li>Orders</li></NavLink>
        <NavLink to ="/adminReviews" className= {(pathname === '/adminReviews') ? 'active   lin' : 'nav-link lin'}><li>Reviews</li></NavLink>
    </ul>
  )
}

export default SideMenu
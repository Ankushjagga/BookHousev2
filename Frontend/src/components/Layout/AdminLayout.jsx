import React ,{useEffect}from 'react'
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import SideMenu from '../AdminHeader/SideMenu'
import Cookies from "js-cookie"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = () => {
  const token = Cookies.get("token")
  const role = Cookies.get("role")
  const Navigate = useNavigate()
  useEffect(() => {
    if(!token || role !== "admin"){
      toast.error("Only for Admin  ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    Navigate("/")
    }
    }, [])

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
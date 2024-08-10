import React from 'react'
import "../Header/header.css"
import logo from "../../images/logo.png";
import { NavLink, useLocation , useNavigate } from 'react-router-dom'
import { authData, logout } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearAllSliceData, productData, totalItemsInCart } from '../../redux/Product';
import Cookies from "js-cookie";
import { clearAdminSliceStates } from '../../redux/Admin';
const AdminHeader = () => {
    const token = Cookies.get("token");
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const handleLogout = ()=>{
    // Get an array of all cookie names
    var allCookies = Object.keys(Cookies.get());

    // Loop through the cookie names and remove each cookie
    allCookies.forEach(function (cookieName) {
      Cookies.remove(cookieName);
    });
    dispatch(logout());
    dispatch(clearAdminSliceStates())
    navigate("/adminLogin");
    toast.success("logout Sucessfully !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });


}
  return (
    <div className='navbar'>

  <div className='title'>
  
  <img src= {logo} alt='logo'/>
    <h2>  Book<span className='rad'><b>House</b></span></h2>
  </div>
  {token ? 
    <li className= 'nav-link lin' onClick={handleLogout}>Logout</li> 
  :
    <h3>ADMIN PANEL</h3>
}
</div>

)
}

export default AdminHeader
import React,{useContext, useState} from 'react'
import "./header.css"
import logo from "../../images/logo.png";
import { NavLink, useLocation , useNavigate } from 'react-router-dom'
import { authData, logout } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from "js-cookie";

const Header = ({name}) => {
  const [isActive, setActive] = useState("false");
  const navigate = useNavigate()
  const {pathname}=useLocation()
const dispatch = useDispatch()
  const { loggedInUserName,
    loggedInUserId} = useSelector(authData)
  const ToggleClass = () => {
    setActive(!isActive); 
  };
  const handleLogout = ()=>{
      // Get an array of all cookie names
      var allCookies = Object.keys(Cookies.get());

      // Loop through the cookie names and remove each cookie
      allCookies.forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      dispatch(logout());
      navigate("/login");

  }
  return (
    <div className='navbar'>

  <NavLink to="/" className="nav-lin">
<div className='title'>

<img src= {logo} alt='logo'/>
  <h2>  Book<span className='rad'><b>House</b></span></h2>
</div>
  </NavLink>
  <ul>
 


     <>
         <div className={ isActive ? "nav": "toggle"}>

  <NavLink to = "/shop" className= {(pathname === '/shop') ? 'active   lin' : 'nav-link lin'}  ><li>Shop</li></NavLink>
  <NavLink to = "/contact" className= {(pathname === '/contact') ? 'active   lin' : 'nav-link lin'} ><li>Contact</li></NavLink>
  {loggedInUserId ?
    <li className= 'nav-link lin' onClick={handleLogout}>Logout</li> 
 : 
<NavLink to = "/login" className= {(pathname === '/login') ? 'active   lin' : 'nav-link lin'}  ><li>Login in</li></NavLink>
 }
  <NavLink to = "/cart"><li className='cart'><i className="fa-solid fa-cart-shopping"></i> <p className='cart-no'>0</p> </li></NavLink>

  
    
        </div>
     <div id="menu"  className={ isActive ? "fas fa-bars": "fas fa-times"} onClick={ToggleClass}></div>

     </>

  </ul>
  </div>
)
  
}

export default Header
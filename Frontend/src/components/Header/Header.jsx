import React,{useContext, useState} from 'react'
import "./header.css"
import logo from "../../images/logo.png";
import { NavLink, useLocation } from 'react-router-dom'

const Header = ({name}) => {
  const [isActive, setActive] = useState("false");
  const {pathname}=useLocation()
  const ToggleClass = () => {
    setActive(!isActive); 
  };
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
  <NavLink to = "/login" className= {(pathname === '/login') ? 'active   lin' : 'nav-link lin'}  ><li>Login in</li></NavLink>
  <NavLink to = "/cart"><li className='cart'><i className="fa-solid fa-cart-shopping"></i> <p className='cart-no'>0</p> </li></NavLink>

  
    
        </div>
     <div id="menu"  className={ isActive ? "fas fa-bars": "fas fa-times"} onClick={ToggleClass}></div>

     </>

  </ul>
  </div>
)
  
}

export default Header
import React,{useContext, useState , useEffect} from 'react'
import "./header.css"
import logo from "../../images/logo.png";
import { NavLink, useLocation , useNavigate } from 'react-router-dom'
import { authData, logout } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearAllSliceData, productData, totalItemsInCart } from '../../redux/Product';
import Cookies from "js-cookie";

const Header = ({name}) => {
  const [isActive, setActive] = useState("false");
  const [totalItems , setTotalItems] = useState(0)
  const navigate = useNavigate()
  const {pathname}=useLocation()
const dispatch = useDispatch()
const token = Cookies.get("token")
const {totalCartItems , cartProductsList} = useSelector(productData)
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
      dispatch(clearAllSliceData())
      navigate("/login");
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

  useEffect(() => {
   setTotalItems(totalCartItems)
  }, [totalCartItems])
  

 
  

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

  {token ?
  <>
    <li className= 'nav-link lin' onClick={handleLogout}>Logout</li> 
   <NavLink to ="/dashboard"> <li className= {(pathname === '/dashboard') ? 'active   lin' : 'nav-link lin'}>Dashboard</li> </NavLink>
  </>
 : 
<NavLink to = "/login" className= {(pathname === '/login') ? 'active   lin' : 'nav-link lin'}  ><li>Login in</li></NavLink>
 }
<NavLink to = "/search" className='nav-link search'  ><li title='search'><i className="fa-solid fa-search"></i></li></NavLink>
  <NavLink to = "/cart"><li className='cart'><i className="fa-solid fa-cart-shopping"></i> <p className='cart-no'>{totalItems}</p> </li></NavLink>

  
    
        </div>
     <div id="menu"  className={ isActive ? "fas fa-bars": "fas fa-times"} onClick={ToggleClass}></div>

     </>

  </ul>
  </div>
)
  
}

export default Header
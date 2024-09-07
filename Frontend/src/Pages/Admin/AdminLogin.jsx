import React,{useState,useContext, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../login/register.css"
import { NavLink , useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "../../images/Admin.png"
import { useDispatch , useSelector } from 'react-redux';
import { loginAdmin , adminData, clearAdminSliceStates } from '../../redux/Admin';
import Cookies from "js-cookie";

const AdminLogin = () => {

  const [user,setUser]=useState({email:"",password:""});
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")
  const [error , setError] = useState({email:"", password : ""})

  const dispatch = useDispatch()
  const {loggedInUserName, isAdminSliceSuccess , adminSliceSuccessMessage , isAdminSliceError , adminSliceErrorMessage} = useSelector(adminData)


  const Navigate =useNavigate();
const token = Cookies.get("token")
const role = Cookies.get("role")

  useEffect(() => {
    if(token && role === "admin" ){
      toast.error("need to logout first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      Navigate("/adminDashboard")
    }
   
  }, [])
  useEffect(() => {
    if(isAdminSliceSuccess){
      dispatch(clearAdminSliceStates())
      toast.success(adminSliceSuccessMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        Navigate("/adminDashboard")
    }
    
    }, [isAdminSliceSuccess])
    
    useEffect(() => {
      if(isAdminSliceError){
  dispatch(clearAdminSliceStates())

        toast.error(adminSliceErrorMessage, {
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
    }, [isAdminSliceError])
    

let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
setUser({...user,[name]:value})
setError({ ...error, [name]: '' });

  }

 
  const handleEyeClick = () =>{
    if (icon === "fa-eye-slash") {
      setIcon("fa-eye")
    setPasswordInput("text")

  }else{
    setIcon("fa-eye-slash")
    setPasswordInput("password")
  }
}
const handleSubmit =(e)=>{
  e.preventDefault();
  const newErrorObj = {
    email : "",
    password : ""
  }

  if(!user.email){
    newErrorObj.email = "email is required"
  }
  if(!user.password){
    newErrorObj.password = "password is required"
  }
for (let key in newErrorObj) {
 if(newErrorObj[key]){
  setError(newErrorObj)
  return ;
 }
    
  }

  dispatch(loginAdmin(user))
} 





  return (
   <>
   <div className="container" id="container">
    <div className="details">
		<img className='login-img' src="https://res.cloudinary.com/daqnsxiyw/image/upload/v1724395542/Admin_bwlawg.png" alt='img' />
		</div>
	<div className="login-in-container">
<form method='POST' className='loginForm'>
    <h1>Login </h1>
  <input className='inp' type="email" placeholder="Enter Email"name='email' value={user.email}  onChange={handleInputs}   required/>
  {error.email}
  <span className = "passwordSpan">

  <input  className='inp'type={passwordInput} placeholder="Enter Password"name='password'  value={user.password}  onChange={handleInputs} required/> <i className={`fa-solid ${icon}`} onClick={handleEyeClick} ></i>
  {error.password}
  </span>

  <button className='btn' id='bt'  placeholder='Submit'onClick={handleSubmit}  >Submit</button>

</form>

	</div>
			
			
	
</div>
   </>
  )
}

export default AdminLogin
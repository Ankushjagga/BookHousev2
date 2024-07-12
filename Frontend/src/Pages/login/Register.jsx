import React,{useState,useContext , useEffect} from 'react'

import Image from "../../images/register.png"
import { NavLink ,useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authData, clearAllSliceStates, registerUser } from '../../redux/auth';

import "./register.css";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";

const Register = () => {

  const Navigate=useNavigate();
  const [user,setUser]=useState({   name:"", email:"",password:"", phoneNumber:""});
  const [error,setError]=useState({   name:"", email:"",password:"", phoneNumber:""});
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")

  const dispatch = useDispatch();
  const {loggedInUserName, isAuthSliceSuccess , authSliceSuccessMessage , isAuthSliceError , authSliceErrorMessage} = useSelector(authData)
  const token = Cookies.get("token")

  useEffect(() => {
    if(token){
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
      Navigate("/")
    }
   
  }, [])

useEffect(() => {
if(isAuthSliceSuccess){
  dispatch(clearAllSliceStates())
  toast.success(authSliceSuccessMessage, {
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

}, [isAuthSliceSuccess])

useEffect(() => {
  if(isAuthSliceError){
  dispatch(clearAllSliceStates())

    toast.error(authSliceErrorMessage, {
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
}, [isAuthSliceError])


let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
setUser({...user,[name]:value})
setError({...error , [name]:""})
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

const handleSubmit = (e)=>{
  e.preventDefault();
const newErrorObj = {   name:"", email:"",password:"", phoneNumber:""}
if(!user.name){
  newErrorObj.name = "name is required"
}
if(!user.email) {
  newErrorObj.email = "email is required"
}
if(!user.password){
  newErrorObj.password =  "password is required"
}
if(!user.phoneNumber){
  newErrorObj.phoneNumber = "phoneNumber is required"
}

for (const key in newErrorObj) {
  if (newErrorObj[key]) {
    setError(newErrorObj)
    return ;
    
  }
}

  console.log("submit");
  dispatch(registerUser(user))
  // Navigate("/")
}



console.log("authslcie ", isAuthSliceSuccess)



  return (
  <>
  <div className="container" id="container">
<div className="details">
		<img className='login-img' src={Image} alt='img' />
		</div>
<div className="login-in-container">                                                      
<form method='POST' className='loginForm signinForm'>
      <h1>Register Yourself</h1>
  <input type="text"className='inp' placeholder="Enter name"   name="name"  value={user.name} onChange={handleInputs} required/>
  {error.name}
  <input type="email"className='inp' placeholder="Enter Email"   name="email" value={user.email} onChange={handleInputs}required/>
  {error.email}
  <span className = "passwordSpan">

  <input type={passwordInput} className='inp'placeholder="Enter Password"   name="password" value={user.password} onChange={handleInputs} required/> <i className={`fa-solid ${icon}`} onClick={handleEyeClick} ></i>
  {error.password}
</span> 
  <input type="number"className='inp' placeholder="Enter PhoneNumber"   name="phoneNumber" value={user.phoneNumber} onChange={handleInputs}  required/>
{error.phoneNumber}

<button className='btn' id='bt' type="submit" placeholder='Submit' onClick={handleSubmit}>Register</button>

<p style={{margin: "1rem"}} >already registered ? <NavLink to="/login"><i style={{color: "#4267B2",textDecoration:"underline"}} > login  now.</i></NavLink> </p>
</form>

	</div>
			
			
	
</div>
  </>
  )
}

export default Register
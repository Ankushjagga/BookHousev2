import React,{useState,useContext, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink , useNavigate , useParams} from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "../../images/Resetpassword.png"
import { authData, clearAllSliceStates, resetPassword } from '../../redux/auth';
import { useDispatch , useSelector } from 'react-redux';

const ResetPassword = () => {
    
  const [password,setPassword]=useState("");
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")
  const [error , setError] = useState("")

  const dispatch = useDispatch()
  const {loggedInUserName, isAuthSliceSuccess , authSliceSuccessMessage , isAuthSliceError , authSliceErrorMessage} = useSelector(authData)


  const Navigate =useNavigate();
  const {token} = useParams()

let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
setPassword(value)
setError({ ...error, [name]: '' });

  }

 
 
const handleSubmit =(e)=>{
  e.preventDefault();
  const newErrorObj = {
    password : "",
   
  }

  if(!password){
    newErrorObj.password = "password is required"
  }
 
for (let key in newErrorObj) {
 if(newErrorObj[key]){
  setError(newErrorObj)
  return ;
 }
    
  }

  dispatch(resetPassword({
    password : password,
    token :token

  }))
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

useEffect(() => {
 if(isAuthSliceSuccess) {
    sucessToast()

       dispatch(clearAllSliceStates())
       dispatch(clearAllSliceStates())
 }
 
}, [isAuthSliceSuccess])
useEffect(() => {
    if(isAuthSliceError) {
       errorToast()
       dispatch(clearAllSliceStates())
       dispatch(clearAllSliceStates())
    }
    
   }, [isAuthSliceError])

  
   

const sucessToast =()=>{

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
    
  
}
const errorToast = ()=>{

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

  return (
    <div className="container" id="container">
    <div className="details">
		<img className='login-img' src={Image} alt='img' />
		</div>
	<div className="login-in-container">
<form method='POST' className='loginForm'>
    <h1>Reset Your Password  </h1>
    <span className = "passwordSpan">

<input  className='inp'type={passwordInput} placeholder="Enter  New Password"name='password'  value={password}  onChange={handleInputs} required/> <i className={`fa-solid ${icon}`} onClick={handleEyeClick} ></i>
<p style={{color : "red"}}> {error.password}</p>
</span>
  <button className='btn' id='bt'  placeholder='Submit'onClick={handleSubmit}  >Submit</button>
</form>

	</div>
			
			
	
</div>
  )
}

export default ResetPassword
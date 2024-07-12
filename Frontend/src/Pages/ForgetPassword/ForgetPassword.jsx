import React,{useState,useContext, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink , useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Image from "../../images/Login.png"
import { authData, forgetPassword , clearAllSliceStates } from '../../redux/auth';
import { useDispatch , useSelector } from 'react-redux';

const ForgetPassword = () => {
    
  const [email,setEmail]=useState("");
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")
  const [error , setError] = useState("")

  const dispatch = useDispatch()
  const {loggedInUserName, isAuthSliceSuccess , authSliceSuccessMessage , isAuthSliceError , authSliceErrorMessage} = useSelector(authData)


  const Navigate =useNavigate();

let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
setEmail(value)
setError({ ...error, [name]: '' });

  }

 
 
const handleSubmit =(e)=>{
  e.preventDefault();
  const newErrorObj = {
    email : "",
   
  }

  if(!email){
    newErrorObj.email = "email is required"
  }
 
for (let key in newErrorObj) {
 if(newErrorObj[key]){
  setError(newErrorObj)
  return ;
 }
    
  }

  dispatch(forgetPassword({email}))
} 

useEffect(() => {
    if(isAuthSliceSuccess) {
       sucessToast()
   
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
		{/* <img className='login-img' src={Image} alt='img' /> */}
		</div>
	<div className="login-in-container">
<form method='POST' className='loginForm'>
    <h1>Forget Password ? </h1>
  <input className='inp' type="email" placeholder="Enter Email"name='email' value={email}  onChange={handleInputs}   required/>
  {error.email}
  <button className='btn' id='bt'  placeholder='Submit'onClick={handleSubmit}  >Submit</button>
</form>

	</div>
			
			
	
</div>
  )
}

export default ForgetPassword
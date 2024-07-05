import React,{useState,useContext} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./register.css"
import { NavLink , useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "../../images/Login.png"
import { authData, loginUser, registerUser } from '../../redux/auth';
import { useDispatch , useSelector } from 'react-redux';

const Login = () => {

  const history=useNavigate();
  const [user,setUser]=useState({
     email:"",password:""
  });
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")
  const dispatch = useDispatch()
  const {loggedInUserName} = useSelector(authData)
let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
setUser({...user,[name]:value})
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
  dispatch(loginUser(user))
}  

  return (
   <>
   <div className="container" id="container">
    <div className="details">
		<img className='login-img' src={Image} alt='img' />
		</div>
	<div className="login-in-container">
<form method='POST' className='loginForm'>
    <h1>Login </h1>
  <input className='inp' type="email" placeholder="Enter Email"name='email' value={user.email}  onChange={handleInputs}   required/>
  <span className = "passwordSpan">

  <input  className='inp'type={passwordInput} placeholder="Enter Password"name='password'  value={user.password}  onChange={handleInputs} required/> <i className={`fa-solid ${icon}`} onClick={handleEyeClick} ></i>
  </span>

  <button className='btn' id='bt'  placeholder='Submit'onClick={handleSubmit}  >Submit</button>
  <p style={{margin: "1rem"}} >New to BookHouse? <NavLink to="/register"><i style={{color: "#4267B2",textDecoration:"underline"}} > Sign up now.</i></NavLink> </p>
</form>

	</div>
			
			
	
</div>
   </>
  )
}

export default Login
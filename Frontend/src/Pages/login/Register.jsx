import React,{useState,useContext} from 'react'

import Image from "../../images/register.png"
import { NavLink ,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authData, registerUser } from '../../redux/auth';

import "./register.css";
import { useDispatch, useSelector } from 'react-redux';
const Register = () => {

  const history=useNavigate();
  const [user,setUser]=useState({
    name:"", email:"",password:"", phoneNumber:""
  });
  const [icon, setIcon] = useState("fa-eye-slash")
  const [passwordInput , setPasswordInput] = useState("password")
  const dispatch = useDispatch();
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

const handleSubmit = (e)=>{
  e.preventDefault();
  console.log("submit");
  dispatch(registerUser(user))
}
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
  <input type="email"className='inp' placeholder="Enter Email"   name="email" value={user.email} onChange={handleInputs}required/>
  <span className = "passwordSpan">

  <input type={passwordInput} className='inp'placeholder="Enter Password"   name="password" value={user.password} onChange={handleInputs} required/> <i className={`fa-solid ${icon}`} onClick={handleEyeClick} ></i>
</span> 
  <input type="number"className='inp' placeholder="Enter PhoneNumber"   name="phoneNumber" value={user.phoneNumber} onChange={handleInputs}  required/>


<button className='btn' id='bt' type="submit" placeholder='Submit' onClick={handleSubmit}>Register</button>

<p style={{margin: "1rem"}} >already registered ? <NavLink to="/login"><i style={{color: "#4267B2",textDecoration:"underline"}} > login  now.</i></NavLink> </p>
</form>

	</div>
			
			
	
</div>
  </>
  )
}

export default Register
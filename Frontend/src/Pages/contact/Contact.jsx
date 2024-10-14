import React,{useEffect,useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";


import contact from "../../images/contact.png";
import { ToastContainer, toast } from 'react-toastify';
import { authData, clearAllSliceStates, contactUs } from '../../redux/auth';
import smalluploadLoader from "../../images/smalluploadLoader.gif"

import "./contact.css"
import { useDispatch, useSelector } from 'react-redux';
const Contact = () => {
  const token = Cookies.get('token');
const {authSliceSuccessMessage ,authSliceErrorMessage , isAuthSliceSuccess ,isAuthSliceFetchingSmall ,isAuthSliceError} = useSelector(authData)
  const [userData,setuserData] = useState({name:"",email:"",message:""});
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  const loginData = Cookies.get("loginData") ? JSON.parse( Cookies.get("loginData")) : null;

const handleInput=(e)=>{
const name=e.target.name;
const value=e.target.value;
setuserData({...userData,[name]:value})
}
useEffect(() => {
setuserData({name: loginData?.name , email : loginData?.email , message : ""})
console.log(loginData?.name)

},[])
useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);
useEffect(() => {
  if(!token){
    toast.error("need to login first", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }); 
      Navigate("/login")
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
  

const submitContact = (e)=>{
  e.preventDefault()
  dispatch(contactUs(userData))
}


  return (
   <>
   <section > 
   <h1 className='categories'><span className='sp'>  Contact<span className='rad'> Us</span>  </span></h1>

<div className="row">


<form method='POST' className='contact-from'>
<div className='inputs'>

<input type="text"  className="inp" placeholder="Enter name"  value={userData.name} required onChange={handleInput} name="name" readOnly />
<input type="email"className="inp"  placeholder="Enter email"  value={userData.email} required onChange={handleInput}  name="email" readOnly />
</div>

<textarea placeholder='Enter message' className="inp"  rows={5}  value={userData.message} onChange={handleInput} name="message" ></textarea>
<button className='btn' type="submit" placeholder="send Message 😄" onClick={submitContact} >Send<i className="fas fa-paper-plane"></i>
{isAuthSliceFetchingSmall && <img className='load' src={smalluploadLoader} alt="Image Uploading" />}

</button>
</form>
<div className="details">
    <img className='login-img img' src="https://res.cloudinary.com/daqnsxiyw/image/upload/v1724395542/contact_fhkxdd.png" alt='img' />
    </div>
</div>



</section> 
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.5987784700237!2d74.50219761507292!3d30.191453181829136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917172bce8a5227%3A0xb6dc4097ec6881d!2sJagga%20Book%20Center!5e0!3m2!1sen!2sin!4v1653230834868!5m2!1sen!2sin" width="1550" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="map" title='map'></iframe>
   </>
  )
}

export default Contact
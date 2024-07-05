import React,{useEffect,useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


import contact from "../../images/contact.png";
import { ToastContainer, toast } from 'react-toastify';

import "./contact.css"
const Contact = () => {

  const [userData,setuserData] = useState({name:"",email:"",message:""});
const history = useNavigate()
  const callcontactPage= async()=>{ 
    try{
    
      const res= await fetch("/getdata",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data = await res.json();
      
      console.log(data._id); 
 


      setuserData({...userData,name:data.name,email:data.email});
      if(res.status!==200 || !data){
        history("/login")
        toast(data,{position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        type:"error",
        progress: undefined,
        theme: "dark",})
      }
      const intialState = localStorage.getItem("ankushid");
      localStorage.setItem("ankushid", (data._id));
    }
    catch(err){
      console.log(err);
      // alert("you need to loin first");
    }
     
    
    }
const submitcontact=async (e)=>{
  try{
    e.preventDefault();

    const {name,email,message}= userData;
    const res= await fetch("/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
      },
      credentials:"include",

      body:JSON.stringify({
        name,email,message
      })
      
    })
    const data=await res.json();
    console.log(data);
    if(!data || res.status!==200){
      console.log("not send");
      toast(data,{position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      type:"error",
      progress: undefined,
      theme: "dark",})
    }
    else{
      toast(data,{position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      type:"success",
      progress: undefined,
      theme: "dark",})
    }
  }catch(error){
    console.log(error);
  }
  }
const handleInput=(e)=>{
const name=e.target.name;
const value=e.target.value;
setuserData({...userData,[name]:value})
}
useEffect(() => {
  callcontactPage();


},[])

  return (
   <>
   <section > 
   <h1 className='categories'><span className='sp'>  Contact<span className='rad'> Us</span>  </span></h1>

<div className="row">


<form method='POST' className='contact-from'>
<div className='inputs'>

<input type="text"  className="inp" placeholder="Enter name"  value={userData.name} required onChange={handleInput} name="name"  />
<input type="email"className="inp"  placeholder="Enter email"  value={userData.email} required onChange={handleInput}  name="email" />
</div>

<textarea placeholder='Enter message' className="inp"  rows={5}  value={userData.message} onChange={handleInput} name="message" ></textarea>
<button className='btn' type="submit" placeholder="send Message 😄" onClick={submitcontact} >Send<i className="fas fa-paper-plane"></i></button>
</form>
<div className="details">
    <img className='login-img img' src={contact} alt='img' />
    </div>
</div>



</section> 
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.5987784700237!2d74.50219761507292!3d30.191453181829136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917172bce8a5227%3A0xb6dc4097ec6881d!2sJagga%20Book%20Center!5e0!3m2!1sen!2sin!4v1653230834868!5m2!1sen!2sin" width="1550" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="map" title='map'></iframe>
   </>
  )
}

export default Contact
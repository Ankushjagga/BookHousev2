import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import "./footer.css"
const Footer = () => {
    const [name,setname] = useState("")
    const getNoify= ()=>{
        if(name === ""){
            toast.error("Please enter your email !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });  
        }else{

            toast.success("Subscribe for newsLetter Sucessfully !", {
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
    }
  return (
   <>
   <div className="footer">

<div className="box-container">

      <div className="box">
          <h3>quick links</h3>
       <NavLink to="/">Home</NavLink>   
       <NavLink to="/shop">Shop</NavLink>   
       <NavLink to="/signin">Sign in</NavLink>   
       <NavLink to="/contact">Contact us</NavLink>   
      </div>

     

      <div className="box">
          <h3>Details</h3>
          <p> <i className="fas fa-phone"></i> 98760xxxxx </p>
          <p> <i className="fas fa-phone"></i> 96325xxxxx </p>
          <p> <i className="fas fa-envelope"></i> BookHouse@gmail.com </p>
          <p> <i className="fas fa-map"></i> punjab, india  </p>
         
      </div>

      <div className="box">
          <h3>newsletter</h3>
          <p>subscribe for latest updates</p>
          <form>
              <input type="email" name="name" value={name} onChange={(e)=> setname(e.target.value)} className="email" placeholder="enter your email" required/>
              <button type="submit" className="btn" onClick={getNoify}> Subscribe <i className="fa-solid fa-bell"></i></button>
              
          </form>
      </div>

  </div>
</div>
<div className="credit"><p>copyright © All rights reserved!!</p> </div>

   </>
  )
}

export default Footer
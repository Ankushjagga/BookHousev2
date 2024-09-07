import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckoutSuccess = () => {




  return (
   <>
     <h1 style={{textAlign: "center", height: "20vh", justifyContent: "center" ,alignItems: "center", display:"flex"}}>   yourr order has been sucessfully placed ! wiil be 
        delivered in 6-7 working days , have patience 😄!</h1>
     <NavLink to="/shop">  <button className='btn ' style={{padding:"1rem",fontSize:"1rem", textAlign:"center", margin:"auto", display:"flex", marginTop:"1rem"}} >Explore more products {"-->"} </button></NavLink>
   </>
  )
}

export default CheckoutSuccess
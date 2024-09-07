import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckoutError = () => {
  return (
    <>
   <h1 style={{textAlign: "center", height: "20vh", justifyContent: "center" ,alignItems: "center", display:"flex"}}>  Your order is not completed please  again go to checkout cart 🥺!</h1>
   <NavLink to="/cart">  <button className='btn ' style={{padding:"1rem",fontSize:"1rem", textAlign:"center", margin:"auto", display:"flex", marginTop:"1rem"}} >Go Back to cart 🔙 </button></NavLink>

    </>
  )
}

export default CheckoutError
import React from 'react'

import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"25vh"}}>404! Page Not Found 😟</h1>
  <NavLink to="/">  <button className='btn ' style={{padding:"1rem",fontSize:"1.2rem", textAlign:"center", margin:"auto", display:"flex", marginTop:"1rem"}} >Go Back 🔙 </button></NavLink>
    </>
  )
}

export default Error
import React, { useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import Card4 from '../../components/cards/Card4'
const category = () => {
   useEffect(() => {
          window.scroll({
            top: 0,
            behavior: "instant",
          });
        }, []);
  return (
 <>
 <span className="link-rec">
    <ol style={{display: "flex",margin:"1rem", alignItems:"center"}}> 
        <li ><NavLink to ="/"style={{textDecoration:"underline", marginRight:".3rem"}} className="hov">Home </NavLink> / </li>
        <li style={{opacity: .6, marginLeft:".3rem"}}>Explore Categories</li>
    </ol>
</span>
   <h1 className='categories'><span className='sp'>  Boo<span className='rad'>ks</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={"Books"}/>
      
      
        </div>
 </>
  )
}

export default category
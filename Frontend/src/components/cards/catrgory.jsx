import React ,{useState,useEffect}from 'react'
import { NavLink } from 'react-router-dom';
import "./card.css"




const Catrgory = ({data}) => {

  return (
 <>
{data?.map((cate)=>{
return (

<NavLink to ={`/categories/${cate.name}`} className="category-link" key={cate.id}>
  <div className="box" id="box-cate" >
        <img src={`/images/${cate.image}`} alt={cate.name}/>
        <h4>{cate.name}</h4>
       
      </div>
     </NavLink>
    )})}
 </>
  )
}

export default Catrgory
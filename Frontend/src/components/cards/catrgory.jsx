import React ,{useState,useEffect}from 'react'
import { NavLink } from 'react-router-dom';
import "./card.css"
import Skeleton , {SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const Catrgory = ({data , isFetching}) => {

  return (
 <>
   {isFetching
    ? // Show skeletons while data is being fetched
      Array(4)
        .fill() // You can adjust the number of skeletons here
        .map((_, index) => (
          <div className="skeleton-box" key={index}>
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
              <Skeleton height={200} borderRadius=".5rem" className="loading" />
            </SkeletonTheme>
          </div>
        )) :
data?.map((cate)=>{
return (

<NavLink to ={`/categories/${cate.name}`} className="category-link" key={cate.id}>

  <div className="box" id="box-cate" >
        <img src={`${cate.image}`} alt={cate.name}/>
        <h4>{cate.name}</h4>
       
      </div>
     </NavLink>
    )})}
 </>
  )
}

export default Catrgory
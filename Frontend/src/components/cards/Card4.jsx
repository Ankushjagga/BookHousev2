import React, {useEffect, useState} from 'react'
import "./card.css";
import { NavLink } from 'react-router-dom';
// import  { getAllProducts, productData } from '../../redux/Product'
// import { useDispatch, useSelector } from 'react-redux'
import Skeleton , {SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Card4 = ({category , productList , isFetching}) => {
  // const { isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage  , productList}  = useSelector(productData)

// const [data , setData] = useState(productList);
// console.log(data);
// const dispatch  = useDispatch()
// useEffect(() => {
// dispatch(getAllProducts())
// }, [])




 
  const categoryData=  productList?.filter((ele)=>{
    return    ele.category===category ;
     }) 
  return (
    <>
 {isFetching
    ? // Show skeletons while data is being fetched
      Array(3)
        .fill() // You can adjust the number of skeletons here
        .map((_, index) => (
          <div className="skeleton-box" key={index}>
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
              <Skeleton height={200} borderRadius=".5rem" className="loading" />
            </SkeletonTheme>
          </div>
        )) :
categoryData?.map(user=>{
  return (
<NavLink to={`/shopitm/${user.id}`} className="card-link" key={user.id}>

     <div className="box" >
        <img src={`${user.image}`} alt={user.name}/>
        <h4>{user.name}</h4>
        <span className='card-prices'>
            <p>{user.price} ₹</p>
            {/* <button className='btns' title= "Add To Cart"><i class="fa-solid fa-cart-shopping"></i></button> */}

        </span>
      </div>
      </NavLink>
          )

        })} 
    </>
  )
}

export default Card4
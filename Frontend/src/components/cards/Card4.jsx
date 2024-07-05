import React, {useEffect, useState} from 'react'
import "./card.css";
import { NavLink } from 'react-router-dom';
// import  { getAllProducts, productData } from '../../redux/Product'
// import { useDispatch, useSelector } from 'react-redux'
const Card4 = ({category , productList}) => {
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

{categoryData?.map(user=>{
  return (
<NavLink to={`/shopitm/${user.id}`} className="card-link" key={user.id}>

     <div className="box" >
        <img src={`/images/${user.image}`} alt={user.name}/>
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
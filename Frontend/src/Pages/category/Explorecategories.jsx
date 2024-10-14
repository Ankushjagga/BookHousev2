import React ,{useState,useEffect}from 'react'

import { NavLink , useParams } from 'react-router-dom';
import { clearAllSliceData, clearAllSliceStates, getProductsByCategory, productData } from '../../redux/Product';
import "./category.css"
import { useDispatch, useSelector } from 'react-redux';
import Skeleton , {SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Explorecategories = () => {
// const truncate = (str)=>{

//   return str.length > 10 ? str.substring(0, 50) + "..." : str;
// }
useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);
const dispatch = useDispatch();
const {productList ,isProductSliceFetching} = useSelector(productData)
const [user,setuser] = useState([]);
let { id } = useParams();
  
      useEffect(()=>{
        dispatch(getProductsByCategory(id))
        return ()=>{
            dispatch(clearAllSliceStates())
            dispatch(clearAllSliceData())
        }
      },[])
 useEffect(() => {
 setuser(productList)
 }, [productList])
 
 
  return (
    
    <>
    <span className="link-rec">
    <dl style={{display: "flex",margin:"1rem", alignItems:"center"}}> 
        <dd ><NavLink to ="/"style={{textDecoration:"underline", marginRight:".3rem"}} className="hov">Home </NavLink> / </dd>
        <dd style={{opacity: .6, marginLeft:".3rem"}}>Explore Categories/{id}</dd>
    </dl>
</span>
<div className='menu'>
{isProductSliceFetching
    ? // Show skeletons while data is being fetched
      Array(8)
        .fill() // You can adjust the number of skeletons here
        .map((_, index) => (
          <div className="skeleton-box" key={index}>
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
              <Skeleton height={200} borderRadius=".5rem" className="loading" />
            </SkeletonTheme>
          </div>
        )) :


    user.length?
    user.map((data)=>{
        return (
<NavLink to={`/shopitm/${data.id}`} className="card-link" key={data.id}>

            <div className="box" >
        <img src={`${data.image}`} alt={data.name}/>
        <h4>{data.name}</h4>
        <span className='card-prices'>
            <p>{data.price}₹ </p>
            {/* <button className='btns' title= "Add To Cart"><i class="fa-solid fa-cart-shopping"></i></button> */}

        </span>
</div>
</NavLink>
            )
        })
        : <h1 className='nodata'>No Data Found 😟</h1>}
        </div>
    </>
  )
}

export default Explorecategories
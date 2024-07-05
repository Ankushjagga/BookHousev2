import React ,{useState,useEffect}from 'react'

import { NavLink , useParams } from 'react-router-dom';
import { clearAllSliceData, clearAllSliceStates, getProductsByCategory, productData } from '../../redux/Product';
import "./category.css"
import { useDispatch, useSelector } from 'react-redux';
const Explorecategories = () => {
// const truncate = (str)=>{

//   return str.length > 10 ? str.substring(0, 50) + "..." : str;
// }
const dispatch = useDispatch();
const {productList} = useSelector(productData)
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
    <ol style={{display: "flex",margin:"1rem", alignItems:"center"}}> 
        <li ><NavLink to ="/"style={{textDecoration:"underline", marginRight:".3rem"}} className="hov">Home </NavLink> / </li>
        <li style={{opacity: .6, marginLeft:".3rem"}}>Explore Categories/{id}</li>
    </ol>
</span>
<div className='menu'>
    {user.length?
    user.map((data)=>{
        return (
<NavLink to={`/shopitm/${data.id}`} className="card-link" key={data.id}>

            <div className="box" >
        <img src={`/images/${data.image}`} alt={data.name}/>
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
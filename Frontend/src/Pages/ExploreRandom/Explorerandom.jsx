import React ,{useState,useEffect}from 'react'

import { NavLink } from 'react-router-dom'
import { getRandomProduct, productData } from '../../redux/Product';
import { useDispatch, useSelector } from 'react-redux';
import "../ShopItems/shopitem.css"
const Explorerandom = () => {
  const [user,setuser] = useState(null);
  const dispatch =useDispatch();
  const {randomProduct} = useSelector(productData)
  
  useEffect(() => {

      dispatch(getRandomProduct())
  }, [])

  useEffect(() => {
  setuser(randomProduct)
  }, [randomProduct])
 
  return (
    <>
    <span class="link-rec">
    <ol style={{display: "flex", margin:"1rem" , alignItems:"center"}}> 
        <li ><NavLink to="/" style={{textDecoration:"underline",marginRight:".3rem"}} class="hov">Home </NavLink> / </li>
        <li style={{opacity: .6, marginLeft:".3rem"}}>{user?.name}</li>
    </ol>
</span>
    {/* {user.length?  */}
    {/* user.map((item)=>{ */}
      {/* return( */}
  <>

  
<div className="row">
      <div className="cont-left">
      <img src={`/images/${user?.image}`}  alt={user?.name} title={user?.name} />
    </div>
    <div className="con-right">
        <h1>{user?.name}</h1>
        <span><i className="fa-solid fa-tag"></i>{user?.category}</span>
        <div className="instruct">
             <h4 ><i className="fa-solid fa-pencil"></i>Description</h4>
            <p className='desc'>{user?.description}</p>
        </div>
        <div className="features">
             <h4><i className="fa-solid fa-check"></i>Features</h4>
             <ol className='shop-fetures'>
              {user?.features?
                user?.features.map((itm)=>{
                  return(
                    <>

<li className='list' key={itm}>{itm}</li>
<hr/>
                  </>
)
})


: <h1>no</h1>}
             </ol>
        </div>
        <span className='card-prices'>
            <p>Price :{user?.price}₹ </p>
            <button className='btns' title= "Add To Cart">Add To Cart<i class="fa-solid fa-cart-shopping"></i></button>

        </span>
    </div>
</div>
</>
        {/* ) */}
{/* }) */}
    {/* : <h1>No data found</h1>} */}
    </>
  )
}

export default Explorerandom
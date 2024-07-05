import React ,{useState,useEffect}from 'react'
import { NavLink } from 'react-router-dom';
import { getLatestProduct, productData } from '../../redux/Product';
import { useDispatch, useSelector } from 'react-redux';

const Explorelatest = () => {
    const [data , setData] = useState([]);
    const dispatch = useDispatch();
    const {latestProductList} = useSelector(productData)
    
    // const truncate = (str)=>{
    
    //   return str.length > 10 ? str.substring(0, 50) + "..." : str;
    // }
    useEffect(() => {
   dispatch(getLatestProduct())
   console.log(latestProductList);
    }, [])
    
    useEffect(() => {
   setData(latestProductList)
   console.log("data", data);

    }, [latestProductList])
    
  
    console.log("data", data);
      return (
        <>
        <h1 className='categories'><span className='sp'>  Explore <span className='rad'>Latest</span>  </span></h1>

     <div className='menu'>

    {data?.map(user=>{
        return (
    <NavLink to={`/shopitm/${user.id}`} className="card-link"  key={user.id}>
    
         <div className="box">
            <img src={`/images/${user.image}`} alt={user.name}/>
            <h4>{user.name}</h4>
            <span className='card-prices'>
                <p>{user.price}₹ </p>
                {/* <button className='btns' title= "Add To Cart"><i class="fa-solid fa-cart-shopping"></i></button> */}
    
            </span>
          </div>
          </NavLink>
              )
    
            })} 
            </div>
        </>
      )
    }

export default Explorelatest
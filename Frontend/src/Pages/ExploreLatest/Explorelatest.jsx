import React ,{useState,useEffect}from 'react'
import { NavLink } from 'react-router-dom';
import { getLatestProduct, productData } from '../../redux/Product';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton , {SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Explorelatest = () => {
    const [data , setData] = useState([]);
    const dispatch = useDispatch();
    const {latestProductList , isProductSliceFetching} = useSelector(productData)
    
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
    data?.map(user=>{
        return (
     
    <NavLink to={`/shopitm/${user.id}`} className="card-link"  key={user.id}>
    
         <div className="box">
            <img src={`${user.image}`} alt={user.name}/>
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
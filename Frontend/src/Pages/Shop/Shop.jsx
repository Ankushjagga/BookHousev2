import React , {useEffect} from 'react'

import { NavLink } from 'react-router-dom'
import Card4 from '../../components/cards/Card4'
import  { clearAllSliceData, clearAllSliceStates, getAllProducts, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton , {SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import Card5 from '../../components/cards/Card5'
// import Card6 from '../../components/cards/Card6'
// import Card7 from '../../components/cards/Card7'
const Shop = () => {
  const { isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage  , productList}  = useSelector(productData)
  const dispatch  = useDispatch()
  useEffect(() => {
     dispatch(getAllProducts({searchValue : ""}))
     return () => {
          dispatch(clearAllSliceData())
    dispatch(clearAllSliceStates())
     }
     }, [])
    
     useEffect(() => {
          window.scroll({
            top: 0,
            behavior: "instant",
          });
        }, []);
            
  return (
   <>
   <span className="link-rec">
    <dl style={{display: "flex",margin:"1rem", alignItems:"center" , }}> 
        <dt ><NavLink to ="/"style={{textDecoration:"underline", marginRight:".3rem"}} className="hov">Home </NavLink> / </dt>
        <dt style={{opacity: .6, marginLeft:".3rem"}}>Explore Items</dt>
    </dl>
</span>
   <h1 className='categories'><span className='sp'>  Boo<span className='rad'>ks</span>  </span></h1>
   <div className='card-price menu'>
        
        <Card4 category={'Books'} productList={productList} isFetching = {isProductSliceFetching} />
      
        </div>
        <h1 className='categories'><span className='sp'>  Stati<span className='rad'>onary</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Stationary'} productList={productList} isFetching = {isProductSliceFetching} />
       
      
        </div>
        <h1 className='categories'><span className='sp'>  Ba<span className='rad'>gs</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Bags'} productList={productList}  isFetching = {isProductSliceFetching}/>
      
      
        </div>
        <h1 className='categories'><span className='sp'>  Note<span className='rad'>Books</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Notebooks'} productList={productList  } isFetching = {isProductSliceFetching}/>
      
      
        </div>
   </>
  )
}

export default Shop
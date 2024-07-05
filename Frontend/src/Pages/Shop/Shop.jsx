import React , {useEffect} from 'react'

import { NavLink } from 'react-router-dom'
import Card4 from '../../components/cards/Card4'
import  { getAllProducts, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'
// import Card5 from '../../components/cards/Card5'
// import Card6 from '../../components/cards/Card6'
// import Card7 from '../../components/cards/Card7'
const Shop = () => {
  const { isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage  , productList}  = useSelector(productData)
  const dispatch  = useDispatch()
  useEffect(() => {
     dispatch(getAllProducts())
     }, [])
  return (
   <>
   <span className="link-rec">
    <ol style={{display: "flex",margin:"1rem", alignItems:"center"}}> 
        <li ><NavLink to ="/"style={{textDecoration:"underline", marginRight:".3rem"}} className="hov">Home </NavLink> / </li>
        <li style={{opacity: .6, marginLeft:".3rem"}}>Explore Items</li>
    </ol>
</span>
   <h1 className='categories'><span className='sp'>  Boo<span className='rad'>ks</span>  </span></h1>
   <div className='card-price menu'>
        
        <Card4 category={'Books'} productList={productList}/>
      
        </div>
        <h1 className='categories'><span className='sp'>  Stati<span className='rad'>onary</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Stationary'} productList={productList}/>
       
      
        </div>
        <h1 className='categories'><span className='sp'>  Ba<span className='rad'>gs</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Bags'} productList={productList}/>
      
      
        </div>
        <h1 className='categories'><span className='sp'>  Note<span className='rad'>Books</span>  </span></h1>
   <div className='card-price menu'>
        <Card4 category={'Notebooks'} productList={productList}/>
      
      
        </div>
   </>
  )
}

export default Shop
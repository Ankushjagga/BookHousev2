import React ,{useState,useEffect}from 'react'

import { NavLink , useParams } from 'react-router-dom'
import { getRandomProduct, productData } from '../../redux/Product';
import { useDispatch, useSelector } from 'react-redux';
import "../ShopItems/shopitem.css"
import Cookies from "js-cookie";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import CartAmountToggle from "../../components/CartAmountToggle/CartAmountToggle";
import {  toast } from 'react-toastify';

import { getSingleProduct, clearAllSliceData , addToCart, clearAllSliceStates , productReviews } from "../../redux/Product";
const Explorerandom = () => {
  const [user,setuser] = useState(null);
  const [amount, setAmount] = useState(1);
  const token = Cookies.get('token');
const [rating , setRating] = useState("")
const [review , setReview] = useState("")
const [error, setError]= useState({
  review: "",
  rating: ""
})
  const dispatch =useDispatch();
  const {randomProduct} = useSelector(productData)
const {isProductSliceFetching ,isProductSliceError, isProductSliceSuccess , productSliceErrorMessage , productSliceSuccessMessage , productReviewsList} = useSelector(productData)
let { id } = useParams();
  
  useEffect(() => {

      dispatch(getRandomProduct())
      return  ()=>{
        dispatch(clearAllSliceData())
        dispatch(clearAllSliceStates())
      }
  }, [])
  useEffect(() => {
    if(isProductSliceSuccess){
      // dispatch(clearAllSliceData())
      dispatch(clearAllSliceStates())
     toast(productSliceSuccessMessage,{position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      type:"success",
      progress: undefined,
      theme: "light",})
  
    }
    }, [isProductSliceSuccess])
    useEffect(() => {
      if(isProductSliceError){
        dispatch(clearAllSliceStates())
       toast(productSliceErrorMessage,{position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        type:"success",
        progress: undefined,
        theme: "light",})
    
      }
      }, [isProductSliceError])
  useEffect(() => {
  setuser(randomProduct)
  }, [randomProduct])
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };
  const handleAddToCart = ()=>{
    console.log("clickedd")
    dispatch(addToCart({
       id : user.id ,
     amount
    }))
  }
  const hanldeSubmit = (e)=>{
    e.preventDefault()
    const errorObj = {
      rating: "",
      review : ""
    }
    if(!rating){
      errorObj.rating = "Please Enter Rating"
    }
    if(!review){
      errorObj.review = "Please Enter Review"
      }
      for(let key in errorObj){
        if(errorObj[key]){
          setError(errorObj)
          return ;
        }
      }
dispatch(productReviews({productId: user.id , rating : rating , review : review}))
setReview("")
setRating("");
  }

  return (
    <>
    <span class="link-rec">
    <dl style={{display: "flex", margin:"1rem" , alignItems:"center"}}> 
        <dd ><NavLink to="/" style={{textDecoration:"underline",marginRight:".3rem"}} class="hov">Home </NavLink> / </dd>
        <dd style={{opacity: .6, marginLeft:".3rem"}}>{user?.name}</dd>
    </dl>
</span>
    {/* {user.length?  */}
    {/* user.map((item)=>{ */}
      {/* return( */}
  <>

  
<div className="row">
      <div className="cont-left">
      <img src={`/images/${user?.image}`}  alt={user?.name} title={user?.name} />
      <ProductReviews productReviewsList={productReviewsList} 
                token={token} hanldeSubmit={hanldeSubmit}
                rating = {rating}
                setRating = {setRating}
                review = {review}
                setReview={setReview}
                error={error}
                setError={setError}
                />
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
            <CartAmountToggle
                    amount={amount}
                    setDecrease={setDecrease}
                    setIncrease={setIncrease}
                    className="amount"
                  />
                  {/* <NavLink to = "/cart"> */}
{token ?
                  <button
                  className="btns"
                  title="Add To Cart"
                  onClick={handleAddToCart}
                  >
                    Add To Cart<i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  : 
                  <span className="disable">
                  <button  className=" disablebtns" disabled
                  title="Add To Cart">Add to cart</button> 
                  <h5>Login to add item to cart</h5>
                  </span> 
}
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
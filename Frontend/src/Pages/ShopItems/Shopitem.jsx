import React, { useState, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import CartAmountToggle from "../../components/CartAmountToggle/CartAmountToggle";
import { getSingleProduct, productData, clearAllSliceData , addToCart, clearAllSliceStates , productReviews , getSingleproductReview } from "../../redux/Product";
// import { toast } from 'react-toastify';
import "./shopitem.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import ProductReviews from "../../components/ProductReviews/ProductReviews";

const override = {
  display: "block",
  margin: "10rem auto",
  borderColor: "red",
};

const Shopitem = () => {
  const dispatch = useDispatch();
  const {singleProduct , } = useSelector(productData)
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false); 
  // const { addtoCart } = useCartcontext();
  const [amount, setAmount] = useState(1);
  const token = Cookies.get('token');
const [rating , setRating] = useState("")
const [review , setReview] = useState("")
const [singleProductReview , setSingleProductReview] = useState([])
const [error, setError]= useState({
  review: "",
  rating: ""
})
  let { id } = useParams();
const {isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError,productSliceSuccessMessage , productReviewsList} = useSelector(productData)
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };
  
  
  useEffect(() => {
 dispatch(getSingleProduct(id))
return  ()=>{
  dispatch(clearAllSliceData())
  dispatch(clearAllSliceStates())
}
  }, [])

  useEffect(() => {
   setuser(singleProduct)
  }, [singleProduct])
  
  console.log(rating , review);
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


  // const handleclick =  ()=>{
  //   toast("Item Added Sucessfully",{position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: true,
  //   closeOnClick: false,
  //   pauseOnHover: false,
  //   draggable: true,
  //   type:"success",
  //   progress: undefined,
  //   theme: "dark",})

  // }
  useEffect(() => {
    dispatch(getSingleproductReview({productId : id}))
  
  }, [])
  useEffect(() => {
    setSingleProductReview(productReviewsList)
  }, [productReviewsList])
  

  const handleAddToCart = ()=>{
    console.log("clickedd")
    dispatch(addToCart({
       id ,
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

dispatch(productReviews({productId: id , rating : rating , review : review}))
setReview("")
setRating("");
  }


  return (
    <>
      <span className="link-rec">
        <dl style={{ display: "flex", margin: "1rem", alignItems: "center" }}>
          <dd>
            <NavLink
              to="/"
              style={{ textDecoration: "underline", marginRight: ".3rem" }}
              className="hov"
            >
              Home{" "}
            </NavLink>{" "}
            /{" "}
          </dd>
          <dd style={{ opacity: 0.6, marginLeft: ".3rem" }}>{user?.name}</dd>
        </dl>
      </span>
      {!loading ? (
        user ? (
          <>
            <div className="row" key={user.id}>
              <div className="cont-left">
                <img
                  src={`/images/${user?.image}`}
                  alt={user?.name}
                  title={user?.name}
                />
                <ProductReviews productReviewsList={singleProductReview} 
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
                <span>
                  <i className="fa-solid fa-tag"></i>
                  {user?.category}
                </span>
                <div className="instruct">
                  <h4>
                    <i className="fa-solid fa-pencil"></i>Description
                  </h4>
                  <p className="desc">{user?.description}</p>
                </div>
                <div className="features">
                  <h4>
                    <i className="fa-solid fa-check"></i>Features
                  </h4>
                  <ol className="shop-fetures">
                    {user?.features ? (
                      user?.features.map((itm) => {
                        return (
                          <div key={itm} className="list">
                            <li className="list">{itm}</li>
                            <hr />
                          </div>
                        );
                      })
                    ) : (
                      <h1>No Features</h1>
                    )}
                  </ol>
                </div>
                <span className="card-prices">
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
                  <h5>Login to add item to cart 😟</h5>
                  </span> 
                  }
                  {/* </NavLink> */}
                </span>
              </div>
            </div>
          </>
        ) : (
          //  onClick={()=> setcart([...cart,user])} onClickCapture={handleclick}
          <h1>No data found</h1>
        )
      ) : (
        <RingLoader
          color={"#ffff"}
          loading={loading}
          size={150}
          height={250}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={override}
        />
      )}
    </>
  );
};

export default Shopitem;

import React, { useEffect , useState} from 'react'

import {  NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import "./Cartpage.css"
import CartAmountToggle from '../../components/CartAmountToggle/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import Stripebutton from '../../components/Stripebutton/Stripebutton';
import { useDispatch, useSelector } from 'react-redux';
import { productData , cartProducts , totalItemsInCart , deleteCartProducts , payment, DeleteAllCartProducts} from '../../redux/Product';
import { getSingleProduct, clearAllSliceData , addToCart, clearAllSliceStates , productReviews } from "../../redux/Product";

import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';

// import PayPalButton from '../../components/PayPal/PayPalButton';
// import GooglePay from '../../components/PayPal/GooglePay';
const Cartpage = () => {

    const Naavigate = useNavigate()
    
const dispatch = useDispatch()
const {cartProductsList  , totalCartItems} = useSelector(productData)
const {isProductSliceFetching ,isProductSliceError, isProductSliceSuccess , productSliceErrorMessage , productSliceSuccessMessage , productReviewsList} = useSelector(productData)

const [totalAmount, setTotalAmount] = useState(0); 
console.log(cartProductsList);
const token = Cookies.get("token");
useEffect(() => {
dispatch(cartProducts())
return  ()=>{
  dispatch(clearAllSliceData())
  dispatch(clearAllSliceStates())
}
}, [])

useEffect(() => {
 if(!token){
Naavigate("/login")
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
const deleteAllCart = ()=>{
const check=   confirm("are you sure you want to clear cart")
if(check){

  dispatch(DeleteAllCartProducts())
}
}


   // Function to calculate total amount
   useEffect(() => {
    let total = 0;
    cartProductsList.forEach((elem) => {
        total += elem.Product?.price * elem.quantity;
    });
    setTotalAmount(total);
}, [cartProductsList]);
const removeitem = (id , name) =>{
 const remove = confirm(`Are you sure you want to delete ${name} `);
if(remove){

  dispatch(deleteCartProducts({productId : id}));
}
}
const makePayment = async () =>{
const body ={
  products : cartProductsList
}
console.log(body);
dispatch(payment(body))
}
    const cartQuantity = cartProductsList.reduce((accum, ele)=> accum+=ele.quantity,0)

  return (
    <>
    <div className="container" >
        <table border={"2px"}>
          <thead>

          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
          </thead>
          {cartProductsList && token && cartProductsList.map(elem=>{
            return (
<tbody key={elem.id}>

             <tr >
              <td>

              <figure><img src={`${elem?.Product?.image}`} alt={elem?.Product?.name} className='cart-img'/></figure>
              <p>{elem?.Product?.name}</p>
              </td>

              <td>

              {elem?.Product?.price}₹
              </td>
              <td className='quantity'>
                <div className='amount-style'>{elem?.quantity}</div>
              {/* <CartAmountToggle
          amount={elem.quantity} 
          setDecrease={()=>setDecrease(elem.id, elem.quantity)}
          setIncrease={()=>setIncrease(elem.id , elem.quantity)}
          className="amount"
          /> */}
              </td>
              <td className='subtotal'>{elem.Product?.price*elem.quantity} ₹</td>
              <td onClick={()=>removeitem(elem.product_id , elem.Product.name)} style={{cursor:"pointer"}}> <FaTrash/></td>
          </tr>
         
          </tbody>
              )
          })}
          </table>
    
          </div>


         {cartProductsList.length >0 && token &&
         <>
          <span className='total'>
            <p>SubTotal :  {totalAmount} ₹</p>
          <p>Shipping Fees : {(cartQuantity)* 50}₹ </p>
          <hr/>
          <p>order total :  {totalAmount + (cartQuantity)*50} ₹</p>
          </span>
          <div className='btnss'>
  </div>
<span className='payment'>

<button className='btn bts' onClick={makePayment}>Pay {totalAmount + (cartQuantity)*50} ₹</button>

 <h2>*********** use card number :  4000003560000008 for testing************* </h2>
<button className='btn bts' onClick={deleteAllCart} >  Clear Cart <FaTrash/> </button>
</span>

            </>


          }
  {
cartProductsList.length === 0  && token &&
    <div className='empty'>No Item in the Cart 😟</div>

}

    </>
  )
}

export default Cartpage
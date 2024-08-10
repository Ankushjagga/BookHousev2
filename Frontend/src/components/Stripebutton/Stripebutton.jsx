import React, { useState, useEffect } from 'react'
// import StripeCheckout from 'react-stripe-checkout';
import {  NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
// import Checkout from '../PayPal/CheckOut';





const Stripebutton = () => {
  // Replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  return (
    <Elements stripe={stripePromise}>
    <CheckoutForm/>  
  </Elements>
  )
}

export default Stripebutton


// const Stripebutton = ({ price }) => {
// const [user,setuser] = useState({name:"",email:""});
// const history = useNavigate()




// const {clearAfterPayment} = useCartcontext();

//         const priceForStripe = price * 100;
//         const publishableKey = 'pk_test_51JEoa7SEIJGjBh5JpAUIH87r9gsGsW1Y3XHBChJbiNnKr7DFvsYGLig1HtFTNtUTfREqLaxojcRu5xCIlQhQgl0h00P77mzfZw';
      
//         const onToken = token => {
//           if (token) {
//             clearAfterPayment();
//             toast("Payment Sucessfull 😄",{position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeOnClick: false,
//             pauseOnHover: false,
//             draggable: true,
//             type:"sucess",
//             progress: undefined,
//             theme: "dark",})
          
            
//           }
//         };

//         const stripe= async()=>{ 
//             try{
            
//               const res= await fetch("/getdata",{
//                 method:"GET",
//                 headers:{
//                   "Content-Type":"application/json"
//                 },
//               })
//               const data = await res.json();
              
//               console.log(data); 
//               setuser({...user,name:data.name,email:data.email});
//               if(res.status!==200 || !data){
//                 history("/login")
//                 toast(data,{position: "top-right",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: false,
//                 pauseOnHover: false,
//                 draggable: true,
//                 type:"error",
//                 progress: undefined,
//                 theme: "dark",})
              
//                 }
//               }    
//             catch(err){
//               console.log(err);
//               // alert("you need to loin first");
//             }
             
            
//             }
// useEffect(() => {
//  stripe()
// }, [])


      
//   return (
//     <StripeCheckout
//     label='Pay Now'
//     name='CART CHECKOUT'
//     email={user.email}
//     billingAddress
//     shippingAddress
//     image='/images/book.png'
//     description={`Your total is ₹ ${price}`}
//     amount={priceForStripe}
//     panelLabel='Pay Now'
//     token={onToken}
//     stripeKey={publishableKey}
//     currency="INR"
//   />
//   )
// }

// export default Stripebutton
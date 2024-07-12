import React, { useEffect , useState} from 'react'

import {  NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import "./Cartpage.css"
import CartAmountToggle from '../../components/CartAmountToggle/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import Stripebutton from '../../components/Stripebutton/Stripebutton';
import { useDispatch, useSelector } from 'react-redux';
import { productData , cartProducts , totalItemsInCart , deleteCartProducts } from '../../redux/Product';
import Cookies from 'js-cookie';
const Cartpage = () => {

    const Naavigate = useNavigate()
    
const dispatch = useDispatch()
const {cartProductsList  , totalCartItems} = useSelector(productData)
const [totalAmount, setTotalAmount] = useState(0); 
console.log(cartProductsList);
const token = Cookies.get("token");
useEffect(() => {
dispatch(cartProducts())
}, [])

useEffect(() => {
 if(!token){
Naavigate("/login")
 }
}, [])


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

              <figure><img src={`/images/${elem?.Product?.image}`} alt={elem?.Product?.name} className='cart-img'/></figure>
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
         {cartProductsList.length && token &&
         <>
          <span className='total'>
            <p>SubTotal :  {totalAmount} ₹</p>
          <p>Shipping Fees : {(cartProductsList.length)* 50}₹ </p>
          <hr/>
          <p>order total :  {totalAmount + (cartProductsList.length)*50} ₹</p>
          </span>
          <div className='btnss'>
  </div>
    {/* <Stripebutton price={total_amount+ shipping_fees} onClick={()=>cartpage} /> */}
{/* <button className='btn bts' onClick={clearcart}> */}
{/* clear Cart */}
{/* </button> */}
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
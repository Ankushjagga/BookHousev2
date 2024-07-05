import React, { useEffect } from 'react'

import {  NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import "./Cartpage.css"
import CartAmountToggle from '../../components/CartAmountToggle/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import Stripebutton from '../../components/Stripebutton/Stripebutton';
const Cartpage = () => {

    const history = useNavigate()
    


   

if(cart.length===0){
  return (
    <>
    <div className='empty'>No Item in the Cart 😟</div>
    </>
  )
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
          {cart.map(elem=>{
            return (
<tbody key={elem.id}>

             <tr >
              <td>

              <figure><img src={`/images/${elem.image}`} alt={elem.name} className='cart-img'/></figure>
              <p>{elem.name}</p>
              </td>

              <td>

              {elem.price}₹
              </td>
              <td className='quantity'>
              <CartAmountToggle
          amount={elem.amount}
          setDecrease={()=>setdecrease(elem.id)}
          setIncrease={()=>setincrease(elem.id)}
          className="amount"
          />
              </td>
              <td className='subtotal'>{elem.price*elem.amount} ₹</td>
              <td onClick={()=>removeitem(elem.id)} style={{cursor:"pointer"}}> <FaTrash/></td>
          </tr>
         
          </tbody>
              )
          })}
          </table>
      
          </div>
         
          <span className='total'>
            <p>SubTotal :  {total_amount} ₹</p>
          <p>Shipping Fees : {shipping_fees}₹ </p>
          <hr/>
          <p>order total :  {total_amount + shipping_fees} ₹</p>
          </span>
          <div className='btnss'>

  <Stripebutton price={total_amount+ shipping_fees} onClick={()=>cartpage} />
<button className='btn bts' onClick={clearcart}>
clear Cart
</button>
  </div>
    </>
  )
}

export default Cartpage
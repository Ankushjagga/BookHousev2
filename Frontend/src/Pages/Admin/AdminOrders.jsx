import React , {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, productData } from '../../redux/Product';
const AdminOrders = () => {
  const dispatch = useDispatch();
const {ordersList} = useSelector(productData)

useEffect(() => {
dispatch(getAllOrders())

}, [])
useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);
  return (
    <div>
    <h1>Orders Details :</h1>
  
  
        {ordersList?.map((ele , index)=>{
             const totalAmount = ele.Orders?.reduce((acc,ele)=>{
              return acc + Number(ele.total_amount)
            },0) 
             console.log(totalAmount);
             
          return (
            <div className='ordersDetail'>

   <strong>{index+1}. </strong> 
 <p>Name :  <strong>{ele?.name}</strong> </p>
 <p>Email :  <strong>{ele?.email}</strong> </p>
 TOTAL AMOUNT : {totalAmount} rupees {"(including all taxes)"}
 <p> Orders : </p>
 {ele?.Orders?.length ?
 
 <>
 <table border={"5px"}>
        <thead>

          <th>S. No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Payment Status</th>
          <th>Total Amount</th>
        </thead>
  {ele.Orders.map((orders , index)=> {
 
    
    return  (
      orders?.OrderDetails.map((prod)=>{
        return (
          <>
          <tbody>
          <tr>
            <td rowSpan={orders.OrderDetails.length}>{index+1}</td>
            <td>{prod?.Product?.name}</td>
            <td>  <img src={prod?.Product?.image} alt="image" className="dash-img" /> </td>

            <td>{prod?.price} rupees</td>
            <td>{prod?.quantity}</td>
            <td>{orders.payment_status}</td>
            <td>{prod?.price*prod?.quantity} rupess</td>
          </tr>
        </tbody>
          </>
        )
      })
    )
  })}
      </table>      
 </>

            : <>
<h3 style={{textAlign : "center" , margin : "1rem"}}>******No Orders 🥺******</h3>  </>}
<hr/>
  </div>
            
          )
        })}
    </div>
  )
}

export default AdminOrders
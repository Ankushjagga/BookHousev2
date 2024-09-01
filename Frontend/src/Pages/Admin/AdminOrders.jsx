import React , {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, productData } from '../../redux/Product';
const AdminOrders = () => {
  const dispatch = useDispatch();
const {ordersList} = useSelector(productData)

useEffect(() => {
dispatch(getAllOrders())

}, [])
  return (
    <div>
    <h1>Orders Details :</h1>
  
  
        {ordersList?.map((ele , index)=>{
          return (
            <div className='ordersDetail'>

   <strong>{index+1}. </strong> 
 <p>Name :  <strong>{ele?.name}</strong> </p>
 <p>Email :  <strong>{ele?.email}</strong> </p>
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
        </thead>
  {ele.Orders.map((orders , index)=> {
    
    return  (
      orders?.OrderDetails.map((prod)=>{
        return (
          <>
          <tbody>
          <tr>
            <td>{index+1}</td>
            <td>{prod?.Product?.name}</td>
            <td>  <img src={prod?.Product?.image} alt="image" className="dash-img" /> </td>

            <td>{prod?.price} rupees</td>
            <td>{prod?.quantity}</td>
            <td>{orders.payment_status}</td>
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
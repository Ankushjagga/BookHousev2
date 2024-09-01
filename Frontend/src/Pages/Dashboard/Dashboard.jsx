import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { authData, getUserDetail } from "../../redux/auth";
import "./Dashboard.css";
import { productData , cartProducts , totalItemsInCart , deleteCartProducts , payment, DeleteAllCartProducts , updateProductReview , deleteProductReview} from '../../redux/Product';
import { getSingleProduct, clearAllSliceData , addToCart, clearAllSliceStates , productReviews } from "../../redux/Product";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector(authData);
  const {isProductSliceFetching ,isProductSliceError, isProductSliceSuccess , productSliceErrorMessage , productSliceSuccessMessage , productReviewsList} = useSelector(productData)
  useEffect(() => {
    dispatch(getUserDetail());
    console.log("hello");
  }, []);
  useEffect(() => {
    if(isProductSliceSuccess){
      // dispatch(clearAllSliceData())
      dispatch(clearAllSliceStates())
    }
    }, [isProductSliceSuccess])
    useEffect(() => {
      if(isProductSliceError){
        dispatch(clearAllSliceStates())
      }
      }, [isProductSliceError])
  const messageArray = userDetail?.messages?.split(',');

const deleteReview = (id)=>{
console.log(id)
const deleteReview = confirm("Are you sure you want to delete this review ??")
if(deleteReview){
  dispatch(deleteProductReview(id))
  return ;
}
}


  return (
    <>
      <h1 className="dashboard">
        <i class="fa-solid fa-user"></i>
        Your Details
      </h1>
      <span className="detail">
        <p>
          {" "}
          <b>Name :-</b>
          {userDetail?.name}
        </p>
        <p>
          {" "}
          <b>Email :-</b> {userDetail?.email}
        </p>
        <p>
          {" "}
          <b>Phone Number :-</b> {userDetail?.PhoneNumber}
        </p>
      </span>

     

      <h1 className="dashboard">
        <i className="fa-solid fa-cart-shopping"></i>
        Your Orders
      </h1>
      {userDetail?.Orders?.length ?
      <table border={"5px"}>
        <thead>

          <th>S. No.</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Payment Status</th>
          <th>Address</th>
        </thead>
        {userDetail &&  userDetail?.Orders?.map((ele , index) => {
          const shippingAddress = JSON.parse(ele.shipping_address);
          const { address } = shippingAddress;
          console.log(ele.shipping_address);

          return (
            <>
              {ele?.OrderDetails?.map((prod) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{index+1}</td>
                        <td>{prod?.Product?.name}</td>
                        <td>  <img src={prod?.Product?.image} alt="image" className="dash-img" /> </td>

                        <td>{prod?.price} rupees</td>
                        <td>{prod?.quantity}</td>
                        <td>{ele.payment_status}</td>
                        <td>
                          {address.country} {address.city}
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </>
          );
        })}
      </table>
:     <>

<h3 style={{textAlign : "center" , margin : "1rem"}}>******No Orders 🥺******</h3>


</>
}

      <h1 className="dashboard">
        <i class="fa-solid fa-star"></i>
      Your  Proudcts reviews
      </h1>
      {userDetail?.ProductReviews.length ?
      <table border="5px">
        <thead>
          <th>Name</th>
          <th>Image</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Delete</th>
        </thead>
        {   userDetail?.ProductReviews?.map((ele) => {
          return (
            <tbody key={ele.id}>
              <tr>
                <td>{ele.Product.name}</td>
                <td>
                  <img
                    src={`${ele.Product.image}`}
                    alt={ele.Product.name}
                    className="dash-img"
                  />
                </td>
                <td>{ele.rating}</td>
                <td>{ele.review_text}</td>
                <td onClick = {() => deleteReview(ele?.product_id)} style={{cursor:"pointer"}}><i class="fa-solid fa-trash"></i></td>
              </tr>
            </tbody>
          );
        }) 
      
        }
      </table> 
    : 
    <>
    
    <h3 style={{textAlign : "center" , margin : "1rem"}}>******No Reviews Given 🥺******</h3>
    

    </>
    }
  
  
      <h1 className="dashboard">
        {" "}
        <i class="fa-regular fa-message"></i> Your Messages
      </h1>
      { messageArray?.length ? messageArray?.map((msg, index) => (
        <ol className="dash-li" key={index}>
          <li>{msg}</li>
        </ol>
      )) : 
      <>
      
      <h3 style={{textAlign : "center" , margin : "1rem"}}>*******No Message Send 🥺******</h3>
      </>
      }
    </>
  );
};

export default Dashboard;

import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllproductReviews, productData } from '../../redux/Product';
const AdminReviews = () => {
  const dispatch = useDispatch();
  const {AllproductReviewsList} = useSelector(productData)
  useEffect(() => {
   dispatch(AllproductReviews())
  }, [])
  
  return (
    <div>
    <h1>Product Review Details :</h1>
    <table>
        <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Product Image</th>
            <th>Review</th>
            <th>Rating</th>
        </thead>
        {AllproductReviewsList.length > 0  && AllproductReviewsList.map(ele=>{
          return (
            <tbody>
            <td>
              <tr>{ele?.User?.name ? ele?.User?.name :"NA"}</tr>
              </td>
              <td>

              <tr>{ele?.User?.email ? ele?.User?.email :"NA"}</tr>
              </td>
              <td>   <tr>{ele?.Product?.name}</tr></td>
              <td>   <tr><img src={ele?.Product?.image} alt={ele?.Product?.name} className='dash-img'/></tr></td>
              <td>   <tr>{ele?.review_text}</tr></td>
              <td>   <tr>{ele?.rating}</tr></td>
        </tbody>

          )
        }) 
        

        }
           
        
    </table>
    {AllproductReviewsList.length === 0 && <h1 style={{textAlign: "center"}}>No Reviews for any Product 🥺</h1>}
    </div>
  )
}

export default AdminReviews
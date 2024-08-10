import React, { useState } from 'react'
import Select from "react-select"
import "./ProductReviews.css"
const ProductReviews = ({productReviewsList , token , hanldeSubmit , rating , setRating , review , setReview , error , setError }) => {
  const options = [
    { value: 'poor', label: 'Poor' },
    { value: 'average', label: 'Average' },
    { value: 'good', label: 'Good' },
    { value: 'excellent', label: 'Excellent' },
  ];
  const onSelect =(data)=>{
    console.log(data);
    setRating(data.value)
    setError({...error , rating : ""})

  }
  const onChange =(e)=>{
    setReview(e.target.value)
    setError({...error , review : ""})

  }
  return (
    <>

    <h3 className='write-review'> 
    <i class="fa-solid fa-pen-nib"></i>
      Write a Review</h3>
     {token ?
    <> 
        <form method = "post">
    <Select
    placeholder = "rating..."
    value={rating}
    options = {options}
    onChange={onSelect}
    />
    <h5 className='errors'>{error.rating}</h5>
    {/* <select name='reviews'>
        <option value = "" disabled  selected="true"> select review</option>
        <option value = "poor">Poor</option>
        <option value = "average">Average</option>
        <option value = "good">Good</option>
        <option value = "excellent">Excellent</option>
        </select>  */}

        {/* <label for = "reviewText"> Write a Review</label> */}
        <textarea type = "textarea" placeholder='write honest review of product....' className='rating-text'  value={review} onChange ={onChange}  required/>
    <h5 className='errors'>{error.review}</h5>

        <button  className="btns" onClick={hanldeSubmit}>submit 
        <i className="fas fa-paper-plane"></i>
        </button>
        </form>
        </> : <h1>Please Login to review</h1>
    }
        < span className='rev-head'>

<i class="fa-solid fa-star"></i>
<h3 className='reviews' >Reviews</h3>
</span>
{productReviewsList.length ? productReviewsList?.map((reviews)=>  

<>
<ol className='review-data'>
  <li>
  <h5 className='reviewer-name'> {reviews?.User?.name}</h5> 
  <div className='review-box'> 

  <h6 className='reviewer-rating'> <p className='review-rating'>Rating</p>  {reviews.rating}</h6><hr></hr>
 <h6 className='reviewer-rating'>  <p className='review-rating'> Review</p>  {reviews.review_text}</h6>
  </div>
  </li>
  </ol>
  </>


) : <h5 className='no-reviews'> **** No Reviews , Add yours 😟**** </h5>}
    </>
  )
}

export default ProductReviews
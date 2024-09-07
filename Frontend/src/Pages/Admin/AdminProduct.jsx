import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllSliceStates, deleteProduct, getAllProducts, productData } from '../../redux/Product';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminProduct = () => {
  const dispatch = useDispatch();
  const {productList} = useSelector(productData);
  const {  productSliceSuccessMessage,isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError} =  useSelector(productData)
const navigate = useNavigate();
const delProduct = (id) =>{
  const warning = confirm("Are you sure you want to delete this product ?")
  if(warning){

    dispatch(deleteProduct({productId : id}))
  }
}
  useEffect(()=>{
    dispatch(getAllProducts({ searchValue : ""}));
  },[])


  useEffect(() => {
    if(isProductSliceSuccess){
     dispatch(clearAllSliceStates())
   
       toast.success(productSliceSuccessMessage, {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
     });
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

  return (
    <div>
      <span style={{display:"flex" , justifyContent : "space-between" ,padding: " 0 2rem"}}>

    <h1 style={{textAlign : "center" , marginTop : "1.5rem"}}>Products Details <i class="fa-brands fa-product-hunt"></i></h1> 
    <button className='btn' style={{width : "13vw"}} onClick={()=> navigate("/adminaddProduct")}>Add Product +</button>
      </span>
    <h1 style={{textAlign : "center" , marginTop : "1.5rem"}}>Recent Products</h1>
    <table>
      <th>S. No.</th>
      <th>Name</th>
      <th>Image</th>
      <th>Category</th>
      <th>Description</th>
      <th>Features</th>
      <th>edit</th>
      <th>delete</th>
        {productList.map((ele, index)=>{
          return (
            <>
            <tbody key={ele.id}>
            <td>  <tr>{index+1}</tr>
        </td>
        <td>  <tr>{ele?.name}</tr></td>
        <td>  <tr><img src= {ele?.image} alt= {ele?.name} className="dash-img" /></tr></td>
        <td>  <tr>{ele?.category}</tr></td>
        <td>  <tr>{ele?.description.slice(0,50)+ "..."}</tr></td>
        <td>  <tr>{ele?.features.slice(0,3)+"..."}</tr></td>
        <td>  <tr onClick={()=> navigate("/admineditProduct", {state : ele})}><i class="fa-solid fa-pencil" style={{cursor : "pointer"}}></i></tr></td>
        <td>  <tr  onClick={()=> delProduct(ele?.id)}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i></tr></td>
      </tbody>
            </>
          )
        })}
        
    </table>
    </div>
  )
}

export default AdminProduct
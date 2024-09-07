import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllSliceStates, deleteCategory, getAllCategories, productData } from '../../redux/Product'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminCategory = () => {
  const dispatch = useDispatch()
const {categoriesList} = useSelector(productData)
const navigate = useNavigate()
const { productSliceSuccessMessage,isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError} =  useSelector(productData)

useEffect(()=>{
  dispatch(getAllCategories())
},[])

const delCategory = (id) =>{
const warning = confirm("Are you sure you want to delete this category");
if(warning){
  dispatch(deleteCategory({categoryId : id}))
}
}


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

    <h1 style={{textAlign : "center" , marginTop : "1.5rem"}}> Categories Details 📦</h1>
    <button className='btn' style={{width : "13vw"}} onClick={()=> navigate("/adminaddCategory")}>Add category +</button>
  </span>
    <table>
        <thead>
            <th>S. No.</th>
            <th>Name</th>
            <th>image</th>
            <th>action</th>
        </thead>
        {categoriesList.map((ele, index)=>{
          return (
            <tbody key={ele?.id}>
            <td><tr>{index+1}</tr></td>
            <td><tr>{ele?.name}</tr></td>
            <td>  <tr><img src={ele?.image} alt="" className='dash-img '/></tr></td>
            <td>  <tr onClick={()=> delCategory(ele?.id)}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i></tr></td>


        </tbody>
          )
        })}
      
 
    </table>
    </div>
  )
}

export default AdminCategory
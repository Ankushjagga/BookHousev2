import React from 'react'
import "./sidemenu.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../redux/Product';
import { useDispatch } from 'react-redux';
const Buttons = ({userCount , users, productCount , productList , categoryCount}) => {
  console.log(userCount, "----user");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const delProduct = (id) =>{
    const warning = confirm("Are you sure you want to delete this product ?")
    if(warning){

      dispatch(deleteProduct({productId : id}))
    }
  }
  return (
    <div className='main-content'>
        <span className='buttons'>

   <NavLink to ="/adminUsers"> <button className='btn '>Users : {userCount} </button>
   </NavLink> <NavLink to ="/adminProducts"> <button className='btn '>Products : {productCount} </button> </NavLink>
  <NavLink to="/adminCategory"> <button className='btn '>Categories : {categoryCount} </button></NavLink> 
    {/* <button className='btn '>Total  Sales : </button> */}
        </span>
    <h1 style={{textAlign : "center"}}>Recent users</h1>
    <table>

    <th>S. No.</th>
    <th>Name</th>
          <th>Emaik</th>
          <th>Phone Number</th>
          <th>Role</th>
      {users.map((ele , index)=>{
        return (
          <>
          <tbody key={ele?.id}>
            <td>  <tr>{index+1}</tr> </td>
            <td>  <tr>{ele?.name}</tr> </td>
            <td>  <tr>{ele?.email}</tr> </td>
            <td>  <tr>{ele?.PhoneNumber}</tr> </td>
            <td>  <tr>{ele?.role}</tr> </td>
            
          </tbody>
          </>
        )
      })}
     
    </table>
    <h1 style={{textAlign : "center"}}>Recent Products</h1>
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
        <td>  <tr>{ele?.description.slice(0,20)+ "..."}</tr></td>
        <td>  <tr>{ele?.features.slice(0,1)+"..."}</tr></td>
        <td>  <tr onClick={()=> navigate("/admineditProduct", {state : ele})}><i class="fa-solid fa-pencil" style={{cursor : "pointer"}}></i></tr></td>
        <td>  <tr onClick={()=> delProduct(ele?.id)}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i></tr></td>
      </tbody>
            </>
          )
        })}
        
    </table>
    </div>
  )
}

export default Buttons
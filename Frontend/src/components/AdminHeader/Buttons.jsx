import React from 'react'
import "./sidemenu.css"
import { NavLink } from 'react-router-dom'
const Buttons = ({userCount , users, productCount , productList , categoryCount}) => {
  console.log(userCount, "----user");
  
  return (
    <div className='main-content'>
        <span className='buttons'>

   <NavLink to ="/adminUsers"> <button className='btn '>Users : {userCount} </button>
   </NavLink> <NavLink to ="/adminProducts"> <button className='btn '>Products : {productCount} </button> </NavLink>
  <NavLink to="/adminCategory"> <button className='btn '>Categories : {categoryCount} </button></NavLink> 
    <button className='btn '>Total  Sales : </button>
        </span>
    <h1>Recent users</h1>
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
    <h1>Recent Products</h1>
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
        <td>  <tr><i class="fa-solid fa-pencil" style={{cursor : "pointer"}}></i></tr></td>
        <td>  <tr><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i></tr></td>
      </tbody>
            </>
          )
        })}
        
    </table>
    </div>
  )
}

export default Buttons
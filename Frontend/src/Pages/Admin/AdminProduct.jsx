import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, productData } from '../../redux/Product';
const AdminProduct = () => {
  const dispatch = useDispatch();
  const {productList} = useSelector(productData);

  useEffect(()=>{
    dispatch(getAllProducts());
  },[])
  return (
    <div>
    <h1>Products Details :</h1> 
    <button className='btn'>ADD PRODUCTS</button>
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

export default AdminProduct
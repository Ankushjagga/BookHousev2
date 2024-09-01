import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, productData } from '../../redux/Product'
const AdminCategory = () => {
  const dispatch = useDispatch()
const {categoriesList} = useSelector(productData)
useEffect(()=>{
  dispatch(getAllCategories())
},[])
  return (
    <div>
    <h1>Categories Details :</h1>
    <button className='btn'>Add category</button>
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
            <td>  <tr><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i></tr></td>


        </tbody>
          )
        })}
      
 
    </table>
    </div>
  )
}

export default AdminCategory
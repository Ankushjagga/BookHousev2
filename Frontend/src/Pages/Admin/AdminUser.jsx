import React , {useEffect}from 'react'
import { getAllProducts , getAllCategories , getAllUser, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'

const AdminUser = () => {
  const dispatch = useDispatch();
  const {userList} = useSelector(productData);
  useEffect(() => {
   dispatch(getAllUser())
  }, [])
  
  return (
    <div>
    <h1>User Details :</h1>
    <table>

<th>S. No.</th>
<th>Name</th>
      <th>Emaik</th>
      <th>Phone Number</th>
      <th>Role</th>
  {userList.map((ele , index)=>{
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
    </div>
  )
}

export default AdminUser
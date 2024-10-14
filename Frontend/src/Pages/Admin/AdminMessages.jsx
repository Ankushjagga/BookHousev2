import React , {useEffect} from 'react'
import { getAllProducts , getAllCategories , getAllUser, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'
const AdminMessages = () => {
  const dispatch = useDispatch();
  const {userList} = useSelector(productData);
  useEffect(() => {
   dispatch(getAllUser())
  }, [])

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
    <h1>Messages Details :</h1>
    <table>

<th>S. No.</th>
<th>Name</th>
      <th>Email</th>
      <th>Messages</th>
  {userList.map((ele , index)=>{

    return (
      <>
      <tbody key={ele?.id}>
        <td>  <tr>{index+1}</tr> </td>
        <td>  <tr>{ele?.name}</tr> </td>
        <td>  <tr>{ele?.email}</tr> </td>
        <td >  <tr>{ele?.messages ? ele?.messages.split(",").map(message => (
        <>
          <p style={{margin : " 3px 5px"}} > {message}</p><hr />
        </>
      )) : "NA"}</tr> </td>
        
      </tbody>
      </>
    )
  })}
 
</table>
    </div>
  )
}

export default AdminMessages
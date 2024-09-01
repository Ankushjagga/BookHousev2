import React , {useEffect , useState}from 'react'
import SideMenu from '../../components/AdminHeader/SideMenu'
import "./admindashboard.css"
import Buttons from '../../components/AdminHeader/Buttons'

import { getAllProducts , getAllCategories , getAllUser, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux';
import { adminData } from '../../redux/Admin'

const AdminDashboard = () => {
 const dispatch = useDispatch()
 const {userList , userCount , productList , productCount , categoryCount} =  useSelector(productData)
 useEffect(() => {
  dispatch(getAllProducts({searchValue : ""}))
  dispatch(getAllUser())
  dispatch(getAllCategories())

  }, [])
console.log("get all users", userList)
  return (
    <>
    {/* <div className='admindashboard'> */}
    {/* <SideMenu/> */}
<Buttons userCount = {userCount} users = {userList} productCount = {productCount} productList = {productList} categoryCount = {categoryCount}/>
    {/* </div> */}

    
    </>
  )
}

export default AdminDashboard
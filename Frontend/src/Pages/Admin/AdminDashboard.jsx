import React , {useEffect , useState}from 'react'
import SideMenu from '../../components/AdminHeader/SideMenu'
import "./admindashboard.css"
import Buttons from '../../components/AdminHeader/Buttons'

import { getAllProducts , getAllCategories , getAllUser, productData, clearAllSliceStates, clearAllSliceData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux';
import { adminData } from '../../redux/Admin'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
 const dispatch = useDispatch()
 const {userList , userCount , productList , productCount , categoryCount, productSliceSuccessMessage,isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError} =  useSelector(productData)
 useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);
 useEffect(() => {
  dispatch(getAllProducts({searchValue : ""}))
  dispatch(getAllUser())
  dispatch(getAllCategories())
return ()=>{
  dispatch(clearAllSliceStates())
  dispatch(clearAllSliceData())
}
  }, [])
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
    <>
    {/* <div className='admindashboard'> */}
    {/* <SideMenu/> */}
<Buttons userCount = {userCount} users = {userList} productCount = {productCount} productList = {productList} categoryCount = {categoryCount}/>
    {/* </div> */}

    
    </>
  )
}

export default AdminDashboard
import React,{useEffect,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const history=useNavigate();


        
  return (
    <div>logout</div>
  )
}

export default Logout
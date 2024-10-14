import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, clearAllSliceStates, productData } from '../../redux/Product'
import useFileUpload from '../../utils/useFileUpload';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddCategory = () => {
  const [name , setname] = useState("");
  const [image, setImage] = useState()
  const dispatch = useDispatch()
  const {categoryList} = useSelector(productData)
  const [error , setError] = useState({name :"", image : ""})
const  { isFileUploading, fileUploadError, fileUploadSuccess, uploadedFileData, uploadFile } = useFileUpload()
const { productSliceSuccessMessage,isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError} =  useSelector(productData)

const handleImage =  async (e)=>{
  const file = e.target.files[0];
const data = await uploadFile(file);
console.log(data);
setError({...error, image :""})
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

useEffect(() => {
if(fileUploadSuccess && !isFileUploading){
  setImage(uploadedFileData.url)
}
}, [isFileUploading])
const submit = (e)=>{
  e.preventDefault();
  const errorObj = {
    name : "",
    image : ""
  }
  if(!name){
    errorObj.name = "name is required"
  }
  if(!image){
    errorObj.image = "image is required"
  }

for (const key in errorObj) {
  if (errorObj[key]) {
    setError(errorObj)
    return ;    
  }
}

  dispatch(addCategory({name : name , image : image}));
}


useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);
  return (
    <div>
    <h1 style={{textAlign: "center", margin : "1rem"}}> Add Category 🆕</h1>

    <form className='addProductForm'>
     Name : <input type='text' placeholder='name' onChange={(e)=> {setname(e.target.value) , setError({...error, name:""})}} value={name}/>
     <h5 className='errors'>{error.name}</h5>
     Image :  <input className='file' type='file' accept='.jpg,.jpeg,.gif,.png'  onChange={handleImage} value={image?.name}/>
     <h5 className='errors'>{error.image}</h5>
     {isFileUploading && <h3>File uploading plese wait ...</h3>}

      <button disabled = {isFileUploading} className='btn' onClick={submit}>Add categroy</button>
    </form>
    </div>
  )
}

export default AddCategory
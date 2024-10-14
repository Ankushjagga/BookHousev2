import React ,{useState , useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearAllSliceStates, getAllCategories, productData } from '../../redux/Product';
import Select  from "react-select"
import useFileUpload from '../../utils/useFileUpload';
import {  toast } from 'react-toastify';
import "./admin.css"
import 'react-toastify/dist/ReactToastify.css';
const AdminAddProduct = () => {
    const dispatch = useDispatch()
const {categoriesList} = useSelector(productData)
const [data , setData] = useState({
    name : "",
    description : "",
    features : [""],
    price : "",
    category : ""

})
const [error , setError] = useState({
  name : "",
  description : "",
  features : "",
  price : "",
  category : "",
  image : ""
})
const [image , setimage] = useState("")
const [categroylist ,setCategorylist] =useState([])
const {isFileUploading, fileUploadError, fileUploadSuccess, uploadedFileData, uploadFile} = useFileUpload()
const { productSliceSuccessMessage,isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage , isProductSliceError} =  useSelector(productData)
useEffect(() => {
dispatch(getAllCategories())
}, [])
useEffect(() => {
  if(isProductSliceSuccess){
    
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
      dispatch(clearAllSliceStates())
  }
   }, [isProductSliceSuccess])
 
   useEffect(() => {
     if(isProductSliceError){
       toast(productSliceErrorMessage,{position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        type:"error",
        progress: undefined,
        theme: "light",})
        dispatch(clearAllSliceStates())
   
     }
     }, [isProductSliceError])

useEffect(()=>{
const list =  categoriesList && categoriesList.length>0 && categoriesList.map((ele)=>{
  return {
    value:  ele.name,
    label : ele.name
  }
});

if(list && list.length >0){
  setCategorylist(list)
}


},[categoriesList])







console.log(categoriesList);
const handleChangeData = (e) =>{

    const name = e.target.name;
    const value = e.target.value
    setData({...data , [name] : value});
setError({...error , [name] : ""})
}

  const submit = (e)=>{
    e.preventDefault()
    const errorObj = {
      name : "",
      description : "",
      features : "",
      price : "",
      category : "",
      image : ""
    }

    if(!data.name){
      errorObj.name = "name is required"
    }
    if(!data.description){
      errorObj.description = "description is required"
    }
    if(data.features[0]==""){
      errorObj.features = "At least One feature is required"
    }
    if(!data.price){
      errorObj.price = "price is required"
    }
    if(data.price <0){
      errorObj.price = "Price cannot be negative value"
    }
    if(!data.category){
      errorObj.category = "category is required"
    }
    if(!image){
      errorObj.image = "image is required"
    }
    const productData = {...data , image : image }
    console.log(productData, "product datatattata");

    for (const key in errorObj) {
      if(errorObj[key]){

        setError(errorObj)
        return;
      }
    }
    
    dispatch(addProduct(productData))
    setData({ name: "", category: "", description: "", features: [""] , price : ""});
    setimage("")
  }
  const addFeature = (e) =>{
e.preventDefault();
setData((prevData)=>({
  ...prevData ,features: [...prevData.features,""]
}))

  }
const deleteFeature =(i, e)=>{
  e.preventDefault()
  const updatedFeatures = data.features.filter((_, index) => index !== i);
const a = setData((prevData)=>({
  ...prevData , features : updatedFeatures
}))
console.log(updatedFeatures, "---upadted features");
console.log(a);
console.log(data.features.length);
console.log(i ,"idnexx");

}
const handleChange = (e,i)=>{
  const {name , value } = e.target;
  console.log("name", name , "value", value)
  setData((prevData) => {
    const updatedFeatures = [...prevData.features];
    updatedFeatures[i] = value;

    return {
      ...prevData,
      features: updatedFeatures
    };
  });
setError({...error , features : ""})
}
const handleCategory = (e)=>{
  console.log(e);
  const {value , label} = e;
  const a = setData((prevData)=>({
    ...prevData , category : value
  }))
  setError({...error, category :""})
}
const handleChangefile =  async (e) =>{
  const file = e.target.files[0];
  console.log(e.target.files);
  
  // const fileFor = e.target.fileFor;
 const data =  await uploadFile(file)
 console.log(data);
 setError({...error, image: ""})
 
}


useEffect(() => {
 
 if(fileUploadSuccess && !isFileUploading){
  const link =  uploadedFileData.url;
console.log(link);

setimage(link)
 } 

}, [isFileUploading])


useEffect(() => {
  window.scroll({
    top: 0,
    behavior: "instant",
  });
}, []);

console.log("Data", data.features)
  return (
    <div>
    <h1 style={{textAlign : "center" , margin: "1rem"}}>Add Product 🆕 </h1>
    <form className='addProductForm'>
        Product Name:<input type="text" name="name" placeholder='Enter Name' value={data.name} onChange={handleChangeData} />
        <h5 className='errors'>{error.name}</h5>
        Description   <textarea rows={10} cols={70} name='description' placeholder='enter Product Description' value={data.description}  onChange={handleChangeData}/>
        <h5 className='errors'>{error.description}</h5>

        Features: {data?.features?.map((val,i)=>{
          console.log(data.features.length , "lenn")
       return   <div key={i}>
          <input type='text' name='features' placeholder='add features' onChange={(e)=>handleChange(e,i)}/>
        <h5 className='errors'>{error.features}</h5>

          {data.features.length > 1 && (
              <button className='featuresBtn' onClick={(e) => deleteFeature(i, e)}>Remove -</button>
            )}


          </div>

        })}
<button className='featuresBtn' onClick={addFeature}>Add +</button>
        <input type='number' name='price' placeholder='enetr price in rupees' value={data.price} onChange={handleChangeData} />
        <h5 className='errors'>{error.price}</h5>

        <Select className='select' name='category'  onChange={handleCategory} options={categroylist} placeholder ="select Category.." />
        <h5 className='errors'>{error.category}</h5>

Image <input  className = "file"type='file' accept='.jpg,.jpeg,.gif,.png' name='image' value={image.name} onChange={handleChangefile}/>
{isFileUploading && <h3>File uploading plese wait ...</h3>}
<h5 className='errors'>{error.image}</h5>

<button className='btn' disabled = {isFileUploading} onClick={submit}>Add Product</button>

    </form>
    </div>
  )
}

export default AdminAddProduct
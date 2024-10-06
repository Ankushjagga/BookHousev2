import React , {useEffect}from 'react'
import Catrgory from '../../components/cards/catrgory'
import "./home.css"
import { NavLink } from 'react-router-dom'
import Card4 from '../../components/cards/Card4'
import  { getAllProducts, productData , getAllCategories , totalItemsInCart, clearAllSliceData, clearAllSliceStates } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import Animation from "../../images/loading.gif"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IoReturnDownBack } from 'react-icons/io5'
import ComponentLoader from '../../components/loaders/ComponentLoader/ComponentLoader'
const Home = () => {
  const { isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage  , productList , categoriesList}  = useSelector(productData)
  const dispatch  = useDispatch()
  useEffect(() => {
     dispatch(getAllProducts({ searchValue:""}))
     dispatch(getAllCategories())
     dispatch(totalItemsInCart())
  
     return () => {
          dispatch(clearAllSliceData())
    dispatch(clearAllSliceStates())
     }
     
     }, [])
  

  //   useEffect(() => {
  //  if(isProductSliceSuccess){
  //   dispatch(clearAllSliceData())
  //   dispatch(clearAllSliceStates())
  //  }
  //   }, [isProductSliceSuccess])
    
     const notify = ()=>{
      toast.success("Notification On 😄", {
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
   

  return (
    <>
    {/* {isProductSliceFetching && <ComponentLoader/>} */}
    <div className='banner'>
      <div className='banner2'></div>
      <div className='banner-head'>
      <h1 className='categories'><span> The Book<span className='rad'>House</span>  </span></h1>
      <p>Stock up on a wide range of Stationary Items Here.<br/> Get a huge selection of Stationary including <span className='rad'> Notebooks , <br/>Pencils, Bags, Books ,Keychains ,Files </span>and son on .<br/> You are certain to <span className='rad'> find something that you need 😄</span></p>
      <span className= "exp">

    <button className='explore '>  <NavLink to="/exploreLatest">Explore</NavLink> </button>
   <button className='random btn'> <NavLink to="exploreRandom"> Random</NavLink> </button>
      </span>
      </div>
    </div>
        <h1 className='categories'><span className='sp'>  Catego<span className='rad'>ries</span>  </span></h1>
        <div className='category'>

    <Catrgory data={categoriesList}  isFetching = {isProductSliceFetching} />
   
    </div>
        <h1 className='categories'><span className='sp'>  Latest <span className='rad'>Items</span>  </span></h1>
<h1 className='sub-category'>🖊️ Pen/Pencils </h1>
        <div className='card-price menu'>
        <Card4 category = {'Pencil'} productList= {productList} isFetching = {isProductSliceFetching}  />
       
        </div>
        <h1 className='sub-category'> ⛓️ KeyChains </h1>
        <div className='card-price menu '>
        <Card4 category = {'Keychain'} productList= {productList} isFetching = {isProductSliceFetching} />
        </div>
        <h1 className='sub-category'>📑 Assignment Files </h1>
        <div className='card-price menu'>
       <Card4 category = {'AssignmentFile'} productList= {productList}  isFetching = {isProductSliceFetching}/>
        </div>
        <div className='subscribe'>
            <h4>Get All The Latest Notification 🔔</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus incidunt repudia<br/> Illo provident quisquam quod sapiente dolor maxime temporibus fugiat corporis hic<br/> quasi voluptate tempora, quo et sed! Est voluptas ex praesentium.</p>
            <button className='btn' onClick={notify}> Notify <i className="fa-solid fa-bell"></i></button>
        </div>
    </>
  )
}

export default Home
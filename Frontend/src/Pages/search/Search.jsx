import React,{useState, useEffect , useRef } from 'react'
// import Header from '../../components/Header/Header';
// import Footer from '../../components/footer/Footer';
import { AiOutlineSearch } from "react-icons/ai";
// import { items } from '../../data/data';
import { NavLink } from 'react-router-dom';
import "./search.css"
import"../../components/cards/card.css"
import  { getAllProducts, productData } from '../../redux/Product'
import { useDispatch, useSelector } from 'react-redux'
// import { filterData } from '../../data/utilis';
function Search() {
  const { isProductSliceFetching , isProductSliceSuccess , productSliceErrorMessage  , productList}  = useSelector(productData)
const dispatch = useDispatch()
    const [item, setitem] = useState([]);
    // const [filteritem, setfilteritem] = useState([]);
    const [searchText, setSearchText] = useState("");
    const timeoutRef = useRef(null);
   

useEffect(() => {
  setitem(productList)
  
}, [productList])


console.log(searchText);
const onTextChange=(event)=>{
  setSearchText(event.target.value)
        // Clear previous timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        if(event.target.value == ""){
          setitem([])
        }else{

          dispatch(getAllProducts({ searchValue: event.target.value }));
        }
      }, 500); // Adjust debounce delay as needed
 
        // const data = filterData(searchText, item);
     
        // setfilteritem(data);

  
}



    return (
    
        <div>
              <div className='find'>
                <input type="text" placeholder="search ur product 😄 " className="searchfind"  value={searchText} onChange={onTextChange}/>
                <AiOutlineSearch className='searchicon'  />
              </div>
          
<div className='menu'>
{item.length?

item.map(item=>{
return(

    <NavLink to={`/shopitm/${item.id}`} className="card-link"  key={item.id}>

<div className="box">
   <img src={`/images/${item.image}`} alt={item.name}/>
   <h4>{item.name}</h4>
   <span className='card-prices'>
       <p>{item.price}₹ </p>
       {/* <button className='btns' title= "Add To Cart" onClick={()=> setcart([...cart,user])}  {...toast.success("items added sucess")} >
         <i class="fa-solid fa-cart-shopping"></i></button> */}

   </span>
 </div>

 </NavLink>
)
})

:<h1 className='placeh'>No Product Found 😟</h1>
}
</div>
        </div>
    )
}

export default Search
import React, { useState, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import CartAmountToggle from "../../components/CartAmountToggle/CartAmountToggle";
import { getSingleProduct, productData, clearAllSliceData } from "../../redux/Product";
// import { toast } from 'react-toastify';
import "./shopitem.css";
import { useDispatch, useSelector } from "react-redux";
const override = {
  display: "block",
  margin: "10rem auto",
  borderColor: "red",
};

const Shopitem = () => {
  const dispatch = useDispatch();
  const {singleProduct , } = useSelector(productData)
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false); 
  // const { addtoCart } = useCartcontext();
  const [amount, setAmount] = useState(1);
  let { id } = useParams();

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };
  
  
  useEffect(() => {
 dispatch(getSingleProduct(id))
 return ()=>{
  dispatch(clearAllSliceData())
 }
  }, [])

  useEffect(() => {
   setuser(singleProduct)
  }, [singleProduct])
  
  


  // const handleclick =  ()=>{
  //   toast("Item Added Sucessfully",{position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: true,
  //   closeOnClick: false,
  //   pauseOnHover: false,
  //   draggable: true,
  //   type:"success",
  //   progress: undefined,
  //   theme: "dark",})

  // }



  return (
    <>
      <span className="link-rec">
        <ol style={{ display: "flex", margin: "1rem", alignItems: "center" }}>
          <li>
            <NavLink
              to="/"
              style={{ textDecoration: "underline", marginRight: ".3rem" }}
              className="hov"
            >
              Home{" "}
            </NavLink>{" "}
            /{" "}
          </li>
          <li style={{ opacity: 0.6, marginLeft: ".3rem" }}>{user?.name}</li>
        </ol>
      </span>
      {!loading ? (
        user ? (
          <>
            <div className="row" key={user.id}>
              <div className="cont-left">
                <img
                  src={`/images/${user?.image}`}
                  alt={user?.name}
                  title={user?.name}
                />
              </div>
              <div className="con-right">
                <h1>{user?.name}</h1>
                <span>
                  <i className="fa-solid fa-tag"></i>
                  {user?.category}
                </span>
                <div className="instruct">
                  <h4>
                    <i className="fa-solid fa-pencil"></i>Description
                  </h4>
                  <p className="desc">{user?.description}</p>
                </div>
                <div className="features">
                  <h4>
                    <i className="fa-solid fa-check"></i>Features
                  </h4>
                  <ol className="shop-fetures">
                    {user?.features ? (
                      user?.features.map((itm) => {
                        return (
                          <div key={itm} className="list">
                            <li className="list">{itm}</li>
                            <hr />
                          </div>
                        );
                      })
                    ) : (
                      <h1>No Features</h1>
                    )}
                  </ol>
                </div>
                <span className="card-prices">
                  <p>Price :{user?.price}₹ </p>
                  <CartAmountToggle
                    amount={amount}
                    setDecrease={setDecrease}
                    setIncrease={setIncrease}
                    className="amount"
                  />
                  {/* <NavLink to = "/cart"> */}

                  <button
                    className="btns"
                    title="Add To Cart"
                    onClick={() => addtoCart(amount, user)}
                  >
                    Add To Cart<i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  {/* </NavLink> */}
                </span>
              </div>
            </div>
          </>
        ) : (
          //  onClick={()=> setcart([...cart,user])} onClickCapture={handleclick}
          <h1>No data found</h1>
        )
      ) : (
        <RingLoader
          color={"#ffff"}
          loading={loading}
          size={150}
          height={250}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={override}
        />
      )}
    </>
  );
};

export default Shopitem;

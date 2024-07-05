import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const data =
  Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
    const setTokenValues = () => {
        officialEmail = data.user.officialEmail;
        
      };
   
      /*  GET ALL PRODUCTS       */
      export const getAllProducts = createAsyncThunk(
        "product/getAllProducts",
        async (obj, thunkAPI) => {
          try {
            const response = await fetch(`http://localhost:5000/v2/product/allProduct`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(response.status, "response", data);                                                                                                                          
            if (response?.status === 200) {
             
      
              return data;
            } else {
              return thunkAPI.rejectWithValue(data);
            }
          } catch (e) {
            console.log("Error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
      );
      /* END*/

      /*  GET ALL PRODUCTS       */
      export const getRandomProduct = createAsyncThunk(
        "product/getRandomProduct",
        async (obj, thunkAPI) => {
          try {
            const response = await fetch(`http://localhost:5000/v2/product/getRandomProduct`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(response.status, "response", data);                                                                                                                          
            if (response?.status === 200) {
             
      
              return data;
            } else {
              return thunkAPI.rejectWithValue(data);
            }
          } catch (e) {
            console.log("Error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
      );
      /* END*/
  /*  GET LATEST PRODUCTS       */
  export const getLatestProduct = createAsyncThunk(
    "product/getLatestProduct",
    async (obj, thunkAPI) => {
      try {
        const response = await fetch(`http://localhost:5000/v2/product/getLatestProduct`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(response.status, "response", data);                                                                                                                          
        if (response?.status === 200) {
         
  
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log("Error", e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );
  /* END*/

    /*  GET ALL CATEGORIES       */
    export const getAllCategories = createAsyncThunk(
      "product/getAllCategories",
      async (obj, thunkAPI) => {
        try {
          const response = await fetch(`http://localhost:5000/v2/product/getAllCategories`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(response.status, "response", data);                                                                                                                          
          if (response?.status === 200) {
           
    
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
        } catch (e) {
          console.log("Error", e.response.data);
          thunkAPI.rejectWithValue(e.response.data);
        }
      }
    );
    /* END*/

      /*  GET PRODUCT BY CATEGORY       */
      export const getProductsByCategory = createAsyncThunk(
        "product/getProductsByCategory",
        async (obj, thunkAPI) => {
        console.log(obj)
          try {
            const response = await fetch(`http://localhost:5000/v2/product/getProductsByCategory/${obj}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(response.status, "response", data);                                                                                                                          
            if (response?.status === 200) {
             
      
              return data;
            } else {
              return thunkAPI.rejectWithValue(data);
            }
          } catch (e) {
            console.log("Error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
      );
      /* END*/

      
      /*  GET  SINGLE PRODUCT        */
      export const getSingleProduct = createAsyncThunk(
        "product/getSingleProduct",
        async (obj, thunkAPI) => {
        console.log(obj)
          try {
            const response = await fetch(`http://localhost:5000/v2/product/getSingleProduct/${obj}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            console.log(response.status, "response", data);                                                                                                                          
            if (response?.status === 200) {
             
      
              return data;
            } else {
              return thunkAPI.rejectWithValue(data);
            }
          } catch (e) {
            console.log("Error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
      );
      /* END*/
  


      const initialStateValues = {
        isProductSliceFetching: false,
        isProductSliceSuccess: false,
        isProductSliceError: false,
        productSliceErrorMessage: "",
        productSliceSuccessMessage:"",
        isProductSliceFetchingSmall:false,
        productList : [],
        randomProduct : null,
        latestProductList : [] ,
        categoriesList : [] ,
        singleProduct : null,
        
  
      };




      const productSlice = createSlice({
        name: "product",
        initialState: initialStateValues,
        reducers: {
          // omit reducer cases
          clearAllSliceStates:(state,action)=>{
            (state.productSliceSuccessMessage=''),
            (state.productSliceErrorMessage=''),
            (state.isProductSliceError=false),
            (state.isProductSliceFetching=false),
            (state.isProductSliceFetchingSmall=false),
            (state.isProductSliceSuccess=false)
          },
          clearAllSliceData:(state,action)=>{
            (state.productList=[]),
            (state.randomProduct= null),
            (state.latestProductList= []),
            (state.categoriesList= []),
            (state.singleProduct= [])
            }

       
          },
        extraReducers: (builder) => {
          /*ALL PRODUCT REDUCERS*/
          builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
            state.isProductSliceFetching = false
            console.log(payload);
            state.isProductSliceSuccess = true;
            state.productSliceSuccessMessage = payload?.message || "Product list fetched successfully";

            state.productList = payload.data
            return state;
          });
          builder.addCase(getAllProducts.pending, (state, { payload }) => {
            state.isProductSliceFetching = true
            state.isProductSliceSuccess = false;
            return state;
          });
          builder.addCase(getAllProducts.rejected, (state, { payload }) => {
            state.isProductSliceFetching = true
            state.isProductSliceSuccess = false;
            state.productSliceErrorMessage = payload?.message || "something went wrong"
            console.log(payload);
            return state;
          });
          /*END*/
         
          /*RANDOM PRODUCTS*/
          builder.addCase(getRandomProduct.fulfilled, (state, { payload }) => {
            state.isProductSliceFetching = false
            console.log(payload);
            state.isProductSliceSuccess = true;
            state.productSliceSuccessMessage = payload?.message || "Product list fetched successfully";

            state.randomProduct = payload.data
            return state;
          });
          builder.addCase(getRandomProduct.pending, (state, { payload }) => {
            state.isProductSliceFetching = true
            state.isProductSliceSuccess = false;
            return state;
          });
          builder.addCase(getRandomProduct.rejected, (state, { payload }) => {
            state.isProductSliceFetching = true
            state.isProductSliceSuccess = false;
            state.productSliceErrorMessage = payload?.message || "something went wrong"
            console.log(payload);
            return state;
          });
          /*END*/

                /*LATEST PRODUCT REDUCERS*/
                builder.addCase(getLatestProduct.fulfilled, (state, { payload }) => {
                  state.isProductSliceFetching = false
                  console.log(payload);
                  state.isProductSliceSuccess = true;
                  state.productSliceSuccessMessage = payload?.message ;
      
                  state.latestProductList = payload.data
                  return state;
                });
                builder.addCase(getLatestProduct.pending, (state, { payload }) => {
                  state.isProductSliceFetching = true
                  state.isProductSliceSuccess = false;
                  return state;
                });
                builder.addCase(getLatestProduct.rejected, (state, { payload }) => {
                  state.isProductSliceFetching = true
                  state.isProductSliceSuccess = false;
                  state.productSliceErrorMessage = payload?.message || "something went wrong"
                  console.log(payload);
                  return state;
                });
                /*END*/


                  /*ALL CATEGORIES REDUCERS*/
                  builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
                    state.isProductSliceFetching = false
                    console.log(payload);
                    state.isProductSliceSuccess = true;
                    state.productSliceSuccessMessage = payload?.message ;
        
                    state.categoriesList = payload.data
                    return state;
                  });
                  builder.addCase(getAllCategories.pending, (state, { payload }) => {
                    state.isProductSliceFetching = true
                    state.isProductSliceSuccess = false;
                    return state;
                  });
                  builder.addCase(getAllCategories.rejected, (state, { payload }) => {
                    state.isProductSliceFetching = true
                    state.isProductSliceSuccess = false;
                    state.productSliceErrorMessage = payload?.message || "something went wrong"
                    console.log(payload);
                    return state;
                  });
                  /*END*/

                  
                  /*PRODUCT BY CATEGORY REDUCERS*/
                  builder.addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
                    state.isProductSliceFetching = false
                    console.log(payload);
                    state.isProductSliceSuccess = true;
                    state.productSliceSuccessMessage = payload?.message ;
        
                    state.productList = payload.data
                    return state;
                  });
                  builder.addCase(getProductsByCategory.pending, (state, { payload }) => {
                    state.isProductSliceFetching = true
                    state.isProductSliceSuccess = false;
                    return state;
                  });
                  builder.addCase(getProductsByCategory.rejected, (state, { payload }) => {
                    state.isProductSliceFetching = true
                    state.isProductSliceSuccess = false;
                    state.productSliceErrorMessage = payload?.message || "something went wrong"
                    console.log(payload);
                    return state;
                  });
                  /*END*/

                        /* SINGLE PRODUCT REDUCERS*/
                        builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
                          state.isProductSliceFetching = false
                          console.log(payload);
                          state.isProductSliceSuccess = true;
                          state.productSliceSuccessMessage = payload?.message ;
              
                          state.singleProduct = payload.data
                          return state;
                        });
                        builder.addCase(getSingleProduct.pending, (state, { payload }) => {
                          state.isProductSliceFetching = true
                          state.isProductSliceSuccess = false;
                          return state;
                        });
                        builder.addCase(getSingleProduct.rejected, (state, { payload }) => {
                          state.isProductSliceFetching = true
                          state.isProductSliceSuccess = false;
                          state.productSliceErrorMessage = payload?.message || "something went wrong"
                          console.log(payload);
                          return state;
                        });
                        /*END*/
        
      
        },
    });
    
      

    export const { clearAllSliceStates , clearAllSliceData} = productSlice.actions;
    export const  productData = (state) => state.product
export default productSlice;

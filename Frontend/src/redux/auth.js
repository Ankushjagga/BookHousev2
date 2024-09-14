import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
let userId;
let email;
 
    const setTokenValues = () => {
const data =
Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
      ? JSON.parse(Cookies.get("loginData"))
      : null;
      email = data.email;
      userId = data.id
        
      };
      // get login data for change Password functionality
      const getTokenValues = () => {
        const dt=Cookies.get("loginData")
        ? JSON.parse(Cookies.get("loginData"))
        : null;
           userId = dt?.id;
      };


  //REGISTER USER
      export const registerUser = createAsyncThunk(
        "auth/registerUser",
        async (obj, thunkAPI) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/register`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            });
            const data = await response.json();
            console.log(data, "-------------------");
            if (response?.status === 200) {
              Cookies.set("loginData", JSON.stringify(data?.data));
              Cookies.set("token", data?.Token);
              Cookies.set("userEmail", data?.data.email);
              Cookies.set("userEmail", data?.data.email);
              Cookies.set("role", data?.data.role);
              console.log(data, "data");
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




      //LOGIN USER
      export const loginUser = createAsyncThunk(
        "auth/loginUser",
        async (obj, thunkAPI) => {
        console.log(obj)
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            });
            const data = await response.json();
            if (response?.status === 200) {
              Cookies.set("loginData", JSON.stringify(data?.data));
              Cookies.set("token", data?.Token);
              Cookies.set("userEmail", data?.data.email);
              Cookies.set("role", data?.data.role);
              console.log(data, "data");
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


   //CONTACT US
   export const contactUs = createAsyncThunk(
    "auth/contactUs",
    async (obj, thunkAPI) => {
    console.log(obj)
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/auth/contactUs`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        const data = await response.json();
        if (response?.status === 200) {
          
          console.log(data, "data");
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

  //FORGET PASSWORD
  export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (obj, thunkAPI) => {
    console.log(obj)
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/auth/forgetPassword`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        const data = await response.json();
        if (response?.status === 200) {
          
          console.log(data, "data");
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


  //RESET PASSWORD
  export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (obj, thunkAPI) => {
    console.log(obj, "obkkadkkasd")
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/auth/resetPassword/${obj.token}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({password : obj.password}),
        });
        const data = await response.json();
        if (response?.status === 200) {
          
          console.log(data, "data");
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
  /*  GET User Detail       */
  export const getUserDetail = createAsyncThunk(
    "auth/getUserDetail",
    
    async (obj, thunkAPI) => {
      try {
        setTokenValues()

        const response = await fetch(`${import.meta.env.VITE_API}/auth/getUserDetail/userId/${userId}`, {
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
        isAuthSliceFetching: false,
        isAuthSliceSuccess: false,
        isAuthSliceError: false,
        authSliceErrorMessage: "",
        authSliceSuccessMessage:"",
        isAuthSliceFetchingSmall:false,
        loggedInUserName: "",
        loggedInUserId: "",
        userDetail : null
      };




      const authSlice = createSlice({
        name: "authentication",
        initialState: initialStateValues,
        reducers: {
          // omit reducer cases
          logout: (state, action) => {
            // Cookies.remove();
            return initialStateValues;
          },
          clearAllSliceStates:(state,action)=>{
            (state.authSliceSuccessMessage=''),
            (state.authSliceErrorMessage=''),
            (state.isAuthSliceError=false),
            (state.isAuthSliceFetching=false),
            (state.isAuthSliceFetchingSmall=false),
            (state.isAuthSliceSuccess=false)
          }
          },
        extraReducers: (builder) => {

          builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.isAuthSliceFetching = false;
            //   state.isLoggedIn = true;
      
            console.log(payload);
            state.isAuthSliceSuccess = true;
            state.loggedInUserName = payload?.name ;
            state.loggedInUserId = payload?.id
            state.authSliceSuccessMessage = payload?.message || "Regsiter sucessfully"
            //   state.token = payload.token.access.token;
      
            return state;
          });
          builder.addCase(registerUser.pending, (state, { payload }) => {
            state.isAuthSliceFetching = true;
            state.isAuthSliceSuccess = false;
            console.log(payload);
            
            return state;
          });
          builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.isAuthSliceFetching = false;
            state.isAuthSliceError = true
            state.authSliceErrorMessage = payload?.message 
            console.log(payload);

            return state;
          });

//LOGIN USER REDUCER
          builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            console.log("------", payload)
            state.isAuthSliceFetching = false;
            console.log(payload , "asdadadsdasdas");
            state.isAuthSliceSuccess = true;
            state.loggedInUserName = payload?.data?.name,
            state.loggedInUserId = payload?.data?.id
            //   state.token = payload.token.access.token;
            state.authSliceSuccessMessage = payload?.message || "login sucessfully"
      
            return state;
          });
          builder.addCase(loginUser.pending, (state, { payload }) => {
            state.isAuthSliceFetching = true;
            state.isAuthSliceSuccess = false;
            
            return state;
          });
          builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.isAuthSliceFetching = false;
            state.isAuthSliceSuccess = false;
            state.isAuthSliceError = true
            state.authSliceErrorMessage =   "something went wrong"

 console.log(payload)

            return state;
          });


//CONTACT US REDUCER
builder.addCase(contactUs.fulfilled, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  console.log(payload , "asdadadsdasdas");
  state.isAuthSliceSuccess = true;
  //   state.token = payload.token.access.token;
  state.authSliceSuccessMessage = payload?.message || "message send sucessfully"

  return state;
});
builder.addCase(contactUs.pending, (state, { payload }) => {
  state.isAuthSliceFetching = true;
  state.isAuthSliceSuccess = false;
  
  return state;
});
builder.addCase(contactUs.rejected, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  state.isAuthSliceSuccess = false;
  state.isAuthSliceError = true
  state.authSliceErrorMessage =   "something went wrong"

console.log(payload)

  return state;
});


//FORGET PASSWORD REDUCER
builder.addCase(forgetPassword.fulfilled, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  console.log(payload , "asdadadsdasdas");
  state.isAuthSliceSuccess = true;
  //   state.token = payload.token.access.token;
  state.authSliceSuccessMessage = payload?.message || "message send sucessfully"

  return state;
});
builder.addCase(forgetPassword.pending, (state, { payload }) => {
  state.isAuthSliceFetching = true;
  state.isAuthSliceSuccess = false;
  
  return state;
});
builder.addCase(forgetPassword.rejected, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  state.isAuthSliceSuccess = false;
  state.isAuthSliceError = true
  state.authSliceErrorMessage =   payload?.message ||  "something went wrong"

console.log(payload)

  return state;
});



//reset PASSWORD REDUCER
builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  console.log(payload , "asdadadsdasdas");
  state.isAuthSliceSuccess = true;
  //   state.token = payload.token.access.token;
  state.authSliceSuccessMessage = payload?.message || "message send sucessfully"

  return state;
});
builder.addCase(resetPassword.pending, (state, { payload }) => {
  state.isAuthSliceFetching = true;
  state.isAuthSliceSuccess = false;
  
  return state;
});
builder.addCase(resetPassword.rejected, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  state.isAuthSliceSuccess = false;
  state.isAuthSliceError = true
  state.authSliceErrorMessage =   "something went wrong"

console.log(payload)

  return state;
});


//user deatil REDUCER
builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  console.log(payload , "asdadadsdasdas");
  // state.isAuthSliceSuccess = true;
  state.userDetail = payload?.data
  //   state.token = payload.token.access.token;
  state.authSliceSuccessMessage = payload?.message

  return state;
});
builder.addCase(getUserDetail.pending, (state, { payload }) => {
  state.isAuthSliceFetching = true;
  state.isAuthSliceSuccess = false;
  
  return state;
});
builder.addCase(getUserDetail.rejected, (state, { payload }) => {
  state.isAuthSliceFetching = false;
  state.isAuthSliceSuccess = false;
  state.isAuthSliceError = true
  state.authSliceErrorMessage =   "something went wrong"

console.log(payload)

  return state;
});

        },
        
    });
    
      

    export const { logout ,clearAllSliceStates} = authSlice.actions;
    export const  authData = (state) => state.authentication

export default authSlice;

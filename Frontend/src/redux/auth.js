import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const data =
  Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
    const setTokenValues = () => {
        officialEmail = data.user.officialEmail;
        
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
            const response = await fetch(`http://localhost:5000/v2/auth/register`, {
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
              Cookies.set("userEmail", data?.Data.email);
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
            const response = await fetch(`http://localhost:5000/v2/auth/login`, {
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


      const initialStateValues = {
        isAuthSliceFetching: false,
        isAuthSliceSuccess: false,
        isAuthSliceError: false,
        authSliceErrorMessage: "",
        authSliceSuccessMessage:"",
        isAuthSliceFetchingSmall:false,
        loggedInUserName: "",
        loggedInUserId: ""
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
            state.isAuthSliceSuccess = false;
            console.log(payload);

            return state;
          });

//LOGIN USER REDUCER
          builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isAuthSliceFetching = false;
            console.log(payload , "asdadadsdasdas");
            state.isAuthSliceSuccess = true;
            state.loggedInUserName = payload?.name,
            state.loggedInUserId = payload?.id
            //   state.token = payload.token.access.token;
      
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
 console.log(payload)

            return state;
          });
        },
        
    });
    
      

    export const { logout ,clearAllSliceStates} = authSlice.actions;
    export const  authData = (state) => state.authentication

export default authSlice;

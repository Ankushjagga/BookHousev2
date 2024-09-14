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

      //LOGIN ADMIN
      export const loginAdmin = createAsyncThunk(
        "auth/loginAdmin",
        async (obj, thunkAPI) => {
        console.log(obj)
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/admin/adminLogin`, {
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

  /* END*/




      const initialStateValues = {
        isAdminSliceFetching: false,
        isAdminSliceSuccess: false,
        isAdminSliceError: false,
        adminSliceErrorMessage: "",
        adminSliceSuccessMessage:"",
        isAdminSliceFetchingSmall:false,
        loggedInUserName: "",
        loggedInUserId: "",
        userDetail : null
      };




      const AdminSlice = createSlice({
        name: "admin",
        initialState: initialStateValues,
        reducers: {
          // omit reducer cases
          logout: (state, action) => {
            // Cookies.remove();
            return initialStateValues;
          },
          clearAdminSliceStates:(state,action)=>{
            (state.adminSliceSuccessMessage=''),
            (state.adminSliceErrorMessage=''),
            (state.isAdminSliceError=false),
            (state.isAdminSliceFetching=false),
            (state.isAdminSliceFetchingSmall=false),
            (state.isAdminSliceSuccess=false)
          }
          },
        extraReducers: (builder) => {

        

//LOGIN USER REDUCER
          builder.addCase(loginAdmin.fulfilled, (state, { payload }) => {
            console.log("------", payload)
            state.isAdminSliceFetching = false;
            console.log(payload , "asdadadsdasdas");
            state.isAdminSliceSuccess = true;
            state.loggedInUserName = payload?.data?.name,
            state.loggedInUserId = payload?.data?.id
            //   state.token = payload.token.access.token;
            state.adminSliceSuccessMessage = payload?.message || "login sucessfully"
      
            return state;
          });
          builder.addCase(loginAdmin.pending, (state, { payload }) => {
            state.isAdminSliceFetching = true;
            state.isAdminSliceSuccess = false;
            
            return state;
          });
          builder.addCase(loginAdmin.rejected, (state, { payload }) => {
            state.isAdminSliceFetching = false;
            state.isAdminSliceSuccess = false;
            state.isAdminSliceError = true
            state.adminSliceErrorMessage =  payload?.message ||  "something went wrong"

 console.log(payload)

            return state;
          });

        }
        
    });
    
      

    export const { logout ,clearAdminSliceStates} = AdminSlice.actions;
    export const  adminData = (state) => state.admin

export default AdminSlice;

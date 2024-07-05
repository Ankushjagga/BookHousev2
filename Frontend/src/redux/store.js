import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import productSlice from "./Product";

const store = configureStore({
    reducer :{
        authentication : authSlice.reducer,
        product : productSlice.reducer
    }
})


export default store;
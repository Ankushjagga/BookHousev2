import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import productSlice from "./Product";
import AdminSlice from "./Admin";

const store = configureStore({
    reducer :{
        authentication : authSlice.reducer,
        product : productSlice.reducer,
        admin : AdminSlice.reducer
    }
})


export default store;
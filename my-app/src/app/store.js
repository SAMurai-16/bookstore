import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
import blogReducer from "../features/blog/blogSlice"


export const store = configureStore({
    reducer: {
        auth:authReducer,
        prod:productReducer,
        blog:blogReducer,
    },
})
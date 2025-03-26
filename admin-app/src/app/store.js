import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import customerReducer from "../features/customers/customerSlice"
import productReducer from "../features/product/productSlice"
import brandReducer from "../features/brand/brandSlice"
import categoryReducer from "../features/category/categorySlice"
import blogReducer from "../features/blog/blogSlice"
import bcategoryReducer from "../features/bcategory/bcategorySlice"
import uploadImageReducer from "../features/upload/uploadSlice"
import orderReducer from "../features/orders/orderSlice"


export const store = configureStore({
    reducer:
        {auth: authReducer,
        orders: orderReducer,
        customer:customerReducer,
        product:productReducer,
        brand:brandReducer, 
        category:categoryReducer,
        blog:blogReducer,
        bcategory:bcategoryReducer,
        image:uploadImageReducer},
    

})
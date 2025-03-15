import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { authService } from "./userService"


export const registerUser = createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try{
        return await authService.register(userData)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const loginUser = createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try{
        return await authService.login(userData)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})



export const getUserWishlist = createAsyncThunk("user/wishlist",async(_,thunkAPI)=>{
    try{
        return await authService.getuserWishlist()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})



export const addProdToCart = createAsyncThunk("cart/add",async(cartData,thunkAPI)=>{
    try{
        return await authService.addProdToCart(cartData)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})


export const getUserCart = createAsyncThunk("cart/get",async(_,thunkAPI)=>{
    try{
        return await authService.getUserCart()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})


export const deleteFromCart = createAsyncThunk("cart/delete",async(id,thunkAPI)=>{
    try{
        return await authService.deleteFromCart(id)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})


export const getAllCoupons =  createAsyncThunk("coupon/all",async(_,thunkAPI)=>{
    try{
        return await authService.getAllCoupons()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})


const getcustomerFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer")):null;

const initialState={
    user:getcustomerFromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}


export const AuthSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload; 
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload;
            if(state.isSuccess===true){
                localStorage.setItem("token",action.payload.token)

            } 

        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        }).addCase(getUserWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload;
     

        }).addCase(getUserWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        }).addCase(addProdToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addProdToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart = action.payload;
     

        }).addCase(addProdToCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        }).addCase(getUserCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart = action.payload;
     

        }).addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        }).addCase(deleteFromCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteFromCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deleted = action.payload;
     

        }).addCase(deleteFromCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        })
        .addCase(getAllCoupons.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupons= action.payload;
     

        }).addCase(getAllCoupons.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        })
    }
})

export default AuthSlice.reducer;
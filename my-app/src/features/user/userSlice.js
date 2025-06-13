import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { authService } from "./userService"


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        return await authService.register(userData);
      } catch (error) {
        // Safely get the error message from the Axios error response
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          "Registration failed";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

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

export const createOrder=  createAsyncThunk("order/create",async(orderDetail,thunkAPI)=>{
    try{
        return await authService.createOrder(orderDetail)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})
export const getallOrders=  createAsyncThunk("order/getall",async(_,thunkAPI)=>{
    try{
        return await authService.getallOrders()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const EmptyCart=  createAsyncThunk("cart/empty",async(_,thunkAPI)=>{
    try{
        return await authService.emptyCart()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})


export const updateUser=  createAsyncThunk("user/update",async(data,thunkAPI)=>{
    try{
        return await authService.updateUser(data)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const forgotPassword=  createAsyncThunk("pass/forgot",async(data,thunkAPI)=>{
    try{
        return await authService.forgotPassword(data)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const resetPassword=  createAsyncThunk("pass/new",async(data,thunkAPI)=>{
    try{
        return await authService.resetPassword(data)



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
        .addCase(createOrder.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdOrder= action.payload;
     

        }).addCase(createOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload;
        })
        .addCase(getallOrders.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getallOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.Orders= action.payload;
     

        }).addCase(getallOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload
        })
        .addCase(EmptyCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(EmptyCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart= action.payload;
     

        }).addCase(EmptyCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user= action.payload;
     

        }).addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload
        })
        .addCase(forgotPassword.pending,(state)=>{
            state.isLoading=true;
        }).addCase(forgotPassword.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.token= action.payload;
            if(state.isSuccess){
                alert("Email sent Successfully")
            }
     

        }).addCase(forgotPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload


        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading=true;
        }).addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pass= action.payload;
            if(state.isSuccess){
                alert("Password reset Successfully")
            }
          

        }).addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload
            if(state.isError){
                alert("Token Expired")
            }
        })




        
    }
})

export default AuthSlice.reducer;
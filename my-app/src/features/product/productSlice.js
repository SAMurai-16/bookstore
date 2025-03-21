import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { prodService } from "./productService"



export const getallProducts = createAsyncThunk("prod/getall",async(data,thunkAPI)=>{
    try{
        return await prodService.getProducts(data)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const addtoWishlist = createAsyncThunk("prod/getwish",async(prodId,thunkAPI)=>{
    try{
        return await prodService.addtoWishlist(prodId)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const getProduct = createAsyncThunk("prod/getaprod",async(id,thunkAPI)=>{
    try{
        return await prodService.getaProduct(id)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const ratings = createAsyncThunk("prod/rating",async(data,thunkAPI)=>{
    try{
        return await prodService.giveratings(data)



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})







const productState={
    product:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}


export const productSlice = createSlice({
    name:"product",
    initialState:productState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getallProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getallProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product = action.payload; 
        }).addCase(getallProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.error;
        }).addCase(addtoWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addtoWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addtoWishlist = action.payload; 
            state.message = "Product added to Wishlist"
        }).addCase(addtoWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.error;
        }).addCase(getProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleproduct = action.payload; 
            state.message = "Product fetched"
        }).addCase(getProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.error;
        })
        .addCase(ratings.pending,(state)=>{
            state.isLoading=true;
        }).addCase(ratings.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.ratings = action.payload; 
            state.message = "Product fetched"
        }).addCase(ratings.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.error;
        })
    }
})

export default productSlice.reducer;
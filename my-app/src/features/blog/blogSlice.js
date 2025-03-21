import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { blogService } from "./blogService"




export const getallBlogs = createAsyncThunk("blog/getall",async(_,thunkAPI)=>{
    try{
        return await blogService.getblogs()



    }
    catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const getaBlog = createAsyncThunk("blog/getone",async(id,thunkAPI)=>{
    try{
        return await blogService.getaBlog(id)



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



const blogState={
    blog:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}


export const blogSlice = createSlice({
    name:"blog",
    initialState:blogState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getallBlogs.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getallBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blog = action.payload; 
        }).addCase(getallBlogs.rejected,(state,action)=>{
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
        })

        .addCase(getaBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getaBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleblog = action.payload; 
            state.message = "Blog fetched"
        }).addCase(getaBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message=action.error;
        })
    }
})

export default blogSlice.reducer;

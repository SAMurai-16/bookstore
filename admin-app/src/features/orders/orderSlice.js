import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
    orders:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
}

export const getOrders = createAsyncThunk('order/get-orders', async(_,thunkAPI)=>{
    try{
        return await orderService.getOrders()
    }
    catch{
        return thunkAPI.rejectWithValue(error)
    }
})



export const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true;

        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading = true;
            state.isSuccess = true;
            state.orders = action.payload
        })

        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error
            

        })


    }
})

export default orderSlice.reducer

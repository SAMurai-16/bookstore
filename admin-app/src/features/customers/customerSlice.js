import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "./customerService";

export const getusers = createAsyncThunk('customer/get-customers', async (_, thunkAPI) => {
    try {
        return await CustomerService.getusers();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
const initialState= {
    customers:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
}

export const customerSlice= createSlice({
      name:"customers",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getusers.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getusers.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.customers = action.payload
            })
    
            .addCase(getusers.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.customers = null;
                state.message=action.error
    
            })
    
    
        }
    })


    export default customerSlice.reducer

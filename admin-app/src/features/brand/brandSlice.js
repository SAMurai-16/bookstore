import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk('product/get-brands', async (_, thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const createBrands = createAsyncThunk('product/create-brands', async (data, thunkAPI) => {
    try {
        return await brandService.createBrands(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getBrand = createAsyncThunk('product/get-brand', async (id, thunkAPI) => {
    try {
        return await brandService.getBrand(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const updateBrand = createAsyncThunk('product/update-brand', async (brand, thunkAPI) => {
    try {
        return await brandService.updateBrand(brand);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteBrand = createAsyncThunk('product/delete-brand', async (id, thunkAPI) => {
    try {
        return await brandService.deleteBrand(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const resetState = createAction("Reset_all")
const initialState= {
    brands:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
    created:false
}

export const brandSlice= createSlice({
      name:"brands",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getBrands.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.brands = action.payload
            })
    
            .addCase(getBrands.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brands = null;
                state.message=action.payload || "something went wrong"
    
            })
            .addCase(createBrands.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(createBrands.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.brands = action.payload
                state.created= true
            })
    
            .addCase(createBrands.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brands = null;
                state.message=action.error
    
            })
            .addCase(getBrand.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getBrand.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.BrandName = action.payload.title
                
            })
    
            .addCase(getBrand.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brands = null;
                state.message=action.payload
    
            })

            .addCase(updateBrand.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.updatedBrand2 = action.payload
                
            })
    
            .addCase(updateBrand.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brands = null;
                state.message=action.payload
    
            })
            .addCase(deleteBrand.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.deletedBrand = action.payload
                
            })
    
            .addCase(deleteBrand.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brands = null;
                state.message=action.payload
    
            })
            .addCase(resetState, ()=> initialState )
    
    
        }
    })


    export default brandSlice.reducer
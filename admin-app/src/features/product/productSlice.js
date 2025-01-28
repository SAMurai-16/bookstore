import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const createProduct = createAsyncThunk('product/create-products', async (Productdata, thunkAPI) => {
    try {
        
        return await productService.createProduct(Productdata);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const getaProduct = createAsyncThunk('product/getaproduct', async (id, thunkAPI) => {
    try {
        
        return await productService.getaProduct(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const updateProduct = createAsyncThunk('product/update-product', async (Productdata, thunkAPI) => {
    try {
        
        return await productService.updateProduct(Productdata);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteProduct = createAsyncThunk('product/delete-product', async (id, thunkAPI) => {
    try {
        
        return await productService.deleteProduct(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
const initialState= {
    products:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
    createdProduct:""
}

export const productSlice= createSlice({
      name:"products",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getProducts.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.products = action.payload
            })
    
            .addCase(getProducts.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
            })
            .addCase(createProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.products = action.payload
            })
    
            .addCase(createProduct.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
    
            })
            .addCase(getaProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getaProduct.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.getProduct = action.payload
            })
    
            .addCase(getaProduct.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
    
            })
            .addCase(updateProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.updateProduct = action.payload
            })
    
            .addCase(updateProduct.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
    
            })
            .addCase(deleteProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.message = action.payload
            })
    
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
    
            })
    
    
    
        }
    })


    export default productSlice.reducer
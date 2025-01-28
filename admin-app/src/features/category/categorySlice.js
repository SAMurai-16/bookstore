import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategories = createAsyncThunk('product/get-categories', async (_, thunkAPI) => {
    try {
        return await categoryService.getCategories();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const createCategories = createAsyncThunk('product/create-categories', async (data, thunkAPI) => {
    try {
        return await categoryService.createCategories(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getaCategory = createAsyncThunk('product/getcategory', async (id, thunkAPI) => {
    try {
        return await categoryService.getaCategory(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const updateaCategory = createAsyncThunk('product/updatecategory', async (data, thunkAPI) => {
    try {
        return await categoryService.updateaCategory(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteaCategory = createAsyncThunk('product/deletecategory', async (id, thunkAPI) => {
    try {
        return await categoryService.deleteaCategory(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const resetState = createAction('Reset_all')
const initialState= {
    categories:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
    created: false
}

export const categorySlice= createSlice({
      name:"categories",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getCategories.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.categories = action.payload
            })
    
            .addCase(getCategories.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.categories = null;
                state.message=action.error
    
            })
            .addCase(createCategories.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(createCategories.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.categories = action.payload
                state.created = true
            })
    
            .addCase(createCategories.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.categories = null;
                state.message=action.error
    
            })
            .addCase(getaCategory.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getaCategory.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.categoryName = action.payload.title
            })
    
            .addCase(getaCategory.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.categories = null;
                state.message=action.error
    
            })
            .addCase(updateaCategory.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateaCategory.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.updatedcategory = action.payload
            })
    
            .addCase(updateaCategory.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.categories = null;
                state.message=action.payload
    
            })
            .addCase(deleteaCategory.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteaCategory.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.message = action.payload
            })
    
            .addCase(deleteaCategory.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.categories = null;
                state.message=action.payload
    
            })
            .addCase(resetState, ()=> initialState)
    
    
        }
    })


    export default categorySlice.reducer
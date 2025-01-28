import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCatService from "./bcategoryService";

export const getBlogCats = createAsyncThunk('blog/get-blogCategories', async (_, thunkAPI) => {
    try {
        return await blogCatService.getBlogCats();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const createBcategories = createAsyncThunk('product/create-bcategories', async (data, thunkAPI) => {
    try {
        console.log("hi");
        
        return await blogCatService.createBcategories(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getBcategory = createAsyncThunk('product/get-bcategory', async (id, thunkAPI) => {
    try {
        
        return await blogCatService.getBcategory(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});


export const updateBcategory = createAsyncThunk('product/update-bcategory', async (data, thunkAPI) => {
    try {
        
        return await blogCatService.updateBcategory(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteBcategory = createAsyncThunk('product/delete-bcategory', async (data, thunkAPI) => {
    try {
        
        return await blogCatService.deleteBcategory(data);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const resetState = createAction('Reset_all')
const initialState= {
    bcategory:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
    created:false,
}

export const blogCatSlice= createSlice({
      name:"blogCats",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getBlogCats.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getBlogCats.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.bcategory = action.payload
            })
    
            .addCase(getBlogCats.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.bcategory = null;
                state.message=action.error
    
            })
             .addCase(createBcategories.pending,(state,action)=>{
                state.message = action.payload
                            
             })
            .addCase(createBcategories.fulfilled,(state,action)=>{
                        state.isLoading = true;
                        state.isSuccess = true;
                        state.bcategory = action.payload;
                        state.created = true;
                        })
                            
            .addCase(createBcategories.rejected,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = false;
                                        state.isError = true;
                                        state.bcategory = null;
                                        state.message=action.payload || "something went wrong"
                            
                                    })  
                                    .addCase(getBcategory.pending,(state)=>{
                                        state.isLoading = true;
                                    })
                                    .addCase(getBcategory.fulfilled,(state,action)=>{
                                        state.isLoading = true;
                                        state.isSuccess = true;
                                        state.blogcat= action.payload.title
                                    })
                            
                                    .addCase(getBcategory.rejected,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = false;
                                        state.isError = true;
                                        state.bcategory = null;
                                        state.message=action.error
                            
                                    }) 
                                    .addCase(updateBcategory.pending,(state)=>{
                                        state.isLoading = true;
                                    })
                                    .addCase(updateBcategory.fulfilled,(state,action)=>{
                                        state.isLoading = true;
                                        state.isSuccess = true;
                                        state.updatedblogcat= action.payload
                                    })
                            
                                    .addCase(updateBcategory.rejected,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = false;
                                        state.isError = true;
                                        state.bcategory = null;
                                        state.message=action.payload
                            
                                    })


                                    .addCase(deleteBcategory.pending,(state)=>{
                                        state.isLoading = true;
                                    })
                                    .addCase(deleteBcategory.fulfilled,(state,action)=>{
                                        state.isLoading = true;
                                        state.isSuccess = true;
                                        state.message= action.payload
                                    })
                            
                                    .addCase(deleteBcategory.rejected,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = false;
                                        state.isError = true;
                                        state.bcategory = null;
                                        state.message=action.payload
                            
                                    })
                                    
            .addCase(resetState, ()=> initialState)
    
    
        }
    })


    export default blogCatSlice.reducer
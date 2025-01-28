import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk('blog/get-blogs', async (_, thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const getaBlog = createAsyncThunk('blog/getablog', async (id, thunkAPI) => {
    try {
        return await blogService.getaBlog(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const createBlog = createAsyncThunk('product/create-blogs', async (Productdata, thunkAPI) => {
    try {
        console.log("hi");
        
        return await  blogService.createBlog(Productdata);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const deleteBlog = createAsyncThunk('product/delete-blogs', async (id, thunkAPI) => {
    try {
        console.log("hi");
        
        return await  blogService.deleteBlog(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const updateBlog = createAsyncThunk('blog/Updateblog', async (data, thunkAPI) => {
    try {
        return await blogService.updateBlog(data)
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});



const initialState= {
    blogs:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
    blogCreated:false
}

export const blogSlice= createSlice({
      name:"blogs",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getBlogs.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.blogs = action.payload
            })
    
            .addCase(getBlogs.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.blogs = null;
                state.message=action.error
    
            })
    
            .addCase(createBlog.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.blogCreated = true
                state.blogs = action.payload
            })
    
            .addCase(createBlog.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.blogs = null;
                state.message=action.payload
    
            })
            .addCase(deleteBlog.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.blogCreated = true
                state.message = action.payload
            })
    
            .addCase(deleteBlog.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.blogs = null;
                state.message=action.payload
    
            })
            .addCase(getaBlog.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getaBlog.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.BlogName = action.payload.title;
                state.BlogDesc = action.payload.description;
                state.BlogCat = action.payload.category;
                state.BlogImg = action.payload.images;
                
            })
    
            .addCase(getaBlog.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message=action.payload
    
            })
            .addCase(updateBlog.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.updateblog = action.payload
                
            })
    
            .addCase(updateBlog.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message=action.payload
    
            })
    
    
        }
    })


    export default blogSlice.reducer
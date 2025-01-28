import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk('upload/images', async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        for (let i = 0;i<data.length;i++){
            formData.append("images",data[i])


        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const delImg = createAsyncThunk('delete/images', async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        // Check if the error is in a known format, otherwise provide a fallback
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
const initialState= {
    images:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
}

export const UploadImageSlice= createSlice({
      name:"uplaodimages",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(uploadImg.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.images = action.payload
            })
    
            .addCase(uploadImg.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.images = null;
                state.message=action.error
    
            })
            .addCase(delImg.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(delImg.fulfilled,(state,action)=>{
                state.isLoading = true;
                state.isSuccess = true;
                state.images = [];
            })
    
            .addCase(delImg.rejected,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.images = null;
                state.message=action.error
    
            })
    
    
        }
    })


    export default UploadImageSlice.reducer
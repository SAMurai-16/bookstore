import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";



const getUserFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user")):null;

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:"",
}

export const login = createAsyncThunk('auth/admin-login', async(user,thunkAPI)=>{
    try{
        return await authService.login(user)
    }
    catch{
        return thunkAPI.rejectWithValue(error)
    }
})



export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = true;
            state.isSuccess = true;
            state.user = action.payload
        })

        .addCase(login.rejected,(state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null

        })
  

    }
})


export default authSlice.reducer
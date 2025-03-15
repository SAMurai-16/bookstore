import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";



const register = async(userData)=>{
    const response =await axios.post(`${base_url}user/register`,userData);
    if(response.data){
        return response.data;
    }
}


const login = async(userData)=>{
    const response =await axios.post(`${base_url}user/login`,userData);

    if(response.data){
        if(response.data){
            localStorage.setItem('customer',JSON.stringify(response.data)) 
        }
        return response.data;
    }
}

const getuserWishlist = async()=>{
    const response = await axios.get(`${base_url}user/wishlist`,config)
    if(response.data){
        return response.data;
    }
}

const addProdToCart = async(cartData)=>{
    const response =await axios.post(`${base_url}user/cart`,cartData,config);

 if(response.data){
    return response.data;

 }
        
    }

    const getUserCart = async()=>{
        const response =await axios.get(`${base_url}user/cart`,config);
    
     if(response.data){
        return response.data;
    
     }
            
        }
    const deleteFromCart = async(id)=>{
        console.log(id);
        
        const response =await axios.delete(`${base_url}user/cart/${id}`,config);
    
        if(response.data){
           return response.data;
       
        }
    }

    const getAllCoupons = async()=>{
        const response =await axios.get(`${base_url}user/coupon`);
    
     if(response.data){
        return response.data;
    
     }
            
        }


export const authService={
    register,login,getuserWishlist,addProdToCart,getUserCart,deleteFromCart,getAllCoupons
}
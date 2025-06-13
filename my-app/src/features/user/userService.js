import axios from "axios"
import { base_url, getConfig } from "../../utils/axiosConfig";



const register = async(userData)=>{
    const response =await axios.post(`${base_url}user/register`,userData);
    if(response.data){
        return response.data;
    }
}

const getaUser = async(id)=>{
    const response = await axios.get(`${base_url}user/all-user/${id}`)
    
    return response.data
}


const login = async(userData)=>{
    const response =await axios.post(`${base_url}user/login`,userData, {
  withCredentials: true,
});

    if(response.data){
        if(response.data){
            localStorage.setItem('customer',JSON.stringify(response.data)) 
        }
            console.log("Login successful, starting refresh token timer");
            refreshToken();
        
        return response.data;
    }
}


const refreshToken = async () => {
    const res = await axios.post(`${base_url}refresh`, {}, { withCredentials: true });
    console.log("setting new Token")
    localStorage.setItem("Accesstoken", JSON.stringify(res.data));



    // Reset the timer again
    setTimeout(refreshToken, 14 * 60 * 1000);
};

const getuserWishlist = async()=>{
    const loco = localStorage.getItem("Accesstoken")
    console.log(loco);
    
    console.log(getConfig().headers);
    
    const response = await axios.get(`${base_url}user/wishlist`,getConfig())
    if(response.data){
        return response.data;
    }
}

const addProdToCart = async(cartData)=>{
    console.log("Auth Header:", getConfig().headers.Authorization);
    console.log("hello")
    const response =await axios.post(`${base_url}user/cart`,cartData,getConfig());

 if(response.data){
    return response.data;

 }
        
    }

    const getUserCart = async()=>{
        const response =await axios.get(`${base_url}user/cart`,getConfig());
    
     if(response.data){
        return response.data;
    
     }
            
        }
    const deleteFromCart = async(id)=>{
        console.log(id);
        
        const response =await axios.delete(`${base_url}user/cart/${id}`,getConfig());
    
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


 const createOrder = async(orderDetail)=>{
    const response = await axios.post(`${base_url}user/cart/order`,orderDetail,getConfig()
    )
    if(response.data){
        return response.data;
    
     }
 }


 const getallOrders = async()=>{
    const response = await axios.get(`${base_url}user/order`,getConfig()
    )
    if(response.data){
        return response.data;
    
     }

 }

 const emptyCart = async()=>{
    const response = await axios.delete(`${base_url}user/cart`,getConfig()
    )
    if(response.data){
        return response.data;
    
     }


 }

 const updateUser = async(data)=>{
    const response = await axios.put(`${base_url}user/`,data,getConfig()
    )
    if(response.data){
        return response.data;
    
     }


 }

 const forgotPassword = async(data)=>{
    const response = await axios.post(`${base_url}user/forgot-password-token`,data
    )
    if(response.data){
        return response.data;
    
     }
    }


    const resetPassword = async(data)=>{
        const response = await axios.put(`${base_url}user/reset-password/${data?.token}`,{password:data?.password}
        )
        if(response.data){
            return response.data;
        
         }
        }

export const authService={
    register,login,getuserWishlist,addProdToCart,getUserCart,deleteFromCart,getAllCoupons,createOrder,getallOrders,emptyCart,updateUser,forgotPassword,resetPassword
}
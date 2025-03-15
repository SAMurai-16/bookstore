import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";




const getProducts = async()=>{
    const response =await axios.get(`${base_url}product`);
    if(response.data){
        return response.data;
    }
}
const getaProduct = async(id)=>{
    const response =await axios.get(`${base_url}product/${id}`);
    if(response.data){
        return response.data;
    }
}



const addtoWishlist = async(prodId)=>{
    const response  = axios.put(`${base_url}product/wishlist`,{prodId},config)
    if(response.data){
        return response.data;
    }
}



export const prodService={
    getProducts,addtoWishlist,getaProduct
}
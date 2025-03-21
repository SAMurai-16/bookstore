import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";




const getblogs = async()=>{
    const response =await axios.get(`${base_url}blog/`);
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

const getaBlog  = async(id)=>{
    const response =await axios.get(`${base_url}blog/${id}`);
    if(response.data){
        return response.data;
    }
}



export const blogService={
    getblogs,addtoWishlist,getaBlog
}
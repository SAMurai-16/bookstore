import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";




const getProducts = async(data)=>{
    
    console.log(data);
    
    const response =await axios.get(`${base_url}product?${data?.brand? `brand=${data?.brand}&&`:""}${data?.category? `category=${data?.category}&&`:""}${data?.minPrice? `price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice? `price[lte]=${data?.maxPrice}&&`:""}${data?.sort? `sort=${data?.sort}&&`:""}${data?.tag? `tag=${data?.tag}&&`:""}`);
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


const giveratings =  async(data)=>{
    const response  = axios.put(`${base_url}product/rating`,data,config)
    if(response.data){
        return response.data;
    }
}


export const prodService={
    getProducts,addtoWishlist,getaProduct,giveratings
}
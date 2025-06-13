import axios from "axios"
import { base_url } from "../../utils/base_url"
import { getConfig } from "../auth/authService"



const getProducts = async()=>{
    const response = await axios.get(`${base_url}product/`)
    
    return response.data
}

const createProduct = async (productData) => {
    const response = await axios.post(`${base_url}product/`, productData, getConfig());
    return response.data;
    
    
  };

  const getaProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, getConfig());
    return response.data;
    
    
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/${id}`, getConfig());
    return response.data;
    
    
  };
  const updateProduct = async(data)=>{
    const response = await axios.put(`${base_url}product/${data.id}`,
    {
        title: data.ProductData.title,
        description: data.ProductData.description,
        price: data.ProductData.price,
        brand: data.ProductData.brand,
        category: data.ProductData.category,
        quantity: data.ProductData.qunatity,
        images: data.ProductData.images,
    },
        getConfig())
    
    return response.data

}


  

const ProductService = {
    getProducts,
    createProduct,
    getaProduct,
    updateProduct,
    deleteProduct
}

export default ProductService
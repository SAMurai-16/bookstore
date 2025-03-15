import axios from "axios"
import { base_url } from "../../utils/base_url"

const getTokenfromLocalStorage = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")) 
    : null;

export const config = {
    headers: {
        Authorization: getTokenfromLocalStorage ? `Bearer ${getTokenfromLocalStorage.token}` : "",
    }
};



const getProducts = async()=>{
    const response = await axios.get(`${base_url}product/`)
    
    return response.data
}

const createProduct = async (productData) => {
    const response = await axios.post(`${base_url}product/`, productData, config);
    return response.data;
    
    
  };

  const getaProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, config);
    return response.data;
    
    
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/${id}`, config);
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
        config)
    
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
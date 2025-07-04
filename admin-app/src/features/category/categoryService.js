import axios from "axios"
import { base_url } from "../../utils/base_url"
import {getConfig} from "../../utils/axiosconfig"

const getCategories = async()=>{
    const response = await axios.get(`${base_url}prodcategory/`)
    
    return response.data
}

const createCategories = async(data)=>{
    const response = await axios.post(`${base_url}prodcategory/`,data,getConfig())
    
    return response.data
}

const getaCategory = async(id)=>{
    const response = await axios.get(`${base_url}prodcategory/${id}`,getConfig())
    
    return response.data
}

const updateaCategory = async(category)=>{
    const response = await axios.put(`${base_url}prodcategory/${category.id}`,{title:category.CategoryData.title},getConfig())
    
    return response.data
}

const deleteaCategory = async(id)=>{
    const response = await axios.delete(`${base_url}prodcategory/${id}`,getConfig())
    
    return response.data
}

const categoryService = {
    getCategories,
    createCategories,
    getaCategory,
    updateaCategory,
    deleteaCategory,

}

export default categoryService
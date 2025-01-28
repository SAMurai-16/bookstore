import axios from "axios"
import { base_url } from "../../utils/base_url"
import {config} from "../../utils/axiosconfig"

const getBlogCats = async()=>{
    const response = await axios.get(`${base_url}blogcategory/`)
    
    return response.data
}

const createBcategories = async(data)=>{
    const response = await axios.post(`${base_url}blogcategory/`,data,config)
    
    return response.data
}

const getBcategory = async(id)=>{
    const response = await axios.get(`${base_url}blogcategory/${id}`,config)
    
    return response.data
}

const updateBcategory = async(data)=>{
    const response = await axios.put(`${base_url}blogcategory/${data.id}`,{title: data.Blogcat.title},config)
    
    return response.data
}

const deleteBcategory = async(id)=>{
    const response = await axios.delete(`${base_url}blogcategory/${id}`,config)
    
    return response.data
}




const blogCatService = {
    getBlogCats,createBcategories,
    getBcategory,updateBcategory,
    deleteBcategory
}

export default blogCatService
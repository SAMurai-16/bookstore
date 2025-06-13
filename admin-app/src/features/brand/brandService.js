import axios from "axios"
import { base_url } from "../../utils/base_url"
import {getConfig} from "../../utils/axiosconfig"

const getBrands = async()=>{
    const response = await axios.get(`${base_url}brand/`)
    
    return response.data
}

const createBrands = async(data)=>{
    const response = await axios.post(`${base_url}brand/`,data,getConfig())
    
    return response.data
}

const getBrand = async(id)=>{
    const response = await axios.get(`${base_url}brand/${id}`, getConfig())
    
    return response.data
}

const updateBrand = async(brand)=>{
    const response = await axios.put(`${base_url}brand/${brand.id}`,{title: brand.brandData.title},getConfig())
    
    return response.data
}

const deleteBrand = async(id)=>{
    const response = await axios.delete(`${base_url}brand/${id}`,getConfig())
    
    return response.data
}


const brandService = {
    getBrands, createBrands,
    getBrand,updateBrand,deleteBrand
}

export default brandService
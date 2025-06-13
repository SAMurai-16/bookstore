import axios from "axios"
import { base_url } from "../../utils/base_url"
import {getConfig} from "../../utils/axiosconfig"




const uploadImg = async(data)=>{
    const response  = await axios.post(`${base_url}upload/`, data ,getConfig())
    return response.data;
}

const deleteImg = async(id)=>{
    
    const response  = await axios.delete(`${base_url}upload/delete-img/${id}`,getConfig())
    return response.data;
}


const uploadpdf = async(data)=>{
    const response  = await axios.post(`${base_url}upload/`, data ,getConfig())
    return response.data;
}

const deletepdf = async(id)=>{
    
    const response  = await axios.delete(`${base_url}upload/delete-img/${id}`,getConfig())
    return response.data;
}

const uploadService = {uploadImg,deleteImg,uploadpdf,deletepdf}
export default uploadService;

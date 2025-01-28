import axios from "axios"
import { base_url } from "../../utils/base_url"

const getTokenfromLocalStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem('user')):null

const config =  {
    headers:{
        Authorization:`Bearer ${getTokenfromLocalStorage.token}`
    }
}



const uploadImg = async(data)=>{
    const response  = await axios.post(`${base_url}upload/`, data ,config)
    return response.data;
}

const deleteImg = async(id)=>{
    
    const response  = await axios.delete(`${base_url}upload/delete-img/${id}`,config)
    return response.data;
}

const uploadService = {uploadImg,deleteImg}
export default uploadService;
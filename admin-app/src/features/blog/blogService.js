import axios from "axios"
import { base_url } from "../../utils/base_url"
import { getConfig } from "../../utils/axiosconfig"


const getBlogs = async()=>{
    const response = await axios.get(`${base_url}blog/`)
    
    return response.data
}

const updateBlog = async(data)=>{
    const response = await axios.put(`${base_url}blog/${data.id}`,
    {
        title: data.blogData.title,
        description: data.blogData.description,
        category: data.blogData.category,
        images: data.blogData.images,
    },
        getConfig())
    
    return response.data
}

const createBlog  = async(data)=>{
    const response  = await axios.post(`${base_url}blog/`,data,getConfig())

    return response.data
}

const getaBlog = async(id)=>{
    const response = await axios.get(`${base_url}blog/${id}`,getConfig())
    
    return response.data
}

const deleteBlog  = async(id)=>{
    const response  = await axios.delete(`${base_url}blog/${id}`,getConfig())

    return response.data
}

const blogService = {
    getBlogs,
    createBlog,
    deleteBlog,
    getaBlog,
    updateBlog
}

export default blogService
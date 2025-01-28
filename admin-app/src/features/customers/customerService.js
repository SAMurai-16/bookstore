import axios from "axios"
import { base_url } from "../../utils/base_url"

const getusers = async()=>{
    const response = await axios.get(`${base_url}user/all-user`)
    
    return response.data
}

const CustomerService = {
    getusers,
}

export default CustomerService
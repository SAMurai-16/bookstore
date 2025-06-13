import axios from "axios"
import { base_url } from "../../utils/base_url"
import { getConfig } from "../../utils/axiosconfig"


const getOrders = async()=>{
    const response = await axios.get(`${base_url}user/get-allorders`, getConfig())

    return response.data
}


const orderService = {
    getOrders
}


export default orderService
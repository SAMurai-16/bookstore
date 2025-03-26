import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig"


const getOrders = async()=>{
    const response = await axios.get(`${base_url}user/get-allorders`, config)

    return response.data
}


const orderService = {
    getOrders
}


export default orderService
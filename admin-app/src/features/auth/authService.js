
import axios from "axios"
import { base_url } from "../../utils/base_url"

const getTokenfromLocalStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem('user')):null

const config =  {
  
    headers:{
        Authorization: getTokenfromLocalStorage ? `Bearer ${getTokenfromLocalStorage.token}` : "",
    }
}

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/admin-login`, userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data)) 
    }
    return response.data
}


const authService = {
    login
}

export default authService
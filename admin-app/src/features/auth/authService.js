
import axios from "axios"
import { base_url } from "../../utils/base_url"

export const getConfig = () => {
    const tokenObj = localStorage.getItem("Accesstoken")
        ? JSON.parse(localStorage.getItem("Accesstoken"))
        : null;

    return {
        headers: {
            Authorization: tokenObj ? `Bearer ${tokenObj.accessToken}` : "",
        }
    };
};

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/admin-login`, userData,{
        withCredentials:true,
    })
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data)) 

    }
    refreshToken();
    return response.data
}

const refreshToken = async () => {
    const res = await axios.post(`${base_url}refresh`, {}, { withCredentials: true });
    console.log("setting new Token")
    localStorage.setItem("Accesstoken", JSON.stringify(res.data));



    // Reset the timer again
    setTimeout(refreshToken, 14 * 60 * 1000);
};



const authService = {
    login
}

export default authService
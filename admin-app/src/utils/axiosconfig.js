const getTokenfromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem('user'))
:null

export const config =  {
    headers:{
        Authorization:getTokenfromLocalStorage ? `Bearer ${getTokenfromLocalStorage.token}`: ""
    }
}
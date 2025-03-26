export const base_url = "http://localhost:5000/api/";

const getTokenfromLocalStorage = localStorage.getItem("customer") 
    ? JSON.parse(localStorage.getItem("customer")) 
    : null;

export const config = {
    headers: {
        Authorization: getTokenfromLocalStorage ? `Bearer ${getTokenfromLocalStorage.token}` : "",
    }
};

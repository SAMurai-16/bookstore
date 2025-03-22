export const base_url = "https://bookstore-q7d5.onrender.com/api/";

const getTokenfromLocalStorage = localStorage.getItem("customer") 
    ? JSON.parse(localStorage.getItem("customer")) 
    : null;

export const config = {
    headers: {
        Authorization: getTokenfromLocalStorage ? `Bearer ${getTokenfromLocalStorage.token}` : "",
    }
};

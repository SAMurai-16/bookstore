export const base_url = "http://localhost:5000/api/";

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
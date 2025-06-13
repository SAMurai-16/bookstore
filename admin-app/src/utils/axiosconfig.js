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
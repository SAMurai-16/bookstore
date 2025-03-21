const jwt  = require("jsonwebtoken")


const GenerateRefreshToken  = (id) =>{
    return jwt.sign({id},process.env.secret,{expiresIn: "3d"})
}



 const createPasswordResetToken = (id) => {
    if (!process.env.secret) {
        throw new Error("Missing SECRET key in environment variables");
    }
    return jwt.sign({ id }, process.env.secret, { expiresIn: "10m" }); // 10-minute expiry
};

module.exports={GenerateRefreshToken,createPasswordResetToken}

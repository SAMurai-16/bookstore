const jwt  = require("jsonwebtoken")

const GenerateToken  = (id) =>{
    return jwt.sign({id},process.env.secret,{expiresIn: "15m"})
}

module.exports={GenerateToken}
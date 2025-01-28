const jwt  = require("jsonwebtoken")

const GenerateToken  = (id) =>{
    return jwt.sign({id},process.env.secret,{expiresIn: "3d"})
}

module.exports={GenerateToken}
const mongoose = require("mongoose")
const dbConnect  = ()=>{
  try{
  const conn  = mongoose.connect("mongodb+srv://goforsamyakc:ssbcc2005@cluster0.e6k9f.mongodb.net/")
  console.log("Database Conneected Successfully")
}
 catch(error){
  console.log("Database Error")
 }
}


module.exports = {
  dbConnect
}
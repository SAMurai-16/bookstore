const mongoose = require("mongoose")
const dbConnect  = ()=>{
  try{
  const conn  = mongoose.connect("mongodb+srv://user2000:ssbcc2005@cluster0.qdfdz.mongodb.net/")
  console.log("Database Conneected Successfully")
}
 catch(error){
  console.log("Database Error")
 }
}


module.exports = {
  dbConnect
}
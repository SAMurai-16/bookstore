const Product = require("../models/productModel")
const 
    cloudinaryUploadImg
 = require("../utils/cloudinary");
 const 
    cloudinaryDeleteImg
 = require("../utils/cloudinary");
 
const fs = require("fs")
const asynchandler = require("express-async-handler")



const uploadImages = asynchandler(async(req,res)=>{
  
    try{
        const uploader  =  (path)=> cloudinaryUploadImg(path,"images");
        const urls = [];
        const files = req.files;
        console.log(files);
        
        for ( const file of files){
            const {path} = file;
            const newpath =  await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const images = urls.map((file)=>{
            return file;
        })
        res.json(images)
    }
 
    catch(error){
        throw new Error(error);
    }
})

const deleteimages = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const deleted = cloudinaryDeleteImg(id,"images");
        res.json({message:"Deleted"})

    }
    catch(error){
        throw new Error(error)
    }
})

module.exports={
    uploadImages,
    deleteimages
}
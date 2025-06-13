const Product = require("../models/productModel")
const 
    cloudinaryUploadImg
 = require("../utils/cloudinary");
 const 
    cloudinaryDeleteImg
 = require("../utils/cloudinary");
 
const fs = require("fs")
const asynchandler = require("express-async-handler")




const path = require("path");

const uploadImages = asynchandler(async (req, res) => {
  try {
    const uploader = (filePath) => cloudinaryUploadImg(filePath, "images");
    const urls = [];
    const files = req.files;

    console.log("Files received:", files);

    for (const file of files) {
      const filePath = file.path;

      try {
        const newPath = await uploader(filePath);
        urls.push(newPath);

        // Safe delete using promises
        try {
          await fs.unlink(filePath);
          console.log("Deleted file:", filePath);
        } catch (deleteErr) {
          console.warn("File deletion failed or already deleted:", filePath, deleteErr.message);
        }
      } catch (uploadErr) {
        console.error("Upload failed for file:", filePath, uploadErr.message);
      }
    }

    res.status(200).json(urls);
  } catch (error) {
    console.error("Upload Images Error:", error.message);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});


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
const Product = require("../models/productModel")
const  cloudinaryUploadFile
 = require("../utils/cloudinarypdf.js")
const cloudinarydeletePDF = require("../utils/cloudinarypdf.js")
 
const fs = require("fs")
const asynchandler = require("express-async-handler")




const uploadPDF = asynchandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadFile(path,"files");
        const files = req.files;
        const urls = [];

        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path); // Remove the local file after upload
        }

        const pdf = urls.map((file)=>{
            return file;
        })
        res.json(pdf)
    } catch (error) {
        throw new Error(error);
    }
});


const deletePDF = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const deleted = cloudinarydeletePDF(id);
        res.json({message:"Deleted"})

    }
    catch(error){
        throw new Error(error)
    }
})

module.exports={
    uploadPDF,
    deletePDF
}

const category = require("../models/prodcategory.js")
const asynchandler = require("express-async-handler")
const validateMongoDbId = require("../utils/validatemongodbId.js")


const createcategory  = asynchandler(async(req,res)=>{
    try{
    const newcategory  = await category.create(req.body);
    res.json(newcategory);
    }
    catch(error){
        throw new Error (error);

    }

})

const updatecategory  = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
    const updatedcategory  = await category.findByIdAndUpdate(id,req.body,{new:true});
    res.json(updatedcategory);
    }
    catch(error){
        throw new Error (error);

    }

});


const deletecategory  = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
    const deletedcategory  = await category.findByIdAndDelete(id);
    res.json(deletedcategory);
    }
    catch(error){
        throw new Error (error);

    }

});

const getacategory  = asynchandler(async(req,res)=>{
    const {id}  = req.params;
    try{
    const getcategory  = await category.findById(id);
    res.json(getcategory);
    }
    catch(error){
        throw new Error (error);

    }

});


const getallcategory  = asynchandler(async(req,res)=>{
   
    try{
    const allcategory  = await category.find();
    res.json(allcategory);
    }
    catch(error){
        throw new Error (error);

    }

});




module.exports = {createcategory,updatecategory,deletecategory,getacategory,getallcategory}
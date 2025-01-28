const brand = require("../models/brandModel.js")
const asynchandler = require("express-async-handler")
const validateMongoDbId = require("../utils/validatemongodbId.js")


const createbrand  = asynchandler(async(req,res)=>{
    try{
    const newbrand  = await brand.create(req.body);
    res.json(newbrand);
    }
    catch(error){
        throw new Error (error);

    }

})

const updatebrand  = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
    const updatedbrand  = await brand.findByIdAndUpdate(id,req.body,{new:true});
    res.json(updatedbrand);
    }
    catch(error){
        throw new Error (error);

    }

});


const deletebrand  = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
    const deletedbrand  = await brand.findByIdAndDelete(id);
    res.json(deletedbrand);
    }
    catch(error){
        throw new Error (error);

    }

});

const getabrand  = asynchandler(async(req,res)=>{
    const {id}  = req.params;
    try{
    const getbrand  = await brand.findById(id);
    res.json(getbrand);
    }
    catch(error){
        throw new Error (error);

    }

});


const getallbrand  = asynchandler(async(req,res)=>{
   
    try{
    const allbrand  = await brand.find();
    res.json(allbrand);
    }
    catch(error){
        throw new Error (error);

    }

});




module.exports = {createbrand,updatebrand,deletebrand,getabrand,getallbrand}
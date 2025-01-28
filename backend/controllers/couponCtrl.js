const expressAsyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validatemongodbId");
const asynchandler = require("express-async-handler");


const createCoupon = asynchandler(async(req,res)=>{
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);


    }
    catch(error){
        throw new Error(error);
    }
})

const getallcoupons = asynchandler(async(req,res)=>{
    try{
        const allCoupon = await Coupon.find();
        res.json(allCoupon);


    }
    catch(error){
        throw new Error(error);
    }
})


const updatecoupon = asynchandler(async(req,res)=>{

    const {id} = req.params;

    try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCoupon);


    }
    catch(error){
        throw new Error(error);
    }
})

const deletecoupon = asynchandler(async(req,res)=>{

    const {id} = req.params;

    try{
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletedCoupon);


    }
    catch(error){
        throw new Error(error);
    }
})



module.exports = {createCoupon,getallcoupons,updatecoupon,deletecoupon};



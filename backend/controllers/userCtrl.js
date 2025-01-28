const User = require("../models/userModel2");

const { GenerateToken } = require("../config/jwtToken");
const Product = require("../models/productModel")
const Cart = require("../models/cartModel");
const Coupon  = require("../models/couponModel")
const Order = require("../models/orderModel")
const uniqid = require("uniqid")
const asynchandler = require("express-async-handler")
const {GenerateRefreshToken} = require("../config/refreshtoken")
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validatemongodbId");
const crypto = require('crypto');
const { log } = require("util");



 //create a user

const CreateUser = asynchandler(async (req, res) => {
    
    try {
        console.log(req.body);
        
        const newUser = await User.create(req.body);
        // const email = req.body.email;
    // console.log(email);
    //     const findUser = await User.findOne({email:email});
    // if(!findUser){
    //     //create a new user
       
        
    //     const newUser = await User.create(req.body);
    //     console.log(newUser);
        
    //     res.json({user: newUser});
    //     // console.log(email);
    // }
    // else{
    //     res.json({message:"USer already exsits"});
        
    // }
    console.log(newUser);
    
    res.json({user: newUser});
    
    }
    catch(err){
        console.log(err);
        return err.message
        
        
    }
    
    
});
        
    


//loging in the user

const loginUserCtrl = asynchandler(async (req,res)=> {
    const {email,password} = req.body;
    //check if user exirs
    const findUser  = await User.findOne({email})
    if (findUser && await findUser.isPasswordMatched(password) ){
    const RefreshToken = await GenerateRefreshToken(findUser?._id)

    const updateuser = await User.findByIdAndUpdate(findUser.id , {RefreshToken:RefreshToken},
        {new:true}
    )
    res.cookie('RefreshToken',RefreshToken,{
        httpOnly:true,
        maxAge: 72*60*60*1000,
    }

    )
        res.json({
            _id : findUser?._id,
            firstname:findUser?.firstname,
            lastname: findUser?.lastname,
            email : findUser?.email,
            mobile : findUser?.mobile,
            password : findUser?.password,
            token: GenerateToken(findUser?._id)


    })

    }
    else{
        throw new Error ("Invalid Credentials")
    }

})

//get all users
const getallUser = asynchandler(async(req,res)=>{
    try{
        const getUsers = await User.find();
        res.json(getUsers)

    }
    catch(error){
        throw new Error(error)
    }
})


//get a user 
const getaUser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
const getaUser = await User.findById(id)
res.json({getaUser})

    }
    catch(error){
        throw new Error(error)

    }
})

//delete a user 

const deleteaUser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try{
const deleteaUser = await User.findByIdAndDelete(id)
res.json({deleteaUser})

    }
    catch(error){
        throw new Error(error)

    }
})

//Update a user

const updateUser = asynchandler(async(req,res)=>{
    const{ _id} = req.user
    validateMongoDbId(_id)

    try{
    const updateUser = await User.findByIdAndUpdate(id,{
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,

    },{
        new:true
    })
    res.json(updateUser)
    }
    catch(error){
        throw new Error(error)
    }
})


//logout functionality

const logout = asynchandler(async (req,res)=>{
    const cookie = req.cookies
    if(!cookie?.RefreshToken) throw new Error('no refresh token found')
  const RefreshToken  = cookie.RefreshToken;
    const user = await User.findOne({ RefreshToken })
    if(!user){
        res.clearCookie('RefreshToken',{
            httpOnly:true,
            secure:true,

        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({RefreshToken},{
        RefreshToken: " ",
    })
    res.clearCookie('RefreshToken',{
        httpOnly:true,
        secure:true,
    })

    res.sendStatus(204)
})



//handling refrrsh token
const handleRefreshToken   = asynchandler(async (req,res)=>{
    const cookie = req.cookies
    console.log(cookie)
    if(!cookie?.RefreshToken) throw new Error('no refresh token found')
    const RefreshToken  = cookie.RefreshToken;
    console.log(RefreshToken)
    const user = await User.findOne({ RefreshToken })
    if(!user) throw new Error("No refresh token present in db or not matched")
    jwt.verify(
RefreshToken, process.env.secret , (err,decoded)=>{
    if(err || user.id !== decoded.id){
        throw new Error('there is something wrong wiht refresh token')
    }
    const accessToken = GenerateToken(user?._id)
    res.json({accessToken})
})
})

const updatePassword = asynchandler(async(req,res)=>{
    const {_id} = req.user;
    const {password} = req.body;
    validateMongoDbId(_id)
    const user  = await User.findById(_id)
    if(password){
        user.password = password ;
        const updatedPassword = await user.save()
        res.json(updatedPassword)
      }
      else{
        res.json(user)
      }
})

const forgotPasswordToken = asynchandler(async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user)throw new Error("user not found with this email")
    try{
const token = await user.createPasswordResetToken()
await user.save()
const resetURL = `hi, PLease follow this link to reset your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}>Click Here</>`

const data = {
    to:email,
    text:"hey user",
    subject:"Forgot Password Link",
    htm: resetURL,

}
sendEmail(data)
res.json(token)
}

catch(error){
    throw new Error(error)
}

});

const resetpassword = asynchandler(async (req,res) =>{
    const {password } = req.body;
    const {token } =  req.params;
    const hashedtoken  = crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken : hashedtoken,
        passwordResetExpires: { $gt: Date.now()},
    });
    if (!user) throw new Error("Token Expired, PLease try again Later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);


});


const loginAdmin = asynchandler(async (req,res)=> {
    const {email,password} = req.body;
    //check if user exirs
    const findAdmin  = await User.findOne({email})
    if(findAdmin.role != 'admin') throw new Error("not authourised")
    if (findAdmin && await findAdmin.isPasswordMatched(password) ){
    const RefreshToken = await GenerateRefreshToken(findAdmin?._id)

    const updateuser = await User.findByIdAndUpdate(findAdmin.id , {RefreshToken:RefreshToken},
        {new:true}
    )
    res.cookie('RefreshToken',RefreshToken,{
        httpOnly:true,
        maxAge: 72*60*60*1000,
    }

    )
        res.json({
            _id : findAdmin?._id,
            firstname:findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email : findAdmin?.email,
            mobile : findAdmin?.mobile,
            password : findAdmin?.password,
            token: GenerateToken(findAdmin?._id)


    })

    }
    else{
        throw new Error ("Invalid Credentials")
    }

})


const usercart = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    const{cart} = req.body;
    
    console.log(_id);
    
    try{
        let products = [];
        const user1 = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({orderby : user1._id})

        if (alreadyExistCart) {
            await Cart.deleteOne({ _id: alreadyExistCart._id });
        }
    
        for(let i = 0; i<cart.length;i++){
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
            
        }
        let cartTotal = 0;
        for(let i = 0; i<products.length; i ++){
            cartTotal = cartTotal + products[i].price* products[i].count ;

        }
        console.log(cartTotal);
        
        let newCart  = await new Cart({
            products,
            cartTotal:cartTotal,
            orderby: user1?._id,
        }).save();
        
        res.json(newCart);

    }
    
    catch(error){
        throw new Error(error);

    }

    // try{
    //     const findUser = await User.findById(_id).populate('wishlist');
    //     res.json(findUser)
    // }
    // catch(error){
    //     throw new Error(error);
    // }
    //  try{
    //     const updateUser = await User.findByIdAndUpdate(_id,{
    //     address: req?.body?.address
    
    //     },{
    //         new:true
    //     })
    //     res.json(updateUser)
    //     }
    //     catch(error){
    //         throw new Error(error)
    //     }
})

const getUserCart = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    try{
        const cart  = await Cart.findOne({orderby: _id}).populate("products.product");
        res.json(cart);
    }
    catch(error){
        throw new Error(error);

    }
})

const emptyCart   = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    try{
        const user  = await User.findById(_id);
        const cart  = await Cart.findOneAndDelete({orderby:user._id})
        res.json(cart)
    }
    catch(error){
        throw new Error(error);
    }
})


const getwishlist = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    try{
        const findUser = await User.findById(_id).populate('wishlist');
        res.json(findUser)
    }
    catch(error){
        throw new Error(error);
    }
    //  try{
    //     const updateUser = await User.findByIdAndUpdate(_id,{
    //     address: req?.body?.address
    
    //     },{
    //         new:true
    //     })
    //     res.json(updateUser)
    //     }
    //     catch(error){
    //         throw new Error(error)
    //     }
});

const saveaddress = asynchandler(async(req,res)=>{
    const{_id} = req.user;
  
         try{
            const updateUser = await User.findByIdAndUpdate(_id,{
            address: req?.body?.address
        
            },{
                new:true
            })
            res.json(updateUser)
            }
            catch(error){
                throw new Error(error)
            }
  
    // console.log(_id);
    
    // try{
    //     let products = [];
    //     const user1 = await User.findById(_id);
    //     const alreadyExistCart = await Cart.findOne({orderby : user1._id})
    //     if(alreadyExistCart){
    //         alreadyExistCart.remove();

    //     }
    //     for(let i = 0; i<cart.length;i++){
    //         let object = {};
    //         object.product = cart[i]._id;
    //         object.count = cart[i].count;
    //         object.color = cart[i].color;
    //         let getPrice = await Product.findById(cart[i]._id).select("price").exec();
    //         object.price = getPrice.price;
    //         products.push(object);
            
    //     }
    //     res.json(products);
        


    // }
    // catch(error){
    //     throw new Error(error);

    // }

})

const applyCoupon = asynchandler(async(req,res)=>{
    const {coupon}  =  req.body;
    const { _id} = req.user;
    console.log(_id);
    
    const validCoupon  = await Coupon.findOne({name:coupon});
    if(validCoupon === null){
        throw new Error ("invalid Coupon");

    } 

    const user = await User.findById(_id)
    console.log(user._id);
    
    let {cartTotal}  = await Cart.findOne({orderby:user._id})
    
    
    let totalAfterDiscount  = (cartTotal - 
    (cartTotal * validCoupon.discount)/100).
    toFixed(2);
    await Cart.findOneAndUpdate(
        {ordeerby: user._id},
        {totalAfterDiscount},
        {new:true}
    );

    res.json(totalAfterDiscount)


})

const createOrder = asynchandler(async(req,res)=>{
    const {COD,couponApplied}  = req.body;
    const{_id}  = req.user;
    try{
        if(!COD){throw new Error ("Create cash order failed")}
        const user  = await User.findById(_id);
        let userCart  = await Cart.findOne({orderby: user._id})
        let finalAmount = 0;
        if(couponApplied && userCart.totalAfterDiscount){
            finalAmount = userCart.totalAfterDiscount;

        }
        else{
            finalAmount = userCart.cartTotal;
            }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent:{
                id: uniqid(),
                method:"COD",
                amount: finalAmount,
                status:"Cash On Delivery",
                created: Date.now(),
                currency:"inr"
            },
            orderby: user._id,
            orderStatus:"Cash on Delivery"
        }).save()
        let update = userCart.products.map((item)=>{
            return{
                updateOne:{
                    filter:{_id: item.product._id},
                    update:{$inc: {quantity: -item.count, sold: +item.count}}
                }
            }
        })
        const updated = await Product.bulkWrite(update,{})
        res.json({message:"success"})
        console.log(updated);
        
        }
    
    catch(error){
        throw new Error (error);

    }


})

const getOrders = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    try{
        const userorders = await Order.findOne({
            orderby:_id
        }).populate("products.product")
        .populate("orderby")
        .exec()
        res.json(userorders)
    }
    catch(error){

        throw new Error(error);
    }
})

const getallOrders = asynchandler(async(req,res)=>{
    
    try{
        const userorders = await Order.find()
        .populate("products.product")
        .populate("orderby")
        .exec()
        res.json(userorders)
    }
    catch(error){

        throw new Error(error);
    }
})

const updateorderstatus = asynchandler(async(req,res)=>{
    const{id} = req.params;
    const{status} = req.body
    try{
        const updatestatus= await Order.findByIdAndUpdate(
            id,{
            orderStatus: status,
            paymentIntent:{
                status:status
            }},{
                new:true
            }
        )
        res.json(updatestatus)
    }
    catch(error){

        throw new Error(error);
    }
})




const baby = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    console.log(_id);
    


}
)







    


module.exports = { CreateUser,
    getaUser,
    loginUserCtrl ,
    handleRefreshToken, 
    logout,
    getallUser,
    updatePassword,
    deleteaUser,
    updateUser,
    forgotPasswordToken,
    resetpassword,
    loginAdmin,
    saveaddress,
    getwishlist,
    usercart,
    baby,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getallOrders,
    getOrders,
    updateorderstatus

    };
 
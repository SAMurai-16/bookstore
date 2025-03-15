const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
   },
   paymentInfo:{
    razorpayOrderId:{
        type:String,
        required:true
    },
    razorpayPaymentId:{
        type:String,
        required:true
    },



   },
   orderItems:[
    {
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    price:{
        type:Number,
        required:true
    }
   }],
   paidAt:{
    type:Date,
    default:Date.now()
   },
   totalPrice:{
    type:Number,
    required:true
   },
   totalPriceAfterDiscount:{
    type:Number,
    required:true
   }

}, {timestamps:true,}
)

//Export the model
module.exports = mongoose.model('Order', orderSchema);
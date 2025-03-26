const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required:true

    },
    quantity:{
        type:Number,
        required:true
    },
    sold: [{
        type: mongoose.Schema.Types.ObjectId, // ✅ Stores IDs of users/orders/products
        ref: "User", // ✅ Change "Order" if you want to track users or products
    }],
    images:[{
        imgId:String,
        url:String,
    }],
    tag:{
        type:String,
    },
    ratings:[{
        star: Number,
        comment : String,
        postedby:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
    }],
    totalratings:{
        type:String,
        default:0
    },
    files:[{
        imgId:String,
        url:String,
    }],

},
{timestamps: true}
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
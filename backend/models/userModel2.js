const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
      
    },
    password: {
        type: String,
        required: true,
    },
    role : { 
        type: String,
        default : "user"

    },
    cart:{
        type:Array,
        default: [],

    },
    address : {type:String},
    wishlist : [{type: mongoose.Schema.Types.ObjectId , ref:"Product"}],
    RefreshToken: {
        type:String,
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date,
}, {
    timestamps: true 
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
         next();
    }
    const salt = await bcrypt.genSalt(10); // Use async version
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function(){
    const resettoken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest(hex);
this.passwordResetExpires=Date.now()+30 * 60 * 1000
return resettoken;

}
// Export the model
module.exports = mongoose.model('User', userSchema);

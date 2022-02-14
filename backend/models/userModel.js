const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt  = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[30, "Name cannot exceed 30 character"],
        minlength:[4, "Name should not less than 4 character"]
    },
    email:{
        type:String,
        required:[true, "Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Password"],
        maxLength:[16, "Password sholud be between 8-16 characeter"],
        minLength:[8, "Password sholud be between 8-16 characeter"],
        select:false,
    },
    avatar:{
            public_id:{
            type:String,
            required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user",
    },
    otp:{
        type:String,
        default:1234
    },

    resstPasswordToken:String,
    resstPasswordExpire:Date,
});
//we cannot use this keyword in arrow function that is why we write function
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
});

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);

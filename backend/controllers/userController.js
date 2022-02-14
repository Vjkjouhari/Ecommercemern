const User = require("../models/userModel");
const Errorhander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError"); 
const ApiFeatures = require("../utils/apifeatures");
const sendToken = require("../utils/jwtToken");



// register user 
const registerUser = catchAsyncError( async (req, res, next) => {

    const { name, email, password} = req.body;

    const users = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id : "This is Sample id",
            url : "Profilepicurl"
        },
    });

    // const token = users.getJWTToken();

    // res.status(201).json({
    //     status:true,
    //     token
    // });

    sendToken(users, 201, res);
});



//login user
const loginUser = catchAsyncError( async (req, res, next) => {
    const {email, password} = req.body;
    //checking if user has entered correct crenditals
    if(!email || !password){
        return next(new Errorhander("Please Enter Email & Password", 400))
    }

        //because we use select inmodel in password we call 
    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new Errorhander("Invalid email or Password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new Errorhander("Invalid email or Password", 401));
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     status:true,
    //     message:"logged in Successfully",
    //     token
    // });
    sendToken(user, 200, res);
})

//logout
const logoutUser = catchAsyncError( async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success:true,
        message:"logged Out",
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}
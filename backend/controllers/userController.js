const User = require("../models/userModel");
const Errorhander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError"); 
const ApiFeatures = require("../utils/apifeatures");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


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

// forgot password
const forgotPassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new Errorhander("user not found", 404));
    }
    // get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/reset/${resetToken}`;
    const message = `your Password reset token :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;
    try{
        await sendEmail({
            email : user.email,
            subject : `Ecommerce Password Recovery`,
            message,

        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new Errorhander(error.message, 500));
    }
});

// reset Password
const resetPassword = catchAsyncError( async(req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
                                .createHash("sha256")
                                .update(req.params.token)
                                .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);
    if(!user){
        return next(new Errorhander("Reset Password token is invalid or has been expired", 401));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new Errorhander("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
})




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword
}
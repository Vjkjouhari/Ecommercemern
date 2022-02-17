
// const sendToken = require("../utils/jwtToken");

const Errorhander = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError( async(req, res, next) =>{

    const { token } = req.cookies;  // to get cookie from request we have to use cookie parser in app.js

    // console.log(token);
    if(!token){
        return next(new Errorhander("Please login to access this resource", 401));
    }

    // sendToken
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new Errorhander(
                    `Role: ${req.user.role} is not allowed to acces this resource` ,
                     403
                )
            )
        };
        next();

    };

}

module.exports ={ 
    isAuthenticatedUser,
    authorizeRoles
}
const ErrorHandler = require("../utils/errorhander");
module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    //Wrong Mongodb Id error
    // cast error
    if(err.name === "CastError"){
        const message = `Resource not found. ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    
    //Wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `JSON web Token is Invalid try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT EXPIre Error
    if(err.code === "TokenExpiredError"){
        const message = `Session Expired`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
};


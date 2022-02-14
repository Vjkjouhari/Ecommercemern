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

    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
};


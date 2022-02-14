const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, " please Enter product name"]
    },
    description:{
        type:String,
        required:[true, "please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true, "please enter product price"],
        maxLength:[8, " price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }}
    ],
    category:{
        type:String,
        required:[true, "Please Enter Product Category"]
    },
    stock:{
        type:String,
        required:[true, "Please Enter Product Stock"],
        maxLength:[4, "Stock cannot exceed 4 character"],
        default:1
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        deafult:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);
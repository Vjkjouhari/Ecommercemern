const Product = require("../models/productModel");
const Errorhander = require("../utils/errorhander");

//get All Products
const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}

//create product
const createProduct = async (req, res, next) =>{
    const products = await Product.create(req.body);
    res.status(201).json({
        success:true,
        products
    })
}

const productDetail = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message: "Product Not found"
        // })

        // ****************important point
        // after using errorhandler 
        //created common error file to handle everywhere where it is needed.
        return next(new Errorhander("product not found", 404));
    } 
    res.status(200).json({
        success:true,
        product
    })
}

const updateProduct = async (req, res, next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product Not found"
        })
    }else{
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true, 
            useFindAndModify:false
        });
        return res.status(200).json({
            success:true,
            product
        })
    }
}
//delete product
const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        });
    } 
    await product.remove();
    return res.status(200).json({
        success:true,
        message:"Product deleted"
    });
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    productDetail,
    deleteProduct
}
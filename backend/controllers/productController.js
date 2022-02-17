const Product = require("../models/productModel");
const Errorhander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError"); 
const ApiFeatures = require("../utils/apifeatures");


//get All Products
const getAllProducts = async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
                        .search() // search using name of the product
                        .filter() // filter 
                        .pagination(resultPerPage); // paginate the page content
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        productCount,
        products,
    })
}

//create product
// we made catchAsyncError inorder to make use of try catch block.
const createProduct = catchAsyncError( async (req, res, next) =>{
    req.body.user = req.user.id;
    const products = await Product.create(req.body);
    res.status(201).json({
        success:true,
        products
    });
});


const productDetail = catchAsyncError( async (req, res, next) => {
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
});


const updateProduct = catchAsyncError(async (req, res, next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message: "Product Not found"
        // })

        return next(new Errorhander("product not found", 404));

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
});


//delete product
const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product Not Found"
        // });

        return next(new Errorhander("product not found", 404));

    } 
    await product.remove();
    return res.status(200).json({
        success:true,
        message:"Product deleted"
    });
});

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    productDetail,
    deleteProduct
}
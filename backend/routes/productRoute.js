const express = require("express");
const { getAllProducts, createProduct, updateProduct, productDetail, deleteProduct } = require("../controllers/productController");

const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct).delete(deleteProduct);
router.route("/products/:id").get(productDetail);

module.exports = router;


const express = require("express");
const { getAllProducts, createProduct, updateProduct, productDetail, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/products").get( isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);
router.route("/products/new").post( isAuthenticatedUser, authorizeRoles("admin") , createProduct);
router.route("/products/:id").put( isAuthenticatedUser , updateProduct).delete( isAuthenticatedUser , deleteProduct);
router.route("/products/:id").get(productDetail);

module.exports = router;


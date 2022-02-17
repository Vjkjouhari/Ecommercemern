const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile } = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register-user").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);
router.route("/logout").get( logoutUser );
router.route("/me").get( isAuthenticatedUser, getUserDetail);
router.route("/update-password").put(isAuthenticatedUser, updatePassword);
router.route("/me/update-profile").put(isAuthenticatedUser, updateProfile);


module.exports = router;
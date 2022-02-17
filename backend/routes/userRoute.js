const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controllers/userController");


const router = express.Router();

router.route("/register-user").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get( logoutUser );
router.route("/forgot-password").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);

module.exports = router;
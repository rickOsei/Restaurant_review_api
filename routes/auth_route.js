const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/auth_controller");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

module.exports = router;

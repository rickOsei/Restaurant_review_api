const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Google_User = require("../models/google_auth_model");

const { loginUser, registerUser } = require("../controllers/auth_controller");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

// google auth
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// google auth redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "https://restaurant-review-brown.vercel.app/",
  }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    console.log(req.user);
    // let user = {
    //   name: req.user.displayName,
    //   google_id: req.user.id,
    //   email: req.user.emails[0].value,
    //   token: req.user.token,
    // };

    // Google_User.find
    const token = jwt.sign(
      { userID: req.user._id, userName: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.redirect(`https://restaurant-review-brown.vercel.app/?token=${token}`);
    // console.log(req.user.token);
  }
);

// {
//     successRedirect: "http://localhost:3000/api/v1/auth/register",
//     failureRedirect: "http://localhost:3001/register",
//   }
module.exports = router;

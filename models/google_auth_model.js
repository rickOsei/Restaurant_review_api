const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Google_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    google_id: {
      type: String,
      required: [true, "Please enter google_id"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    token: {
      type: String,
      required: [true, "Please enter email"],
    },
  },
  { timestamps: true }
);

// Google_Schema.methods.createJWT = function () {
//   return jwt.sign(
//     { userID: this._id, userName: this.name },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRATION }
//   );
// };

module.exports = mongoose.model("Google_User", Google_Schema);

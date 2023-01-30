const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  Restaurant: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  Category: {
    type: String,
    enum: {
      values: ["cafes", "fast food", "casual restaurant", "pizzerias"],
      message: "{VALUE} is not supported",
    },
  },
  Review: {
    type: String,
    Number,
    required: [true, "Please provide review"],
    minlength: 10,
  },
});

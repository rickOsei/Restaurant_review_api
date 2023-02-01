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
      values: ["cafe", "fast food", "casual restaurant", "pizzerias"],
      message: "{VALUE} is not supported",
    },
  },
  Review: {
    type: String,
    Number,
    required: [true, "Please provide review"],
    minlength: 10,
  },
  Author: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  Star: {
    type: Number,
    required: [true, "Please provide review"],
    enum: {
      values: [1, 2, 3, 4, 5],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Review", reviewSchema);

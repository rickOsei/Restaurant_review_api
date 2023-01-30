const mongoose = require("mongoose");
mongoose.set("strictQuery", "true");

const connectDB = (URL) => {
  mongoose.connect(URL, {}, () => console.log("Connected to the database"));
};

module.exports = connectDB;

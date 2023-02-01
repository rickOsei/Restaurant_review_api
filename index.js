require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();
const cors = require("cors");

// routes
const authRoute = require("./routes/auth_route");
const reviewRoute = require("./routes/review_route");
const notFound = require("./middlewares/not_found");
const errorHandler = require("./middlewares/error_handler");
const auth = require("./middlewares/authentication");

server.use(cors());
server.use(express.json());
// connection func
const connectDB = require("./db/connect");

server.use("/api/v1/auth", authRoute);
server.use("/api/v1/review", reviewRoute);

// server.use(express.static("./public"));

// middlewares
server.use(notFound);
server.use(errorHandler);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port: ${port}`)
    );
  } catch (error) {}
};

start();

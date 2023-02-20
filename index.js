require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();
const cors = require("cors");
const passportSetup = require("./config/passport-setup");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");

// routes
const authRoute = require("./routes/auth_route");
const reviewRoute = require("./routes/review_route");
const notFound = require("./middlewares/not_found");
const errorHandler = require("./middlewares/error_handler");
// const auth = require("./middlewares/authentication");

// server.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// );

server.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

if (server.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

// initialize passport
server.use(passport.initialize());
server.use(passport.session());

// cors
server.use(cors({ methods: "GET,POST,PUT,DELETE", credentials: true }));
server.use(express.json());

// connection func
const connectDB = require("./db/connect");

// Routes
server.use("/api/v1/auth", authRoute);
server.use("/api/v1/review", reviewRoute);

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

const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  // console.log(req.user);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("User doesn't exist");
  }

  console.log(authHeader);

  const token = authHeader.split(" ")[1];
  // const bearer = authHeader.split(",")[0];
  // console.log(bearer);
  // const token = bearer.split(" ")[1];
  // console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userID: payload.userID, userName: payload.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("User doesn't exist");
  }
};

module.exports = auth;

const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("User doesn't exist");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(JWT_SECRET, token);
    req.use = { userID: payload.userID, userName: payload.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("User doesn't exist");
  }
};
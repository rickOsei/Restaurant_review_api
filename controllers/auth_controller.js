const authModel = require("../models/auth_model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  const user = await authModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    throw new BadRequestError("Please enter email and password");
  }
  const user = await authModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("User doesn't exist");
  }
  const compareResult = await user.comparePassword(password);
  if (!compareResult) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { loginUser, registerUser };
// module.exports = { loginUser, registerUser, loginGoogleUser };

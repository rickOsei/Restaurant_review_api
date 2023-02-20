const auth = (req, res, next) => {
  if (!req.user) {
    res.redirect("http://localhost:3001/");
    next();
  } else {
    next();
  }
};

module.exports = auth;

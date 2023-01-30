const notFound = (req, res, next) => {
  res.send("Route not found");
};

module.exports = notFound;

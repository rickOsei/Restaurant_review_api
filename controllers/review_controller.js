const reviewModel = require("../models/review_model");
const { StatusCodes } = require("http-status-codes");

const getAllReviews = async (req, res) => {
  const reviews = await reviewModel.find();
  res.status(StatusCodes.OK).json({ success: true, data: reviews });
};

const createReview = async (req, res) => {
  const review = await reviewModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ success: true, data: review });
};

const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await reviewModel.findById({ _id: reviewID });
  res.status(StatusCodes.OK).json({ success: true, data: review });
};
const updateReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await reviewModel.findByIdAndUpdate(
    { _id: reviewID },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ success: true, data: review });
};
const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await reviewModel.findByIdAndDelete({ _id: reviewID });
  res.status(StatusCodes.OK).json({ success: true, data: review });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};

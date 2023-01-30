const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  createReview,
} = require("../controllers/review_controller");

router.route("/").post(createReview).get(getAllReviews);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');

const { validateReview, isLoggedIn, isReviewAuthor, saveRedirectUrl } = require('../middleware.js');
const { createReview, deleteReview } = require('../controllers/reviews.js');

//Reviews
//Post route
router.post("/", isLoggedIn,validateReview, wrapAsync(createReview));

//Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));


module.exports = router;     
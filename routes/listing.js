const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');

const { index, renderNewForm, showRoute, createListing, editListing, updateListing, destroyListing } = require('../controllers/listings.js');

// index route
router.get("/", wrapAsync(index));


//new route
router.get("/new", isLoggedIn, renderNewForm);


//show route
router.get("/:id", wrapAsync(showRoute));

//create route
router.post("/", isLoggedIn, validateListing, wrapAsync(createListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

// update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(updateListing));

//destroy route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(destroyListing));

module.exports = router;    

const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing, saveRedirectUrl } = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

const { index, renderNewForm, showRoute, createListing, editListing, updateListing, destroyListing } = require('../controllers/listings.js');

router.route("/")
    .get(wrapAsync(index)) //index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createListing)); //create route

//new route
router.get("/new", isLoggedIn, saveRedirectUrl, renderNewForm);

router.route("/:id")
    .get(wrapAsync(showRoute)) //show route
    .put(isLoggedIn, saveRedirectUrl, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(updateListing)) //update route
    .delete(isLoggedIn, isOwner, wrapAsync(destroyListing)); //destroy route

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, saveRedirectUrl, wrapAsync(editListing));



module.exports = router;    

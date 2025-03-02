const Listing = require('../models/listing.js');


module.exports.index = async (req, res) => {
    const allListing = await Listing.find();
    res.render("listing/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs")
};

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Cannot find that listing");
        res.redirect("/stayease");
    }
    console.log(listing);
    res.render("listing/show.ejs", { listing });

};

module.exports.createListing = async (req, res) => {
    // let { title, decription, image, price, location, country } = res.body;  
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "Successfully made a new listing");
    res.redirect("/stayease")
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Cannot find that listing");
        return res.redirect("/stayease");
    }
    res.render("listing/edit.ejs", { listing })
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Successfully updated listing");
    res.redirect(`/stayease/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", "Successfully deleted listing");
    res.redirect("/stayease");
};
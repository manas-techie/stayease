const User = require('../models/user.js');

module.exports.signupForm = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            };
            req.flash("success", "Welcome to StayEase");
            res.redirect("/stayease");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back");
    res.redirect(res.locals.redirectUrl || "/stayease");
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have logged out");
        res.redirect("/stayease");
    });

};
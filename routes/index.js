var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function (req, res) {
    res.render("landing");
});

// Show Register Form
router.get("/register", function (req, res) {
    res.render("register");
});

// Handle signup logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            return res.redirect("/campgrounds");
        });
    });
});

//  Show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

// Logout route
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "You are logged out");
    res.redirect("/campgrounds");
});

module.exports = router;

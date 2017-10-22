var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/",function(req,res) {
    res.render("home");
});

router.get("/register", function(req, res){
   res.render("auth/register", {page: 'register'}); 
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            console.log(err);
            return res.render("auth/register", {error: err.message});
        }
        req.flash("success","Welcome to YelpCamp "+user.username);
        passport.authenticate("local")(req, res, function() {
            res.redirect("/camps");
        });
    });
});

router.get("/login", function(req, res){
   res.render("auth/login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/camps",
    failureRedirect: "auth/login"
}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Logged Out")
    res.redirect("/camps");
});

module.exports = router;
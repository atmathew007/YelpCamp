var express = require("express");
var router = express.Router({mergeParams: true});
var Camp = require("../models/camp");
var middleware = require("../middleware");
var geocoder = require('geocoder');

router.get("/", function(req, res){
    // Get all campgrounds from DB
    Camp.find({}, function(err, camps){
        if(err){
            console.log(err);
        } else {
            res.render("camps/index",{camps: camps});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCamp = {name: name, image: image, description: description, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Camp.create(newCamp, function(err, ncamp){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(ncamp);
            res.redirect("/camps");
        }
    });
  });
});

router.get("/new", middleware.isLoggedIn, function(req,res) {
    res.render("camps/new");
});

router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCamp);
            res.render("camps/show", {camps: foundCamp});
        }
    });
});

router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Camp.findById(req.params.id, function(err, foundCamp) {
        if(err) {
            req.flash("error","Campground not found");
        }
            res.render("camps/edit", {camp: foundCamp});
    });
});

router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Camp.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updateCamp){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/camps/" + updateCamp._id);
        }
    });
  });
});

router.delete("/:id", middleware.checkCampOwnership, function(req,res) {
    Camp.findByIdAndRemove(req.params.id,function(err){
        if(err) {
            res.redirect("/camps");
        } else {
            res.redirect("/camps");
        }
    });
});

module.exports = router;
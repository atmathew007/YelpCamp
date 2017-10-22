var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Camp.findById(req.params.id, function(err, foundCamp) {
            if(err) {
                req.flash("error","Campground no found")
                res.redirect("back");
            } else {
                if(foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You are not authorized to do that")
                }
            }
        });
    } else {
        req.flash("error","You need to login to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You are not authorized to do that")
                }
            }
        });
    } else {
        req.flash("error","You need to login to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error","Please login!!!");
    res.redirect("/login");
};

module.exports = middlewareObj;
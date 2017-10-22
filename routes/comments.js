var express = require("express");
var router = express.Router({mergeParams: true});
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err,camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new",{camp: camp});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success","Comment added")
                    res.redirect("/camps/" + camp._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/edit",{camp_id: req.params.id, comment: comment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/camps/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("/camps/" + req.params.id);
        } else {
            req.flash("success","Comment removed");
            res.redirect("/camps/" + req.params.id);
        }
    });
});

module.exports = router;
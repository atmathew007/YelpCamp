var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var flash = require("connect-flash");

var commentRoutes = require("./routes/comments");
var campRoutes = require("./routes/camps");
var indexRoutes = require("./routes/index");

// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

var User = require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.use(flash());

app.use(require("express-session")({
    secret: "Keep it safe",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');

app.use(passport.initialize());
app.use(passport.session());
mongoose.Promise = global.Promise;

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); 
    next();
});

app.use("/camps/:id/comments", commentRoutes);
app.use("/camps", campRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is Running!!!");
})
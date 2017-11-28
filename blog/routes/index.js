var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User    = require("../models/user");

router.get("/", function(req, res){
   res.redirect("/blogs"); 
});


//show register form
router.get("/register", function(req, res){
    res.render("register");
});
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'CGBPFpw298G78LHP'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username);
            res.redirect("/blogs");
        });
    });
});
//show login form
router.get("/login", function(req, res){
   res.render("login");
});   
//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res){
}); 
//add logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/blogs");
});
//ABOUT ROUTE
router.get("/about", function(req, res){
    res.render("about");
});

//CONTACT ROUTE
router.get("/contact", function(req, res){
    res.render("contact");
});

//DONATE ROUTE
router.get("/donate", function(req, res){
    res.render("donate");
});

module.exports = router;
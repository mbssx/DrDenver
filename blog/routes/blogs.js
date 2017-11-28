var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blog");
var middleware = require("../middleware");
var geocoder = require("geocoder");

// INDEX ROUTE
router.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("blogs/index", {blogs: blogs, currentUser: req.user}); 
       }
   });
});

// NEW ROUTE
router.get("/blogs/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/new");
});
//CREATE ROUTE
router.post("/blogs", middleware.isLoggedIn, function(req, res){
    // create blog
    req.body.body = req.sanitize(req.body.body);
    var title = req.body.title;
    var image = req.body.image;
    var desc  = req.body.body;
    var author= {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address; 
    var newBlogpost = {title: title, image: image, body: desc, author: author, location: location, lat: lat, lng: lng};
    Blog.create(newBlogpost, function(err, newBlog){
        if(err){
            res.render("blogs/new");
        } else {
            //then, redirect to the index
            //console.log(newBlogpost)
            res.redirect("/blogs");
        }
    });
});
});

// SHOW ROUTE
router.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("blogs/show", {blog: foundBlog});
       }
   });
});

// EDIT ROUTE
router.get("/blogs/:id/edit", middleware.checkBlogOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
          res.render("blogs/edit", {blog: foundBlog});
    });
});


// UPDATE ROUTE
router.put("/blogs/:id", middleware.checkBlogOwnership, function(req, res){
    req.body.body = req.sanitize(req.body.body);
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {title: req.body.title, image: req.body.image, desc: req.body.body, location: location, lat: lat, lng: lng};
   Blog.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedBlog){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
      }  else {
          req.flash("success","Successfully Updated!");
          res.redirect("/blogs/" + req.params.id);
      }
   });
    });
});
// DELETE ROUTE
router.delete("/blogs/:id", middleware.checkBlogOwnership, function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});



module.exports = router;
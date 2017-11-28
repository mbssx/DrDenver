var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blog");
var Comment    = require("../models/comments");
var middleware = require("../middleware");

//COMMENTS ROUTES
router.get("/blogs/:id/comments/new", middleware.isLoggedIn, function(req, res){
  Blog.findById(req.params.id, function(err, blog){
      if(err){
          console.log(err);
      } else {
          res.render("comments/new", {blog: blog});
      }    
  });
});

router.post("/blogs/:id/comments", middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, blog){
    if(err){
        console.log(err);
        res.redirect("/blogs");
      } else {
          Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                console.log(err);   
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                blog.comments.push(comment);
                blog.save();
                req.flash("success", "Successfully added comment");
                res.redirect('/blogs/' + blog._id);
            }
        });
      }
    });
});
//COMMENTS EDIT ROUTE
router.get("/blogs/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
        res.render("comments/edit", {blog_id: req.params.id, comment: foundComment});    
        }
    });
});
//COMMENT UPDATE ROUTE
router.put("/blogs/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
//COMMENT DESTORY ROUTES
router.delete("/blogs/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


module.exports = router;
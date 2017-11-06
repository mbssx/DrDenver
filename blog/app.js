var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    blogpost        = require("./models/blog"),
    User            = require("./models/user"),
    mongoose        = require("mongoose");
    
mongoose.connect("mongodb://localhost/restful_blog_app");
//mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
//mongoose.connect("mongodb://Connor:connor@ds243325.mlab.com:43325/yelpcamp589",{useMongoClient: true})

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//root route
app.get("/", function(req, res){
    res.redirect("/blogs");
});


//ROUTES
app.get("/blogs", function(req, res){
    blogpost.find({}, function(err, blogposts){
        if(err){
            console.log("ERROR");
        } else {
            res.render("index", {blogposts: blogposts});
        }
    });
});
//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//CREATE ROUTE
app.post("/blogs", function(req, res){
    blogpost.create(req.body.blogpost, function (err, newBlogpost){
        if(err){
            res.render("new")
        } else {
            res.redirect("/blogs");
        }
    });
});







app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Dr Denver Housing Bubble Server Has Started!");
});
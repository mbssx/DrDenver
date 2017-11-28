var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    Blog            = require("./models/blog"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comments"),
    expressSanitizer= require("express-sanitizer");
    
var commentRoutes   = require("./routes/comments"),
    blogsRoutes     = require("./routes/blogs"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://localhost/house", {useMongoClient: true});
//mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://Connor:connor@ds243325.mlab.com:43325/yelpcamp589",{useMongoClient: true})

app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret:"All your base our belong to us" ,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(blogsRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Dr Denver Housing Bubble Server Has Started!");
});
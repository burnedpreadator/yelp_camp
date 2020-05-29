var express     = require('express'), 
	app         = express(), 
	bodyparser  = require('body-parser'), 
	mongoose    = require('mongoose'),
	flash		= require('connect-flash'),
	passport    = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	campground  = require('./models/campground'),
	comment     = require('./models/comment'),
	User        = require('./models/user'),
	seedDB      = require('./seeds');
//requireing routes
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes        = require('./routes/index')

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v11"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

// seedDB();

//passport configuration
app.use(require('express-session')({
	secret: 'i am goin to be rich in future',
	resave:false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});


app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});


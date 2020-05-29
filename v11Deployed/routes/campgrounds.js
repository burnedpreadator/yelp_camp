var express = require('express');
var router = express.Router();
var campground = require('../models/campground');
var middleware = require('../middleware');

//index - show all campgrounds
router.get('/', function(req, res){
	
	//get all campground from db
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render('campgrounds/index', {campgrounds: allCampgrounds});
		}
	});
});

router.post('/', middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;	
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground={name: name, price: price, image: image, description: desc, author: author};	
	// create a new campground and save to DB
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			console.log(newlyCreated)
			res.redirect('/campgrounds');
		}
	});
});
//new campgrounds
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
});
//show - show is more info about one campground
router.get('/:id', function(req, res){
	campground.findById(req.params.id).populate('comments').exec(function(err, foundcampground){
		if(err || !foundcampground){
			req.flash('error', 'campground not found');
			res.redirect('back')
		}else{
			console.log(foundcampground);
			res.render('campgrounds/show', {campground: foundcampground});
		}
	});
});

//edit campground router
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	campground.findById(req.params.id, function(err, foundcampground){
		res.render('campgrounds/edit', {campground: foundcampground});
	});
});
//update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
	campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
});

// Delete/destroy Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;
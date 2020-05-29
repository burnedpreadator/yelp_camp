var express = require('express');
var router = express.Router({mergeParams: true});
var campground = require('../models/campground')
var comment = require('../models/comment')
var middleware = require('../middleware');


//comments new
router.get('/new', middleware.isLoggedIn, function(req, res){
	//find campground by id
	campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render('comments/new', {campground: campground});
		}
	});
});

//comments create
router.post('/', middleware.isLoggedIn, function(req, res){
	//lookup campground using id
	campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}else{
			comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash('error', 'something went wrong');
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash('success', 'Successfully added comment');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	//create new comments
	
	//connect new comments to campgrounds
	//redirect to campground show page
});

//edit comments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash('error', "cannot find that campground");
			return res.redirect('back');
		}
		comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect('back');
			}else{
				res.render('comments/edit',{campground_id: req.params.id, comment: foundComment});
			}
		});
	})
});

//update comments
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
		if(err){
			res.redirect('back');
		}else{
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//comment destroy route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect('back');
		}else{
			req.flash('success', 'comment deleted');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
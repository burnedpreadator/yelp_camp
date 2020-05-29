var campground = require('../models/campground');
var comment = require('../models/comment');
//all middlewares goes in here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
if(req.isAuthenticated()){
		campground.findById(req.params.id, function(err, foundcampground){
			if(err || !foundcampground){
				res.redirect('back');
			}else{
				//does the user own the campground ?
				if(foundcampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error', 'You dont have permission to do that');
					res.redirect('back');
				}
			}
		});
	}else{
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash('error', 'Comment not found');
				res.redirect('back');
			}else{
				//does the user own the comment ?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error', 'You dont have permission to do that');
					res.redirect('back');
				}
			}
		});
	}else{
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
}

module.exports = middlewareObj
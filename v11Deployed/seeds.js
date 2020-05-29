var mongoose = require('mongoose');
var campground = require('./models/campground');
var comment = require('./models/comment');

var data = [
	{
		name: 'clouds rest',
		image: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}, 
	{
		name: 'desert',
		image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}, 
	{
		name: 'canyon floor',
		image: 'https://images.unsplash.com/photo-1542067519-6cd1e217df2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
	}
]


function seedDB(){
// remove all campgrounds
	campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log('removed campgrounds!');
		
		// //add a few campgrounds
		// data.forEach(function(seed){
		// 	campground.create(seed, function(err, campground){
		// 		if(err){
		// 			console.log(err);
		// 		}else{
		// 			console.log('added a campground');
		// 			//create a comment
		// 			comment.create({
		// 				text: 'this place is greate but i wish there was a seperate bathroom',
		// 				author: 'homer'
		// 			}, function(err, comment){
		// 				if(err){
		// 					console.log(err);
		// 				}else{
		// 					campground.comments.push(comment);
		// 					campground.save();
		// 					console.log('created new comment');
		// 				}
		// 			});
		// 		}
		// 	});
		// });
	});		
}

module.exports = seedDB;
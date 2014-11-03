var mongoose = require('mongoose');

/**
 * Models a single blog post.
 */
var postSchema = mongoose.Schema({
	
	// Post title
	title: String,
	
	// Post subtitle
	subtitle: String,
	
	// URL of the template directory in relative to public/templates/post-templates
	templateUrl: String,

	// URL of the post image relative to the templateDir
	imageUrl: String,

	// Generated url of this post
	publicUrl: String,

	// Date of post
	date: {type: Date, default: Date.now},

	// Tags attached to this post
	tags: Array
});

module.exports = mongoose.model('post', postSchema);
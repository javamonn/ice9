var mongoose = require('mongoose');

/**
 * Models a single blog post.
 */
var postSchema = mongoose.Schema({
	
	// Post title
	title: { type: String, default: '' },
	
	// Post subtitle
	subtitle: { type: String, default: '' },
	
	// URL of the template directory in relative to public/templates/post-templates
	templateUrl: { type: String, default: '' },

	// URL of the post image relative to the templateDir
	imageUrl: { type: String, default: '' },

	// Generated url of this post
	publicUrl: { type: String, default: '' },

	// Date of post
	date: { type: Date, default: Date.now },

	// Tags attached to this post
	tags: { type: Array, default: [] }
});

module.exports = mongoose.model('post', postSchema);
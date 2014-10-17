var mongoose = require('mongoose');

/**
 * Models a single blog post.
 */
var postSchema = mongoose.Schema({
	title: String,
	subtitle: String,
	content: String,
	date: {type: Date, default: Date.now},
	tags: Array
});

module.exports = mongoose.model('post', postSchema);
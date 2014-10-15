var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	title: String,
	subtitle: String,
	date: {type: Date, default: Date.now},
	tags: Array
});

module.exports = mongoose.model('post', postSchema);
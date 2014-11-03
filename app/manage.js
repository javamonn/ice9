/**
 * Command line util to manage the posts in the database. Accepts the following options:
 *
 *		-g
 *			Generate posts. Syncs the database with the information configured in postConfig.js
 */

var fs = require('fs');
var mongoose = require('mongoose');
var dbConfig = require('../config/db');
var postsConfig = require('../config/postsConfig');
var Post = require('./models/post');

mongoose.connect(dbConfig.url);

var opt = progress.argv[2];

if (opt == '-g') {
	postsConfig.forEach( function (postConfig) {

		// check if this post already exists in the database
		Post.findOne({title: postsConfig.title}, function (err, post) {
			if (err) {
				console.log("Creating post.");
				updatePost(new Post(), postConfig);
			} else {
				console.log("Updating post.");
				updatePost(post, postConfig);
			}
		});
	});

	/**
	 * Update the given Post in the database with the information in
	 * the given config. 
	 */
	function updatePost (post, postConfig) {
		post.title = postConfig.title;
		post.subtitle = postConfig.subtitle;
		post.templateUrl = postConfig.templateUrl;
		post.imageUrl = postConfig.imageUrl;
		post.publicUrl = postsConfig.title.toLowerCase().split(' ').join('_');
		date = postConfig.date;
		tags = postConfig.tags;
		post.save( function (err) {
			if (err) {
				console.log("error saving post: ");
			}
			console.log(post + "\n");
		}
	}
}
/**
 * Command line util to manage the posts in the database. Accepts the following options:
 *
 *		-g
 *			Generate posts. Syncs the database with the information configured in postConfig.js.
 *
 *		-d
 *			Delete all posts from the database.
 */

var fs = require('fs');
var mongoose = require('mongoose');
var dbConfig = require('./config/db');
var postsConfig = require('./config/postsConfig');

mongoose.connect(dbConfig.url);
var Post = require('./app/models/post');

var opt = process.argv[2];

if (opt == '-g') {
	generatePosts();
}

if (opt == '-d') {
	deletePosts();
}

function deletePosts() {
	Post.remove({}, function (err) {
		if (err) {
			console.log("error dropping the posts collection");
		}
		console.log("deleted posts");
	});
}


function generatePosts() {
	postsConfig.forEach( function (postConfig) {

		// check if this post already exists in the database
		Post.update(
			{ title: postConfig.title },
			{
				title: postConfig.title,
				subtitle: postConfig.subtitle,
				templateUrl: postConfig.templateUrl,
				imageUrl: postConfig.imageUrl,
				publicUrl: postConfig.title.toLowerCase().split(' ').join('_'),
				date: postConfig.date,
				tags: postConfig.tags
			},
			{ upsert: true },
			function (err, result) {
				if (err) {
					console.log("error upserting: " + postConfig.toString());
					process.exit(code=-1);
				} 
				console.log("upserted successfully: " + postConfig.toString());
			}
		);
	});
}
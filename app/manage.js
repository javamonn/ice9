/**
 * Command line util to manage the posts in the database. Accepts the following options:
 *
 *		-g
 *			Generate posts. Syncs the database with the information configured in postConfig.js
 *
 *		-d
 *			Delete all posts from the database.
 */

var fs = require('fs');
var mongoose = require('mongoose');
var dbConfig = require('../config/db');
var postsConfig = require('../config/postsConfig');
var Post = require('./models/post');

mongoose.connect(dbConfig.url);

var opt = process.argv[2];

if (opt == '-g') {
	postsConfig.forEach( function (postConfig) {

		// check if this post already exists in the database
		Post.update(
			{ title: postsConfig.title },
			{
				title: postConfig.title,
				subtitle: postConfig.subtitle,
				templateUrl: postConfig.templateUrl,
				imageUrl: postConfig.imageUrl,
				publicUrl: postConfig.title.toLowerCase().split(' ').join('_'),
				date: postConfig.date,
				tags: postConfig.tags
			},
			{ upsert: true }
		);
		console.log("Upserting post: " + postConfig + "\n");
	});
	process.exit(code=0);
}
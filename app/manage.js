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

mongoose.connect(dbConfig.url);

var opt = progress.argv[2];

// Generate new posts and update any entries whose post.json has changed.
if (opt == '-g') {
}
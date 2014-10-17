var mongoose = require('mongoose');

/**
 * Dead simple authentication. Note - these should never be created in code (as its open source), only
 * queried. Create these on the command line.
 */
var secretSchema = mongoose.Schema({
	key: String,
	secret: String
});

module.exports = mongoose.model('secret', secretSchema);
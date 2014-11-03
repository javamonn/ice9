/**
 * Sets up the server side routes.
 * 
 * API routes:
 *		 /api/posts 		- Post model
 *
 * HTML routes:
 *		/ 					- Entry point for the app, initializes angular.
 */
module.exports = function(app, express) {
	var Post = require('./models/post');
	var Secret = require('./models/secret');
	var router = express.Router();

	// Called on every route
	router.use(function(req, res, next) {
		console.log("request at: " + req.url);
		next();
	});
	
	//============= API ROUTES ==================

	router.route('/api/posts')
		.get(function (req, res) {
			Post.find(function (err, posts) {
				if (err)
					res.send(err);
				res.json(posts);
			});
		});

	router.route('/api/posts/:postUrl')
		.get(function (req, res) {
			console.log("accessed post url");
			Post.findOne({postUrl: req.params.postUrl}, function (err, post) {
				if (err)
					res.send(err);
				if (post) {
					res.json(post);
				} else {
					res.json({status: 404});
				}
			});
		})
		.put(function (req, res) {
			Post.findOneAndUpdate({"_id": req.params.postUrl}, req.body, function (err, post) {
				if (err)
					res.send(err);
				if (post)
					res.json(post);
			})
		});

	router.get('/api/login/:key', function (req, res) {
		Secret.findOne({key: req.params.key}, function (err, secret) {
			if (err)
				res.send(err);
			if (secret) {
				res.json(secret);
			}
			else {
				res.send(401, "incorrect authorization");
			}
		})
	});

	//============= HTML ROUTES =============

	/**
	 * Angular handles all user facing routing.
	 */
	router.get('*', function (req, res) {
		console.log("sending index");
		res.sendfile('./public/views/index.html');
	});

	// register routes
	app.use('/', router);
};
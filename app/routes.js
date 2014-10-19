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
		})
		.post(function (req, res) {
			// check if passed the correct secret
			Secret.findOne({key: req.body.key}, function (err, secret) {
				if (err) {
					res.send(err);
				}
				else if (secret) {
					// create and save new post
					var post = new Post();
					post.title = req.body.title;
					post.subtitle = req.body.subtitle;
					post.tags = req.body.tags;
					post.content = req.body.content;
					post.imgUrl = req.body.imgUrl;
					post.postUrl = req.body.postUrl;

					console.log(post);

					post.save(function(err) {
						if (err)
							res.send(err);
						res.send(200);
						console.log("post saved: " + post);
					});
				}
				else {
					res.send(401, "Incorrect authorization");
					console.log("wrong secret: " + secret);
				}
			});
		});

	router.route('/api/posts/:postUrl')
		.get(function (req, res) {
			Post.findOne({url: postUrl}, function (err, post) {
				if (err)
					res.send(err);
				res.json(post);
			});
		})
		.put(function (req, res) {
			Post.findOneAndUpdate({"_id": req.params.postUrl}, req.body, function (err, post) {
				if (err)
					res.send(err);
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
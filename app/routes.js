var Post = require('./models/post');

module.exports = function(app, express) {
	var router = express.Router();

	// Called on every route
	router.use(function(req, res, next) {
		console.log("url accessed");
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
			var post = new Post();
			post.title = req.body.title;
			post.subtitle = req.body.subtitle;
			post.tags = req.body.tags;
			post.save(function(err) {
				if (err)
					res.send(err);
				res.json({status: 200});
			});
		});
	
	router.route('/api/posts/:post_id')
		.get(function (req, res) {
			Post.findById(req.params.post_id, function (err, post) {
				if (err)
					res.send(err);
				res.json(post);
			});
		})
		.put(function (req, res) {
			Post.findOneAndUpdate({"_id": req.params.post_id}, req.body, function (err, post) {
				if (err)
					res.send(err);
				res.json(post);
			})
		});

	//============= FRONTEND ROUTES =============

	router.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

	// register routes
	app.use('/', router);
};
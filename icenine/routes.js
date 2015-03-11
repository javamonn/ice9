(function() {
  'use strict';

  var PostController = require('./controllers/PostController');

  var router = function(app, express) {
    var routes = express.Router();

    routes.route('/api/posts')
      .get(PostController.index);

    routes.route('/api/posts/:publicUrl')
      .get(PostController.getPost);

    routes.get('*', function(req, res) {
      res.sendfile('./public/index.html');
    });

    app.use('/', routes);
  };

  module.exports = router;
})();

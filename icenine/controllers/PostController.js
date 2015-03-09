(function() {
  'use strict';

  var Post = require('../models/post');

  var getPost = function(req, res) {
    Post.findOne({publicUrl: req.params.publicUrl}).exec()
      .then(function (post) {
        res.json(post);
      }, function(err) {
        res.status(500, {
          error: err
        });
      });
  };

  var index = function(req, res) {
    Post.find().exec()
      .then(function(posts) {
        res.json(posts);
      }, function(err) {
        res.status(500, {
          error: err
        });
      });
  };

  module.exports = {
    getPost: getPost,
    index: index
  };

})();

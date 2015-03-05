(function() {
  'use strict';

  var express = require('express');
  var mongoose = require('mongoose');
  var app = express();
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  var db = require('./config/db');

  var port = process.env.PORT || 8080;

  mongoose.connect(db.url);
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('X-HTTP-Method-Override'));

  // serve assets
  app.use('/public', express.static(__dirname + '/public'));
  // serve index
  app.use(express.static(__dirname + '/public', {
    index: './views/index.html'
  }));

  require('./app/routes')(app, express);

  // start app ===============================================
  app.listen(port);

  exports = module.exports = app;
})();

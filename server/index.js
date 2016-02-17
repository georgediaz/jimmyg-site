var express = require('express');
var morgan = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var favicon = require('serve-favicon');

var app = express();
var STATIC_PATH = path.join(__dirname, '../');
var port = process.env.PORT || 3000

var compiler = webpack(config);
app.use(favicon(path.join(STATIC_PATH, 'favicon.ico')));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: STATIC_PATH});
});

app.server = app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s', port);
  }
});

module.exports = app;

'use strict';

var R                       = require('ramda'),
    config                  = require('config'),
    path                    = require('path'),
    fs                      = require('fs'),
    bodyParser              = require('body-parser'),
    express                 = require('express'),
    session                 = require('express-session'),
    app                     = express(),
    http                    = require('http').Server(app),
    pageRoutes              = require('./routes/index');

app.use(session({
  secret            : R.path(['session', 'secret'], config),
  resave            : true,
  saveUninitialized : true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/views/*', function(req, res) {
  res.render(path.join(app.get('views'), req.params[0]));
});

app.use (express.static( './dist'));

app.use('/', pageRoutes);

R.forEach(http.listen.bind(http), config.server.enabledPorts);

'use strict';

var R = require('ramda');

var index = function(req, res) {
  var dataForJade = {};

  if (req.user) {
    dataForJade.sessionUser = R.defaultTo('', JSON.stringify(req.user));
  }

  res.render('pages/index', dataForJade);
};

module.exports = index;

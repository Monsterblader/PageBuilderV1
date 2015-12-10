'use strict';

var R              = require('ramda'),
    userAgentUtils = require('../utils/userAgent');

function index(req, res) {
  var userAgent    = req.headers['user-agent'].toLowerCase(),
      browserClass = userAgentUtils.getBrowserClass(userAgent);

  res.render('layout', {
    ip           : req.header('X-Real-Ip'),
    cacheRev     : process._cacheRev,
    browserClass : browserClass
  });

}

module.exports = index;

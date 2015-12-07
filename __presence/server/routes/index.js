'use strict';

var express = require('express'),
    router  = express.Router();

var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl);

module.exports = router;

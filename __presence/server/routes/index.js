'use strict';

var express = require('express'),
    router  = express.Router();

var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl);

// TODO Swap this shim with an actual end point
router.get('/api/v0.0.0/tracking', function(req, res) {
  res.json({
    tracking : {
      status : 'In-Transit'
    }
  });
});

module.exports = router;

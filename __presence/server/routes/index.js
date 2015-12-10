'use strict';

var R       = require('ramda'),
    express = require('express'),
    router  = express.Router();

var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl);

// TODO Swap this shim with an actual end point
router.get('/api/v0.0.0/tracking', function(req, res) {
  res.json({
    tracking : {
      status             : 'In-Transit',
      estimated_delivery : {
        range_start : {
          date  : 25,
          month : 11,
          year  : 2015,
          day   : 'Friday'
        },
        range_end   : {
          date  : 31,
          month : 11,
          year  : 2015,
          day   : 'Thursday'
        }
      },
      delivery           : {
        status : 'ON_ITS_WAY'
      }
    }
  });
});

// TODO Swap this shim with an actual end point
router.post('/sms/:retailerName/signup', function(req, res) {
  res.json({
    status : 'Posted SMS signup to ' + R.path(['params','retailerName'], req)
  });
});

module.exports = router;

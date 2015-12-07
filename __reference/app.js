var express = require('express')

express()
  .use(express.static(__dirname + '/app'))
  .get('/api/v0.0.0/tracking', function (req, res) {
    res.json({
      tracking: {
        status: 'In-Transit'
      }
    })
  })
  .listen(8000, '0.0.0.0')

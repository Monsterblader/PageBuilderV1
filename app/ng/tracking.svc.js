app.service('TrackingSvc', function ($http) {
  this.getStatus = function () {
    return $http.get('/api/v0.0.0/tracking')
      .then( function (response) {
        return response.data.tracking.status
      })
  }
})

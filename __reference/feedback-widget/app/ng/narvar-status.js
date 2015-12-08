app.directive('narvarStatus', function () {
  var controller = function ($scope, TrackingSvc) {
    TrackingSvc
      .getStatus()
      .then( function (status) {
        $scope.status = status
        $scope.img = '../img/' + status.toLowerCase() + '.svg'
      })
  }
  return {
    controller: controller,
    scope : {
      align: '@'
    },
    templateUrl: '../templates/narvar-status.html'
  }
})

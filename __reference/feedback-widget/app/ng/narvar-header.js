app.directive('narvarHeader', function () {
  return {
    scope : {
      img: '@',
      text: '@',
      link: '@',
      align: '@',
      fixed: '@'
    },
    templateUrl: '../templates/narvar-header.html'
  }
})

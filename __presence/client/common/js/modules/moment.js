(function() {
  'use strict';

  angular.module('moment', [])
    .service('moment', ['$window', function($window) {
      return $window.moment;
    }]);

}());

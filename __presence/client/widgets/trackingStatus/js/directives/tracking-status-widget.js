(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.trackingStatusWidget
   * @description
   * # trackingStatusWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('trackingStatusWidget', ['R',
    function(R) {
      return {
        restrict : 'E',
        link     : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.tracking-widget
   * @description
   * # tracking-widget
   * Displays tracking information
   */
  angular.module('narvar').directive('tracking-widget', ['R',
    function(R) {
      return {
        restrict : 'E',
        link     : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

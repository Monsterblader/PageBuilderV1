(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.smsWidget
   * @description
   * # smsWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('smsWidget', ['R',
    function(R) {
      return {
        restrict : 'E',
        link     : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

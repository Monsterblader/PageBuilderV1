(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.footerWidget
   * @description
   * # footerWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('footerWidget', ['R',
    function(R) {
      return {
        restrict : 'E',
        link     : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

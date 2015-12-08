(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.headerWidget
   * @description
   * # headerWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('headerWidget', ['R',
    function(R) {
      return {
        restrict : 'E',
        scope    : {
          img   : '@',
          text  : '@',
          link  : '@',
          align : '@',
          fixed : '@'
        },
        templateUrl : '../templates/header-widget.tpl.html',
        link        : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

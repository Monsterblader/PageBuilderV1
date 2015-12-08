(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.surveyWidget
   * @description
   * # surveyWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('surveyWidget', ['R',
    function(R) {
      return {
        restrict    : 'E',
        scope       : {

        },
        templateUrl : '../templates/survey-widget.tpl.html',
        link        : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));

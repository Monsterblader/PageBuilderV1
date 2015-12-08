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
          steps : '@'
        },
        controller  : function() {
          this.currentStep = 1;

          this.nextStep = function() {
            this.currentStep += 1;
            return this;
          };

          this.record = function(type, value) {
            // TODO remove console log statement and POST
            console.log(type + ': ' + value);
            return this.nextStep();
          };
        },
        controllerAs : 'surveyWidgetCtrl',
        templateUrl  : 'widgets/survey/templates/survey-widget.html',
        link         : function(scope, element, attrs) {}
      }
    }]);
}(angular));

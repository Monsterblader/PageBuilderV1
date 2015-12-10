(function(angular) {

  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.feedbackTiming
   * @description
   * # feedbackTiming
   * Feedback for delivery promptness.
   */
  angular.module('narvar').directive('feedbackTiming', ['R',
    function(R) {
      return {
        restrict : 'E',
        require  : '^surveyWidget',
        scope    : {
          caption    : '@',
          adjectives : '='
        },
        templateUrl : 'widgets/survey/templates/feedback-timing.html',
        link        : function(scope, element, attrs, surveyWidgetCtrl) {

          /**
           * Set the hover state of the button.
           * @param {Boolean} state
           */
          scope.setButtonHoverState = function(state) {
            scope.buttonHoverState = state;
          };

          /**
           * Record the value from the customer.
           * @param {Number} value
           */
          scope.record = function(value) {
            surveyWidgetCtrl.record('Timing rating', value);
          };

          scope.buttonHoverState = false;
          scope.buttonClass      = scope.buttonHoverState ? 'btn-primary' : 'btn-primary-outline';

        }
      }
    }]);
}(angular));

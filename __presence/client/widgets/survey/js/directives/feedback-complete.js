(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.feedbackComplete
   * @description
   * # feedbackComplete
   * General feedback complete
   */
  angular.module('narvar').directive('feedbackComplete', ['R',
    function(R) {
      return {
        restrict : 'E',
        require  : '^surveyWidget',
        scope    : {
          caption    : '@',
          subtext    : '@',
          buttonText : '@',
          buttonHref : '@'
        },
        templateUrl : 'widgets/survey/templates/feedback-complete.html',
        link        : function(scope, element, attrs, surveyWidgetCtrl) {
          scope.buttonHoverState = false;
          scope.buttonClass      = scope.buttonHoverState ? 'btn-primary' : 'btn-primary-outline';
        }
      }
    }]);
}(angular));

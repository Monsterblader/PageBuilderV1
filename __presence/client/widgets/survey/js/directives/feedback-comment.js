(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.feedbackComment
   * @description
   * # feedbackComment
   * General feedback comment
   */
  angular.module('narvar').directive('feedbackComment', ['R',
    function(R) {
      return {
        restrict : 'E',
        require  : '^surveyWidget',
        scope    : {
          caption         : '@',
          placeholderText : '@'
        },
        templateUrl : 'widgets/survey/templates/feedback-comment.html',
        link        : function(scope, element, attrs, surveyWidgetCtrl) {

          /**
           * Record the value from the customer.
           * @param {Number} value
           */
          scope.record = function(value) {
            surveyWidgetCtrl.record('Comment', value);
          };

          scope.buttonHoverState = false;
          scope.buttonClass      = scope.buttonHoverState ? 'btn-primary' : 'btn-primary-outline';
        }
      }
    }]);
}(angular));

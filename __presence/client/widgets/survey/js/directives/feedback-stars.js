(function(angular) {

  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.feedbackStars
   * @description
   * # feedbackStars
   * Overall rating for the delivery.
   */
  angular.module('narvar').directive('feedbackStars', ['R',
    function(R) {

      var title = 'How was your delivery?';

      return {
        restrict : 'E',
        require  : '^surveyWidget',
        scope    : {
          caption    : '@',
          adjectives : '='
        },
        templateUrl : 'widgets/survey/templates/feedback-stars.html',
        link        : function(scope, element, attrs, surveyWidgetCtrl) {

          /**
           * Set the caption to one of the hovered stars adjective strings.
           * @param {Number} index
           */
          scope.setCaptionFromAdjectivesIndex = function(index) {
            scope.caption = scope.adjectives[index];
          };

          /**
           * Reset the caption to the default title.
           */
          scope.resetCaption = function() {
            scope.caption = title;
          };

          /**
           * Record the value from the customer.
           * @param {Number} value
           */
          scope.record = function(value) {
            surveyWidgetCtrl.record('Stars rating', value);
          };

          scope.hoverIndex = -1;
          scope.title      = scope.caption;
        }
      }
    }]);
}(angular));

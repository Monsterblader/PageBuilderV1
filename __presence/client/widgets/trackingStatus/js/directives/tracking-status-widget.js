(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.trackingStatusWidget
   * @description
   * # trackingStatusWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('trackingStatusWidget', ['R', 'TrackingSvc',
    function(R, TrackingSvc) {

      console.log('R = ', window.R);
      return {
        restrict    : 'E',
        scope       : {},
        templateUrl : 'widgets/trackingStatus/templates/tracking-status-widget.html',
        link        : function(scope, element, attrs) {
          scope.status = 'Fetching status...';
          scope.img    = '/assets/images/processing.svg';

          TrackingSvc.resources.tracking.get(function(response) {
            var status = R.path(['tracking', 'status'], response);
            scope.status = status;
            scope.img    = '/assets/images/' + R.toLower(status) + '.svg';
          });
        }
      }
    }]);
}(angular));

(function(angular) {
  'use strict';

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.eddWidget
   * @description
   * # eddWidget
   * Displays estimated delivery date information.
   */
  angular.module('narvar').directive('eddWidget', ['R', 'TrackingSvc',
    function(R, TrackingSvc) {
      return {
        restrict : 'E',
        scope    : {
          whereIsMyPackageClickText : '@',
          whereIsMyPackageMessage   : '@',
          contactInfoClickText      : '@'
        },
        templateUrl : 'widgets/edd/templates/edd-widget.html',
        link        : function(scope, element, attrs) {

          TrackingSvc.resources.tracking.get(function(response) {
            var estimatedDelivery = R.path(['tracking', 'estimated_delivery'], response),
                deviceType        = R.prop('device_type', response);

            scope.estimatedDeliveryRangeStartDay   = R.path(['range_start', 'day'], estimatedDelivery);
            scope.estimatedDeliveryRangeStartMonth = R.path(['range_start', 'month'], estimatedDelivery);
            scope.estimatedDeliveryRangeStartDate  = R.path(['range_start', 'date'], estimatedDelivery);
            scope.estimatedDeliveryRangeStartYear  = R.path(['range_start', 'year'], estimatedDelivery);

            scope.estimatedDeliveryRangeEndDay   = R.path(['range_end', 'day'], estimatedDelivery);
            scope.estimatedDeliveryRangeEndMonth = R.path(['range_end', 'month'], estimatedDelivery);
            scope.estimatedDeliveryRangeEndDate  = R.path(['range_end', 'date'], estimatedDelivery);
            scope.estimatedDeliveryRangeEndYear  = R.path(['range_end', 'year'], estimatedDelivery);

            scope.estimatedDeliveryRangeStartMonthName = months[scope.estimatedDeliveryRangeStartMonth];
            scope.estimatedDeliveryRangeEndMonthName   = months[scope.estimatedDeliveryRangeEndMonth];

            scope.deliveryStatusMessage = R.path(['tracking', 'delivery', 'status_message'], response);

            scope.isSingleDate = R.equals(scope.estimatedDeliveryRangeStartDate, scope.estimatedDeliveryRangeEndDate);
            scope.isDelivered  = R.equals('DELIVERED', scope.deliveryStatusMessage);
            scope.isMobile     = R.equals('MOBILE',    deviceType);
            scope.isTablet     = R.equals('TABLET',    deviceType);

            scope.dataAdvIdPackage = scope.isMobile ? 'package_info_mobile' : 'package_info';
            scope.dataAdvIdContact = scope.isMobile ? 'contact_info_mobile' : 'contact_info';

            scope.handleBannerAdLinkClick = function() {

              // TODO Replace this shim with business logic.
              console.log(scope.dataAdvIdPackage);
            };

            (function calculateDaysRemaining() {
              var context = scope.isSingleDate ? 'Start' : 'End';

              scope.daysRemaining = Math.ceil(
                (new Date(
                  R.prop('estimatedDeliveryRange' + context + 'Year', scope),
                  R.prop('estimatedDeliveryRange' + context + 'Month', scope),
                  R.prop('estimatedDeliveryRange' + context + 'Date', scope)
                ).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24
              );

              scope.daysRemainingText = R.cond([
                [R.equals(0), 'Today'],
                [R.equals(1), '1 more day'],
                [R.T,         scope.daysRemaining + ' more days']
              ], scope.daysRemaining);
            }());

          }); // End TrackingSvc.get()

        } // End link()

      }; // End return;

    }]);
}(angular));

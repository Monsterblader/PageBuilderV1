(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.calendarWidget
   * @description
   * # calendarWidget
   * Displays estimated delivery date information.
   */
  angular.module('narvar').directive('calendarWidget', ['R', 'moment', 'TrackingSvc',
    function(R, moment, TrackingSvc) {
      return {
        restrict : 'E',
        scope    : {


        },
        templateUrl : 'widgets/calendar/templates/calendar-widget.html',
        link        : function(scope, element, attrs) {

          scope.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

          TrackingSvc.resources.tracking.get(function(response) {
            var _estimatedDelivery = R.path(['tracking', 'estimated_delivery'], response),
                _carrierStartDay   = parseInt(R.path(['tracking', 'carrier', 'start_day'], response), 10),
                _carrierEndDay     = parseInt(R.path(['tracking', 'carrier', 'end_day'],   response), 10),
                _carrierDaysInARow = R.inc(_carrierEndDay - _carrierStartDay);

            scope.estimatedDeliveryRangeStartDay   = R.path(['range_start', 'day'], _estimatedDelivery);
            scope.estimatedDeliveryRangeStartMonth = R.path(['range_start', 'month'], _estimatedDelivery);
            scope.estimatedDeliveryRangeStartDate  = R.path(['range_start', 'date'], _estimatedDelivery);
            scope.estimatedDeliveryRangeStartYear  = R.path(['range_start', 'year'], _estimatedDelivery);

            scope.estimatedDeliveryRangeEndDay   = R.path(['range_end', 'day'], _estimatedDelivery);
            scope.estimatedDeliveryRangeEndMonth = R.path(['range_end', 'month'], _estimatedDelivery);
            scope.estimatedDeliveryRangeEndDate  = R.path(['range_end', 'date'], _estimatedDelivery);
            scope.estimatedDeliveryRangeEndYear  = R.path(['range_end', 'year'], _estimatedDelivery);

            scope.estimatedDeliveryRangeStartCalendarMonth = R.inc(R.prop('estimatedDeliveryRangeStartMonth', scope));
            scope.estimatedDeliveryRangeEndCalendarMonth   = R.inc(R.prop('estimatedDeliveryRangeEndMonth', scope));

            scope.carrierHolidays = R.mergeAll(
              R.map(R.createMapEntry(R.__, true), R.split(',', R.path(['tracking', 'carrier', 'holidays'], response)))
            );

            scope.carrierDeliveryDays = R.compose(
              R.insertAll(_carrierStartDay, R.repeat(true, _carrierDaysInARow)),
              R.remove(_carrierStartDay, _carrierDaysInARow))(R.repeat(false, 7)
            );

            scope.numberOfDaysInMonth = new Date(
              R.prop('estimatedDeliveryRangeStartYear', scope),
              R.prop('estimatedDeliveryRangeStartCalendarMonth', scope),
              0
            ).getDate();

            scope.numberOfWeeksInMonth = Math.ceil(R.divide(R.prop('numberOfDaysInMonth', scope), 7));

            scope.rangeLastDate = (R.prop('estimatedDeliveryRangeEndDate', scope) >= R.prop('estimatedDeliveryRangeStartDate', scope))
              ? R.prop('estimatedDeliveryRangeStartDate', scope)
              : R.prop('numberOfDaysInMonth', scope);

            scope.monthLeadingDays = new Date(
              R.prop('estimatedDeliveryRangeStartYear', scope),
              R.prop('estimatedDeliveryRangeStartMonth', scope),
              1
            ).getDay();

            scope.calendarGrid = R.splitEvery(7, R.flatten(
              R.prepend(new Array(scope.monthLeadingDays), R.range(1, R.inc(scope.numberOfDaysInMonth)))
            ));

            /**
             * Calculate if provided date is a carrier working day.
             * @param {Number} date
             * @returns {Boolean}
             */
            scope.isHighlighted = function(date) {

              var _moment;

              if (!R.isNil(date)) {
                _moment = moment()
                  .year(scope.estimatedDeliveryRangeStartYear)
                  .month(scope.estimatedDeliveryRangeStartMonth)
                  .date(date);

                return R.prop(['carrierDeliveryDays'], scope)[_moment.day()] && !R.path(['carrierHolidays', _moment.format('YYYYMMDD')], scope);
              } else {
                return false;
              }

            };

          }); // End TrackingSvc.get()

        } // End link()

      }; // End return;

    }]);
}(angular));

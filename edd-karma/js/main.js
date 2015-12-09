var populateEDDOld = function() {
  if (scope.dely.eta && false === scope.dely.no_ETA) {
    if (scope.dely.shpd_no_ETA && true === scope.dely.shpd_no_ETA && scope.dely.shpd_noETAMsg && scope.dely.shpd_noETAMsg.length > 0) {
      $(".edd-unknown").text(scope.dely.shpd_noETAMsg);
    } else if (scope.dely.noETAMsg && scope.dely.noETAMsg.length > 0) {
      $(".edd-unknown").text(scope.dely.noETAMsg);
    } else {
      if (true === scope.dely.eta_range) {
        $(".edd-date-container.edd-left .edd-day").text(scope.dely.eta.day);
        if (scope.retailer.monthFormat && "long" === scope.retailer.monthFormat) {
          $(".edd-date-container.edd-left .edd-month").text(scope.dely.eta.month_long);
        } else {
          $(".edd-date-container.edd-left .edd-month").text(scope.dely.eta.month_short);
        }
        $(".edd-date-container.edd-left .edd-date").text(scope.dely.eta.date);

        $(".edd-date-container.edd-right .edd-day").text(scope.dely.eta2.day);
        if (scope.retailer.monthFormat && "long" === scope.retailer.monthFormat) {
          $(".edd-date-container.edd-right .edd-month").text(scope.dely.eta2.month_long);
        } else {
          $(".edd-date-container.edd-right .edd-month").text(scope.dely.eta2.month_short);
        }
        $(".edd-date-container.edd-right .edd-date").text(scope.dely.eta2.date);
      } else {
        $(".edd-date-container.edd-left .edd-day").text(scope.dely.eta.day);
        if (scope.retailer.monthFormat && "long" === scope.retailer.monthFormat) {
          $(".edd-date-container.edd-left .edd-month").text(scope.dely.eta.month_long);
        } else {
          $(".edd-date-container.edd-left .edd-month").text(scope.dely.eta.month_short);
        }
        $(".edd-date-container.edd-left .edd-date").text(scope.dely.eta.date);

        if ("DELIVERED" !== scope.dely.status.code && "CANCELED" !== scope.dely.status.code && true === scope.carrier.show_eta_time && scope.dely.eta_window.length > 0) {
          $(".edd-window").text(scope.dely.eta_window);
        } else if ("DELIVERED" === scope.dely.status.code) {
          // <#include "/themes/template1/package_info.ftl" />
        }
      }
    }
  } else {
    if (scope.dely.shpd_no_ETA && true === scope.dely.shpd_no_ETA && scope.dely.shpd_noETAMsg && scope.dely.shpd_noETAMsg.length > 0) {
      $(".edd-unknown").text(scope.dely.shpd_noETAMsg);
    } else {
      if (scope.dely.exceptionETA && scope.dely.exceptionETA.length > 0) {
        $(".edd-unknown").text(lg.exception_eta);
      } else if (scope.dely.noETAMsg && scope.dely.noETAMsg.length > 0) {
        $(".edd-unknown").text(scope.dely.noETAMsg);
      }
    }
  }
};

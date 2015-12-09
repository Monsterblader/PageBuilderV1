var populateEDD;

populateEDD = function(scope) {
  var dateHolder, daysRemaining, months;

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (scope.delivery.status_message) {
    $(".edd-message").text(scope.delivery.status_message);
    $(".edd-message, .edd-view").addClass("edd-show-message");
  } else {
    $(".edd-date-container.edd-left .edd-day").text(scope.estimated_delivery.range_start.day);
    $(".edd-date-container.edd-left .edd-month").text(months[scope.estimated_delivery.range_start.month]);
    $(".edd-date-container.edd-left .edd-date").text(scope.estimated_delivery.range_start.date);
    if ("undefined" !== typeof scope.estimated_delivery.range_end && scope.estimated_delivery.range_end.date !== scope.estimated_delivery.range_start.date) {
      $(".edd-date-container.edd-right .edd-day").text(scope.estimated_delivery.range_end.day);
      $(".edd-date-container.edd-right .edd-month").text(months[scope.estimated_delivery.range_end.month]);
      $(".edd-date-container.edd-right .edd-date").text(scope.estimated_delivery.range_end.date);
    } else {
      $(".edd-range-separator, .edd-date-container").addClass("edd-single-date");
    }

    if ("DELIVERED" === scope.delivery.status) {
      $(".edd-days-remaining, .edd-where-is-my-package").addClass("edd-delivered");
      $(".edd-where-is-my-package .banner_ad_link:first-child").text(lg.whereIsMyPackage);
      $(".edd-where-is-my-package-tooltip .banner_ad_link").attr("href", scope.customer_care.url).text(lg.whereIsMyPackageCopy);
      $(".edd-where-is-my-package-message").text(lg.whereIsMyPackageMessage);
      if ("MOBILE" === scope.device_type || "TABLET" === scope.device_type) {
        $(".edd-where-is-my-package .banner_ad_link:first-child").attr("data-advid", "package_info_mobile");
        $(".edd-where-is-my-package-tooltip .banner_ad_link").attr("data-advid", "contact_info_mobile");
      }
      $(".banner_ad_link").on("click", function(e) {
        // TODO console.log is just a place holder.  Replace it with actual functionality.
        console.log($(this).attr("data-advid"));
      });
    } else {
      dateHolder = "undefined" !== typeof scope.estimated_delivery.range_end ? scope.estimated_delivery.range_end : scope.estimated_delivery.range_start;
      daysRemaining = Math.ceil((new Date(dateHolder.year, dateHolder.month, dateHolder.date).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24);
      switch (daysRemaining) {
        case 0:
          $(".edd-days-remaining").text("Today");
          break;
        case 1:
          $(".edd-days-remaining").text("1 more day");
          break;
        default:
          $(".edd-days-remaining").text(daysRemaining + " more days");
          break;
      }
    }
  }
};

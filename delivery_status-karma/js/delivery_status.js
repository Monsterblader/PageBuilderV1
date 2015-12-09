var populateDeliveryStatus;

populateDeliveryStatus = function(scope) {
  var APIData, createEvent, statusTemplate;

  createEvent = function(event) {
    var createTime;

    createTime = function(date, time) {
      var calendar, day, month, minutes, hours, meridian;

      clock = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
      month = date.slice(5, 7) - 1;
      day = date.slice(-2);
      hours = time.slice(0, 2);
      minutes = time.slice(3, 5);
      meridian = +hours > 11 ? "pm" : "am";

      return lg.calendar[+month] + " " + day + ", " + clock[+hours] + ":" + minutes + " " + meridian;
    };

    return '<div class="delivery-status-shipment-event">' +
                        '<div class="delivery-status-shipment-time-stamp">' + createTime(event.event_date, event.event_time) + '</div>' +
                        '<div class="delivery-status-shipment-copy">' +
                          '<div class="delivery-status-shipment-status">' + event.event + '</div>' +
                          '<div class="delivery-status-shipment-location">' + event.event_city + ', ' + event.event_state + '</div>' +
                        '</div>' +
                      '</div>';
  };

  APIData = scope.TrackInfo[0];
  $(".delivery-status-header").text(lg.deliveryStatusHeaderCopy);
  $(".delivery-status-footer-carrier-logo").css("background-image", "https://assets.narvar.com/general/" + APIData.carrier_name + ".png");
  $(".delivery-status-footer-tracking").text(lg.deliveryStatusTrackingCopy);
  $(".delivery-status-footer-tracking-number").text(APIData.tracking_number);

  if ("DELIVERED" === APIData.status) {
    $(".delivery-status-body").html($(createEvent(APIData.TrackSummary)));
  } else {
    for (var i = 0, l = APIData.TrackDetail.length; i < l; i += 1) {
      $(".delivery-status-body").append($(createEvent(APIData.TrackDetail[i])));
    }
  }
};

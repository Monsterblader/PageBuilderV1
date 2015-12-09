describe("EDD", function() {
  beforeEach(function() {
    $ = jQuery;
    jasmine.getFixtures().fixturesPath = "base/html";
    jasmine.getFixtures().load('delivery_status.html');
  });

  describe("populateEDD", function() {
    it("should exist.", function() {
      expect(typeof populateDeliveryStatus).toBe("function");
    });
  });

  describe("Delivered", function() {
    it("the header should read 'Shipment Activity'", function() {
      var APIData = {
        "TrackInfo": [{
          "retailer_moniker": "coach",
          "carrier_name": "ups",
          "class_of_mail_code": "003",
          "service_desc": "GROUND",
          "class": "",
          "origin_street": "701 N MAIN ST",
          "origin_city": "PORT ALLEGANY",
          "origin_state": "PA",
          "origin_zip": "16743   1098",
          "origin_country_code": "US",
          "dest_street": "",
          "dest_city": "NEW YORK",
          "dest_state": "NY",
          "dest_zip": "10026",
          "dest_country_code": "US",
          "delivery_pod": "",
          "recipient_name": "",
          "ship_date": "2015-10-08 00:00:00",
          "estimated_delivery_date_begin": "",
          "estimated_delivery_date_end": "",
          "guaranteed_delivery_date": "2015-10-12",
          "guaranteed_delivery_time": "13:35:00",
          "last_status_date": "2015-10-12 13:35:00",
          "order_number": "",
          "received_on": "",
          "weight": 26.6,
          "weight_uom": "LBS",
          "total_charge": "",
          "delivery_notification_date": "",
          "status": "DELIVERED",
          "status_code": "DELIVERED",
          "status_desc": "DELIVERED",
          "source": "WEB",
          "no_eta_message": "",
          "status_summary": "",
          "tracking_number": "1Z1859710351040019",
          "partner_carrier_tracking_number": "",
          "TrackSummary": {
            "event": "DELIVERED",
            "event_code": "DELIVERED",
            "error": "",
            "error_code": "",
            "event_city": "NEW YORK",
            "event_state": "NY",
            "event_zip": "10026",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "13:35:00"
          },
          "TrackDetail": [{
            "event": "DELIVERED",
            "event_code": "DELIVERED",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "NEW YORK",
            "event_state": "NY",
            "event_zip": "10026",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "13:35:00"
          }, {
            "event": "OUT FOR DELIVERY",
            "event_code": "DS",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "04:56:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "02:56:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "02:35:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-10",
            "event_time": "01:34:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "SECAUCUS",
            "event_state": "NJ",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-10",
            "event_time": "01:02:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "NEW STANTON",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-09",
            "event_time": "00:51:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "KANE",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "21:07:00"
          }, {
            "event": "ORIGIN SCAN",
            "event_code": "OR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "KANE",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "20:50:00"
          }, {
            "event": "Order Processed: Ready for UPS",
            "event_code": "MP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "",
            "event_state": "",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "14:37:43"
          }]
        }],
        "time_stamp": "2015-12-04 10:44:35"
      };
      populateDeliveryStatus(APIData);

      expect($(".delivery-status-header").text()).toBe("Shipment Activity");
      expect($(".delivery-status-shipment-time-stamp").text()).toBe("Oct 12, 01:35 pm");
      expect($(".delivery-status-shipment-status").text()).toBe("DELIVERED");
      expect($(".delivery-status-shipment-location").text()).toBe("NEW YORK, NY");
      expect($(".delivery-status-footer-tracking").text()).toBe("Tracking Number");
      expect($(".delivery-status-footer-tracking-number").text()).toBe("1Z1859710351040019");
      expect($(".delivery-status-shipment-event").length).toBe(1);
    });
  });

  describe("Not delivered", function() {
    it("", function() {
      var APIData = {
        "TrackInfo": [{
          "retailer_moniker": "coach",
          "carrier_name": "ups",
          "class_of_mail_code": "003",
          "service_desc": "GROUND",
          "class": "",
          "origin_street": "701 N MAIN ST",
          "origin_city": "PORT ALLEGANY",
          "origin_state": "PA",
          "origin_zip": "16743   1098",
          "origin_country_code": "US",
          "dest_street": "",
          "dest_city": "NEW YORK",
          "dest_state": "NY",
          "dest_zip": "10026",
          "dest_country_code": "US",
          "delivery_pod": "",
          "recipient_name": "",
          "ship_date": "2015-10-08 00:00:00",
          "estimated_delivery_date_begin": "",
          "estimated_delivery_date_end": "",
          "guaranteed_delivery_date": "2015-10-12",
          "guaranteed_delivery_time": "13:35:00",
          "last_status_date": "2015-10-12 13:35:00",
          "order_number": "",
          "received_on": "",
          "weight": 26.6,
          "weight_uom": "LBS",
          "total_charge": "",
          "delivery_notification_date": "",
          "status": "NOT DELIVERED",
          "status_code": "DELIVERED",
          "status_desc": "DELIVERED",
          "source": "WEB",
          "no_eta_message": "",
          "status_summary": "",
          "tracking_number": "1Z1859710351040019",
          "partner_carrier_tracking_number": "",
          "TrackSummary": {
            "event": "DELIVERED",
            "event_code": "DELIVERED",
            "error": "",
            "error_code": "",
            "event_city": "NEW YORK",
            "event_state": "NY",
            "event_zip": "10026",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "13:35:00"
          },
          "TrackDetail": [{
            "event": "DELIVERED",
            "event_code": "DELIVERED",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "NEW YORK",
            "event_state": "NY",
            "event_zip": "10026",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "13:35:00"
          }, {
            "event": "OUT FOR DELIVERY",
            "event_code": "DS",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "04:56:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "02:56:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-12",
            "event_time": "02:35:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "BRONX",
            "event_state": "NY",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-10",
            "event_time": "01:34:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "SECAUCUS",
            "event_state": "NJ",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-10",
            "event_time": "01:02:00"
          }, {
            "event": "ARRIVAL SCAN",
            "event_code": "AR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "NEW STANTON",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-09",
            "event_time": "00:51:00"
          }, {
            "event": "DEPARTURE SCAN",
            "event_code": "DP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "KANE",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "21:07:00"
          }, {
            "event": "ORIGIN SCAN",
            "event_code": "OR",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "KANE",
            "event_state": "PA",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "20:50:00"
          }, {
            "event": "Order Processed: Ready for UPS",
            "event_code": "MP",
            "shipment_location_type": "",
            "error": "",
            "error_code": "",
            "event_city": "",
            "event_state": "",
            "event_zip": "",
            "event_country_code": "US",
            "event_date": "2015-10-08",
            "event_time": "14:37:43"
          }]
        }],
        "time_stamp": "2015-12-04 10:44:35"
      };
      populateDeliveryStatus(APIData);

      expect($(".delivery-status-shipment-event").length).toBe(10);

    });
  });
});

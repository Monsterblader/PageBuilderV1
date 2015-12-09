describe("EDD", function() {
  beforeEach(function() {
    $=jQuery;
    jasmine.getFixtures().fixturesPath = "base/html";
    jasmine.getFixtures().load('populateEDD.html');
  });

  describe("populateEDD", function() {
    it("should exist.", function() {
      expect(typeof populateEDD).toBe("function");
    });

    describe("When the server sends a message.", function() {
      beforeEach(function() {
        var scope = {};
        scope.delivery = {status_message: "Test message"};
        populateEDD(scope);
      });

      it("should display the message", function() {
        expect($(".edd-message").text()).toBe("Test message");
        expect($(".edd-message.edd-show-message").length).toBe(1);
      });

      it("should not display the dates.", function() {
        expect($(".edd-view.edd-show-message").length).toBe(1);
      });
    });

    describe("When the server sends a single EDD", function() {
      beforeEach(function() {
        var scope = {};
        scope.estimated_delivery = {range_start:{
          date: 25,
          month: 11,
          year: 2015,
          day: "Friday"
        }};
        scope.delivery = {
          status: "ON_ITS_WAY"
        };
        populateEDD(scope);
      });

      it("should display the EDD.", function() {
        expect($(".edd-date-container.edd-left .edd-date").text()).toBe('25');
        expect($(".edd-date-container.edd-left .edd-month").text()).toBe('December');
        expect($(".edd-date-container.edd-left .edd-day").text()).toBe('Friday');
      });

      it("should create days remaining.", function() {
        expect($(".edd-days-remaining").text()).toBe("22 more days");
      });

      it("should display only one date", function() {
        expect($(".edd-date-container.edd-left.edd-single-date").length).toBe(1);
        expect($(".edd-range-separator.edd-single-date").length).toBe(1);
        expect($(".edd-date-container.edd-right.edd-single-date").length).toBe(1);
      });
    });

    describe("When the server sends an EDD range", function() {
      beforeEach(function() {
        var scope = {};
        scope.estimated_delivery = {range_start:{
          date: 25,
          month: 11,
          year: 2015,
          day: "Friday"
        },
        range_end:{
          date: 31,
          month: 11,
          year: 2015,
          day: "Thursday"
        }};
        scope.delivery = {
          status: "ON_ITS_WAY"
        };
        populateEDD(scope);
      });

      it("should display the EDD.", function() {
        expect($(".edd-date-container.edd-left .edd-date").text()).toBe('25');
        expect($(".edd-date-container.edd-left .edd-month").text()).toBe('December');
        expect($(".edd-date-container.edd-left .edd-day").text()).toBe('Friday');
        expect($(".edd-date-container.edd-right .edd-date").text()).toBe('31');
        expect($(".edd-date-container.edd-right .edd-month").text()).toBe('December');
        expect($(".edd-date-container.edd-right .edd-day").text()).toBe('Thursday');
      });

      it("should create days remaining.", function() {
        expect($(".edd-days-remaining").text()).toBe("28 more days");
      });

      it("should display a date range", function() {
        expect($(".edd-single-date").length).toBe(0);
      });
    });
  });

  describe("when a package is delivered.", function() {
    beforeEach(function() {
      var scope = {};
      scope.estimated_delivery = {range_start:{
        date: 25,
        month: 11,
        year: 2015,
        day: "Friday"
      }};
      scope.delivery = {
        status: "DELIVERED"
      };
      scope.customer_care = {url: "http://www.narvar.com"};
      populateEDD(scope);
    });

    it("should display the 'Where is my package?' link.", function() {
      expect($(".edd-days-remaining.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").text()).toBe("");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("href")).toBe("http://www.narvar.com");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").text()).toBe("Where my package?");
      expect($(".edd-where-is-my-package-message").text()).toBe("Tough luck, bruh.");
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").attr("data-advid")).toBe("package_info");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("data-advid")).toBe("contact_info");
    });
  });

  describe("when the detected device is mobile", function() {
    beforeEach(function() {
      var scope = {};
      scope.estimated_delivery = {range_start:{
        date: 25,
        month: 11,
        year: 2015,
        day: "Friday"
      }};
      scope.delivery = {
        status: "DELIVERED"
      };
      scope.device_type = "MOBILE";
      scope.customer_care = {url: "http://www.narvar.com"};
      populateEDD(scope);
    });

    it("should display the 'Where is my package?' link.", function() {
      expect($(".edd-days-remaining.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").text()).toBe("");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("href")).toBe("http://www.narvar.com");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").text()).toBe("Where my package?");
      expect($(".edd-where-is-my-package-message").text()).toBe("Tough luck, bruh.");
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").attr("data-advid")).toBe("package_info_mobile");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("data-advid")).toBe("contact_info_mobile");
    });
  });

  describe("when the detected device is tablet", function() {
    beforeEach(function() {
      var scope = {};
      scope.estimated_delivery = {range_start:{
        date: 25,
        month: 11,
        year: 2015,
        day: "Friday"
      }};
      scope.delivery = {
        status: "DELIVERED"
      };
      scope.device_type = "TABLET";
      scope.customer_care = {url: "http://www.narvar.com"};
      populateEDD(scope);
    });

    it("should display the 'Where is my package?' link.", function() {
      expect($(".edd-days-remaining.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package.edd-delivered").length).toBe(1);
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").text()).toBe("");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("href")).toBe("http://www.narvar.com");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").text()).toBe("Where my package?");
      expect($(".edd-where-is-my-package-message").text()).toBe("Tough luck, bruh.");
      expect($(".edd-where-is-my-package .banner_ad_link:first-child").attr("data-advid")).toBe("package_info_mobile");
      expect($(".edd-where-is-my-package-tooltip .banner_ad_link").attr("data-advid")).toBe("contact_info_mobile");
    });
  });
});

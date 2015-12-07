describe("Calendar", function() {
  beforeEach(function() {
    $=jQuery;
    jasmine.getFixtures().fixturesPath = "base/html";
    jasmine.getFixtures().load('calendar.html');
    sandbox({class: 'calendar-container'});
  });

  describe("The functions.", function () {
    describe("createCalendar", function() {
      it("should exist.", function() {
        expect(typeof createCalendar).toBe("function");
      });
    });

    describe("createNonDeliveryDaysObject", function() {
      it("should exist.", function() {
        expect(typeof createNonDeliveryDaysObject).toBe("function");
      });
    });

    describe("isHighlighted", function() {
      it("should exist.", function() {
        expect(typeof isHighlighted).toBe("function");
      });
    });
  });

  describe("createCalendar", function() {
    it("should render a range of dates.", function() {
      var scope;
      scope = {
        estimated_delivery: {
          range_start: { date: 25, month: 11, year: 2015 },
          range_end: { date: 31, month: 11, year: 2015 }
        },
        carrier: { start_day: 2, end_day: 6, holidays: "20151225"}
      };
      createCalendar(scope);
      expect($(".highlighted").length).toBe(5);
    });

    it("should render identical dates as one.", function() {
      var scope;
      scope = {
        estimated_delivery: {
          range_start: { date: 25, month: 11, year: 2015 },
          range_end: { date: 25, month: 11, year: 2015 }
        },
        carrier: { start_day: 2, end_day: 6, holidays: "20151225"}
      };
      createCalendar(scope);
      expect($(".highlighted").length).toBe(1);
    });

    it("should render a single date.", function() {
      var scope;
      scope = {
        estimated_delivery: {
          range_start: { date: 25, month: 11, year: 2015 },
          range_end: { date: 25, month: 11, year: 2015 }
        },
        carrier: { start_day: 2, end_day: 6, holidays: "20151225"}
      };
      createCalendar(scope);
      expect($(".highlighted").length).toBe(1);
    });

    it("should not highlight non-delivery days or holidays.", function() {
      var scope;
      scope = {
        estimated_delivery: {
          range_start: { date: 25, month: 11, year: 2015 },
          range_end: { date: 31, month: 11, year: 2015 }
        },
        carrier: { start_day: 2, end_day: 6, holidays: "20151225"}
      };
      createCalendar(scope);
      expect($(".highlighted").length).toBe(5);
      expect($(".not-highlighted").length).toBe(2);
    });

  });
});
